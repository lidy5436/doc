FROM node:latest
LABEL description="李东阳的编程宝典"
WORKDIR /doc
RUN npm install
EXPOSE 3000/tcp
ENTRYPOINT vuepress dev .

