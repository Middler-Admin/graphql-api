const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString  } = graphql;

const AdjustmentOutputType = new GraphQLObjectType({
  name:  'AdjustmentOutputType',
  fields: () => ({
    interiorAdjusted: { type: GraphQLString },
    cabinetAdjusted: { type: GraphQLString },
    exteriorAdjusted: { type: GraphQLString },
    dateAdjusted: { type: GraphQLString }
  })
});

module.exports = AdjustmentOutputType
