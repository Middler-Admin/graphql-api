const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean } = graphql;

const EstimatorOutputType = require('./estimatorOutputType')
const InvoiceOutputType = require('./invoiceOutputType')
const PaymentOutputType = require('./paymentOutputType');
const CodeOutputType = require('./codeOutputType');
const TimeEstimateOutputType = require('./timeEstimateOutputType')

const UserType = new GraphQLObjectType({
  name:  'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    membershipID: { type: GraphQLString },
    bio: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean},
    emailVerifiedStamp: { type: GraphQLString },
    role: { type: GraphQLString },
    businessName: { type: GraphQLString },
    estimatorName: { type: GraphQLString },
    businessLogo: { type: GraphQLString },
    businessAddress: { type: GraphQLString },
    businessPhone: { type: GraphQLString },
    businessEmail: { type: GraphQLString },
    businessWebsite: { type: GraphQLString },
    businessLicenseNumber: { type: GraphQLString },
    businessInstagram: { type: GraphQLString },
    clients: { type: new GraphQLList(EstimatorOutputType) },
    subscribed: { type: GraphQLBoolean},
    customerID: { type: GraphQLString },
    subscriptionID: { type: GraphQLString },
    invoices: { type: new GraphQLList(InvoiceOutputType)},
    subscribedAt: { type: GraphQLString },
    currentPeriodStart: { type: GraphQLString },
    currentPeriodEnd: { type: GraphQLString },
    payments: { type: new GraphQLList(PaymentOutputType)},
    paymentPlan: { type: GraphQLString },
    codes: { type: new GraphQLList(CodeOutputType)},
    timeEstimates: { type: new GraphQLList(TimeEstimateOutputType)},
    createdAt: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});


module.exports = UserType;
