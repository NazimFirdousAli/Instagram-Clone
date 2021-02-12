const express = require('express');
const morgan = require('morgan');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();

app.use(morgan('dev'));

// downloading files
app.get(`/images/:filename`, (req, res) => {
	const file = `${__dirname}/uploads/${req.params.filename}`;
	if (fs.existsSync(file)) return res.download(file);
	res.status(404).send('Image not found...');
});

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

httpServer.listen({ port }, () => {
	// console.log(`🚀 Apollo Server on http://localhost:${port}`)
	console.log(`🚀 Apollo Server on http://localhost:${port}${server.graphqlPath}`);
	console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});
