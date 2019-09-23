const graphql = require('graphql')
const users = require('./users.json')

let enderecoType = new graphql.GraphQLObjectType({
	name:'Endereco',
	fields: {
		language: { type: graphql.GraphQLString },
		cidade: { type: graphql.GraphQLString },
		UF: { type: graphql.GraphQLString },
		bairro: { type: graphql.GraphQLString }
	}
})

let contatoType = new graphql.GraphQLObjectType({
	name:'Contato',
	fields: {
		email: { type: graphql.GraphQLString },
		github: { type: graphql.GraphQLString },
		twitter: { type: graphql.GraphQLString },
		celular: { type: graphql.GraphQLString }
	}
})


let userType = new graphql.GraphQLObjectType({
  	name: 'User',
	fields: {
		id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
		nome: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
		idade: { type: graphql.GraphQLInt  },
		sexo: { type: graphql.GraphQLString },
		endereco: { type: enderecoType },
		contato: { type: contatoType },
		profissao: { type: graphql.GraphQLString },
		tipoSangue: { type: graphql.GraphQLString },
		hobbie: { type: new graphql.GraphQLList(graphql.GraphQLString ) }
		
	}
})

let schema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
	    	name: 'Query',
	    	fields: {
			user: {
				type: userType,
				args: {
				  id:{
				    type: graphql.GraphQLInt
				  }
				},
				resolve: function (_ , args) {
					let response = users.find(function (user){
						return (user.id === args.id)
					})
					return response
				}
			},
			users: {
			  type: new graphql.GraphQLList(userType),
			  resolve: function (_ , args) {
				return users
			  }
			}
		}
	})
})

module.exports = schema