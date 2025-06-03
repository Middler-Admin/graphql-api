const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const MessageType = new GraphQLObjectType({
  name:  'MessageType',
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString }
  })
});

module.exports = MessageType;
