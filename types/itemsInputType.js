const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt  } = graphql;

const ItemsInputType = new GraphQLInputObjectType({
  name:  'ItemsInputType',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

module.exports = ItemsInputType
