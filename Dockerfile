FROM node:20.9.0-alpine3.18

RUN apk add bash vim curl

WORKDIR /opt/webapps/notetaker

COPY . .

RUN npm install --verbose

EXPOSE 3000

CMD ["npm", "run", "dev"]
