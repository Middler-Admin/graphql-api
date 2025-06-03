const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const CodeOutputType = new GraphQLObjectType({
  name:  'CodeOutputType',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    code: { type: GraphQLString },
    plan: { type: GraphQLString },
    days: { type: GraphQLString },
    description: { type: GraphQLString },
    expiration: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

module.exports = CodeOutputType
