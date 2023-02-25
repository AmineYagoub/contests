FROM node:18-alpine AS base

FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN (cd apps/auth/ && npx prisma generate)
RUN rm -Rf libs/dto/src/index.ts libs/types/src/index.ts
RUN npx nx build auth --generatePackageJson --optimization


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist/apps/auth ./
COPY apps/auth/prisma ./prisma/
RUN npm pkg set dependencies.prisma="latest" && npm install

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# USER nest

EXPOSE 3003
## Launch the wait tool and then your application
CMD /wait && npx prisma migrate deploy && npx prisma generate && node ./main
