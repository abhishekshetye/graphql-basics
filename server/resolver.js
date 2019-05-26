
const authors = require('./author');

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
};

module.exports = resolvers;