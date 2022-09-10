FROM node:16-alpine AS base

FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx nx build frontend --generatePackageJson --optimization 


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN mkdir uploads
RUN chmod -R 777 uploads

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/frontend ./

RUN npm install
RUN npm install sharp pino

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]