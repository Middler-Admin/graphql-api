const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt  } = graphql;

const InvidualItemInputType = new GraphQLInputObjectType({
  name:  'IndividualItemInputType',
  fields: () => ({
    title: { type: GraphQLString },
    price: { type: GraphQLString },
    gallons: { type: GraphQLString }
  })
});

module.exports = InvidualItemInputType
