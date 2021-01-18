import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { connect } from "./database";
import { ResourceResolver } from "./resolvers";

async function main() {
  await connect();
  const schema = await buildSchema({ resolvers: [ResourceResolver] });
  const server = new ApolloServer({ schema });
  await server.listen(process.env.PORT);
  console.log("Server has started!");
}

main();
