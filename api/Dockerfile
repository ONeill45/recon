FROM node:alpine

ENV PORT 5000

WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copying source files
COPY . ./

EXPOSE 5000

CMD ["npm", "run", "start"]
