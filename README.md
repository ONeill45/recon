# Recon

Full stack application for managing projects and resources.

## Prerequirements

- Docker

## Tech stack

#### Frontend

- React(Next JS)
- Typescript
- GraphQL
- Apollo Client
- Emotion

[Fontend Readme](https://github.com/vora/recon/blob/main/app/)

#### Backend

- GraphQL
- TypeORM
- Apollo Server
- Typescript
- PostgreSQL

[Backend Readme](https://github.com/vora/recon/blob/main/api/)

## Steps to set up and run locally

You will need two env files to get things running. Once these are hosted somehwere this document will be updated, for now ask one of the current devs.

To build and run local Docker container, in the root project directory run:

```console
docker-compose up --build
```

--build is only necessary the first time you create the container. Once you've built the container you can simply run docker-compose up to restart it if you've taken it down.

To bring down the container run:

```console
docker-compose down
```

Add the -v arguement to remove all volumes (this will remove/delete your database).

After everything builds and compiles successfully, the web app will then be running on port 3000, the API will be running on port 5000.

You can add some sample data to your database by copying the SQL commands from `/api/loadSampleData.sql` and running them in your preferred SQL editor.
