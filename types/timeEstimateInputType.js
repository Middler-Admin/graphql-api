const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = graphql;

const TimeEstimateInputType = new GraphQLInputObjectType({
  name:  'TimeEstimateInputType',
  fields: () => ({
    id: { type: GraphQLString },
    estimatorName: { type: GraphQLString },
    businessName: { type: GraphQLString },
    businessAddress: { type: GraphQLString },
    businessPhone: { type: GraphQLString },
    businessEmail: { type: GraphQLString },
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
    totalEstimate: { type: GraphQLString }
  })
});

module.exports = TimeEstimateInputType
