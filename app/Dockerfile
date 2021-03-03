FROM node:14.15.4-alpine

ENV PORT 3000

ENV NEXT_PUBLIC_AZURE_CLIENT_ID=8570b3ce-8294-4dba-9048-3f1f9f2eb7ad
ENV NEXT_PUBLIC_AZURE_TENANT_ID=7f7697bc-3ee2-48f2-9d35-7cb75bddd74b

WORKDIR /usr/src/app
# RUN apk update && apk upgrade && apk add --no-cache g++ make python

# Add libvips
RUN \
  apk add --no-cache python make g++ && \
  apk add vips-dev fftw-dev --update-cache \
  --repository http://dl-3.alpinelinux.org/alpine/edge/community \
  --repository http://dl-3.alpinelinux.org/alpine/edge/main \
  && rm -fR /var/cache/apk/*

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm i

# Copying source files
COPY public public/
COPY src src/
COPY test test/
COPY next-env.d.ts ./
COPY next.config.js ./
COPY .babelrc ./
COPY tsconfig.json ./

# Building app
RUN npm run build

#run tests
RUN npm run test

ENV NODE_OPTIONS --max-old-space-size=8192

EXPOSE 3000

CMD ["npm", "run", "dev"]
