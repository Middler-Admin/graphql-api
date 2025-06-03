const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const InvoiceOutputType = new GraphQLObjectType({
  name:  'InvoiceOutputType',
  fields: () => ({
    subscriptionID: { type: GraphQLString },
    invoiceID: { type: GraphQLString },
    invoiceHostedUrl: { type: GraphQLString },
    invoicePdf: { type: GraphQLString }
  })
});

module.exports = InvoiceOutputType
