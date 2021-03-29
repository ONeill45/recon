FROM node:14.15.4-alpine

WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copying source files
COPY src/ src/
COPY test/ test/
COPY tsconfig.json ./

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "dev:watch"]
