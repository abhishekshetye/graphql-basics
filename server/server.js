
const express = require('express');
const { ApolloServer } = require('apollo-server-express');


const authors = [
	{
		id:1,
		info: {
			name: 'Joe Kelly',
			age: 32,
			gender: 'M',
		}
	},
	{
		id:2,
		info: {
			name: 'Alex Daddario',
			age: 25,
			gender: 'F',
		}
	},
	{
		id:3,
		info: {
			name: 'Titan emitting steam',
			age: 24,
			gender: 'M',
		}
	}	
]


const typeDefs = `
	type Author {
		id: ID!
		info: Person
	}
	type Person {
		name: String!
		age: Int
		gender: String!
	}
	type DeleteMessage{
		message: String!
	}
	type Query {
		getAuthors: [Author]
		retreiveAuthor(id: ID!): Author
	}
	type Mutation {
		createAuthor(name: String!, age: Int!): Author!
		updateAuthor(id: ID!, name: String, gender: String): Author!
		deleteAuthor(id: ID!): DeleteMessage!
	}
`;

const resolvers = {
	Query: {
		getAuthors : ()=> authors,
		retreiveAuthor: (obj, {id}) => authors.find(author => id == author.id)
	},
	Mutation: {
		createAuthor: (obj, {name, age}) => {
			const id = String(authors.length + 1);
			const author = {
				id,
				info: {
					name,
					age,
				}
			};
			authors.push(author);
			return author;
		},
		updateAuthor: (obj, {id, name, gender}) => {
			const author = authors.find(author => author.id == id);
			if(author){
				const authorIndex = authors.indexOf(author);
				if(name) author.info.name = name;
				if(gender) author.info.gender = gender;
				authors[authorIndex] = author;
				return author;
			} else {
				throw new Error("Author ID not found");
			}
		},
		deleteAuthor: (obj, {id}) => {
			const author = authors.find(author => author.id == id);
			if(author) {
				const authorIndex = authors.indexOf(author);
				authors.splice(authorIndex, 1);
				return { message: 'Deleted successfully'};
			} else {
				throw new Error("No such author with given ID was found");
			}
		}
	}
}

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
