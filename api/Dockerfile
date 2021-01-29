FROM node:15.6.0-alpine as build

WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copying source files
COPY src/ src/
COPY tsconfig.json ./

RUN npm run build

# FROM node:15.6.0-alpine as test
# #run tests
# WORKDIR /usr/src/api
# COPY --from=build /usr/src/api ./
# COPY test/ test/
# ENV POSTGRES_PASSWORD=postgres
# ENV POSTGRES_USERNAME=postgres
# ENV POSTGRES_HOST=host.docker.internal
# ENV POSTGRES_DATABASE=test
# ENV POSTGRES_PORT=6433
# RUN echo $(ls /usr/src/api/dist)

# RUN npm run test:docker

FROM build as final
EXPOSE 5000

CMD ["npm", "run", "dev:watch"]
