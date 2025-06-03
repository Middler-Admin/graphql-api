const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = graphql;

//// TYPES
const ItemsInputType = require('./itemsInputType')
const IndividualItemInputType = require('./individualItemInputType')

const EstimatorInputType = new GraphQLInputObjectType({
  name:  'EstimatorInputType',
  fields: () => ({
    adjustment: { type: GraphQLBoolean },
    businessLogo: { type: GraphQLString },
    businessName: { type: GraphQLString },
    estimatorName: { type: GraphQLString },
    businessAddress: { type: GraphQLString },
    businessPhone: { type: GraphQLString },
    businessEmail: { type: GraphQLString },
    businessWebsite: { type: GraphQLString },
    businessLicenseNumber: { type: GraphQLString },
    businessInstagram: { type: GraphQLString },
    clientName: { type: GraphQLString },
    clientPhone: { type: GraphQLString },
    clientPropertyAddress: { type: GraphQLString },
    clientEmail: { type: GraphQLString },
    clientZipCode: { type: GraphQLString },
    interiorSquareFeet: { type: GraphQLString },
    interiorCondition: { type: GraphQLString },
    interiorDetail: { type: GraphQLString },
    interiorItems: { type: new GraphQLList(ItemsInputType) },
    interiorIndividualItems: { type: new GraphQLList(IndividualItemInputType) },
    interiorAdjusted: { type: GraphQLString },
    doorsAndDrawers: { type: GraphQLString },
    insideCabinet: { type: GraphQLBoolean },
    cabinetCondition: { type: GraphQLString },
    cabinetDetail: { type: GraphQLString },
    cabinetEstimate: { type: GraphQLString },
    cabinetAdjusted: { type: GraphQLString },
    exteriorSquareFeet: { type: GraphQLString },
    exteriorCondition: { type: GraphQLString },
    exteriorDetail: { type: GraphQLString },
    exteriorItems: { type: new GraphQLList(ItemsInputType)},
    exteriorIndividualItems: { type: new GraphQLList(IndividualItemInputType)},
    exteriorEstimate: { type: GraphQLString },
    exteriorAdjusted: { type: GraphQLString },
    painters: { type: GraphQLString },
    hoursPerDay: { type: GraphQLString },
    days: { type: GraphQLString },
    paintBrand: { type: GraphQLString },
    paintQuality: { type: GraphQLString },
    warranty: { type: GraphQLString },
    payments: { type: GraphQLString },
    deposit: { type: GraphQLString },
    depositType: { type: GraphQLString },
    painterTapeRolls: { type: GraphQLString },
    plasticRolls: { type: GraphQLString },
    dropCloths: { type: GraphQLString },
    notesAndDisclosure: { type: GraphQLString },
    userType: { type: GraphQLString }
  })
});

module.exports = EstimatorInputType
