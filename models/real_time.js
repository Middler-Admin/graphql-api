const { GraphQLError } = require('graphql')
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")
const mongoose = require('mongoose')
const jwtMethod = require('jsonwebtoken')
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

//// LIBS
const { generateRandomNumber, generateSixDigitPin } = require('../helpers/main')

//// EMAIL TEMPLATES
const { timeEstimateTemplate } = require('../templates/timeEstimate')
const { tempPasswordTwo } = require('../templates/tempPasswordTwo')
const { noPasswordEmailVerification } = require('../templates/noPasswordEmailVerification')

const Time = new Schema(
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
    zipCode: {
      type: String,
      default: ''
    },
    chargePerHour: {
      type: String,
      default: ''
    },
    painterPerHour: {
      type: String,
      default: ''
    },
    percentageFee: {
      type: String,
      default: ''
    },
    painters: {
      type: String,
      default: ''
    },
    hoursPerDay: {
      type: String,
      default: ''
    },
    days: {
      type: String,
      default: ''
    },
    totalLabor: {
      type: String,
      default: ''
    },
    paintBrand: {
      type: String,
      default: ''
    },
    gallons: {
      type: String,
      default: ''
    },
    paintCost: {
      type: String,
      default: ''
    },
    totalPaintCost: {
      type: String,
      default: ''
    },
    materials: {
      type: String,
      default: ''
    },
    painterTapeRolls: {
      type: String,
      default: ''
    },
    plasticRolls: {
      type: String,
      default: ''
    },
    dropCloths: {
      type: String,
      default: ''
    },
    workersPerHour: {
      type: String,
      default: ''
    },
    percentageFee: {
      type: String,
      default: ''
    },
    workersNeeded: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    },
    formType: {
      type: String,
      default: ''
    },
    totalEstimate: {
      type: String,
      default: ''
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString() // Stores the date as an ISO string
    },
  },
  {
    timestamps: true
  })

Time.statics.timeEstimate = async function (emailDestination, recentEstimate, estimate) {

  let TIME
  let newEstimate
  let format = 'short'
  let message = 'Estimates sent and saved'
  let CODE = 'INTERNAL_SERVER_ERROR'
  let newMembershipID = generateRandomNumber()
  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  let userObject = new Object({
    email: emailDestination.toLowerCase(),
    membershipID: newMembershipID,
    password: pin,
    verificationCode: pin,
    codeExpiration: expirationDate.toISOString(),
    businessName: estimate.businessName,
    estimatorName: estimate.estimatorName,
    businessPhone: estimate.businessPhone,
    businessEmail: estimate.businessEmail
  })

  let timeObject = {
    clientName: estimate.clientName,
    clientPhone: estimate.clientPhone,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientEmail: estimate.clientEmail,
    zipCode: estimate.zipCode,
    chargePerHour: estimate.chargePerHour,
    painterPerHour: estimate.painterPerHour,
    percentageFee: estimate.percentageFee,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    totalLabor: estimate.totalLabor,
    paintBrand: estimate.paintBrand,
    gallons: estimate.gallons,
    paintCost: estimate.paintCost,
    totalPaintCost: estimate.totalPaintCost,
    materials: estimate.materials,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    workersPerHour: estimate.workersPerHour,
    percentageFee: estimate.percentageFee,
    workersNeeded: estimate.workersNeeded,
    notes: estimate.notes,
    formType: estimate.formType,
    totalEstimate: estimate.totalEstimate
  }

  try {

    const User = require('../models/user')

    let user = await User.findOne({ email: emailDestination.toLowerCase() })

    if (user) {

      if (!recentEstimate) {

        let array = []
        if (user.timeEstimates.length > 0) array = [...user.timeEstimates]

        const timeEstimate = await new this({ ...timeObject }).save()

        array.push(timeEstimate.id)
        newEstimate = timeEstimate

        user.timeEstimates = array

      }

      user.businessName = estimate.businessName,
        user.estimatorName = estimate.estimatorName,
        user.businessPhone = estimate.businessPhone,
        user.businessEmail = estimate.businessEmail
      user.save()

      CODE = 'ACCOUNT_EXISTS'

    } else {

      if (!recentEstimate) {

        const timeEstimate = await new this({ ...timeObject }).save()

        newEstimate = timeEstimate

        let array = []
        array.push(newEstimate.id)

        userObject.timeEstimates = array

      }

      user = await new User({ ...userObject }).save()

      const paramsPass = tempPasswordTwo(
        user.email,
        user.verificationCode
      )

      const commandPass = new SendEmailCommand(paramsPass)
      const responsePass = await ses.send(commandPass)

      message = 'Estimates sent as well as temporary password email'

      console.log('PASSWORD', responsePass)

    }

    // // Convert totalEstimate to a number
    // const totalEstimateNumber = Number(estimate.totalEstimate)

    // // Format the number as currency with commas
    // const formattedTotalEstimate = totalEstimateNumber.toLocaleString('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    // })

    if (emailDestination) {

      const params = timeEstimateTemplate(
        recentEstimate ? recentEstimate : newEstimate.id,
        user.id,
        process.env.ASSETS_URL,
        emailDestination.toLowerCase(),
        estimate.totalEstimate,
        estimate.notes,
        estimate.businessName,
        estimate.businessAddress,
        estimate.businessEmail,
        estimate.businessPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.clientPhone,
        estimate.clientName
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log('TIME ESTIMATE EMAIL', response)
    }

    if (timeObject.clientEmail) {
      const params = timeEstimateTemplate(
        recentEstimate ? recentEstimate : newEstimate.id,
        user.id,
        process.env.ASSETS_URL,
        timeObject.clientEmail.toLowerCase(),
        estimate.totalEstimate,
        estimate.notes,
        estimate.businessName,
        estimate.businessAddress,
        estimate.businessEmail,
        estimate.businessPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.clientPhone,
        estimate.clientName
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log('TIME ESTIMATE EMAIL', response)
    }

    const token = jwtMethod.sign({ id: user._id, email: emailDestination.toLowerCase() }, process.env.JWT_SECRET_VERIFY, { expiresIn: '24hr', algorithm: 'HS256' })


    return {
      id: recentEstimate ? recentEstimate : newEstimate.id,
      token: token,
      username: user.estimatorName ? user.estimatorName : `${user.firstName} ${user.lastName}`,
      userID: user._id,
      emailVerified: user.emailVerified,
      message: message
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

Time.statics.timeEstimateLogin = async function (emailDestination, password, estimate) {

  let TIME
  let newEstimate
  let format = 'short'
  let message = 'Estimates sent and saved'
  let CODE = 'INTERNAL_SERVER_ERROR'
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  let timeObject = {
    clientEmail: estimate.clientEmail,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientPhone: estimate.clientPhone,
    clientName: estimate.clientName,
    zipCode: estimate.zipCode,
    chargePerHour: estimate.chargePerHour,
    painterPerHour: estimate.painterPerHour,
    percentageFee: estimate.percentageFee,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    totalLabor: estimate.totalLabor,
    paintBrand: estimate.paintBrand,
    gallons: estimate.gallons,
    paintCost: estimate.paintCost,
    totalPaintCost: estimate.totalPaintCost,
    materials: estimate.materials,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    workersPerHour: estimate.workersPerHour,
    percentageFee: estimate.percentageFee,
    workersNeeded: estimate.workersNeeded,
    notes: estimate.notes,
    formType: estimate.formType,
    totalEstimate: estimate.totalEstimate
  }

  try {

    const User = require('../models/user')

    let user

    if (emailDestination) {
      user = await User.findOne({ email: emailDestination.toLowerCase() })
    }

    if (!user) {

      CODE = 'UNREGISTERED'

      throw new GraphQLError('Email address entered is not registered.', {
        extensions: {
          code: 'UNREGISTERED',
        },
      });
    }

    if (!user.password) {
      let userLoggedIn = new Object()
      userLoggedIn.email = email
      userLoggedIn.password = null
      userLoggedIn.emailVerified = user.emailVerified

      return userLoggedIn
    }

    const isMatch = await new Promise((resolve, reject) => {
      user.comparePassword(password, (err, match) => {
        if (err) {
          reject(err)
        } else {
          resolve(match)
        }
      })
    })

    if (isMatch) {

      if (user.role == 'disabled') {
        console.log('ERROR DISABLED')

        CODE = 'DISABLED'

        throw new GraphQLError('Account is disabled', {
          extensions: {
            code: CODE,
          }
        })

      }

      let array = []
      if (user.timeEstimates.length > 0) array = [...user.timeEstimates]

      const timeEstimate = await new this({ ...timeObject }).save()

      array.push(timeEstimate.id)
      newEstimate = timeEstimate

      user.timeEstimates = array
      user.save()

      CODE = 'ACCOUNT_EXISTS'
      TIME = timeEstimate.id

      // Convert totalEstimate to a number
      const totalEstimateNumber = Number(estimate.totalEstimate)

      // Format the number as currency with commas
      const formattedTotalEstimate = totalEstimateNumber.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })

      // if(emailDestination){

      //   const params    = timeEstimateTemplate(
      //     newEstimate.id,
      //     user.id,
      //     process.env.ASSETS_URL,
      //     emailDestination.toLowerCase(),
      //     formattedTotalEstimate,
      //     estimate.notes,
      //     user.businessName,
      //     user.businessAddress,
      //     user.businessEmail,
      //     user.businessPhone,
      //     estimate.clientEmail,
      //     estimate.clientPropertyAddress,
      //     estimate.clientPhone,
      //     estimate.clientName
      //   )
      //   const command   = new SendEmailCommand(params)
      //   const response  = await ses.send(command)

      //   console.log(response)
      // }

      // if(timeObject.clientEmail){
      //   const params    = timeEstimateTemplate(
      //     newEstimate.id,
      //     user.id,
      //     process.env.ASSETS_URL,
      //     timeObject.clientEmail.toLowerCase(),
      //     formattedTotalEstimate,
      //     estimate.notes,
      //     user.businessName,
      //     user.businessAddress,
      //     user.businessEmail,
      //     user.businessPhone,
      //     estimate.clientEmail,
      //     estimate.clientPropertyAddress,
      //     estimate.clientPhone,
      //     estimate.clientName
      //   )
      //   const command   = new SendEmailCommand(params)
      //   const response  = await ses.send(command)

      //   console.log(response)
      // }

      const token = jwtMethod.sign({ id: user._id, email: emailDestination.toLowerCase() }, process.env.JWT_SECRET_VERIFY, { expiresIn: '24hr', algorithm: 'HS256' })


      return {
        id: newEstimate.id,
        token: token,
        username: user.estimatorName ? user.estimatorName : `${user.firstName} ${user.lastName}`,
        userID: user._id,
        emailVerified: user.emailVerified,
        message: message
      }

    } else {

      CODE = 'FORBIDDEN'

      throw new GraphQLError('Invalid password', {
        extensions: {
          code: CODE,
        }
      })
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

Time.statics.updateTimeEstimate = async function (emailDestination, estimate) {

  let TIME
  let newEstimate
  let message = 'Estimates sent and saved'
  let CODE = 'INTERNAL_SERVER_ERROR'

  try {

    const updateTimeEstimate = await this.findById(estimate.id)
    updateTimeEstimate.clientName = estimate.clientName
    updateTimeEstimate.clientPhone = estimate.clientPhone
    updateTimeEstimate.clientPropertyAddress = estimate.clientPropertyAddress
    updateTimeEstimate.clientEmail = estimate.clientEmail
    updateTimeEstimate.zipCode = estimate.zipCode
    updateTimeEstimate.chargePerHour = estimate.chargePerHour
    updateTimeEstimate.painterPerHour = estimate.painterPerHour
    updateTimeEstimate.percentageFee = estimate.percentageFee
    updateTimeEstimate.painters = estimate.painters
    updateTimeEstimate.hoursPerDay = estimate.hoursPerDay
    updateTimeEstimate.days = estimate.days
    updateTimeEstimate.totalLabor = estimate.totalLabor
    updateTimeEstimate.paintBrand = estimate.paintBrand
    updateTimeEstimate.gallons = estimate.gallons
    updateTimeEstimate.paintCost = estimate.paintCost,
      updateTimeEstimate.totalPaintCost = estimate.totalPaintCost
    updateTimeEstimate.materials = estimate.materials
    updateTimeEstimate.painterTapeRolls = estimate.painterTapeRolls
    updateTimeEstimate.plasticRolls = estimate.plasticRolls
    updateTimeEstimate.dropCloths = estimate.dropCloths
    updateTimeEstimate.workersPerHour = estimate.workersPerHour
    updateTimeEstimate.percentageFee = estimate.percentageFee
    updateTimeEstimate.workersNeeded = estimate.workersNeeded
    updateTimeEstimate.notes = estimate.notes
    updateTimeEstimate.formType = estimate.formType
    updateTimeEstimate.totalEstimate = estimate.totalEstimate
    updateTimeEstimate.save()


    if (emailDestination) {

      const params = timeEstimateTemplate(
        estimate.id,
        'unknown',
        process.env.ASSETS_URL,
        emailDestination.toLowerCase(),
        estimate.totalEstimate,
        estimate.notes,
        estimate.businessName,
        estimate.businessAddress,
        estimate.businessEmail,
        estimate.businessPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.clientPhone,
        estimate.clientName
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }

    return {
      id: estimate.id,
      message: message,
      timeEstimate: updateTimeEstimate
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError('Invalid password', {
      extensions: {
        code: CODE,
      }
    })
  }

}

Time.statics.createTimeEstimate = async function (emailDestination, userID, estimate) {

  let TIME
  let newEstimate
  let message = 'Estimates sent and saved'
  let CODE = 'INTERNAL_SERVER_ERROR'

  let timeObject = {
    clientName: estimate.clientName,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientPhone: estimate.clientPhone,
    clientEmail: estimate.clientEmail,
    zipCode: estimate.zipCode,
    chargePerHour: estimate.chargePerHour,
    painterPerHour: estimate.painterPerHour,
    percentageFee: estimate.percentageFee,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    totalLabor: estimate.totalLabor,
    paintBrand: estimate.paintBrand,
    gallons: estimate.gallons,
    paintCost: estimate.paintCost,
    totalPaintCost: estimate.totalPaintCost,
    materials: estimate.materials,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    workersPerHour: estimate.workersPerHour,
    percentageFee: estimate.percentageFee,
    workersNeeded: estimate.workersNeeded,
    notes: estimate.notes,
    formType: estimate.formType,
    totalEstimate: estimate.totalEstimate
  }

  try {

    const User = require('../models/user')

    let user

    if (userID) {
      user = await User.findById(userID)
    }

    if (!user) {

      CODE = 'UNREGISTERED'

      throw new GraphQLError('User not registered. Sign up to continue.', {
        extensions: {
          code: 'UNREGISTERED',
        },
      });
    }

    let array = []
    if (user.timeEstimates.length > 0) array = [...user.timeEstimates]

    const timeEstimate = await new this({ ...timeObject }).save()

    array.push(timeEstimate.id)
    newEstimate = timeEstimate

    user.timeEstimates = array
    user.save()

    TIME = timeEstimate.id

    if (emailDestination) {

      const params = timeEstimateTemplate(
        newEstimate.id,
        user.id,
        process.env.ASSETS_URL,
        emailDestination.toLowerCase(),
        estimate.totalEstimate,
        estimate.notes,
        estimate.businessName,
        estimate.businessAddress,
        estimate.businessEmail,
        estimate.businessPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.clientPhone,
        estimate.clientName
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }

    return {
      id: newEstimate.id,
      message: message,
      timeEstimate: timeEstimate
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError('Invalid password', {
      extensions: {
        code: CODE,
      }
    })
  }

}

Time.statics.deleteTimeEstimate = async function (id) {

  try {

    const User = require('../models/user')
    User.updateMany({ timeEstimates: id }, { $pull: { timeEstimates: id } }).exec()

    const deleteTimeEstimate = await this.findByIdAndDelete(id)

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

Time.statics.timeEstimateAutoSend = async function (emailDestination, userID, estimate) {

  let TIME
  let newEstimate
  let message = 'Estimates sent and saved'
  let CODE = 'INTERNAL_SERVER_ERROR'

  let timeObject = {
    clientName: estimate.clientName,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientPhone: estimate.clientPhone,
    clientEmail: estimate.clientEmail,
    zipCode: estimate.zipCode,
    chargePerHour: estimate.chargePerHour,
    painterPerHour: estimate.painterPerHour,
    percentageFee: estimate.percentageFee,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    totalLabor: estimate.totalLabor,
    paintBrand: estimate.paintBrand,
    gallons: estimate.gallons,
    paintCost: estimate.paintCost,
    totalPaintCost: estimate.totalPaintCost,
    materials: estimate.materials,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    workersPerHour: estimate.workersPerHour,
    percentageFee: estimate.percentageFee,
    workersNeeded: estimate.workersNeeded,
    notes: estimate.notes,
    formType: estimate.formType,
    totalEstimate: estimate.totalEstimate
  }

  try {

    const User = require('../models/user')

    let user

    if (userID) {
      user = await User.findById(userID)
    }

    if (!user) {

      CODE = 'UNREGISTERED'

      throw new GraphQLError('User not registered. Sign up to continue.', {
        extensions: {
          code: 'UNREGISTERED',
        },
      });
    }

    let array = []
    if (user.timeEstimates.length > 0) array = [...user.timeEstimates]

    const timeEstimate = await new this({ ...timeObject }).save()

    array.push(timeEstimate.id)
    newEstimate = timeEstimate

    user.timeEstimates = array
    user.save()

    TIME = timeEstimate.id

    // // Convert totalEstimate to a number
    // const totalEstimateNumber = Number(estimate.totalEstimate)

    // // Format the number as currency with commas
    // const formattedTotalEstimate = totalEstimateNumber.toLocaleString('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    // })

    if (emailDestination) {

      const params = timeEstimateTemplate(
        newEstimate.id,
        user.id,
        process.env.ASSETS_URL,
        emailDestination.toLowerCase(),
        estimate.totalEstimate,
        estimate.notes,
        estimate.businessName,
        estimate.businessAddress,
        estimate.businessEmail,
        estimate.businessPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.clientPhone,
        estimate.clientName
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }

    if (timeObject.clientEmail) {
      const params = timeEstimateTemplate(
        newEstimate.id,
        user.id,
        process.env.ASSETS_URL,
        timeObject.clientEmail.toLowerCase(),
        estimate.totalEstimate,
        estimate.notes,
        estimate.businessName,
        estimate.businessAddress,
        estimate.businessEmail,
        estimate.businessPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.clientPhone,
        estimate.clientName
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }


    return {
      id: newEstimate.id,
      message: message,
      timeEstimate: timeEstimate
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError('Invalid password', {
      extensions: {
        code: CODE,
      }
    })
  }

}

Time.statics.noPasswordSignup = async function (email, estimate) {

  let CODE
  let newMembershipID = generateRandomNumber()
  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  let userObject = new Object({
    email: email.toLowerCase(),
    membershipID: newMembershipID,
    verificationCode: pin,
    codeExpiration: expirationDate.toISOString(),
    estimatorName: estimate.estimatorName,
    businessName: estimate.businessName,
    businessEmail: estimate.businessEmail,
    businessPhone: estimate.businessPhone
  })

  try {

    const User = require('../models/user')

    const checkEmail = await User.findOne({ email: email })

    if (checkEmail) {

      CODE = 'ACCOUNT_EXISTS'

      throw new GraphQLError(`User with that email already exists. Login to continue`, {
        extensions: {
          code: CODE,
        },
      });
    }

    const user = await new User({ ...userObject }).save()

    const params = noPasswordEmailVerification(email.toLowerCase(), pin)
    const command = new SendEmailCommand(params)
    const response = await ses.send(command)

    console.log(response)

    return { message: `Please enter the verification code sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE,
      },
    });
  }

}

Time.statics.sendTimeEstimate = async function (emailDestination, estimate) {

  try {

    // // Convert totalEstimate to a number
    // const totalEstimateNumber = Number(estimate.totalEstimate)

    // // Format the number as currency with commas
    // const formattedTotalEstimate = totalEstimateNumber.toLocaleString('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    // })

    if (emailDestination) {

      const params = timeEstimateTemplate(
        estimate.id,
        estimate.id,
        process.env.ASSETS_URL,
        emailDestination.toLowerCase(),
        estimate.totalEstimate,
        estimate.notes,
        estimate.businessName,
        estimate.businessAddress,
        estimate.businessEmail,
        estimate.businessPhone,
        estimate.clientEmail,
        estimate.clientPropertyAddress,
        estimate.clientPhone,
        estimate.clientName
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }

    return {
      message: 'Estimate sent'
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError('Internal Error', {
      extensions: {
        code: CODE,
      }
    })
  }

}

module.exports = mongoose.model('time', Time)
