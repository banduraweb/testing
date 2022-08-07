FROM node:16.13.1

WORKDIR /usr/src/app/support-back

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src /usr/src/app/support-back/src

RUN npm install

CMD ["npm", "run", "start:dev"]

