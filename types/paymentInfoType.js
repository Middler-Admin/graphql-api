const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt } = graphql;

const PaymentInfoType = new GraphQLObjectType({
  name:  'PaymentInfoType',
  fields: () => ({
    name: { type: GraphQLID },
    email: { type: GraphQLString },
    order: { type: GraphQLString },
    invoiceHostedUrl: { type: GraphQLString },
    invoicePdf: { type: GraphQLString },
    paymentStatus: { type: GraphQLString },
    periodStart: { type: GraphQLString },
    periodEnd: { type: GraphQLString },
    subscriptionStatus: { type: GraphQLString },
    paymentPlan: { type: GraphQLString },
    paymentIntent: { type: GraphQLString },
    subscriptionStatus: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});


module.exports = PaymentInfoType;
