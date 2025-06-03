const graphql = require('graphql');
const { totalEstimate } = require('../helpers/calculation');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const TimeEstimatorOutputType = new GraphQLObjectType({
  name:  'TimeEstimatorOutputType',
  fields: () => ({
    businessLogo: { type: GraphQLString },
    businessName: { type: GraphQLString },
    estimatorName: { type: GraphQLString },
    businessAddress: { type: GraphQLString },
    businessPhone: { type: GraphQLString },
    businessEmail: { type: GraphQLString },
    businessWebsite: { type: GraphQLString },
    businessLicenseNumber: { type: GraphQLString },
    businessInstagram: { type: GraphQLString },
    id: { type: GraphQLString },
    clientName: { type: GraphQLString },
    clientPhone: { type: GraphQLString },
    clientPropertyAddress: { type: GraphQLString },
    clientEmail: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    chargePerHour: { type: GraphQLString },
    painterPerHour: { type: GraphQLString },
    percentageFee: { type: GraphQLString },
    painters: { type: GraphQLString },
    hoursPerDay: { type: GraphQLString },
    days: { type: GraphQLString },
    totalLabor: { type: GraphQLString },
    paintBrand: { type: GraphQLString },
    gallons: { type: GraphQLString },
    paintCost: { type: GraphQLString },
    totalPaintCost: { type: GraphQLString },
    materials: { type: GraphQLString },
    painterTapeRolls: { type: GraphQLString },
    plasticRolls: { type: GraphQLString },
    dropCloths: { type: GraphQLString },
    workersPerHour: { type: GraphQLString },
    percentageFee: { type: GraphQLString },
    workersNeeded: { type: GraphQLString },
    notes: { type: GraphQLString },
    formType: { type: GraphQLString },
    totalEstimate: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

module.exports = TimeEstimatorOutputType
