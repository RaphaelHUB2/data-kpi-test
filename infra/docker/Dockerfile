## Build assets
FROM node:18-slim as assets

# Add tini to correctly handle process signals / https://gist.github.com/StevenACoffman/41fee08e8782b411a4a26b9700ad7af5#dont-run-pid-1
ENV TINI_VERSION v0.19.0
ENV BUILD_ARCH=amd64
ARG NPM_TOKEN

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-${BUILD_ARCH} /tini
RUN chmod +x /tini

# Install ps command (required by --watch)
RUN apt update && apt install -y procps
# install system dependencies
RUN npm install -g typescript
RUN npm install -g @nestjs/cli

# set the workdir to /app
WORKDIR /app

COPY  .eslintrc.js        \
      .prettierrc         \
      .npmrc              \
      nest-cli.json       \
      package.json        \
      package-lock.json   \
      tsconfig.build.json \
      tsconfig.json       \
      ./

# Install modules on container
RUN npm install


# Install swagger on container
RUN npm install @nestjs/swagger
RUN npm install fs

# Copy required files to container
ADD src ./src
ADD test ./tests
ADD migrations ./migrations

# Build app on container
RUN npm run build

# Setup Environment
ARG APP_ENV=prod
ENV APP_ENV ${APP_ENV}

# Run app
ENTRYPOINT ["/tini", "--"]
CMD ["node", "/app/dist/main.js"]
