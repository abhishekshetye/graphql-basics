
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolver')


const server = new ApolloServer({typeDefs, resolvers});

const PORT = 3000;

const app = express();

server.applyMiddleware({
	app,
	path: '/graphql'
})


app.listen(PORT, () => {
	console.log("Server running on port", PORT);
});
