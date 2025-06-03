const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

//// TYPES
const TimeEstimateOutputType = require('./timeEstimateOutputType')

const SingleTimeEstimateOutputType = new GraphQLObjectType({
  name:  'SingleTimeEstimateOutputType',
  fields: () => ({
    id: { type: GraphQLString },
    message: { type: GraphQLString },
    timeEstimate: { type: TimeEstimateOutputType },
    token: { type: GraphQLString },
    username: { type: GraphQLString },
    userID: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean }
  })
});

module.exports = SingleTimeEstimateOutputType
