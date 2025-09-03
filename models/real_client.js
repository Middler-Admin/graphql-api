const { GraphQLError } = require('graphql')
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")
const { totalEstimate, totalEstimateAdjusted, calculateInteriorGallonsCost, calculateExteriorGallonsCost, calculateCabinetsGallonsCost } = require('../helpers/calculation')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//// SES
const config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: process.env.AWS_REGION
}

const ses = new SESClient(config)

//// EMAIL TEMPLATES
const { sendEstimateSimple } = require('../templates/sendEstimateSimple')
const { sendEstimateSomeDetail } = require('../templates/sendEstimateSomeDetail')
const { sendEstimateDetailed } = require('../templates/sendEstimateDetailed')
const { sendEstimateShort } = require('../templates/sendEstimateShort')

//// HELPERS
const { calculateInteriorEstimate, calculateExteriorEstimate, calculateCabinetsEstimate } = require('../helpers/calculation')

const Client = new Schema(
  {
    clientName: {
      type: String,
      default: ''
    },
    clientPhone: {
      type: String,
      default: ''
    },
    clientPropertyAddress: {
      type: String,
      default: ''
    },
    clientEmail: {
      type: String,
      default: ''
    },
    clientZipCode: {
      type: String,
      default: ''
    },
    interiorSquareFeet: {
      type: String
    },
    interiorCondition: {
      type: String
    },
    interiorDetail: {
      type: String
    },
    interiorItems: {
      type: Array,
      default: []
    },
    interiorIndividualItems: {
      type: Array,
      default: []
    },
    interiorEstimate: {
      type: String,
      default: '0'
    },
    interiorGallons: {
      type: String,
      default: '0'
    },
    interiorGallonsCost: {
      type: String,
      default: '0'
    },
    interiorGallonsItems: {
      type: Array,
      default: []
    },
    doorsAndDrawers: {
      type: String
    },
    insideCabinet: {
      type: Boolean
    },
    cabinetCondition: {
      type: String
    },
    cabinetDetail: {
      type: String
    },
    cabinetEstimate: {
      type: String,
      default: '0'
    },
    cabinetGallons: {
      type: String,
      default: '0'
    },
    cabinetGallonsCost: {
      type: String,
      default: '0'
    },
    exteriorSquareFeet: {
      type: String
    },
    exteriorCondition: {
      type: String
    },
    exteriorDetail: {
      type: String
    },
    exteriorItems: {
      type: Array,
      default: []
    },
    exteriorIndividualItems: {
      type: Array,
      default: []
    },
    exteriorEstimate: {
      type: String,
      default: '0'
    },
    exteriorGallons: {
      type: String,
      default: '0'
    },
    exteriorGallonsCost: {
      type: String,
      default: '0'
    },
    exteriorGallonsItems: {
      type: Array,
      default: []
    },
    painters: {
      type: String
    },
    hoursPerDay: {
      type: String
    },
    days: {
      type: String
    },
    paintBrand: {
      type: String
    },
    paintQuality: {
      type: String
    },
    warranty: {
      type: String
    },
    payments: {
      type: String
    },
    deposit: {
      type: String
    },
    depositType: {
      type: String
    },
    painterTapeRolls: {
      type: String
    },
    plasticRolls: {
      type: String
    },
    dropCloths: {
      type: String
    },
    dateSent: {
      type: String
    },
    adjustment: {
      type: Boolean,
      default: false
    },
    adjustments: {
      type: Array,
      default: []
    },
    notesAndDisclosure: {
      type: String
    },
    userType: {
      type: String
    },
    where: {
      type: String
    },
    why: {
      type: String
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString() // Stores the date as an ISO string
    },
  },
  {
    timestamps: true
  })

Client.statics.addAdjustment = async function (id, interiorAdjusted, cabinetAdjusted, exteriorAdjusted, adjustment) {

  try {

    const estimate = await this.findById(id)

    let adjustmentArray = [...estimate.adjustments]
    let newAdjustment = new Object()
    newAdjustment.interiorAdjusted = interiorAdjusted.replace('$', '')
    newAdjustment.cabinetAdjusted = cabinetAdjusted.replace('$', '')
    newAdjustment.exteriorAdjusted = exteriorAdjusted.replace('$', '')
    newAdjustment.dateAdjusted = new Date().toISOString()
    adjustmentArray.push(newAdjustment)

    estimate.adjustment = adjustment
    estimate.adjustments = adjustmentArray
    estimate.save()

    return {
      message: 'Estimate prices adjusted',
      estimate: estimate
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.updateDisclosure = async function (id, notesAndDisclosure) {

  try {

    const estimate = await this.findById(id)

    estimate.notesAndDisclosure = notesAndDisclosure
    estimate.save()

    return {
      message: 'Notes and disclosure updated',
      estimate: estimate
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.sendEstimate = async function (userID, clientID, email, format) {

  try {

    const User = require('./real_user')
    const user = await User.findById(userID)
    const estimate = await this.findById(clientID)

    if (format == 'simple') {
      const params = sendEstimateSimple(
        'https://middler.com',
        email,
        user.businessLogo,
        user.businessName,
        user.businessAddress,
        user.businessLicenseNumber,
        user.businessEmail,
        user.businessPhone,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].interiorAdjusted}` : `${estimate.interiorEstimate}`,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].exteriorAdjusted}` : `${estimate.exteriorEstimate}`,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].cabinetAdjusted}` : `${estimate.cabinetEstimate}`,
        estimate.adjustment ? `${totalEstimateAdjusted(estimate)}` : `${totalEstimate(estimate)}`,
        estimate.clientName,
        estimate.clientPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.notesAndDisclosure ? estimate.notesAndDisclosure : ''
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }


    estimate.interiorIndividualItems.map((item) => console.log('ITEMS', item))

    if (format == 'some_detail') {
      const params = sendEstimateSomeDetail(
        'https://middler.com',
        email,
        user.businessLogo,
        user.businessName,
        user.businessAddress,
        user.businessLicenseNumber,
        user.businessEmail,
        user.businessPhone,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].interiorAdjusted}` : `${estimate.interiorEstimate}`,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].exteriorAdjusted}` : `${estimate.exteriorEstimate}`,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].cabinetAdjusted}` : `${estimate.cabinetEstimate}`,
        estimate.adjustment ? `${totalEstimateAdjusted(estimate)}` : `${totalEstimate(estimate)}`,
        estimate.clientName,
        estimate.clientPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.notesAndDisclosure ? estimate.notesAndDisclosure : '',
        estimate.interiorSquareFeet,
        estimate.interiorItems,
        estimate.interiorIndividualItems,
        estimate.doorsAndDrawers,
        estimate.exteriorSquareFeet,
        estimate.exteriorItems,
        estimate.exteriorIndividualItems
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)

    }

    if (format == 'very_detailed') {
      const params = sendEstimateDetailed(
        'https://middler.com',
        email,
        user.businessLogo,
        user.businessName,
        user.businessAddress,
        user.businessLicenseNumber,
        user.businessEmail,
        user.businessPhone ? user.businessPhone.replace('+1', '') : '',
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].interiorAdjusted}` : `${estimate.interiorEstimate}`,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].exteriorAdjusted}` : `${estimate.exteriorEstimate}`,
        estimate.adjustment ? `${estimate.adjustments[estimate.adjustments.length - 1].cabinetAdjusted}` : `${estimate.cabinetEstimate}`,
        estimate.adjustment ? `${totalEstimateAdjusted(estimate)}` : `${totalEstimate(estimate)}`,
        estimate.clientName,
        estimate.clientPhone ? estimate.clientPhone.replace('+1', '') : '',
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.notesAndDisclosure ? estimate.notesAndDisclosure : '',
        estimate.interiorSquareFeet,
        estimate.interiorItems,
        estimate.interiorIndividualItems,
        estimate.doorsAndDrawers,
        estimate.exteriorSquareFeet,
        estimate.exteriorItems,
        estimate.exteriorIndividualItems,
        estimate.paintBrand,
        estimate.paintQuality,
        estimate.warranty,
        estimate.payments,
        estimate.deposityType == 'dollar' ? `$${estimate.deposit}` : `${estimate.deposit}%`,
        estimate.painterTapeRolls,
        estimate.plasticRolls,
        estimate.dropCloths
      )

      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)

    }

    if (format == 'short') {
      const params = sendEstimateShort(
        estimate.id,
        user.id,
        'https://middler.com',
        email,
        user.businessLogo,
        user.businessName,
        user.businessAddress,
        user.businessLicenseNumber,
        user.businessEmail,
        user.businessPhone ? user.businessPhone.replace('+1', '') : '',
        estimate.adjustment
          ? `${parseInt(estimate.adjustments[estimate.adjustments.length - 1].interiorAdjusted.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          : `${parseInt(estimate.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        estimate.adjustment
          ? `${parseInt(estimate.adjustments[estimate.adjustments.length - 1].exteriorAdjusted.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          : `${parseInt(estimate.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        estimate.adjustment
          ? `${parseInt(estimate.adjustments[estimate.adjustments.length - 1].cabinetAdjusted.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          : `${parseInt(estimate.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        estimate.adjustment
          ? `${parseInt(totalEstimateAdjusted(estimate).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          : `${parseInt(totalEstimate(estimate).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        estimate.clientName,
        estimate.clientPhone ? estimate.clientPhone.replace('+1', '') : '',
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.notesAndDisclosure ? estimate.notesAndDisclosure : '',
        estimate.interiorSquareFeet,
        estimate.interiorItems,
        estimate.interiorIndividualItems,
        estimate.doorsAndDrawers,
        estimate.exteriorSquareFeet,
        estimate.exteriorItems,
        estimate.exteriorIndividualItems,
        estimate.paintBrand,
        estimate.paintQuality,
        estimate.warranty,
        estimate.payments,
        estimate.deposityType == 'dollar' ? `$${estimate.deposit}` : `${estimate.deposit}%`,
        estimate.painterTapeRolls,
        estimate.plasticRolls,
        estimate.dropCloths
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }

    return { message: `Estimate was sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.originalEstimate = async function (id, adjustment) {

  try {

    const estimate = await this.findById(id)
    estimate.adjustment = adjustment
    estimate.save()

    return {
      message: 'Reverted to original price',
      estimate: estimate
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.updateEstimate = async function (userID, clientID, estimate) {

  try {

    const updateClient = await this.findById(clientID)

    updateClient.clientName = estimate.clientName,
      updateClient.clientPhone = estimate.clientPhone,
      updateClient.clientPropertyAddress = estimate.clientPropertyAddress,
      updateClient.clientEmail = estimate.clientEmail,
      updateClient.clientZipCode = estimate.clientZipCode,
      updateClient.interiorSquareFeet = estimate.interiorSquareFeet,
      updateClient.interiorCondition = estimate.interiorCondition,
      updateClient.interiorDetail = estimate.interiorDetail,
      updateClient.interiorItems = estimate.interiorItems,
      updateClient.interiorIndividualItems = estimate.interiorIndividualItems,
      updateClient.interiorEstimate = await calculateInteriorEstimate(estimate),
      updateClient.interiorGallons = calculateInteriorGallonsCost(estimate).gallons
    updateClient.interiorGallonsCost = calculateInteriorGallonsCost(estimate).gallonsCost
    updateClient.interiorGallonsItems = calculateInteriorGallonsCost(estimate).gallonsRequired
    updateClient.doorsAndDrawers = estimate.doorsAndDrawers,
      updateClient.insideCabinet = estimate.insideCabinet,
      updateClient.cabinetCondition = estimate.cabinetCondition,
      updateClient.cabinetDetail = estimate.cabinetDetail,
      updateClient.cabinetEstimate = await calculateCabinetsEstimate(estimate),
      updateClient.cabinetGallons = calculateCabinetsGallonsCost(estimate).gallons
    updateClient.cabinetGallonsCost = calculateCabinetsGallonsCost(estimate).gallonsCost
    updateClient.exteriorSquareFeet = estimate.exteriorSquareFeet,
      updateClient.exteriorCondition = estimate.exteriorCondition,
      updateClient.exteriorDetail = estimate.exteriorDetail,
      updateClient.exteriorItems = estimate.exteriorItems,
      updateClient.exteriorIndividualItems = estimate.exteriorIndividualItems,
      updateClient.exteriorEstimate = await calculateExteriorEstimate(estimate),
      updateClient.exteriorGallons = calculateExteriorGallonsCost(estimate).gallons
    updateClient.exteriorGallonsCost = calculateExteriorGallonsCost(estimate).gallonsCost
    updateClient.exteriorGallonsItems = calculateExteriorGallonsCost(estimate).gallonsRequired
    updateClient.painters = estimate.painters,
      updateClient.hoursPerDay = estimate.hoursPerDay,
      updateClient.days = estimate.days,
      updateClient.paintBrand = estimate.paintBrand,
      updateClient.paintQuality = estimate.paintQuality,
      updateClient.warranty = estimate.warranty,
      updateClient.payments = estimate.payments,
      updateClient.deposit = estimate.deposit,
      updateClient.depositType = estimate.depositType,
      updateClient.painterTapeRolls = estimate.painterTapeRolls,
      updateClient.plasticRolls = estimate.plasticRolls,
      updateClient.dropCloths = estimate.dropCloths
    updateClient.notesAndDisclosure = estimate.notesAndDisclosure
    updateClient.save()


    return {
      message: 'Estimate is updated',
      estimate: updateClient
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.deleteEstimate = async function (id) {

  try {

    const User = require('./real_user')
    User.updateMany({ clients: id }, { $pull: { clients: id } }).exec()

    const deleteClient = await this.findByIdAndDelete(id)

    return { message: 'Estimate deleted' }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.getEstimate = async function (id, painter) {

  try {

    const estimate = await this.findById(id)
    const User = require('./real_user')
    const user = await User.findById(painter)

    return {
      message: `Estimate found`,
      estimate: estimate,
      user: user
    }

  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.getCalculations = async function (estimate) {

  let updateClient = new Object()

  try {

    updateClient.clientName = estimate.clientName,
      updateClient.clientPhone = estimate.clientPhone,
      updateClient.clientPropertyAddress = estimate.clientPropertyAddress,
      updateClient.clientEmail = estimate.clientEmail,
      updateClient.clientZipCode = estimate.clientZipCode,
      updateClient.interiorSquareFeet = estimate.interiorSquareFeet,
      updateClient.interiorCondition = estimate.interiorCondition,
      updateClient.interiorDetail = estimate.interiorDetail,
      updateClient.interiorItems = estimate.interiorItems,
      updateClient.interiorIndividualItems = estimate.interiorIndividualItems,
      updateClient.interiorEstimate = await calculateInteriorEstimate(estimate),
      updateClient.interiorGallons = calculateInteriorGallonsCost(estimate).gallons
    updateClient.interiorGallonsCost = calculateInteriorGallonsCost(estimate).gallonsCost
    updateClient.interiorGallonsItems = calculateInteriorGallonsCost(estimate).gallonsRequired
    updateClient.doorsAndDrawers = estimate.doorsAndDrawers,
      updateClient.insideCabinet = estimate.insideCabinet,
      updateClient.cabinetCondition = estimate.cabinetCondition,
      updateClient.cabinetDetail = estimate.cabinetDetail,
      updateClient.cabinetEstimate = await calculateCabinetsEstimate(estimate),
      updateClient.cabinetGallons = calculateCabinetsGallonsCost(estimate).gallons
    updateClient.cabinetGallonsCost = calculateCabinetsGallonsCost(estimate).gallonsCost
    updateClient.exteriorSquareFeet = estimate.exteriorSquareFeet,
      updateClient.exteriorCondition = estimate.exteriorCondition,
      updateClient.exteriorDetail = estimate.exteriorDetail,
      updateClient.exteriorItems = estimate.exteriorItems,
      updateClient.exteriorIndividualItems = estimate.exteriorIndividualItems,
      updateClient.exteriorEstimate = await calculateExteriorEstimate(estimate),
      updateClient.exteriorGallons = calculateExteriorGallonsCost(estimate).gallons
    updateClient.exteriorGallonsCost = calculateExteriorGallonsCost(estimate).gallonsCost
    updateClient.exteriorGallonsItems = calculateExteriorGallonsCost(estimate).gallonsRequired
    updateClient.painters = estimate.painters,
      updateClient.hoursPerDay = estimate.hoursPerDay,
      updateClient.days = estimate.days,
      updateClient.paintBrand = estimate.paintBrand,
      updateClient.paintQuality = estimate.paintQuality,
      updateClient.warranty = estimate.warranty,
      updateClient.payments = estimate.payments,
      updateClient.deposit = estimate.deposit,
      updateClient.depositType = estimate.depositType,
      updateClient.painterTapeRolls = estimate.painterTapeRolls,
      updateClient.plasticRolls = estimate.plasticRolls,
      updateClient.dropCloths = estimate.dropCloths


    return {
      estimate: updateClient
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.getPaintCard = async function (id) {

  try {

    const estimate = await this.findById(id)

    return {
      message: `Estimate found`,
      estimate: estimate
    }

  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Client.statics.applyGiftCard = async function (estimateID, where, why) {

  try {

    const estimate = await this.findById(estimateID)

    estimate.where = where
    estimate.why = why
    estimate.save()

    return {
      message: 'gift card submitted'
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

module.exports = mongoose.model('client', Client)
