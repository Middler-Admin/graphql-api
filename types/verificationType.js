const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt } = graphql;

const VerificationType = new GraphQLObjectType({
  name:  'VerificationType',
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean },
    passwordCreated: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    clientSecret: { type: GraphQLString },
    status: { type: GraphQLString },
    subscriptionID: { type: GraphQLString },
    userID: { type: GraphQLString },
    subscriptionID: { type: GraphQLString },
    businessLogo: { type: GraphQLString }
  })
});


module.exports = VerificationType;
