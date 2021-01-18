FROM node:alpine

ENV PORT 3000

WORKDIR /usr/src/api
# RUN apk update && apk upgrade && apk add --no-cache g++ make python

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copying source files
COPY . ./

# Building app
# RUN npm run build
EXPOSE 5000

CMD ["npm", "run", "start"]
