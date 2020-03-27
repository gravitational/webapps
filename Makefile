IMAGE_NAME := web-apps:$(shell awk -F '"' '{if ($$2 ~ /version/) {print $$4}}' package.json)
REPO_VER_TAG := $(shell git describe --tags --abbrev=8)
CONTAINER_NAME := web-apps-container-$(REPO_VER_TAG)-$(shell bash -c 'echo $$RANDOM')
HOME_DIR = $(shell pwd)
COMMON_SRC = $(shell find packages -type f -a \( -path 'packages/build/*' -o -path 'packages/design/*' -o -path 'packages/shared/*' \))
BRANCH = $(shell git rev-parse --abbrev-ref HEAD)

.PHONY: all
all: dist packages/webapps.e/dist

dist: packages/gravity/dist packages/teleport/dist
	rm -rf dist
	git clone git@github.com:gravitational/webassets.git dist
	git --git-dir dist/.git checkout -B $(BRANCH)
	cp -r packages/gravity/dist dist/gravity
	cp -r packages/teleport/dist dist/teleport

packages/gravity/dist: $(COMMON_SRC) $(shell find packages/gravity -type f -not -path  '*/dist/*')
	$(MAKE) docker-build PACKAGE_PATH=packages/gravity NPM_CMD=build-gravity

packages/teleport/dist: $(COMMON_SRC) $(shell find packages/teleport -type f -not -path  '*/dist/*')
	$(MAKE) docker-build PACKAGE_PATH=packages/teleport NPM_CMD=build-teleport

packages/webapps.e/dist: packages/webapps.e/teleport/dist packages/webapps.e/gravity/dist 
	rm -rf packages/webapps.e/dist
	git clone git@github.com:gravitational/webassets.e.git packages/webapps.e/dist
	git --git-dir packages/webapps.e/dist/.git checkout -B $(BRANCH)
	cp -r packages/webapps.e/gravity/dist packages/webapps.e/dist/gravity.e
	cp -r packages/webapps.e/teleport/dist packages/webapps.e/dist/teleport.e

packages/webapps.e/teleport/dist: $(COMMON_SRC) $(shell find packages/webapps.e/teleport -type f -not -path  '*/dist/*')
	$(MAKE) docker-build PACKAGE_PATH=packages/webapps.e/teleport NPM_CMD=build-teleport-e

packages/webapps.e/gravity/dist: $(COMMON_SRC) $(shell find packages/webapps.e/gravity -type f -not -path  '*/dist/*')
	$(MAKE) docker-build PACKAGE_PATH=packages/webapps.e/gravity NPM_CMD=build-gravity-e

.PHONY: docker-enter
docker-enter:
	docker run -ti --rm=true -t $(IMAGE_NAME) /bin/bash

.PHONY: docker-clean
docker-clean:
	docker rmi --force $(IMAGE_NAME)

.PHONY: docker-build
docker-build:
	rm -rf $(HOME_DIR)/$(PACKAGE_PATH)/dist
	docker build --force-rm=true --build-arg NPM_SCRIPT=$(NPM_CMD) -t $(IMAGE_NAME) .
	docker create --name $(CONTAINER_NAME) -t $(IMAGE_NAME) && \
	docker cp $(CONTAINER_NAME):/web-apps/$(PACKAGE_PATH)/dist $(HOME_DIR)/$(PACKAGE_PATH)/
	docker rm -f $(CONTAINER_NAME)

.PHONY: clean
clean:
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	rm -rf packages/gravity/dist packages/teleport/dist packages/webapps.e/gravity/dist packages/webapps.e/teleport/dist

.PHONY:install
install:
	bash -c "./scripts/install.sh"

.PHONY: init-submodules
init-submodules:
	git submodule update --init --recursive

.PHONY: deploy
deploy: all
	@if [ "$(shell git --git-dir dist/.git rev-parse --abbrev-ref HEAD)" != "$(BRANCH)" ]; then \
		echo "Branch has changed since compilation, please run 'make clean' "; exit 2; \
	fi;
	@if [ "$(shell git --git-dir packages/webapps.e/dist/.git rev-parse --abbrev-ref HEAD)" != "$(BRANCH)" ]; then \
		echo "Branch has changed since compilation, please run 'make clean'"; exit 2; \
	fi;
	cd dist; git add -A; git commit -am 'Update build artifacts'; git push
	cd packages/webapps.e/dist; git add -A; git commit -am 'Update build artifacts'; git push

