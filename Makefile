IMAGE_NAME := web-apps
CONTAINER_NAME := web-apps-container-$(shell bash -c 'echo $$RANDOM')
ROOT = $(shell pwd)
BRANCH = $(shell git rev-parse --abbrev-ref HEAD)

# Below, we specify which files make up the source a particular library. We will later use those variables as
# dependencies for each target
COMMON_SRC = $(shell find packages -type f -a \( -path 'packages/build/*' -o -path 'packages/design/*' -o -path 'packages/shared/*' \))
TELEPORT_SRC = $(COMMON_SRC) $(shell find packages/teleport -type f -not -path  '*/dist/*')
TELEPORT_E_SRC = $(TELEPORT_SRC) $(shell find packages/webapps.e/teleport -type f -not -path  '*/dist/*')
GRAVITY_SRC = $(COMMON_SRC) $(shell find packages/gravity -type f -not -path  '*/dist/*')
GRAVITY_E_SRC = $(GRAVITY_SRC) $(shell find packages/gravity -type f -not -path  '*/dist/*')

# all is the default target which compiles all packages
.PHONY: all
all: packages/gravity/dist packages/teleport/dist packages/webapps.e/teleport/dist packages/webapps.e/gravity/dist

packages/gravity/dist: $(GRAVITY_SRC)
	$(MAKE) docker-build PACKAGE_PATH=packages/gravity NPM_CMD=build-gravity

packages/webapps.e/gravity/dist: $(GRAVITY_E_SRC)
	$(MAKE) docker-build PACKAGE_PATH=packages/webapps.e/gravity NPM_CMD=build-gravity-e

packages/teleport/dist: $(TELEPORT_SRC)
	$(MAKE) docker-build PACKAGE_PATH=packages/teleport NPM_CMD=build-teleport

packages/webapps.e/teleport/dist: $(TELEPORT_E_SRC)
	$(MAKE) docker-build PACKAGE_PATH=packages/webapps.e/teleport NPM_CMD=build-teleport-e

.PHONY: docker-enter
docker-enter:
	docker run -ti --rm=true -t $(IMAGE_NAME) /bin/bash

.PHONY: docker-clean
docker-clean:
	docker rmi --force $(IMAGE_NAME)

.PHONY: docker-build
docker-build:
	rm -rf $(ROOT)/$(PACKAGE_PATH)/dist
	docker build --force-rm=true --build-arg NPM_SCRIPT=$(NPM_CMD) -t $(IMAGE_NAME) .
	docker create --name $(CONTAINER_NAME) -t $(IMAGE_NAME) && \
	docker cp $(CONTAINER_NAME):/web-apps/$(PACKAGE_PATH)/dist $(ROOT)/$(PACKAGE_PATH)/
	docker rm -f $(CONTAINER_NAME)

.PHONY: test
test:
	docker build --force-rm=true --build-arg NPM_SCRIPT=test -t $(IMAGE_NAME)-test .

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

# deploy uploads the latest build artifacts
.PHONY: deploy
deploy: dist packages/webapps.e/dist
	@if [ "$(shell git --git-dir dist/.git rev-parse --abbrev-ref HEAD)" != "$(BRANCH)" ]; then \
		echo "Branch has changed since compilation, please run 'make clean' "; exit 2; \
	fi;
	@if [ "$(shell git --git-dir packages/webapps.e/dist/.git rev-parse --abbrev-ref HEAD)" != "$(BRANCH)" ]; then \
		echo "Branch has changed since compilation, please run 'make clean'"; exit 2; \
	fi;
	cd dist; git add -A; git commit -am 'Update build artifacts'; git push
	cd packages/webapps.e/dist; git add -A; git commit -am 'Update build artifacts'; git push

dist: packages/gravity/dist packages/teleport/dist
	rm -rf dist
	git clone git@github.com:gravitational/webassets.git dist
	cd dist; git checkout $(BRANCH) || git checkout -b $(BRANCH)
	mkdir -p dist/gravity && cp -r packages/gravity/dist/* dist/gravity
	mkdir -p dist/teleport && cp -r packages/teleport/dist/* dist/teleport

packages/webapps.e/dist: packages/webapps.e/teleport/dist packages/webapps.e/gravity/dist 
	rm -rf packages/webapps.e/dist
	git clone git@github.com:gravitational/webassets.e.git packages/webapps.e/dist
	cd packages/webapps.e/dist; git checkout $(BRANCH) || git checkout -b $(BRANCH)
	mkdir -p packages/webapps.e/dist/gravity.e && cp -r packages/webapps.e/gravity/dist/* packages/webapps.e/dist/gravity.e
	mkdir -p packages/webapps.e/dist/teleport.e && cp -r packages/webapps.e/teleport/dist/* packages/webapps.e/dist/teleport.e

