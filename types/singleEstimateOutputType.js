const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

//// TYPES
const EstimateOutputType = require('./estimatorOutputType')
const UserOutputType = require('./userType')

const SingleEstimateOutputType = new GraphQLObjectType({
  name:  'SingleEstimateOutputType',
  fields: () => ({
    id: { type: GraphQLString },
    message: { type: GraphQLString },
    estimate: { type: EstimateOutputType },
    user: { type: UserOutputType },
    token: { type: GraphQLString },
    username: { type: GraphQLString },
    userID: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean }
  })
});

module.exports = SingleEstimateOutputType
