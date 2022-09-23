





FROM node:16-alpine AS base

FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx nx build wss --generatePackageJson --optimization 


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist/apps/wss ./

RUN npm install


## Add the wait script to the image
# ADD https://github.com/vishnubob/wait-for-it/blob/master/wait-for-it.sh ./wait-for-it.sh
# RUN chmod +x ./wait-for-it.sh

# USER nest

EXPOSE 3003
## Launch the wait tool and then your application
CMD ["node", "main"]