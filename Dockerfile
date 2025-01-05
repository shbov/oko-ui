FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000
