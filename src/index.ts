const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");

const mongoose = require("mongoose");
const helmet = require("helmet");

const { execute, subscribe } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";

const { SubscriptionServer } = require("subscriptions-transport-ws");

const typeDefs = require("./types");
const resolvers = require("./resolvers");

require("dotenv").config();

const PORT: any = process.env.PORT || 5000;
const DATABASE: any = process.env.MONGODB_URI;

async function startApolloServer(typeDefs: any, resolvers: any) {
	const app = express();

	app.use(
		helmet({
			contentSecurityPolicy:
				process.env.NODE_ENV === "production" ? undefined : false,
		})
	);

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const server = new ApolloServer({
		schema,
		csrfPrevention: true,
		context: ({ req }: any) => ({ req }),
		plugins: [
			process.env.NODE_ENV === "production"
				? ApolloServerPluginLandingPageDisabled()
				: ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	});

	await server.start();

	server.applyMiddleware({ app, path: "/" });

	const ws = createServer(app);

	await new Promise((resolve) => ws.listen({ port: PORT }, resolve))
		.then(() => {
			new SubscriptionServer(
				{
					execute,
					subscribe,
					schema,
				},
				{
					server: ws,
					path: "/subscriptions",
				}
			);
		})
		.then(() => {
			console.log(
				`Apollo Server ready at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
}

mongoose
	.connect(DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return startApolloServer(typeDefs, resolvers);
	});
