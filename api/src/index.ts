import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { BookResolver } from "./resolvers/BookResolver";
import { connect } from "./database";

async function main() {
  await connect();
  const schema = await buildSchema({ resolvers: [BookResolver] });
  const server = new ApolloServer({ schema });
  await server.listen(5000);
  console.log("Server has started!");
}

main();
