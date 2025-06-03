const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

//// TYPES
const InvoiceOutputType = require('./invoiceOutputType')

const PaymentOutputType = new GraphQLObjectType({
  name:  'PaymentOutputType',
  fields: () => ({
    id: { type: GraphQLString },
    userID: { type: GraphQLString },
    userEmail: { type: GraphQLString },
    orderID: { type: GraphQLString },
    subscriptionID: { type: GraphQLString },
    paymentPlan: { type: GraphQLString },
    paymentIntent: { type: GraphQLString },
    invoiceHostedUrl: { type: GraphQLString }, //// Latest Invoice
    invoicePdf: { type: GraphQLString }, //// Latest Invoice
    invoices: { type: new GraphQLList(InvoiceOutputType) },
    subscriptionStatus: { type: GraphQLString }
  })
});

module.exports = PaymentOutputType
