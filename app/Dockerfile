FROM node:14.15.4-alpine

ENV PORT 3000

ENV NEXT_PUBLIC_AZURE_CLIENT_ID=8570b3ce-8294-4dba-9048-3f1f9f2eb7ad
ENV NEXT_PUBLIC_AZURE_TENANT_ID=7f7697bc-3ee2-48f2-9d35-7cb75bddd74b

WORKDIR /usr/src/app
# RUN apk update && apk upgrade && apk add --no-cache g++ make python

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copying source files
COPY . ./

# Building app
RUN npm run build

#run tests
RUN npm run test

EXPOSE 3000

CMD ["npm", "run", "dev"]
