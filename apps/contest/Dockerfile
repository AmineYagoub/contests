FROM node:16-alpine AS base

FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN (cd apps/contest/ && npx prisma generate)
RUN npx nx build contest --generatePackageJson --optimization 


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist/apps/contest ./
COPY apps/contest/prisma ./prisma/
RUN npm install
RUN npm install prisma

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# USER nest

EXPOSE 3001
## Launch the wait tool and then your application
CMD /wait && npx prisma migrate deploy && npx prisma generate && node ./main