require('dotenv').config()
const { GraphQLError } = require('graphql')
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const S3 = new aws.S3();

//// AUTHENTICATION
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;
const jwtMethod = require('jsonwebtoken')

//// SES
// const config = {
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   },
//   region: process.env.AWS_REGION
// }

// const ses = new SESClient(config)

//// STRIPE
const stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_LIVE_SECRET_KEY)

//// HELPERS
const { generateRandomNumber, generatePassword, generateSixDigitPin, generateEightDigitNumber } = require('../helpers/main')
const { calculateInteriorEstimate, calculateExteriorEstimate, calculateCabinetsEstimate, calculateInteriorGallonsCost, calculateExteriorGallonsCost, calculateCabinetsGallonsCost, totalEstimate, totalEstimateAdjusted, totalEstimateAdjustedNewEstimate } = require('../helpers/calculation')

//// TEMPLATES
const { verifyEmail } = require('../templates/verifyEmail')
const { verifyEmailTwo } = require('../templates/verifyEmailTwo')
const { tempPassword } = require('../templates/tempPassword')
const { forgotPassword } = require('../templates/forgotPassword')
const { contactMiddler } = require('../templates/contactMiddler')
const { sendEstimateShort } = require('../templates/sendEstimateShort')
const { sendEstimateMinimal } = require('../templates/sendEstimateMinimal')
const { sendEstimateQuick } = require('../templates/sendEstimateQuick')
const { tempPasswordTwo } = require('../templates/tempPasswordTwo')
const { noPasswordEmailVerification } = require('../templates/noPasswordEmailVerification')
const { sendEstimateClient } = require('../templates/sendEstimateClient')
const { sendEstimateDetailed } = require('../templates/sendEstimateDetailed')
const { saveEstimate } = require('../templates/saveEstimate')

//// DATA MODELS
const Client = require('../models/client')

const UserSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  membershipID: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String
  },
  codeExpiration: {
    type: String,
    default: () => new Date().toISOString()
  },
  emailVerifiedStamp: {
    type: String,
    default: () => new Date().toISOString()
  },
  role: {
    type: String,
    default: "user"
  },
  businessLogo: {
    type: String,
    default: ''
  },
  businessName: {
    type: String,
    default: ''
  },
  estimatorName: {
    type: String,
    default: ''
  },
  businessAddress: {
    type: String,
    default: ''
  },
  businessPhone: {
    type: String,
    default: ''
  },
  businessEmail: {
    type: String,
    default: ''
  },
  businessWebsite: {
    type: String,
    default: ''
  },
  businessLicenseNumber: {
    type: String,
    default: ''
  },
  businessInstagram: {
    type: String,
    default: ''
  },
  clients: [{
    type: Schema.Types.ObjectId, ref: 'client'
  }],
  subscribed: {
    type: Boolean,
    default: false
  },
  customerID: {
    type: String,
    default: ''
  },
  subscriptionID: {
    type: String,
    default: ''
  },
  invoices: {
    type: Array,
    default: []
  },
  subscribedAt: {
    type: String,
    default: ''
  },
  currentPeriodStart: {
    type: String,
    default: ''
  },
  currentPeriodEnd: {
    type: String,
    default: ''
  },
  payments: [{
    type: Schema.Types.ObjectId, ref: 'payment'
  }],
  paymentPlan: {
    type: String,
    default: ''
  },
  codes: {
    type: Array,
    default: []
  },
  timeEstimates: [{
    type: Schema.Types.ObjectId, ref: 'time'
  }],
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  }
}, { versionKey: 'version' });

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next()
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function (tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb)
}

UserSchema.statics.signup = async function (firstName, lastName, email, password) {

  let newMembershipID = generateRandomNumber()
  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  let object = new Object({
    firstName: firstName,
    lastName: lastName,
    email: email.toLowerCase(),
    password: password,
    membershipID: newMembershipID,
    verificationCode: pin,
    codeExpiration: expirationDate.toISOString()
  })

  for (let key in object) { if (!object[key]) delete object[key] }

  try {

    const checkEmail = await this.findOne({ email: email })

    if (checkEmail) {
      throw new GraphQLError(`User with that email already exists. Login to continue`, {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const user = await new this({ ...object }).save()

    const params = verifyEmail(email.toLowerCase(), firstName, lastName, pin)
    const command = new SendEmailCommand(params)
    // const response = await ses.send(command)

    console.log(response)

    return { message: `Enter the verification code we sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

UserSchema.statics.noPasswordSignup = async function (email, estimate) {

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
    businessAddress: estimate.businessAddress,
    businessLicenseNumber: estimate.businessLicenseNumber,
    businessEmail: estimate.businessEmail,
    businessPhone: estimate.businessPhone
  })

  try {

    const checkEmail = await this.findOne({ email: email })

    if (checkEmail) {

      CODE = 'ACCOUNT_EXISTS'

      throw new GraphQLError(`User with that email already exists. Login to continue`, {
        extensions: {
          code: CODE,
        },
      });
    }

    const user = await new this({ ...userObject }).save()

    const params = noPasswordEmailVerification(email.toLowerCase(), pin)
    const command = new SendEmailCommand(params)
    // const response = await ses.send(command)

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

UserSchema.statics.firstEstimate = async function (email, estimate) {

  let CODE = 'INTERNAL_SERVER_ERROR'
  let CLIENT
  let newMembershipID = generateRandomNumber()
  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  let userObject = {
    email: email.toLowerCase(),
    membershipID: newMembershipID,
    verificationCode: pin,
    codeExpiration: expirationDate.toISOString(),
    businessName: estimate.businessName,
    estimatorName: estimate.estimatorName,
    businessAddress: estimate.businessAddress,
    businessPhone: estimate.businessPhone,
    businessEmail: estimate.businessEmail,
    businessWebsite: estimate.businessWebsite,
    businessLicenseNumber: estimate.businessLicenseNumber,
    businessInstagram: estimate.businessInstagram
  }

  let clientObject = {
    clientName: estimate.clientName,
    clientPhone: estimate.clientPhone,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientEmail: estimate.clientEmail,
    clientZipCode: estimate.clientZipCode,
    interiorSquareFeet: estimate.interiorSquareFeet,
    interiorCondition: estimate.interiorCondition,
    interiorDetail: estimate.interiorDetail,
    interiorItems: estimate.interiorItems,
    interiorIndividualItems: estimate.interiorIndividualItems,
    interiorEstimate: await calculateInteriorEstimate(estimate),
    interiorGallons: calculateInteriorGallonsCost(estimate).gallons,
    interiorGallonsCost: calculateInteriorGallonsCost(estimate).gallonsCost,
    interiorGallonsItems: calculateInteriorGallonsCost(estimate).gallonsRequired,
    doorsAndDrawers: estimate.doorsAndDrawers,
    insideCabinet: estimate.insideCabinet,
    cabinetCondition: estimate.cabinetCondition,
    cabinetDetail: estimate.cabinetDetail,
    cabinetEstimate: await calculateCabinetsEstimate(estimate),
    cabinetGallons: calculateCabinetsGallonsCost(estimate).gallons,
    cabinetGallonsCost: calculateCabinetsGallonsCost(estimate).gallonsCost,
    exteriorSquareFeet: estimate.exteriorSquareFeet,
    exteriorCondition: estimate.exteriorCondition,
    exteriorDetail: estimate.exteriorDetail,
    exteriorItems: estimate.exteriorItems,
    exteriorIndividualItems: estimate.exteriorIndividualItems,
    exteriorEstimate: await calculateExteriorEstimate(estimate),
    exteriorGallons: calculateExteriorGallonsCost(estimate).gallons,
    exteriorGallonsCost: calculateExteriorGallonsCost(estimate).gallonsCost,
    exteriorGallonsItems: calculateExteriorGallonsCost(estimate).gallonsRequired,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    paintBrand: estimate.paintBrand,
    paintQuality: estimate.paintQuality,
    warranty: estimate.warranty,
    payments: estimate.payments,
    deposit: estimate.deposit,
    depositType: estimate.depositType,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths
  }

  try {

    const checkEmail = await this.findOne({ email: email.toLowerCase() })

    if (checkEmail) {

      let array = []
      if (checkEmail.clients.length > 0) array = [...checkEmail.clients]

      const client = await new Client({ ...clientObject }).save()
      array.push(client.id)

      checkEmail.clients = array
      checkEmail.save()

      CODE = 'ACCOUNT_EXISTS'
      CLIENT = client.id

      throw new GraphQLError(`User with that email already exists, login to continue`, {
        extensions: {
          code: CODE,
          client: CLIENT
        },
      })

    }

    const client = await new Client({ ...clientObject }).save()

    let array = []
    array.push(client.id)

    userObject.clients = array

    const user = await new this({ ...userObject }).save()

    const params = verifyEmail(email.toLowerCase(), estimate.estimatorName ? estimate.estimatorName : `${user.firstName} ${user.lastName}`, estimate.estimatorName ? null : user.lastName, pin)
    const command = new SendEmailCommand(params)
    // const response = await ses.send(command)


    return { message: `Enter the verification code we sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE,
        client: CLIENT
      },
    })
  }

}

UserSchema.statics.verifyEmail = async function (checkID, token) {

  let newTempPassword = generateSixDigitPin()

  try {

    let user

    const checkUser = await this.findById(checkID)

    if (checkUser.emailVerified) {
      throw new GraphQLError(`login`, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }

    if (!checkUser.emailVerified) jwtMethod.verify(token, process.env.JWT_SECRET_VERIFY)

    if (!checkUser.emailVerified) {

      user = await this.findById(checkID)
      user.emailVerified = true
      user.emailVerifiedStamp = new Date()
      if (!checkUser.password) user.password = newTempPassword

      user.save()

    }

    if (!checkUser.password) {

      const paramsPass = tempPasswordTwo(user.email, newTempPassword)
      const commandPass = new SendEmailCommand(paramsPass);
      // const responsePass = await ses.send(commandPass);

      console.log('PASSWORD', responsePass)

    }

    let userLoggedIn = new Object()
    userLoggedIn.id = checkID
    userLoggedIn.token = token
    userLoggedIn.username = user.estimatorName
    userLoggedIn.message = 'You are now verified, you will now be redirected to view your estimate'

    return userLoggedIn;

  } catch (error) {

    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });

  }

}

UserSchema.statics.pinEmailVerification = async function (pin, email) {

  let ERROR_CODE = 'INTERNAL_SERVER_ERROR'

  try {

    let checkUser = await this.findOne({ email: email.toLowerCase() })

    if (!checkUser) {
      throw new GraphQLError(`Account with email ${email} does not exist`, {
        extensions: {
          code: ERROR_CODE,
        },
      });
    }

    const currentTime = new Date()
    const expirationTime = new Date(checkUser.codeExpiration)

    if (currentTime > expirationTime) {
      console.log('Hello')
      throw new GraphQLError(`Verification code has expired, please submit a new one`, {
        extensions: {
          code: ERROR_CODE,
        },
      });
    }

    if (checkUser.emailVerified) {

      ERROR_CODE = 'ACCOUNT_EXISTS'

      throw new GraphQLError(`Email is already verified, login to continue`, {
        extensions: {
          code: ERROR_CODE,
        },
      });
    }

    if (checkUser.verificationCode !== pin.join('')) {
      throw new GraphQLError(`Invalid pin, request a new pin to continue`, {
        extensions: {
          code: ERROR_CODE,
        }
      })
    }

    if (!checkUser.emailVerified) {

      checkUser.emailVerified = true
      checkUser.emailVerifiedStamp = new Date()
      checkUser.save()

    }

    if (!checkUser.password) {

      const paramsPass = tempPasswordTwo(checkUser.email, checkUser.verificationCode)
      const commandPass = new SendEmailCommand(paramsPass)
      // const responsePass = await ses.send(commandPass)

      checkUser.password = checkUser.verificationCode
      checkUser.save()

      console.log('PASSWORD', responsePass)

    }

    const token = jwtMethod.sign({ id: checkUser._id, email: email }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '48hr', algorithm: 'HS256' })

    let userLoggedIn = new Object()
    userLoggedIn.id = checkUser._id
    userLoggedIn.token = token
    userLoggedIn.username = checkUser.estimatorName ? checkUser.estimatorName : `${checkUser.firstName} ${checkUser.lastName}`
    userLoggedIn.message = `Thank you for verifying your email. You now have full use of the most powerful estimating tool in the painting industry, helping painters make more money.`

    return userLoggedIn

  } catch (error) {

    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: ERROR_CODE,
      },
    });

  }

}

UserSchema.statics.sendVerificationEmail = async function (email, clientId) {

  try {

    const user = await this.findOne({ email: email.toLowerCase() })

    if (!user) {
      throw new GraphQLError('User does not have an account, please try signing up for free', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const tokenVerify = jwtMethod.sign({ id: user._id, email: email }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '48hr', algorithm: 'HS256' })

    const paramsVerify = verifyEmailTwo(email.toLowerCase(), user.estimatorName, 'https://middler.com', tokenVerify, clientId)
    const commandVerify = new SendEmailCommand(paramsVerify);
    // const responseVerify = await ses.send(commandVerify);

    console.log('VERIFY EMAIL', responseVerify)

    return { message: `Enter the verification code we sent to ${email}` }


  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

UserSchema.statics.newPinVerification = async function (email) {

  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  try {

    const checkUser = await this.findOne({ email: email.toLowerCase() })

    if (!checkUser) {
      throw new GraphQLError(`User with that email does not exist, sign up to continue`, {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    if (!checkUser.emailVerified) {

      checkUser.verificationCode = pin
      checkUser.codeExpiration = expirationDate
      checkUser.save()

    }

    const params = verifyEmail(email.toLowerCase(), checkUser.firstName ? checkUser.firstName : checkUser.estimatorName, checkUser.lastName, pin)
    const command = new SendEmailCommand(params)
    // const response = await ses.send(command)

    console.log(response)

    return { message: `Enter the verification code we sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}

UserSchema.statics.setPassword = async function (id, password) {
  try {

    const user = await this.findById(id)
    user.password = password
    user.save()

    return {
      message: `You have confirmed your password and you are now ready to login to your account.`,
      passwordCreated: true
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

UserSchema.statics.verifyPhone = async function (phone) {

  try {

  } catch (error) {
    console.error(error);
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

UserSchema.statics.login = async function (email, password) {

  let CODE = 'INTERNAL_SERVER_ERROR'

  try {

    let user

    if (email) {
      user = await this.findOne({ email: email.toLowerCase() })
    }

    if (!user) {

      CODE = 'UNREGISTERED'

      throw new GraphQLError('Email address entered is not registered. Sign up to continue.', {
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

      const token = jwtMethod.sign({ id: user._id, email: email }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '48hr', algorithm: 'HS256' })
      const { _id } = user

      let userLoggedIn = new Object()

      if (user.role == 'disabled') {
        console.log('ERROR DISABLED')

        CODE = 'DISABLED'

        throw new GraphQLError('Account is disabled', {
          extensions: {
            code: CODE,
          }
        })

      }

      userLoggedIn.id = _id
      userLoggedIn.token = token
      userLoggedIn.username = user.estimatorName ? user.estimatorName : `${user.firstName} ${user.lastName}`
      userLoggedIn.emailVerified = user.emailVerified
      userLoggedIn.message = 'Logged in'

      return userLoggedIn

    } else {

      CODE = 'FORBIDDEN'

      throw new GraphQLError('Invalid password', {
        extensions: {
          code: CODE,
        }
      })
    }
  } catch (error) {
    console.error(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE,
      }
    })
  }

}

UserSchema.statics.resetPassword = async function (id, password, token) {

  try {

    jwtMethod.verify(token, process.env.JWT_SECRET_ACTIVATE)

    const user = await User.findById(id)
    user.password = password
    await user.save()

    return { message: 'Password updated' }

  } catch (error) {
    console.log('ERROR', error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}

UserSchema.statics.updateLogo = async function (id, url) {

  try {

    const user = await User.findById(id)

    let location = user.businessLogo.split("/next-s3-uploads")[1]
    location = 'next-s3-uploads' + location

    let params = {
      Bucket: 'business-logos-middler',
      Key: location
    }

    S3.deleteObject(params, (err, data) => {
      console.log(err)
      if (err) return { message: err }
    });

    user.businessLogo = url
    user.save()

    return {
      message: 'Logo was uploaded',
      businessLogo: url
    }

  } catch (error) {
    console.log('ERROR', error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      }
    })
  }

}

UserSchema.statics.deletePendingLogo = async function (url) {

  try {

    let location = url.split("/next-s3-uploads")[1]
    location = 'next-s3-uploads' + location

    let params = {
      Bucket: 'business-logos-middler',
      Key: location
    }

    S3.deleteObject(params, (err, data) => {
      console.log(err)
      if (err) return { message: err }
    });

    return {
      message: 'Logo was uploaded',
      businessLogo: url
    }

  } catch (error) {
    console.log('ERROR', error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      }
    })
  }

}

UserSchema.statics.updateBusinessInformation = async function (id, businessName, estimatorName, businessAddress, businessPhone, businessEmail, businessWebsite, businessLicenseNumber, businessInstagram) {

  const object = new Object({
    businessName,
    estimatorName,
    businessAddress,
    businessPhone,
    businessEmail,
    businessWebsite,
    businessLicenseNumber,
    businessInstagram
  })

  try {

    const user = await this.findByIdAndUpdate(id, object, { new: true })

    return { message: 'Business info updated' }

  } catch (error) {
    console.log('ERROR', error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.updatePersonalInformation = async function (id, firstName, lastName, email, bio) {

  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  const object = new Object({
    firstName,
    lastName,
    email,
    bio
  })

  try {

    const checkUser = await this.findById(id)

    if (checkUser.email !== email) {

      const params = verifyEmail(email, firstName, lastName, pin)
      const command = new SendEmailCommand(params)
      // const response = await ses.send(command)

      checkUser.emailVerified = false
      checkUser.emailVerifiedStamp = new Date().toISOString()
      checkUser.codeExpiration = expirationDate
      checkUser.verificationCode = pin
      checkUser.save()

    }

    const user = await this.findByIdAndUpdate(id, object, { new: true })

    return { message: checkUser.email !== email ? `Enter the verification code we sent to ${email}. Session will expire in 15 mins` : 'Personal information updated' }

  } catch (error) {
    console.log('ERROR', error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.createEstimate = async function (id, estimate, token) {

  let clientObject = {
    clientName: estimate.clientName,
    clientPhone: estimate.clientPhone,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientEmail: estimate.clientEmail,
    clientZipCode: estimate.clientZipCode,
    interiorSquareFeet: estimate.interiorSquareFeet,
    interiorCondition: estimate.interiorCondition,
    interiorDetail: estimate.interiorDetail,
    interiorItems: estimate.interiorItems,
    interiorIndividualItems: estimate.interiorIndividualItems,
    interiorEstimate: calculateInteriorEstimate(estimate),
    interiorGallons: calculateInteriorGallonsCost(estimate).gallons,
    interiorGallonsCost: calculateInteriorGallonsCost(estimate).gallonsCost,
    interiorGallonsItems: calculateInteriorGallonsCost(estimate).gallonsRequired,
    doorsAndDrawers: estimate.doorsAndDrawers,
    insideCabinet: estimate.insideCabinet,
    cabinetCondition: estimate.cabinetCondition,
    cabinetDetail: estimate.cabinetDetail,
    cabinetEstimate: calculateCabinetsEstimate(estimate),
    cabinetGallons: calculateCabinetsGallonsCost(estimate).gallons,
    cabinetGallonsCost: calculateCabinetsGallonsCost(estimate).gallonsCost,
    exteriorSquareFeet: estimate.exteriorSquareFeet,
    exteriorCondition: estimate.exteriorCondition,
    exteriorDetail: estimate.exteriorDetail,
    exteriorItems: estimate.exteriorItems,
    exteriorIndividualItems: estimate.exteriorIndividualItems,
    exteriorEstimate: calculateExteriorEstimate(estimate),
    exteriorGallons: calculateExteriorGallonsCost(estimate).gallons,
    exteriorGallonsCost: calculateExteriorGallonsCost(estimate).gallonsCost,
    exteriorGallonsItems: calculateExteriorGallonsCost(estimate).gallonsRequired,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    paintBrand: estimate.paintBrand,
    paintQuality: estimate.paintQuality,
    warranty: estimate.warranty,
    payments: estimate.payments,
    deposit: estimate.deposit,
    depositType: estimate.depositType,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths
  }

  try {

    const checkUser = await this.findById(id)

    let array = []
    if (checkUser.clients.length > 0) array = [...checkUser.clients]

    const client = await new Client({ ...clientObject }).save()
    array.push(client.id)

    checkUser.clients = array
    checkUser.save()


    return {
      message: 'New estimate created',
      estimate: client
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

UserSchema.statics.setupClientSecret = async function (id, email, name, paymentPlan, code) {

  let orderID = generateEightDigitNumber()
  let customer

  try {

    const checkUser = await this.findById(id)

    const customers = await stripe.customers.list({
      email: email,
      limit: 1, // Limit to one customer to optimize performance
    })

    if (customers.data.length > 0) {

      const updatedCustomer = await stripe.customers.update(
        customers.data[0].id,
        {
          metadata: {
            userID: checkUser.id,
          },
        }
      )

      customer = updatedCustomer

    } else {

      const customerCreated = await stripe.customers.create({
        email: email,
        name: name,
        metadata: {
          userID: checkUser.id, // Store your order ID here
        },
      })

      customer = customerCreated

    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: paymentPlan == 'yearly'
          ?
          process.env.NODE_ENV === 'development' ? process.env.STRIPE_YEARLY_SUBSCRIPTION_TEST_ID : process.env.STRIPE_YEARLY_SUBSCRIPTION_LIVE_ID
          :
          process.env.NODE_ENV === 'development' ? process.env.STRIPE_MONTHLY_SUBSCRIPTION_TEST_ID : process.env.STRIPE_MONTHLY_SUBSCRIPTION_LIVE_ID
      }],
      metadata: {
        orderID: orderID, // Store your order ID here
        paymentPlan: paymentPlan,
        code: code
      },
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    return {
      message: 'customer and subscription created',
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      status: subscription.status,
      subscriptionID: subscription.id
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.forgotPassword = async function (email) {

  try {

    const user = await this.findOne({ email: email })

    if (!user) {
      throw new GraphQLError('User does not have an account', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const token = jwtMethod.sign({ id: user._id }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '1hr', algorithm: 'HS256' })

    const params = forgotPassword(email, 'https://middler.com', token)
    const command = new SendEmailCommand(params)
    // const response = await ses.send(command)

    return { message: `Reset password email sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.updatePassword = async function (newPassword, id, token) {

  try {

    jwtMethod.verify(token, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K')

    const user = await User.findById(id)

    const isSamePassword = await bcrypt.compare(newPassword, user.password)

    if (isSamePassword) {
      throw new GraphQLError('New password cannot be the same as the current password', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    user.password = newPassword
    await user.save()


    return { message: 'Password updated successfully' }


  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.contactMiddler = async function (email, message) {

  try {

    const params = contactMiddler(email, message)
    const command = new SendEmailCommand(params)
    // const response = await ses.send(command)

    console.log(response)

    return { message: `Inquiry sent` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

UserSchema.statics.changePassword = async function (id, currentPassword, newPassword) {

  try {

    const user = await User.findById(id)

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      throw new GraphQLError('Current password is incorrect', {
        extensions: {
          code: 'UNAUTHORIZED',
        },
      });
    }

    const isSamePassword = currentPassword === newPassword

    if (isSamePassword) {
      throw new GraphQLError('New password cannot be the same as the current password', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    user.password = newPassword
    await user.save()


    return { message: 'Password updated.' }


  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.disableAccount = async function (id) {

  try {

    const updatedUser = await User.updateOne({ _id: id }, // Find the user by their ID
      {
        $set: {
          role: 'disabled'
        }
      }
    )

    const user = await User.findById(id)
    const subscriptionID = user.subscriptionID

    const Payment = require('../models/payments')

    // Cancel the user's subscription
    const subscriptionCancellation = await Payment.cancelSubscription(subscriptionID)

    return { message: 'Account disabled' }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.activateAccount = async function (email, password) {

  let CODE = 'INTERNAL_SERVER_ERROR'

  try {

    let user

    if (email) {
      user = await this.findOne({ email: email })
    }

    if (!user) {

      CODE = 'UNREGISTERED'

      throw new GraphQLError('Email address entered is not registered. Sign up to continue.', {
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

      const token = jwtMethod.sign({ id: user._id, email: email }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '48hr', algorithm: 'HS256' })
      const { _id } = user

      let userLoggedIn = new Object()

      if (user.role == 'disabled') {
        const updatedUser = await User.updateOne({ _id: user.id }, // Find the user by their ID
          {
            $set: {
              role: 'user'
            }
          }
        )
      }

      userLoggedIn.id = _id
      userLoggedIn.token = token
      userLoggedIn.username = user.estimatorName ? user.estimatorName : `${user.firstName} ${user.lasstName}`
      userLoggedIn.emailVerified = user.emailVerified
      userLoggedIn.message = 'Logged in'

      return userLoggedIn

    } else {

      CODE = 'FORBIDDEN'

      throw new GraphQLError('Invalid password', {
        extensions: {
          code: CODE,
        }
      })
    }
  } catch (error) {
    console.error(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE,
      }
    })
  }

}

UserSchema.statics.quickEstimate = async function (emailDestination, recentClient, estimate) {

  let CLIENT
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
    businessLogo: estimate.businessLogo,
    estimatorName: estimate.estimatorName,
    businessAddress: estimate.businessAddress,
    businessPhone: estimate.businessPhone,
    businessEmail: estimate.businessEmail,
    businessWebsite: estimate.businessWebsite,
    businessLicenseNumber: estimate.businessLicenseNumber,
    businessInstagram: estimate.businessInstagram
  })

  let clientObject = {
    clientName: estimate.clientName,
    clientPhone: estimate.clientPhone,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientEmail: estimate.clientEmail,
    clientZipCode: estimate.clientZipCode,
    interiorSquareFeet: estimate.interiorSquareFeet,
    interiorCondition: estimate.interiorCondition,
    interiorDetail: estimate.interiorDetail,
    interiorItems: estimate.interiorItems,
    interiorIndividualItems: estimate.interiorIndividualItems,
    interiorEstimate: await calculateInteriorEstimate(estimate),
    interiorGallons: calculateInteriorGallonsCost(estimate).gallons,
    interiorGallonsCost: calculateInteriorGallonsCost(estimate).gallonsCost,
    interiorGallonsItems: calculateInteriorGallonsCost(estimate).gallonsRequired,
    doorsAndDrawers: estimate.doorsAndDrawers,
    insideCabinet: estimate.insideCabinet,
    cabinetCondition: estimate.cabinetCondition,
    cabinetDetail: estimate.cabinetDetail,
    cabinetEstimate: await calculateCabinetsEstimate(estimate),
    cabinetGallons: calculateCabinetsGallonsCost(estimate).gallons,
    cabinetGallonsCost: calculateCabinetsGallonsCost(estimate).gallonsCost,
    exteriorSquareFeet: estimate.exteriorSquareFeet,
    exteriorCondition: estimate.exteriorCondition,
    exteriorDetail: estimate.exteriorDetail,
    exteriorItems: estimate.exteriorItems,
    exteriorIndividualItems: estimate.exteriorIndividualItems,
    exteriorEstimate: await calculateExteriorEstimate(estimate),
    exteriorGallons: calculateExteriorGallonsCost(estimate).gallons,
    exteriorGallonsCost: calculateExteriorGallonsCost(estimate).gallonsCost,
    exteriorGallonsItems: calculateExteriorGallonsCost(estimate).gallonsRequired,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    paintBrand: estimate.paintBrand,
    paintQuality: estimate.paintQuality,
    warranty: estimate.warranty,
    payments: estimate.payments,
    deposit: estimate.deposit,
    depositType: estimate.depositType,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    adjustment: estimate.adjustment
  }

  try {

    let user = await this.findOne({ email: emailDestination.toLowerCase() })

    if (user) {

      if (!recentClient) {

        let array = []
        if (user.clients.length > 0) array = [...user.clients]

        const client = await new Client({ ...clientObject }).save()

        if (clientObject.adjustment) {

          const foundEstimate = await Client.findById(client.id)

          let adjustmentArray = [...foundEstimate.adjustments]
          let newAdjustment = new Object()
          newAdjustment.interiorAdjusted = estimate.interiorAdjusted.replace('$', '')
          newAdjustment.cabinetAdjusted = estimate.cabinetAdjusted.replace('$', '')
          newAdjustment.exteriorAdjusted = estimate.exteriorAdjusted.replace('$', '')
          newAdjustment.dateAdjusted = new Date().toISOString()
          adjustmentArray.push(newAdjustment)

          foundEstimate.adjustment = clientObject.adjustment
          foundEstimate.adjustments = adjustmentArray
          foundEstimate.save()

        }

        array.push(client.id)
        newEstimate = client

        user.clients = array

      }

      user.businessName = estimate.businessName,
        // user.businessLogo                               = estimate.businessLogo,
        user.estimatorName = estimate.estimatorName,
        // user.businessAddress                            = estimate.businessAddress,
        user.businessPhone = estimate.businessPhone,
        // user.businessEmail                              = estimate.businessEmail,
        // user.businessWebsite                            = estimate.businessWebsite,
        // user.businessLicenseNumber                      = estimate.businessLicenseNumber,
        // user.businessInstagram                          = estimate.businessInstagram
        user.save()

      CODE = 'ACCOUNT_EXISTS'

    } else {

      if (!recentClient) {

        const client = await new Client({ ...clientObject }).save()

        if (clientObject.adjustment) {

          const foundEstimate = await Client.findById(client.id)

          let adjustmentArray = [...foundEstimate.adjustments]
          let newAdjustment = new Object()
          newAdjustment.interiorAdjusted = estimate.interiorAdjusted.replace('$', '')
          newAdjustment.cabinetAdjusted = estimate.cabinetAdjusted.replace('$', '')
          newAdjustment.exteriorAdjusted = estimate.exteriorAdjusted.replace('$', '')
          newAdjustment.dateAdjusted = new Date().toISOString()
          adjustmentArray.push(newAdjustment)

          foundEstimate.adjustment = clientObject.adjustment
          foundEstimate.adjustments = adjustmentArray
          foundEstimate.save()

        }

        newEstimate = client

        let array = []
        array.push(client.id)

        userObject.clients = array

      }

      user = await new this({ ...userObject }).save()

      const paramsPass = tempPasswordTwo(
        user.email,
        user.verificationCode
      )

      const commandPass = new SendEmailCommand(paramsPass)
      // const responsePass = await ses.send(commandPass)

      message = 'Estimates sent as well as temporary password email'

      console.log('PASSWORD', responsePass)

    }

    if (!estimate.businessName && !estimate.businessEmail) format = 'minimal'

    if (format == 'short' && emailDestination) {

      const params = sendEstimateQuick(
        recentClient ? recentClient : newEstimate.id,
        user.id,
        'https://middler.com',
        emailDestination.toLowerCase(),
        userObject.businessLogo ? userObject.businessLogo : 'https://middler.com/assets/templogo.png',
        userObject.businessName,
        userObject.businessAddress,
        userObject.estimatorName,
        userObject.businessEmail,
        userObject.businessPhone ? userObject.businessPhone : '',
        estimate.adjustment
          ?
          estimate.interiorAdjusted.replace('$', '')
          :
          clientObject.interiorEstimate
            ?
            `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.exteriorAdjusted.replace('$', '')
          :
          clientObject.exteriorEstimate
            ?
            `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.cabinetAdjusted.replace('$', '')
          :
          clientObject.cabinetEstimate
            ?
            `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ? `${totalEstimateAdjustedNewEstimate(estimate)}`
          : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        clientObject.clientName,
        clientObject.clientPhone ? clientObject.clientPhone : '',
        clientObject.clientEmail,
        clientObject.clientPropertyAddress,
        clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
        clientObject.interiorSquareFeet,
        clientObject.interiorItems,
        clientObject.interiorIndividualItems,
        clientObject.doorsAndDrawers,
        clientObject.exteriorSquareFeet,
        clientObject.exteriorItems,
        clientObject.exteriorIndividualItems,
        clientObject.paintBrand,
        clientObject.paintQuality,
        clientObject.warranty,
        clientObject.payments,
        clientObject.depositType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
        clientObject.painterTapeRolls,
        clientObject.plasticRolls,
        clientObject.dropCloths
      )
      const command = new SendEmailCommand(params)
      // const response = await ses.send(command)

      console.log(response)
    }

    if (format == 'short' && clientObject.clientEmail) {
      const params = sendEstimateQuick(
        recentClient ? recentClient : newEstimate.id,
        user.id,
        'https://middler.com',
        clientObject.clientEmail,
        userObject.businessLogo ? userObject.businessLogo : 'https://middler.com/assets/templogo.png',
        userObject.businessName,
        userObject.businessAddress,
        userObject.estimatorName,
        userObject.businessEmail,
        userObject.businessPhone ? userObject.businessPhone : '',
        estimate.adjustment
          ?
          estimate.interiorAdjusted.replace('$', '')
          :
          clientObject.interiorEstimate
            ?
            `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.exteriorAdjusted.replace('$', '')
          :
          clientObject.exteriorEstimate
            ?
            `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.cabinetAdjusted.replace('$', '')
          :
          clientObject.cabinetEstimate
            ?
            `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ? `${totalEstimateAdjustedNewEstimate(estimate)}`
          : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        clientObject.clientName,
        clientObject.clientPhone ? clientObject.clientPhone : '',
        clientObject.clientEmail,
        clientObject.clientPropertyAddress,
        clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
        clientObject.interiorSquareFeet,
        clientObject.interiorItems,
        clientObject.interiorIndividualItems,
        clientObject.doorsAndDrawers,
        clientObject.exteriorSquareFeet,
        clientObject.exteriorItems,
        clientObject.exteriorIndividualItems,
        clientObject.paintBrand,
        clientObject.paintQuality,
        clientObject.warranty,
        clientObject.payments,
        clientObject.depositType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
        clientObject.painterTapeRolls,
        clientObject.plasticRolls,
        clientObject.dropCloths
      )
      const command = new SendEmailCommand(params)
      // const response = await ses.send(command)

      console.log(response)
    }

    if (format == 'minimal' && emailDestination) {
      const params = sendEstimateMinimal(
        newEstimate.id,
        user.id,
        'https://middler.com',
        emailDestination.toLowerCase(),
        userObject.businessLogo,
        userObject.businessName,
        userObject.estimatorName,
        userObject.businessEmail,
        userObject.businessPhone ? userObject.businessPhone : '',
        estimate.adjustment
          ?
          estimate.interiorAdjusted.replace('$', '')
          :
          clientObject.interiorEstimate
            ?
            `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.exteriorAdjusted.replace('$', '')
          :
          clientObject.exteriorEstimate
            ?
            `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.cabinetAdjusted.replace('$', '')
          :
          clientObject.cabinetEstimate
            ?
            `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ? `${totalEstimateAdjustedNewEstimate(estimate)}`
          : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        clientObject.clientName,
        clientObject.clientPhone ? clientObject.clientPhone : '',
        clientObject.clientEmail,
        clientObject.clientPropertyAddress,
        clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
        clientObject.interiorSquareFeet,
        clientObject.interiorItems,
        clientObject.interiorIndividualItems,
        clientObject.doorsAndDrawers,
        clientObject.exteriorSquareFeet,
        clientObject.exteriorItems,
        clientObject.exteriorIndividualItems,
        clientObject.paintBrand,
        clientObject.paintQuality,
        clientObject.warranty,
        clientObject.payments,
        clientObject.depositType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
        clientObject.painterTapeRolls,
        clientObject.plasticRolls,
        clientObject.dropCloths
      )
      const command = new SendEmailCommand(params)
      // const response = await ses.send(command)

      console.log(response)
    }

    if (format == 'minimal' && clientObject.clientEmail) {
      const params = sendEstimateMinimal(
        newEstimate.id,
        user.id,
        'https://middler.com',
        clientObject.clientEmail,
        userObject.businessLogo,
        userObject.businessName,
        userObject.estimatorName,
        userObject.businessEmail,
        userObject.businessPhone ? userObject.businessPhone : '',
        estimate.adjustment
          ?
          estimate.interiorAdjusted.replace('$', '')
          :
          clientObject.interiorEstimate
            ?
            `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.exteriorAdjusted.replace('$', '')
          :
          clientObject.exteriorEstimate
            ?
            `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.cabinetAdjusted.replace('$', '')
          :
          clientObject.cabinetEstimate
            ?
            `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ? `${totalEstimateAdjustedNewEstimate(estimate)}`
          : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        clientObject.clientName,
        clientObject.clientPhone ? clientObject.clientPhone : '',
        clientObject.clientEmail,
        clientObject.clientPropertyAddress,
        clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
        clientObject.interiorSquareFeet,
        clientObject.interiorItems,
        clientObject.interiorIndividualItems,
        clientObject.doorsAndDrawers,
        clientObject.exteriorSquareFeet,
        clientObject.exteriorItems,
        clientObject.exteriorIndividualItems,
        clientObject.paintBrand,
        clientObject.paintQuality,
        clientObject.warranty,
        clientObject.payments,
        clientObject.deposityType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
        clientObject.painterTapeRolls,
        clientObject.plasticRolls,
        clientObject.dropCloths
      )
      const command = new SendEmailCommand(params)
      // const response = await ses.send(command)

      console.log(response)
    }

    const token = jwtMethod.sign({ id: user._id, email: user.email }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '24hr', algorithm: 'HS256' })

    return {
      id: recentClient ? recentClient : newEstimate.id,
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

UserSchema.statics.sqftEstimateLogin = async function (email, password, estimate) {

  let CLIENT
  let newEstimate
  let format = 'short'
  let CODE = 'INTERNAL_SERVER_ERROR'

  let clientObject = {
    adjustment: estimate.adjustment,
    businessName: estimate.businessName,
    businessLogo: estimate.businessLogo,
    estimatorName: estimate.estimatorName,
    businessAddress: estimate.businessAddress,
    businessPhone: estimate.businessPhone,
    businessEmail: estimate.businessEmail,
    businessWebsite: estimate.businessWebsite,
    businessLicenseNumber: estimate.businessLicenseNumber,
    businessInstagram: estimate.businessInstagram,
    clientName: estimate.clientName,
    clientPhone: estimate.clientPhone,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientEmail: estimate.clientEmail,
    clientZipCode: estimate.clientZipCode,
    interiorSquareFeet: estimate.interiorSquareFeet,
    interiorCondition: estimate.interiorCondition,
    interiorDetail: estimate.interiorDetail,
    interiorItems: estimate.interiorItems,
    interiorIndividualItems: estimate.interiorIndividualItems,
    interiorEstimate: await calculateInteriorEstimate(estimate),
    interiorGallons: calculateInteriorGallonsCost(estimate).gallons,
    interiorGallonsCost: calculateInteriorGallonsCost(estimate).gallonsCost,
    interiorGallonsItems: calculateInteriorGallonsCost(estimate).gallonsRequired,
    doorsAndDrawers: estimate.doorsAndDrawers,
    insideCabinet: estimate.insideCabinet,
    cabinetCondition: estimate.cabinetCondition,
    cabinetDetail: estimate.cabinetDetail,
    cabinetEstimate: await calculateCabinetsEstimate(estimate),
    cabinetGallons: calculateCabinetsGallonsCost(estimate).gallons,
    cabinetGallonsCost: calculateCabinetsGallonsCost(estimate).gallonsCost,
    exteriorSquareFeet: estimate.exteriorSquareFeet,
    exteriorCondition: estimate.exteriorCondition,
    exteriorDetail: estimate.exteriorDetail,
    exteriorItems: estimate.exteriorItems,
    exteriorIndividualItems: estimate.exteriorIndividualItems,
    exteriorEstimate: await calculateExteriorEstimate(estimate),
    exteriorGallons: calculateExteriorGallonsCost(estimate).gallons,
    exteriorGallonsCost: calculateExteriorGallonsCost(estimate).gallonsCost,
    exteriorGallonsItems: calculateExteriorGallonsCost(estimate).gallonsRequired,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    paintBrand: estimate.paintBrand,
    paintQuality: estimate.paintQuality,
    warranty: estimate.warranty,
    payments: estimate.payments,
    deposit: estimate.deposit,
    depositType: estimate.depositType,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    notesAndDisclosure: estimate.notesAndDisclosure
  }

  try {

    const Client = require('../models/client')

    let user

    if (email) {
      user = await this.findOne({ email: email.toLowerCase() })
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
      if (user.clients.length > 0) array = [...user.clients]

      const client = await new Client({ ...clientObject }).save()

      array.push(client.id)
      newEstimate = client

      user.clients = array
      user.save()

      // if(format == 'short' && email){

      //   const params    = sendEstimateQuick(
      //     newEstimate.id,
      //     user.id,
      //     'https://middler.com',
      //     email.toLowerCase(),
      //     user.businessLogo ? user.businessLogo : 'https://middler.com/assets/templogo.png',
      //     user.businessName,
      //     user.businessAddress,
      //     user.estimatorName,
      //     user.businessEmail,
      //     user.businessPhone ? user.businessPhone : '',
      //     estimate.adjustment
      //       ?
      //         estimate.interiorAdjusted.replace('$', '')
      //       :
      //       clientObject.interiorEstimate
      //         ?
      //         `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      //         :
      //         '0'
      //       ,
      //     clientObject.adjustment
      //       ?
      //         estimate.exteriorAdjusted.replace('$', '')
      //       :
      //       clientObject.exteriorEstimate
      //         ?
      //         `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      //         :
      //         '0'
      //       ,
      //     clientObject.adjustment
      //       ?
      //         estimate.cabinetAdjusted.replace('$', '')
      //       :
      //         clientObject.cabinetEstimate
      //         ?
      //         `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      //         :
      //         '0'
      //       ,
      //     clientObject.adjustment
      //       ? `${totalEstimateAdjustedNewEstimate(estimate)}`
      //       : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      //     clientObject.clientName,
      //     clientObject.clientPhone ? clientObject.clientPhone : '',
      //     clientObject.clientEmail,
      //     clientObject.clientPropertyAddress,
      //     clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
      //     clientObject.interiorSquareFeet,
      //     clientObject.interiorItems,
      //     clientObject.interiorIndividualItems,
      //     clientObject.doorsAndDrawers,
      //     clientObject.exteriorSquareFeet,
      //     clientObject.exteriorItems,
      //     clientObject.exteriorIndividualItems,
      //     clientObject.paintBrand,
      //     clientObject.paintQuality,
      //     clientObject.warranty,
      //     clientObject.payments,
      //     clientObject.depositType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
      //     clientObject.painterTapeRolls,
      //     clientObject.plasticRolls,
      //     clientObject.dropCloths
      //   )
      //   const command   = new SendEmailCommand(params)
      //   const response  = await ses.send(command)

      //   console.log(response)
      // }

      // if(format == 'short' && clientObject.clientEmail){
      //   const params    = sendEstimateQuick(
      //     newEstimate.id,
      //     user.id,
      //     'https://middler.com',
      //     clientObject.clientEmail,
      //     user.businessLogo ? user.businessLogo : 'https://middler.com/assets/templogo.png',
      //     user.businessName,
      //     user.businessAddress,
      //     user.estimatorName,
      //     user.businessEmail,
      //     user.businessPhone ? user.businessPhone : '',
      //     estimate.adjustment
      //       ?
      //         estimate.interiorAdjusted.replace('$', '')
      //       :
      //       clientObject.interiorEstimate
      //         ?
      //         `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      //         :
      //         '0'
      //       ,
      //     clientObject.adjustment
      //       ?
      //         estimate.exteriorAdjusted.replace('$', '')
      //       :
      //       clientObject.exteriorEstimate
      //         ?
      //         `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      //         :
      //         '0'
      //       ,
      //     clientObject.adjustment
      //       ?
      //         estimate.cabinetAdjusted.replace('$', '')
      //       :
      //         clientObject.cabinetEstimate
      //         ?
      //         `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      //         :
      //         '0'
      //       ,
      //     clientObject.adjustment
      //       ? `${totalEstimateAdjustedNewEstimate(estimate)}`
      //       : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      //     clientObject.clientName,
      //     clientObject.clientPhone ? clientObject.clientPhone : '',
      //     clientObject.clientEmail,
      //     clientObject.clientPropertyAddress,
      //     clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
      //     clientObject.interiorSquareFeet,
      //     clientObject.interiorItems,
      //     clientObject.interiorIndividualItems,
      //     clientObject.doorsAndDrawers,
      //     clientObject.exteriorSquareFeet,
      //     clientObject.exteriorItems,
      //     clientObject.exteriorIndividualItems,
      //     clientObject.paintBrand,
      //     clientObject.paintQuality,
      //     clientObject.warranty,
      //     clientObject.payments,
      //     clientObject.depositType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
      //     clientObject.painterTapeRolls,
      //     clientObject.plasticRolls,
      //     clientObject.dropCloths
      //   )
      //   const command   = new SendEmailCommand(params)
      //   const response  = await ses.send(command)

      //   console.log(response)
      // }

      const token = jwtMethod.sign({ id: user._id, email: email.toLowerCase() }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '24hr', algorithm: 'HS256' })


      return {
        id: newEstimate.id,
        token: token,
        username: user.estimatorName ? user.estimatorName : `${user.firstName} ${user.lastName}`,
        userID: user._id,
        emailVerified: user.emailVerified,
        message: 'Estimates sent and saved'
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

UserSchema.statics.dashboardQuickEstimate = async function (id, estimate) {

  let CLIENT
  let format = 'short'
  let CODE = 'INTERNAL_SERVER_ERROR'

  let clientObject = {
    adjustment: estimate.adjustment,
    businessName: estimate.businessName,
    businessLogo: estimate.businessLogo,
    estimatorName: estimate.estimatorName,
    businessAddress: estimate.businessAddress,
    businessPhone: estimate.businessPhone,
    businessEmail: estimate.businessEmail,
    businessWebsite: estimate.businessWebsite,
    businessLicenseNumber: estimate.businessLicenseNumber,
    businessInstagram: estimate.businessInstagram,
    clientName: estimate.clientName,
    clientPhone: estimate.clientPhone,
    clientPropertyAddress: estimate.clientPropertyAddress,
    clientEmail: estimate.clientEmail,
    clientZipCode: estimate.clientZipCode,
    interiorSquareFeet: estimate.interiorSquareFeet,
    interiorCondition: estimate.interiorCondition,
    interiorDetail: estimate.interiorDetail,
    interiorItems: estimate.interiorItems,
    interiorIndividualItems: estimate.interiorIndividualItems,
    interiorEstimate: await calculateInteriorEstimate(estimate),
    interiorGallons: calculateInteriorGallonsCost(estimate).gallons,
    interiorGallonsCost: calculateInteriorGallonsCost(estimate).gallonsCost,
    interiorGallonsItems: calculateInteriorGallonsCost(estimate).gallonsRequired,
    doorsAndDrawers: estimate.doorsAndDrawers,
    insideCabinet: estimate.insideCabinet,
    cabinetCondition: estimate.cabinetCondition,
    cabinetDetail: estimate.cabinetDetail,
    cabinetEstimate: await calculateCabinetsEstimate(estimate),
    cabinetGallons: calculateCabinetsGallonsCost(estimate).gallons,
    cabinetGallonsCost: calculateCabinetsGallonsCost(estimate).gallonsCost,
    exteriorSquareFeet: estimate.exteriorSquareFeet,
    exteriorCondition: estimate.exteriorCondition,
    exteriorDetail: estimate.exteriorDetail,
    exteriorItems: estimate.exteriorItems,
    exteriorIndividualItems: estimate.exteriorIndividualItems,
    exteriorEstimate: await calculateExteriorEstimate(estimate),
    exteriorGallons: calculateExteriorGallonsCost(estimate).gallons,
    exteriorGallonsCost: calculateExteriorGallonsCost(estimate).gallonsCost,
    exteriorGallonsItems: calculateExteriorGallonsCost(estimate).gallonsRequired,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    paintBrand: estimate.paintBrand,
    paintQuality: estimate.paintQuality,
    warranty: estimate.warranty,
    payments: estimate.payments,
    deposit: estimate.deposit,
    depositType: estimate.depositType,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    notesAndDisclosure: estimate.notesAndDisclosure
  }

  try {

    const checkUser = await this.findById(id)

    let array = []
    if (checkUser.clients.length > 0) array = [...checkUser.clients]

    CLIENT = await new Client({ ...clientObject }).save()
    array.push(CLIENT.id)

    if (clientObject.adjustment) {

      const foundEstimate = await Client.findById(CLIENT.id)

      let adjustmentArray = [...foundEstimate.adjustments]
      let newAdjustment = new Object()
      newAdjustment.interiorAdjusted = estimate.interiorAdjusted.replace('$', '')
      newAdjustment.cabinetAdjusted = estimate.cabinetAdjusted.replace('$', '')
      newAdjustment.exteriorAdjusted = estimate.exteriorAdjusted.replace('$', '')
      newAdjustment.dateAdjusted = new Date().toISOString()
      adjustmentArray.push(newAdjustment)

      foundEstimate.adjustment = clientObject.adjustment
      foundEstimate.adjustments = adjustmentArray
      foundEstimate.save()

    }

    checkUser.clients = array
    checkUser.save()

    if (!estimate.businessName && !estimate.businessEmail) format = 'minimal'

    if (format == 'short' && clientObject.clientEmail) {
      const params = sendEstimateQuick(
        CLIENT.id,
        id,
        'https://middler.com',
        clientObject.clientEmail,
        clientObject.businessLogo ? clientObject.businessLogo : 'https://middler.com/assets/templogo.png',
        clientObject.businessName,
        clientObject.businessAddress,
        clientObject.estimatorName,
        clientObject.businessEmail,
        clientObject.businessPhone ? clientObject.businessPhone : '',
        clientObject.adjustment
          ?
          estimate.interiorAdjusted.replace('$', '')
          :
          clientObject.interiorEstimate
            ?
            `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.exteriorAdjusted.replace('$', '')
          :
          clientObject.exteriorEstimate
            ?
            `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.cabinetAdjusted.replace('$', '')
          :
          clientObject.cabinetEstimate
            ?
            `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ? `${totalEstimateAdjustedNewEstimate(estimate)}`
          : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        clientObject.clientName,
        clientObject.clientPhone ? clientObject.clientPhone : '',
        clientObject.clientEmail,
        clientObject.clientPropertyAddress,
        clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
        clientObject.interiorSquareFeet,
        clientObject.interiorItems,
        clientObject.interiorIndividualItems,
        clientObject.doorsAndDrawers,
        clientObject.exteriorSquareFeet,
        clientObject.exteriorItems,
        clientObject.exteriorIndividualItems,
        clientObject.paintBrand,
        clientObject.paintQuality,
        clientObject.warranty,
        clientObject.payments,
        clientObject.depositType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
        clientObject.painterTapeRolls,
        clientObject.plasticRolls,
        clientObject.dropCloths
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }

    if (format == 'minimal' && clientObject.clientEmail) {
      const params = sendEstimateMinimal(
        CLIENT.id,
        id,
        'https://middler.com',
        clientObject.clientEmail,
        clientObject.businessLogo,
        clientObject.businessName,
        clientObject.estimatorName,
        clientObject.businessEmail,
        clientObject.businessPhone ? clientObject.businessPhone : '',
        estimate.adjustment
          ?
          estimate.interiorAdjusted.replace('$', '')
          :
          clientObject.interiorEstimate
            ?
            `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.exteriorAdjusted.replace('$', '')
          :
          clientObject.exteriorEstimate
            ?
            `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          estimate.cabinetAdjusted.replace('$', '')
          :
          clientObject.cabinetEstimate
            ?
            `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ? `${totalEstimateAdjustedNewEstimate(estimate)}`
          : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        clientObject.clientName,
        clientObject.clientPhone ? clientObject.clientPhone : '',
        clientObject.clientEmail,
        clientObject.clientPropertyAddress,
        clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
        clientObject.interiorSquareFeet,
        clientObject.interiorItems,
        clientObject.interiorIndividualItems,
        clientObject.doorsAndDrawers,
        clientObject.exteriorSquareFeet,
        clientObject.exteriorItems,
        clientObject.exteriorIndividualItems,
        clientObject.paintBrand,
        clientObject.paintQuality,
        clientObject.warranty,
        clientObject.payments,
        clientObject.deposityType == 'dollar' ? `$${clientObject.deposit}` : `${clientObject.deposit}%`,
        clientObject.painterTapeRolls,
        clientObject.plasticRolls,
        clientObject.dropCloths
      )
      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)
    }

    return {
      message: 'New estimate created',
      estimate: CLIENT
    }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE,
      },
    });
  }

}

UserSchema.statics.adminSignup = async function (firstName, lastName, email, password, key) {

  if (key !== process.env.ADMIN_KEY) {

    throw new GraphQLError(`Unauthorized access`, {
      extensions: {
        code: 'FORBIDDEN',
      },
    })

  }

  let newMembershipID = generateRandomNumber()

  let object = new Object({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    membershipID: newMembershipID,
    role: 'admin'
  })

  for (let key in object) { if (!object[key]) delete object[key] }

  try {

    const checkEmail = await this.findOne({ email: email })

    if (checkEmail) {

      checkEmail.role = 'admin'
      checkEmail.save()

      throw new GraphQLError(`User with that email already exists. Login to continue`, {
        extensions: {
          code: 'FORBIDDEN',
        },
      })
    }

    const user = await new this({ ...object }).save()

    return { message: `User with email ${email} created` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.adminLogin = async function (email, password) {

  let CODE = 'INTERNAL_SERVER_ERROR'

  try {

    let user

    if (email) {
      user = await this.findOne({ email: email })
    }

    if (!user) {

      CODE = 'UNREGISTERED'

      throw new GraphQLError('Email address entered is not registered. Sign up to continue.', {
        extensions: {
          code: 'UNREGISTERED',
        },
      })
    }

    if (user.role !== 'admin') {

      CODE = 'UNAUTHORIZED'

      throw new GraphQLError('Unauthorized access', {
        extensions: {
          code: 'UNAUTHORIZED',
        },
      })

    }

    const isMatch = await new Promise((resolve, reject) => {
      user.comparePassword(password, (err, match) => {
        if (err) {

          CODE = 'FORBIDDEN'

          reject(err)

        } else {
          resolve(match)
        }
      })
    })

    if (isMatch) {

      const token = jwtMethod.sign({ id: user._id, email: email }, process.env.JWT_SECRET_LOGIN, { expiresIn: '48hr', algorithm: 'HS256' })
      const { _id } = user

      let userLoggedIn = new Object()

      if (user.role == 'disabled') {
        console.log('ERROR DISABLED')

        CODE = 'DISABLED'

        throw new GraphQLError('Account is disabled', {
          extensions: {
            code: CODE,
          }
        })

      }

      userLoggedIn.id = _id
      userLoggedIn.token = token
      userLoggedIn.username = user.estimatorName ? user.estimatorName : `${user.firstName} ${user.lasstName}`
      userLoggedIn.message = 'Logged in'

      return userLoggedIn

    } else {

      CODE = 'FORBIDDEN'

      throw new GraphQLError('Invalid password', {
        extensions: {
          code: CODE,
        }
      })

    }

  } catch (error) {
    console.error(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE,
      }
    })
  }

}

UserSchema.statics.checkAccount = async function (email) {

  let CODE = 'INTERNAL_SERVER_ERROR'
  let newMembershipID = generateRandomNumber()
  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  let userObject = {
    email: email.toLowerCase(),
    membershipID: newMembershipID,
    verificationCode: pin,
    codeExpiration: expirationDate.toISOString()
  }

  try {

    const checkEmail = await this.findOne({ email: email.toLowerCase() })

    if (checkEmail) {

      CODE = 'ACCOUNT_EXISTS'

      throw new GraphQLError(`User with that email already exists, login to continue`, {
        extensions: {
          code: CODE
        }
      })

    }

    const user = await new this({ ...userObject }).save()

    const params = verifyEmail(email.toLowerCase(), 'user', user.lastName, pin)
    const command = new SendEmailCommand(params)
    const response = await ses.send(command)

    console.log(response)

    return { message: `Enter the verification code we sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE
      },
    })
  }

}

UserSchema.statics.forgotPasswordAdmin = async function (email) {

  try {

    const user = await this.findOne({ email: email })

    if (!user) {
      throw new GraphQLError('User does not have an account', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const token = jwtMethod.sign({ id: user._id }, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K', { expiresIn: '1hr', algorithm: 'HS256' })

    const params = forgotPassword(email, 'https://admin.middler.com', token)
    const command = new SendEmailCommand(params)
    const response = await ses.send(command)

    return { message: `Reset password email sent to ${email}` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.updatePasswordAdmin = async function (newPassword, id, token) {

  try {

    jwtMethod.verify(token, 'cGi4DH1HvpZRos4my9m2VYsc7hIjbR0Fi0J7el3K')

    const user = await User.findById(id)

    const isSamePassword = await bcrypt.compare(newPassword, user.password)

    if (isSamePassword) {
      throw new GraphQLError('New password cannot be the same as the current password', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    user.password = newPassword
    await user.save()


    return { message: 'Password updated successfully' }


  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }

}

UserSchema.statics.quickEstimateClient = async function (estimate) {

  let CLIENT
  let newEstimate
  let format = 'short'
  let message = 'Estimate sent'
  let CODE = 'INTERNAL_SERVER_ERROR'
  let newMembershipID = generateRandomNumber()
  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  let clientObject = {
    clientName: estimate.clientName,
    clientPhone: estimate.clientPhone,
    clientPropertyAddress: estimate.clientPropertyAddress,
    // clientEmail: estimate.businessEmail,
    clientEmail: estimate.clientEmail,
    clientZipCode: estimate.clientZipCode,
    interiorSquareFeet: estimate.interiorSquareFeet,
    interiorCondition: estimate.interiorCondition,
    interiorDetail: estimate.interiorDetail,
    interiorItems: estimate.interiorItems,
    interiorIndividualItems: estimate.interiorIndividualItems,
    interiorEstimate: await calculateInteriorEstimate(estimate),
    interiorGallons: calculateInteriorGallonsCost(estimate).gallons,
    interiorGallonsCost: calculateInteriorGallonsCost(estimate).gallonsCost,
    interiorGallonsItems: calculateInteriorGallonsCost(estimate).gallonsRequired,
    doorsAndDrawers: estimate.doorsAndDrawers,
    insideCabinet: estimate.insideCabinet,
    cabinetCondition: estimate.cabinetCondition,
    cabinetDetail: estimate.cabinetDetail,
    cabinetEstimate: await calculateCabinetsEstimate(estimate),
    cabinetGallons: calculateCabinetsGallonsCost(estimate).gallons,
    cabinetGallonsCost: calculateCabinetsGallonsCost(estimate).gallonsCost,
    exteriorSquareFeet: estimate.exteriorSquareFeet,
    exteriorCondition: estimate.exteriorCondition,
    exteriorDetail: estimate.exteriorDetail,
    exteriorItems: estimate.exteriorItems,
    exteriorIndividualItems: estimate.exteriorIndividualItems,
    exteriorEstimate: await calculateExteriorEstimate(estimate),
    exteriorGallons: calculateExteriorGallonsCost(estimate).gallons,
    exteriorGallonsCost: calculateExteriorGallonsCost(estimate).gallonsCost,
    exteriorGallonsItems: calculateExteriorGallonsCost(estimate).gallonsRequired,
    painters: estimate.painters,
    hoursPerDay: estimate.hoursPerDay,
    days: estimate.days,
    paintBrand: estimate.paintBrand,
    paintQuality: estimate.paintQuality,
    warranty: estimate.warranty,
    payments: estimate.payments,
    deposit: estimate.deposit,
    depositType: estimate.depositType,
    painterTapeRolls: estimate.painterTapeRolls,
    plasticRolls: estimate.plasticRolls,
    dropCloths: estimate.dropCloths,
    adjustment: estimate.adjustment,
    userType: estimate.userType
  }

  try {

    CLIENT = await new Client({ ...clientObject }).save()

    message = 'Estimate generated'

    return {
      message: message,
      id: CLIENT._id
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

// UserSchema.statics.saveEstimate = async function (email, estimateID) {
UserSchema.statics.saveEstimate = async function (email, estimateID, estimate) {

  let CODE = 'INTERNAL_SERVER_ERROR'
  let CLIENT
  let newMembershipID = generateRandomNumber()
  let pin = generateSixDigitPin()
  let expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000)

  try {

    const CLIENT = await Client.findById(estimateID)

    let userObject = {
      email: email.toLowerCase(),
      membershipID: newMembershipID,
      verificationCode: pin,
      codeExpiration: expirationDate.toISOString(),
      businessName: CLIENT.businessName,
      estimatorName: CLIENT.estimatorName,
      businessAddress: CLIENT.businessAddress,
      businessPhone: CLIENT.businessPhone,
      businessEmail: CLIENT.businessEmail,
      businessWebsite: CLIENT.businessWebsite,
      businessLicenseNumber: CLIENT.businessLicenseNumber,
      businessInstagram: CLIENT.businessInstagram
    }

    // let clientObject = {
    //   clientName: CLIENT.clientName,
    //   clientPhone: CLIENT.clientPhone,
    //   clientPropertyAddress: CLIENT.clientPropertyAddress,
    //   // clientEmail: CLIENT.businessEmail,
    //   clientEmail: CLIENT.clientEmail,
    //   clientZipCode: CLIENT.clientZipCode,
    //   interiorSquareFeet: CLIENT.interiorSquareFeet,
    //   interiorCondition: CLIENT.interiorCondition,
    //   interiorDetail: CLIENT.interiorDetail,
    //   interiorItems: CLIENT.interiorItems,
    //   interiorIndividualItems: CLIENT.interiorIndividualItems,
    //   // interiorEstimate: await calculateInteriorEstimate(CLIENT),
    //   // interiorGallons: calculateInteriorGallonsCost(CLIENT).gallons,
    //   // interiorGallonsCost: calculateInteriorGallonsCost(CLIENT).gallonsCost,
    //   // interiorGallonsItems: calculateInteriorGallonsCost(CLIENT).gallonsRequired,
    //   interiorEstimate: CLIENT.interiorEstimate || await calculateInteriorEstimate(CLIENT),
    //   interiorGallons: CLIENT.interiorGallons || calculateInteriorGallonsCost(CLIENT).gallons,
    //   interiorGallonsCost: CLIENT.interiorGallonsCost || calculateInteriorGallonsCost(CLIENT).gallonsCost,
    //   interiorGallonsItems: CLIENT.interiorGallonsItems || calculateInteriorGallonsCost(CLIENT).gallonsRequired,
    //   doorsAndDrawers: CLIENT.doorsAndDrawers,
    //   insideCabinet: CLIENT.insideCabinet,
    //   cabinetCondition: CLIENT.cabinetCondition,
    //   cabinetDetail: CLIENT.cabinetDetail,
    //   // cabinetEstimate: await calculateCabinetsEstimate(CLIENT),
    //   // cabinetGallons: calculateCabinetsGallonsCost(CLIENT).gallons,
    //   // cabinetGallonsCost: calculateCabinetsGallonsCost(CLIENT).gallonsCost,
    //   cabinetEstimate: CLIENT.cabinetEstimate || await calculateCabinetsEstimate(CLIENT),
    //   cabinetGallons: CLIENT.cabinetGallons || calculateCabinetsGallonsCost(CLIENT).gallons,
    //   cabinetGallonsCost: CLIENT.cabinetGallonsCost || calculateCabinetsGallonsCost(CLIENT).gallonsCost,
    //   exteriorSquareFeet: CLIENT.exteriorSquareFeet,
    //   exteriorCondition: CLIENT.exteriorCondition,
    //   exteriorDetail: CLIENT.exteriorDetail,
    //   exteriorItems: CLIENT.exteriorItems,
    //   exteriorIndividualItems: CLIENT.exteriorIndividualItems,
    //   // exteriorEstimate: await calculateExteriorEstimate(CLIENT),
    //   // exteriorGallons: calculateExteriorGallonsCost(CLIENT).gallons,
    //   // exteriorGallonsCost: calculateExteriorGallonsCost(CLIENT).gallonsCost,
    //   // exteriorGallonsItems: calculateExteriorGallonsCost(CLIENT).gallonsRequired,
    //   exteriorEstimate: CLIENT.exteriorEstimate || await calculateExteriorEstimate(CLIENT),
    //   exteriorGallons: CLIENT.exteriorGallons || calculateExteriorGallonsCost(CLIENT).gallons,
    //   exteriorGallonsCost: CLIENT.exteriorGallonsCost || calculateExteriorGallonsCost(CLIENT).gallonsCost,
    //   exteriorGallonsItems: CLIENT.exteriorGallonsItems || calculateExteriorGallonsCost(CLIENT).gallonsRequired,
    //   painters: CLIENT.painters,
    //   hoursPerDay: CLIENT.hoursPerDay,
    //   days: CLIENT.days,
    //   paintBrand: CLIENT.paintBrand,
    //   paintQuality: CLIENT.paintQuality,
    //   warranty: CLIENT.warranty,
    //   payments: CLIENT.payments,
    //   deposit: CLIENT.deposit,
    //   depositType: CLIENT.depositType,
    //   painterTapeRolls: CLIENT.painterTapeRolls,
    //   plasticRolls: CLIENT.plasticRolls,
    //   dropCloths: CLIENT.dropCloths,
    //   adjustment: CLIENT.adjustment,
    //   userType: CLIENT.userType
    // }

    let SRC = estimate ? { ...CLIENT.toObject(), ...estimate } : CLIENT;
    const normalizeBool = (v) => typeof v === 'string' ? v.toLowerCase() === 'yes' || v.toLowerCase() === 'true' : !!v;
    SRC.insideCabinet = normalizeBool(SRC.insideCabinet);

    let clientObject = {
      clientName: SRC.clientName,
      clientPhone: SRC.clientPhone,
      clientPropertyAddress: SRC.clientPropertyAddress,
      clientEmail: SRC.clientEmail,
      clientZipCode: SRC.clientZipCode,
      interiorSquareFeet: SRC.interiorSquareFeet,
      interiorCondition: SRC.interiorCondition,
      interiorDetail: SRC.interiorDetail,
      interiorItems: SRC.interiorItems,
      interiorIndividualItems: SRC.interiorIndividualItems,
      interiorEstimate: await calculateInteriorEstimate(SRC),
      interiorGallons: calculateInteriorGallonsCost(SRC).gallons,
      interiorGallonsCost: calculateInteriorGallonsCost(SRC).gallonsCost,
      interiorGallonsItems: calculateInteriorGallonsCost(SRC).gallonsRequired,
      doorsAndDrawers: SRC.doorsAndDrawers,
      insideCabinet: SRC.insideCabinet,
      cabinetCondition: SRC.cabinetCondition,
      cabinetDetail: SRC.cabinetDetail,
      cabinetEstimate: await calculateCabinetsEstimate(SRC),
      cabinetGallons: calculateCabinetsGallonsCost(SRC).gallons,
      cabinetGallonsCost: calculateCabinetsGallonsCost(SRC).gallonsCost,
      exteriorSquareFeet: SRC.exteriorSquareFeet,
      exteriorCondition: SRC.exteriorCondition,
      exteriorDetail: SRC.exteriorDetail,
      exteriorItems: SRC.exteriorItems,
      exteriorIndividualItems: SRC.exteriorIndividualItems,
      exteriorEstimate: await calculateExteriorEstimate(SRC),
      exteriorGallons: calculateExteriorGallonsCost(SRC).gallons,
      exteriorGallonsCost: calculateExteriorGallonsCost(SRC).gallonsCost,
      exteriorGallonsItems: calculateExteriorGallonsCost(SRC).gallonsRequired,
      painters: SRC.painters,
      hoursPerDay: SRC.hoursPerDay,
      days: SRC.days,
      paintBrand: SRC.paintBrand,
      paintQuality: SRC.paintQuality,
      warranty: SRC.warranty,
      payments: SRC.payments,
      deposit: SRC.deposit,
      depositType: SRC.depositType,
      painterTapeRolls: SRC.painterTapeRolls,
      plasticRolls: SRC.plasticRolls,
      dropCloths: SRC.dropCloths,
      adjustment: SRC.adjustment,
      userType: SRC.userType
    }

    const checkEmail = await this.findOne({ email: email.toLowerCase() })

    if (checkEmail) {

      let array = []
      if (checkEmail.clients.length > 0) array = [...checkEmail.clients]
      array.push(CLIENT.id)

      checkEmail.clients = array
      checkEmail.save()

      const params = saveEstimate(
        'https://middler.com',
        email,
        clientObject.adjustment
          ?
          clientObject.interiorAdjusted.replace('$', '')
          :
          clientObject.interiorEstimate
            ?
            `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          clientObject.exteriorAdjusted.replace('$', '')
          :
          clientObject.exteriorEstimate
            ?
            `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ?
          clientObject.cabinetAdjusted.replace('$', '')
          :
          clientObject.cabinetEstimate
            ?
            `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            :
            '0'
        ,
        clientObject.adjustment
          ? `${totalEstimateAdjustedNewEstimate(clientObject)}`
          : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        clientObject.clientName,
        clientObject.clientPhone ? clientObject.clientPhone.replace('+1', '') : '',
        clientObject.clientEmail,
        clientObject.clientPropertyAddress,
        clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
        clientObject.interiorSquareFeet,
        clientObject.interiorCondition?.replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        clientObject.interiorDetail?.replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        clientObject.interiorItems,
        clientObject.interiorIndividualItems,
        clientObject.doorsAndDrawers,
        clientObject.insideCabinet,
        clientObject.cabinetCondition?.replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        clientObject.cabinetDetail?.replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        clientObject.exteriorSquareFeet,
        clientObject.exteriorCondition?.replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        clientObject.exteriorDetail?.replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        clientObject.exteriorItems,
        clientObject.exteriorIndividualItems,
        clientObject.paintBrand,
        clientObject.paintQuality,
        clientObject.warranty,
        clientObject.payments,
        null,
        clientObject.painterTapeRolls,
        clientObject.plasticRolls,
        clientObject.dropCloths
      )

      const command = new SendEmailCommand(params)
      const response = await ses.send(command)

      console.log(response)

      CODE = 'ACCOUNT_EXISTS'

      // throw new GraphQLError(`User with that email already exists estimate saved to account`, {
      //   extensions: {
      //     code: CODE
      //   },
      // })

    }

    let array = []
    array.push(CLIENT.id)

    userObject.clients = array

    const user = await new this({ ...userObject }).save()

    const params = saveEstimate(
      'https://middler.com',
      email,
      clientObject.adjustment
        ?
        clientObject.interiorAdjusted.replace('$', '')
        :
        clientObject.interiorEstimate
          ?
          `${parseInt(clientObject.interiorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          :
          '0'
      ,
      clientObject.adjustment
        ?
        clientObject.exteriorAdjusted.replace('$', '')
        :
        clientObject.exteriorEstimate
          ?
          `${parseInt(clientObject.exteriorEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          :
          '0'
      ,
      clientObject.adjustment
        ?
        clientObject.cabinetAdjusted.replace('$', '')
        :
        clientObject.cabinetEstimate
          ?
          `${parseInt(clientObject.cabinetEstimate.replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          :
          '0'
      ,
      clientObject.adjustment
        ? `${totalEstimateAdjustedNewEstimate(clientObject)}`
        : `${parseInt(totalEstimate(clientObject).replace(/,/g, ''), 10).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      clientObject.clientName,
      clientObject.clientPhone ? clientObject.clientPhone.replace('+1', '') : '',
      clientObject.clientEmail,
      clientObject.clientPropertyAddress,
      clientObject.notesAndDisclosure ? clientObject.notesAndDisclosure : '',
      clientObject.interiorSquareFeet,
      clientObject.interiorCondition?.replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      clientObject.interiorDetail?.replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      clientObject.interiorItems,
      clientObject.interiorIndividualItems,
      clientObject.doorsAndDrawers,
      clientObject.insideCabinet,
      clientObject.cabinetCondition?.replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      clientObject.cabinetDetail?.replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      clientObject.exteriorSquareFeet,
      clientObject.exteriorCondition?.replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      clientObject.exteriorDetail?.replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      clientObject.exteriorItems,
      clientObject.exteriorIndividualItems,
      clientObject.paintBrand,
      clientObject.paintQuality,
      clientObject.warranty,
      clientObject.payments,
      null,
      clientObject.painterTapeRolls,
      clientObject.plasticRolls,
      clientObject.dropCloths
    )

    const command = new SendEmailCommand(params)
    const response = await ses.send(command)

    console.log(response)

    return { message: `Account created estimate sent to your email` }

  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: CODE
      },
    })
  }

}

const User = mongoose.model('User', UserSchema);

module.exports = User
