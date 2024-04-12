FROM node:lts-alpine
COPY . ./app
COPY .env ./app/.env
WORKDIR /app
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]