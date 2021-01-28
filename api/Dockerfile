FROM node:15.6.0-alpine as build

WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copying source files
COPY src/ src/
COPY tsconfig.json ./

RUN npm run build

FROM node:15.6.0-alpine as test
#run tests
COPY --from=build /usr/src/api ./
COPY test/ test/
RUN npm run test

FROM build as final
EXPOSE 5000

CMD ["npm", "run", "dev:watch"]
