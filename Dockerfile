FROM node:18-alpine
RUN apk add --no-cache gettext

WORKDIR /app

RUN npm i -g pnpm@latest

COPY package*.json pnpm-lock.yaml ./

RUN pnpm i

ENV NODE_ENV=development
ENV PORT=55099
ENV BASE_URL_SERVICE=http://0.0.0.0:55099

RUN mkdir -p /app/wsdl-templates /app/wsdl

COPY templates/SMS4ATM_UAT.wsdl /app/wsdl-templates/



#COPY .env. env.prod ./

EXPOSE 55099

CMD ["npx", "tsx","app/server.ts"]

#docker build --t api-cross-currency:v1.0.0 .
#docker run -d --name api-cross-currency1 -p 55099:55099 api-cross-currency:v1.0.0

