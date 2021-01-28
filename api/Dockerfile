FROM node:14.15.4-alpine

WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copying source files
COPY . ./

#run tests
RUN npm run test

EXPOSE 5000

CMD ["npm", "run", "start"]
