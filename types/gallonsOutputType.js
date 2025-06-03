const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt  } = graphql;

const GallonsOutputType = new GraphQLObjectType({
  name:  'GallonsOutputType',
  fields: () => ({
    type: { type: GraphQLString },
    gallons: { type: GraphQLString }
  })
});

module.exports = GallonsOutputType
