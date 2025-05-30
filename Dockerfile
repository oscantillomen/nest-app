FROM node:22.15.1-alpine3.20 AS dev
WORKDIR /app
COPY package.json ./
# Install dependencies
RUN npm cache clean --force
RUN yarn install --legacy-peer-deps
# Copy the rest of the application code
COPY . .
# Generate Prisma Client code
RUN npx prisma generate
# Expose the port the app runs on, here, I was using port 3333
EXPOSE 3000
# Command to run the app
CMD [  "yarn", "start:migrate:dev" ]

FROM node:22.15.1-alpine3.20 AS dev-deps
WORKDIR /app
COPY package.json ./
RUN yarn install

FROM node:22.15.1-alpine3.20 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN yarn build

FROM node:22.15.1-alpine3.20 AS prod-deps
WORKDIR /app
COPY package.json ./
RUN npm cache clean --force
RUN yarn install --omit=dev --legacy-peer-deps

FROM node:22.15.1-alpine3.20 AS prod
EXPOSE 3000
WORKDIR /app
COPY package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
CMD [ "yarn", "start:migrate:prod" ]
