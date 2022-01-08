# syntax=docker/dockerfile:1.2
ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache cpio findutils git
WORKDIR /src

FROM base AS deps
RUN --mount=type=bind,target=.,rw \
    --mount=type=cache,target=/src/node_modules \
    yarn install

FROM deps AS build
RUN --mount=type=bind,target=.,rw \
    --mount=type=cache,target=/src/node_modules \
    yarn run build && mkdir /out && cp -Rf dist /out/

FROM scratch AS build-update
COPY --from=build /out /

FROM build AS build-validate
RUN --mount=type=bind,target=.,rw \
    git add -A && cp -rf /out/* . \
    if [ -n "$(git status --porcelain -- dist)" ]; then \
        echo >&2 'ERROR: Build result differs. Please build first with "docker buildx bake build"' \
        git status --porcelain -- dist \
        xit 1 \
    fi