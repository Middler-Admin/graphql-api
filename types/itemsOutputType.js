const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt  } = graphql;

const ItemsOutputType = new GraphQLObjectType({
  name:  'ItemsOutputType',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

module.exports = ItemsOutputType
