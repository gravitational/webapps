# Some often referenced variables are declared below, to avoid repetition
IMAGE_NAME := web-apps
CONTAINER_NAME := web-apps-container-$(shell bash -c 'echo $$RANDOM')
ROOT = $(shell pwd)
BRANCH = $(shell git rev-parse --abbrev-ref HEAD)
COMMIT = $(shell git rev-parse --short HEAD)
COMMIT_DESC = $(shell git log --decorate=off --oneline -1)
COMMIT_URL = https://github.com/gravitational/webapps/commit/$(COMMIT)

.PHONY: test
test:
	$(MAKE) docker-build NPM_CMD=test

.PHONY: build
build:
	@if [ -d "packages/webapps.e/" ]; then \
		$(MAKE) docker-build NPM_CMD=build-all FROM=dist/ TO=dist/; \
	else \
		$(MAKE) docker-build NPM_CMD=build-oss FROM=dist/ TO=dist/; \
	fi;

.PHONY: build-force
build-force:
	$(MAKE) docker-build NPM_CMD=build-force FROM=dist/force/ TO=dist/force

.PHONY: build-gravity
build-gravity:
	$(MAKE) docker-build NPM_CMD=build-gravity FROM=dist/gravity/ TO=dist/gravity

.PHONY: build-teleport
build-teleport:
	$(MAKE) docker-build NPM_CMD=build-teleport FROM=dist/teleport/ TO=dist/teleport

.PHONY: build-gravity-e
build-gravity-e:
	$(MAKE) docker-build NPM_CMD=build-gravity-e FROM=dist/webassets.e/gravity/ TO=dist/webassets.e/gravity;

.PHONY: build-teleport-e
build-teleport-e:
	$(MAKE) docker-build NPM_CMD=build-teleport-e; FROM=dist/webassets.e/teleport/ TO=dist/webassets.e/teleport;

# builds package dists files in docker (TODO: move it to scripts/docker-build.sh)
.PHONY: docker-build
docker-build:
	mkdir -p $(ROOT)/$(TO)
	docker build --force-rm=true --build-arg NPM_SCRIPT=$(NPM_CMD) -t $(IMAGE_NAME) .
	@if [ "$(TO)" != "" ] || [ "$(FROM)" != "" ]; then \
		docker create --name $(CONTAINER_NAME) -t $(IMAGE_NAME) && \
		docker cp $(CONTAINER_NAME):/web-apps/$(FROM)/. $(ROOT)/$(TO); \
		docker rm -f $(CONTAINER_NAME); \
	fi;

# docker-enter is a shorthand for entering the image
.PHONY: docker-enter
docker-enter:
	docker run -ti --rm=true -t $(IMAGE_NAME) /bin/bash

# docker-clean removes the existing image
.PHONY: docker-clean
docker-clean:
	docker rmi --force $(IMAGE_NAME)

# update webassets repository with the new /dist files
.PHONY: update-webassets-repo
update-webassets-repo:
	# prepare webassets repo
	rm -rf dist && git clone git@github.com:gravitational/webassets.git dist
	cd dist; git checkout $(BRANCH) || git checkout -b $(BRANCH)
	cd dist; git submodule update --init --recursive
	# prepare webassets.e repo
	cd dist/webassets.e; git checkout $(BRANCH) || git checkout -b $(BRANCH)
	# build the dist files
	$(MAKE) build
	# push webapps dist files to webasset repositories
	cd dist/webassets.e; git add -A; git commit -am '$(COMMIT_DESC)' -m '$(COMMIT_URL)' --allow-empty; git push;
	cd dist; git add -A; git commit -am '$(COMMIT_DESC)' -m '$(COMMIT_URL)' --allow-empty; git push;

# clean removes this repo generated artifacts
.PHONY: clean
clean:
	rm -rf dist
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# init-submodules initializes / updates the submodules in this repo
.PHONY: init-submodules
init-submodules:
	git submodule update --init --recursive

