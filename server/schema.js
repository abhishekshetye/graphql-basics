
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

module.exports = typeDefs;