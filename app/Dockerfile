FROM node:alpine

ENV PORT 3000

WORKDIR /usr/src/app
# RUN apk update && apk upgrade && apk add --no-cache g++ make python

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copying source files
COPY . ./

# Building app
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "dev"]
