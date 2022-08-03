FROM node:16.3-slim
RUN apt-get update && apt-get install git g++ make python -y

RUN mkdir -p web-apps
COPY yarn.lock web-apps/
COPY package.json web-apps/
# copy entire build package as it has required .bin files
COPY packages/build/ web-apps/packages/build/

# copy only package.json files
COPY packages/design/package.json web-apps/packages/design/
COPY packages/shared/package.json web-apps/packages/shared/
COPY packages/teleport/package.json web-apps/packages/teleport/
COPY packages/teleterm/package.json web-apps/packages/teleterm/

# copy enterprise package.json files if present
COPY README.md packages/webapps.e/telepor[t]/package.json web-apps/packages/webapps.e/teleport/

# download and install npm dependencies
WORKDIR web-apps
# Install JavaScript dependencies and manually check if yarn.lock needs an update.
# Yarn v1 doesn't respect the --frozen-lockfile flag when using workspaces.
# https://github.com/yarnpkg/yarn/issues/4098
RUN cp yarn.lock yarn-before-install.lock \
  && yarn install \
  && git diff --no-index --exit-code yarn-before-install.lock yarn.lock || \
  { echo "yarn.lock needs an update. Run yarn install, verify that correct dependencies were installed \
and commit the updated version of yarn.lock. Make sure you have the packages/webapps.e submodule \
cloned first."; exit 1; }

# copy the rest of the files and run yarn build command
COPY  . .
ARG NPM_SCRIPT
ARG OUTPUT
# run npm script with optional --output-path parameter
RUN yarn $NPM_SCRIPT $([ -z $OUTPUT ] || echo --output-path=$OUTPUT)
