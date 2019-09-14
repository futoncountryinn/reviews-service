FROM node:latest
RUN  mkdir -p /src/app
COPY . .
RUN npm install
EXPOSE 3003
CMD ["node", "server/server.js"]