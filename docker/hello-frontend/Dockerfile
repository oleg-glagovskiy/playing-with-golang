FROM node:18-alpine AS dependencies

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV production
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/.next/static ./standalone/.next/static
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME localhost
CMD ["node", "./standalone/server.js"]