FROM node:latest
LABEL description="李东阳的编程宝典"
WORKDIR /doc
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run dev

