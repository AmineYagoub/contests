FROM node:16-alpine AS base

FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN (cd apps/auth/ && npx prisma generate)
RUN (cd apps/contest/ && npx prisma generate)
RUN npx nx build gateway --generatePackageJson --optimization


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist/apps/gateway ./

RUN npm install

# USER nest

EXPOSE 3005
## Launch the wait tool and then your application
CMD ["node", "main"]
