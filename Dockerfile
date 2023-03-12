FROM node:16.14.0
WORKDIR /var/www
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 3000
CMD node server/index.js