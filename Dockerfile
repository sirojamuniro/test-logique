
#stage1
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./ 
COPY .env.production* ./

RUN npm ci

COPY . .

RUN npm run build

#stage2
FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json* ./ 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env.production*  ./.env
COPY --from=builder /app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/src/index.js"]