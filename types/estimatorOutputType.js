const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

//// TYPES
const ItemsOutputType = require('./itemsOutputType')
const IndividualItemOutputType = require('./individualItemOutputType')
const AdjustmentOutputType = require('./adjustmentOutputType')
const GallonsOutputType = require('./gallonsOutputType')

const EstimatorOutputType = new GraphQLObjectType({
  name:  'EstimatorOutputType',
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
    clientZipCode: { type: GraphQLString },
    interiorSquareFeet: { type: GraphQLString },
    interiorCondition: { type: GraphQLString },
    interiorDetail: { type: GraphQLString },
    interiorItems: { type: new GraphQLList(ItemsOutputType) },
    interiorIndividualItems: { type: new GraphQLList(IndividualItemOutputType) },
    interiorEstimate: { type: GraphQLString },
    interiorGallons: { type: GraphQLString },
    interiorGallonsCost: { type: GraphQLString },
    interiorGallonsItems: { type: new GraphQLList(GallonsOutputType)},
    doorsAndDrawers: { type: GraphQLString },
    insideCabinet: { type: GraphQLBoolean },
    cabinetCondition: { type: GraphQLString },
    cabinetDetail: { type: GraphQLString },
    cabinetEstimate: { type: GraphQLString },
    cabinetGallons: { type: GraphQLString },
    cabinetGallonsCost: { type: GraphQLString },
    exteriorSquareFeet: { type: GraphQLString },
    exteriorCondition: { type: GraphQLString },
    exteriorDetail: { type: GraphQLString },
    exteriorItems: { type: new GraphQLList(ItemsOutputType)},
    exteriorIndividualItems: { type: new GraphQLList(IndividualItemOutputType)},
    exteriorEstimate: { type: GraphQLString },
    exteriorGallons: { type: GraphQLString },
    exteriorGallonsCost: { type: GraphQLString },
    exteriorGallonsItems: { type: new GraphQLList(GallonsOutputType)},
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
    adjustment: { type: GraphQLBoolean },
    adjustments: { type: new GraphQLList(AdjustmentOutputType)},
    notesAndDisclosure: { type: GraphQLString },
    userType: { type: GraphQLString },
    where: { type: GraphQLString },
    why: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

module.exports = EstimatorOutputType
