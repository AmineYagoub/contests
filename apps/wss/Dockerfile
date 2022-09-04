FROM node:16-buster AS base
RUN apt-get install -y --no-install-recommends git

FROM base as deps
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npx nx build wss --generatePackageJson --optimization 


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist/apps/wss/main.js ./main.js
COPY --from=builder /app/dist/apps/wss/main.js.map ./main.js.map
COPY --from=builder /app/dist/apps/wss/package.json ./package.json
RUN yarn install --production --ignore-scripts --prefer-offline

# USER nest

EXPOSE 3030

CMD ["node", "main"]