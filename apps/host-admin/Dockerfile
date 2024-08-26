FROM node:20-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /host
RUN yarn global add turbo@latest
COPY . .

RUN turbo prune host-admin --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /host

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /host/out/json/ .
COPY --from=builder /host/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /host/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo run build

FROM base AS runner
WORKDIR /host

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /host/apps/host-admin/next.config.mjs .
COPY --from=installer /host/apps/host-admin/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /host/apps/host-admin/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /host/apps/host-admin/.next/static ./apps/host-admin/.next/static
COPY --from=installer --chown=nextjs:nodejs /host/apps/host-admin/public ./apps/host-admin/public

