# Backend Readme

## TypeGraphQL & TypeORM Example

How To Build a GraphQL API with TypeGraphQL and TypeORM. Read the [article](https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/).

**How to use:**

The GraphQL playground can be accessed at http://localhost:5000. To connect the database locally, use port 5433 in your preferred SQL editor.

To run the API tests, make sure you are in the /api directory in your terminal and run the `npm run test` command.

## Database Migrations

We use TypeORM's migration utilities to generate and run database migrations via CLI. The commands are accessible via the `package.json` in the `/api` folder.

Note: As a pre-requisite, run `npm run build` locally because these commands are dependent on the `dist` folder being available in order to access the `ormconfig.js`.

### Generating Database Migrations

1. Make changes to your existing @Entity or create a new @Entity within the `/api/src/models` directory
2. Make sure that docker is running with `docker-compose up --build`

   Note: this will ensure that the Postgres `db` service is running, which is necessary for generating the migrations

3. Locally, within the `/api` directory, run `npm run migration:generate ProperCasedDescriptionOfMigration`. For example, `npm run migration:generate AddResourceAllocationTable`.

   Note: this will create a timestamped file in the `/api/src/database/migrations` folder, like `1614377153341-CreateResourceAllocationTable`

4. Review the generated migration and edit as necessary. Generally, though there are exceptions, the generated migration is all you should need.

### Manually creating database migration

You may need to manually create a migration if the generate command doesn't produce a result. The process is very similar to generating a migration.

1. Make changes to your existing @Entity or create a new @Entity within the `/api/src/models` directory if necessary
2. Make sure that docker is running with `docker-compose up --build`

   Note: this will ensure that the Postgres `db` service is running, which is necessary for generating the migrations

3. Locally, within the `/api` directory, run `npm run migration:create ProperCasedDescriptionOfMigration`.

   Note: this will create the same kind of timestamped file in the `/api/src/database/migrations` folder as generate. However, the `up()` and `down()` functions will be empty.

4. Edit the `up()` function with the sql necessary to deploy your changes. For example, adding a field to a table.
5. Edit the `down()` function with the sql necessary to revert the changes made in `up()`. For example, removing the newly added field from the table.

### Running migrations

Migrations are run automatically when you run `docker-compose up --build`. This works because the final command in the `/api/Dockerfile` is

```
CMD ["npm", "run", "dev:watch"]
```

If you look at the `package.json`, you will see that the `dev:watch` script is

```
npm run migration:run && concurrently "npm run watch" "npm run dev:run"
```

The `npm run migration:run` deploys any migrations that haven't been run and adds a record in the `migrations` table.

## Reverting migrations

If you need to revert a migration, run `npm run migration:revert`. This will run the `down()` function for the latest migration that has been run on your database. If you need to go further back, run `npm run migration:revert` for each of the required migrations to be reverted.
