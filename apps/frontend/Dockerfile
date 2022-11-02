FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx nx build frontend --optimization


# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

RUN mkdir uploads
RUN chmod -R 777 uploads

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/frontend ./
RUN rm -f ./package.json
RUN npm init -y && npm pkg set scripts.start="next start" && npm i @ant-design/icons @apollo/client @emotion/react @emotion/server @emotion/styled @nrwl/next@14 antd antd-img-crop core-js deepmerge echarts echarts-for-react formidable framer-motion jszip minio moment-timezone multiparty next@12 next-transpile-modules react react-dom socket.io-client stylis-plugin-rtl valtio
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
