const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt  } = graphql;

const InvidualItemOutputType = new GraphQLObjectType({
  name:  'IndividualItemOutputType',
  fields: () => ({
    title: { type: GraphQLString },
    price: { type: GraphQLString },
    gallons: { type: GraphQLString }
  })
});

module.exports = InvidualItemOutputType
