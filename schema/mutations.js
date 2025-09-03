const graphql = require('graphql');
const { sendEmail } = require('../helpers/mailer')
const { GraphQLError } = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } = graphql;
const jwtMethod = require('jsonwebtoken')

// const config = {
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   },
//   region: process.env.AWS_REGION
// }

// const ses = new SESClient(config)

//// TYPES
const UserType = require('../types/userType')
const VerificationType = require('../types/verificationType')
const MessageType = require('../types/messageType')
const EstimatorInputType = require('../types/estimatorInputType')
const TimeEstimateInputType = require('../types/timeEstimateInputType')
const SingleEstimateOutputType = require('../types/singleEstimateOutputType')
const SingleTimeEstimateOutputType = require('../types/singleTimeEstimateOutputType')
const PaymentInfoType = require('../types/paymentInfoType')

//// DATA MODELS
const User = require('../models/user')
const Client = require('../models/client')
const Payment = require('../models/payments')
const Promotion = require('../models/promotions')
const Time = require('../models/time');
const SubscribedUser = require('../models/subscribedUser');
const { thankYouForSubscribing } = require('../templates/thankYou');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { firstName, lastName, email, password }) {

        return User.signup(firstName, lastName, email, password)

      }
    },
    noPasswordSignup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { email, estimate }) {

        return User.noPasswordSignup(email, estimate)

      }
    },
    firstEstimate: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { email, estimate }) {

        return User.firstEstimate(email, estimate)

      }
    },
    verifyEmail: {
      type: VerificationType,
      args: {
        checkID: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { checkID, token }) {

        return User.verifyEmail(checkID, token)

      }
    },
    pinEmailVerification: {
      type: VerificationType,
      args: {
        pin: { type: new GraphQLList(GraphQLString) },
        email: { type: GraphQLString }
      },
      async resolve(parentValue, { pin, email }) {

        return User.pinEmailVerification(pin, email)

      }
    },
    verificationEmail: {
      type: MessageType,
      args: {
        email: { type: GraphQLString },
        clientId: { type: GraphQLString }
      },
      async resolve(parentValue, { email, clientId }) {

        return User.sendVerificationEmail(email, clientId)

      }
    },
    newPinVerification: {
      type: VerificationType,
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parentValue, { email }) {

        return User.newPinVerification(email)

      }
    },
    setPassword: {
      type: VerificationType,
      args: {
        id: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { id, password }) {

        return User.setPassword(id, password)

      }
    },
    userLogin: {
      type: VerificationType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { email, password }) {

        return User.login(email, password)

      }
    },
    adjustPrice: {
      type: SingleEstimateOutputType,
      args: {
        id: { type: GraphQLString },
        interiorAdjusted: { type: GraphQLString },
        cabinetAdjusted: { type: GraphQLString },
        exteriorAdjusted: { type: GraphQLString },
        adjustment: { type: GraphQLBoolean }
      },
      async resolve(parentValue, { id, interiorAdjusted, cabinetAdjusted, exteriorAdjusted, adjustment }) {

        return Client.addAdjustment(id, interiorAdjusted, cabinetAdjusted, exteriorAdjusted, adjustment)

      }
    },
    updateDisclosure: {
      type: SingleEstimateOutputType,
      args: {
        id: { type: GraphQLString },
        notesAndDisclosure: { type: GraphQLString }
      },
      async resolve(parentValue, { id, notesAndDisclosure }) {

        return Client.updateDisclosure(id, notesAndDisclosure)

      }
    },
    sendEstimate: {
      type: SingleEstimateOutputType,
      args: {
        userID: { type: GraphQLString },
        clientID: { type: GraphQLString },
        email: { type: GraphQLString },
        format: { type: GraphQLString }
      },
      async resolve(parentValue, { userID, clientID, email, format }) {

        return Client.sendEstimate(userID, clientID, email, format)

      }
    },
    updateLogo: {
      type: VerificationType,
      args: {
        id: { type: GraphQLString },
        url: { type: GraphQLString }
      },
      async resolve(parentValue, { id, url }) {

        return User.updateLogo(id, url)

      }
    },
    deletePendingLogo: {
      type: VerificationType,
      args: {
        url: { type: GraphQLString }
      },
      async resolve(parentValue, { url }) {

        return User.deletePendingLogo(url)

      }
    },
    updateBusinessInformation: {
      type: MessageType,
      args: {
        id: { type: GraphQLString },
        businessName: { type: GraphQLString },
        estimatorName: { type: GraphQLString },
        businessAddress: { type: GraphQLString },
        businessPhone: { type: GraphQLString },
        businessEmail: { type: GraphQLString },
        businessWebsite: { type: GraphQLString },
        businessLicenseNumber: { type: GraphQLString },
        businessInstagram: { type: GraphQLString }
      },
      async resolve(parentValue, { id, businessName, estimatorName, businessAddress, businessPhone, businessEmail, businessWebsite, businessLicenseNumber, businessInstagram }) {

        return User.updateBusinessInformation(id, businessName, estimatorName, businessAddress, businessPhone, businessEmail, businessWebsite, businessLicenseNumber, businessInstagram)

      }
    },
    updatePersonalInformation: {
      type: MessageType,
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        bio: { type: GraphQLString },
      },
      async resolve(parentValue, { id, firstName, lastName, email, bio }) {

        return User.updatePersonalInformation(id, firstName, lastName, email, bio)

      }
    },
    createEstimate: {
      type: SingleEstimateOutputType,
      args: {
        id: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { id, estimate }) {

        return User.createEstimate(id, estimate)

      }
    },
    originalEstimate: {
      type: SingleEstimateOutputType,
      args: {
        id: { type: GraphQLString },
        adjustment: { type: GraphQLBoolean }
      },
      async resolve(parentValue, { id, adjustment }) {

        return Client.originalEstimate(id, adjustment)

      }
    },
    updateEstimate: {
      type: SingleEstimateOutputType,
      args: {
        userID: { type: GraphQLString },
        clientID: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { userID, clientID, estimate }) {

        return Client.updateEstimate(userID, clientID, estimate)

      }
    },
    deleteEstimate: {
      type: MessageType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parentValue, { id }) {

        return Client.deleteEstimate(id)

      }
    },
    paymentIntent: {
      type: VerificationType,
      args: {
        id: { type: GraphQLString },
        paymentPlan: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      async resolve(parentValue, { id, paymentPlan, name, email }) {

        return Client.deleteEstimate(id, paymentPlan, name, email)

      }
    },
    setupClientSecret: {
      type: VerificationType,
      args: {
        id: { type: GraphQLString },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        paymentPlan: { type: GraphQLString },
        code: { type: GraphQLString }
      },
      async resolve(parentValue, { id, email, name, paymentPlan, code }) {

        return User.setupClientSecret(id, email, name, paymentPlan, code)

      }
    },
    subscriptionInfo: {
      type: PaymentInfoType,
      args: {
        subscriptionID: { type: GraphQLString },
        paymentIntent: { type: GraphQLString }
      },
      async resolve(parentValue, { subscriptionID, paymentIntent }) {

        return Payment.subscriptionInfo(subscriptionID, paymentIntent)

      }
    },
    createPromotion: {
      type: MessageType,
      args: {
        type: { type: GraphQLString },
        code: { type: GraphQLString },
        plan: { type: GraphQLString },
        days: { type: GraphQLString },
        description: { type: GraphQLString },
        affiliate: { type: GraphQLString }
      },
      async resolve(parentValue, { type, code, plan, days, description, affiliate }) {

        return Promotion.createPromotion(type, code, plan, days, description, affiliate)

      }
    },
    applyCode: {
      type: MessageType,
      args: {
        id: { type: GraphQLString },
        code: { type: GraphQLString },
        paymentPlan: { type: GraphQLString }
      },
      async resolve(parentValue, { id, code, paymentPlan }) {

        return Promotion.applyCode(id, code, paymentPlan)

      }
    },
    forgotPassword: {
      type: MessageType,
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parentValue, { email }) {

        return User.forgotPassword(email)

      }
    },
    updatePassword: {
      type: MessageType,
      args: {
        newPassword: { type: GraphQLString },
        id: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { newPassword, id, token }) {

        return User.updatePassword(newPassword, id, token)

      }
    },
    cancelSubscription: {
      type: PaymentInfoType,
      args: {
        subscriptionID: { type: GraphQLString }
      },
      async resolve(parentValue, { subscriptionID }) {

        return Payment.cancelSubscription(subscriptionID)

      }
    },
    getEstimate: {
      type: SingleEstimateOutputType,
      args: {
        id: { type: GraphQLString },
        painter: { type: GraphQLString }
      },
      async resolve(parentValue, { id, painter }) {

        return Client.getEstimate(id, painter)

      }
    },
    contactMiddler: {
      type: MessageType,
      args: {
        email: { type: GraphQLString },
        message: { type: GraphQLString }
      },
      async resolve(parentValue, { email, message }) {

        return User.contactMiddler(email, message)

      }
    },
    resumeSubscription: {
      type: PaymentInfoType,
      args: {
        subscriptionID: { type: GraphQLString }
      },
      async resolve(parentValue, { subscriptionID }) {

        return Payment.resumeSubscription(subscriptionID)

      }
    },
    changePassword: {
      type: MessageType,
      args: {
        id: { type: GraphQLString },
        currentPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
      },
      async resolve(parentValue, { id, currentPassword, newPassword }) {

        return User.changePassword(id, currentPassword, newPassword)

      }
    },
    disableAccount: {
      type: MessageType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parentValue, { id }) {

        return User.disableAccount(id)

      }
    },
    activateAccount: {
      type: VerificationType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { email, password }) {

        return User.activateAccount(email, password)

      }
    },
    adminSignup: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        key: { type: GraphQLString }
      },
      async resolve(parentValue, { firstName, lastName, email, password, key }) {

        return User.adminSignup(firstName, lastName, email, password, key)

      }
    },
    adminLogin: {
      type: VerificationType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { email, password }) {

        return User.adminLogin(email, password)

      }
    },
    quickEstimate: {
      type: SingleEstimateOutputType,
      args: {
        emailDestination: { type: GraphQLString },
        recentClient: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { emailDestination, recentClient, estimate }) {

        return User.quickEstimate(emailDestination, recentClient, estimate)

      }
    },
    sqftEstimateLogin: {
      type: SingleTimeEstimateOutputType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { email, password, estimate }) {

        return User.sqftEstimateLogin(email, password, estimate)

      }
    },
    sqftAutoSend: {
      type: SingleEstimateOutputType,
      args: {
        emailDestination: { type: GraphQLString },
        token: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { emailDestination, token, estimate }) {

        jwtMethod.verify(token, process.env.JWT_SECRET_VERIFY)

        return User.quickEstimate(emailDestination, estimate)

      }
    },
    getCalculations: {
      type: SingleEstimateOutputType,
      args: {
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { estimate }) {
        return Client.getCalculations(estimate)

      }
    },
    getPaintCard: {
      type: SingleEstimateOutputType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parentValue, { id }) {

        return Client.getPaintCard(id)

      }
    },
    checkAccount: {
      type: UserType,
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parentValue, { email }) {

        return User.checkAccount(email)

      }
    },
    dashboardQuickEstimate: {
      type: SingleEstimateOutputType,
      args: {
        id: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { id, estimate }) {

        return User.dashboardQuickEstimate(id, estimate)

      }
    },
    timeEstimate: {
      type: SingleTimeEstimateOutputType,
      args: {
        email: { type: GraphQLString },
        recentEstimate: { type: GraphQLString },
        estimate: { type: TimeEstimateInputType }
      },
      async resolve(parentValue, { email, recentEstimate, estimate }) {

        return Time.timeEstimate(email, recentEstimate, estimate)

      }
    },
    timeEstimateLogin: {
      type: SingleTimeEstimateOutputType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        estimate: { type: TimeEstimateInputType }
      },
      async resolve(parentValue, { email, password, estimate }) {

        return Time.timeEstimateLogin(email, password, estimate)

      }
    },
    timeEstimateAutoSend: {
      type: SingleTimeEstimateOutputType,
      args: {
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        userID: { type: GraphQLString },
        estimate: { type: TimeEstimateInputType }
      },
      async resolve(parentValue, { email, token, userID, estimate }) {

        jwtMethod.verify(token, process.env.JWT_SECRET_VERIFY)

        return Time.createTimeEstimate(email, userID, estimate)

      }
    },
    noPasswordTimeSignup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        estimate: { type: TimeEstimateInputType }
      },
      async resolve(parentValue, { email, estimate }) {

        return Time.noPasswordSignup(email, estimate)

      }
    },
    updateTimeEstimate: {
      type: SingleTimeEstimateOutputType,
      args: {
        email: { type: GraphQLString },
        estimate: { type: TimeEstimateInputType }
      },
      async resolve(parentValue, { email, estimate }) {

        return Time.updateTimeEstimate(email, estimate)

      }
    },
    createTimeEstimate: {
      type: SingleTimeEstimateOutputType,
      args: {
        email: { type: GraphQLString },
        userID: { type: GraphQLString },
        estimate: { type: TimeEstimateInputType }
      },
      async resolve(parentValue, { email, userID, estimate }) {

        return Time.createTimeEstimate(email, userID, estimate)

      }
    },
    deleteTimeEstimate: {
      type: MessageType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parentValue, { id }) {

        return Time.deleteTimeEstimate(id)

      }
    },
    sendTimeEstimate: {
      type: SingleTimeEstimateOutputType,
      args: {
        email: { type: GraphQLString },
        userID: { type: GraphQLString },
        estimate: { type: TimeEstimateInputType }
      },
      async resolve(parentValue, { email, estimate }) {

        return Time.sendTimeEstimate(email, estimate)

      }
    },
    forgotPasswordAdmin: {
      type: MessageType,
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parentValue, { email }) {

        return User.forgotPasswordAdmin(email)

      }
    },
    updatePasswordAdmin: {
      type: MessageType,
      args: {
        newPassword: { type: GraphQLString },
        id: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { newPassword, id, token }) {

        return User.updatePassword(newPassword, id, token)

      }
    },
    quickEstimateClient: {
      type: SingleEstimateOutputType,
      args: {
        estimate: { type: EstimatorInputType }
      },
      async resolve(parentValue, { estimate }) {

        return User.quickEstimateClient(estimate)

      }
    },
    saveEstimate: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        // estimateID: { type: GraphQLString }
        estimateID: { type: GraphQLString },
        estimate: { type: EstimatorInputType }
      },
      // async resolve(parentValue, { email, estimateID }) {
      //   return User.saveEstimate(email, estimateID)
      // }
      async resolve(parentValue, { email, estimateID, estimate }) {
        return User.saveEstimate(email, estimateID, estimate)
      }
    },
    applyGiftCard: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        estimateID: { type: GraphQLString },
        where: { type: GraphQLString },
        why: { type: GraphQLString }
      },
      async resolve(parentValue, { email, estimateID, where, why }) {

        return Client.applyGiftCard(estimateID, where, why)

      }
    },

    subscribeUser: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parentValue, { email }) {
        try {
          // Check if the user is already subscribed
          const existingUser = await SubscribedUser.findOne({ email });

          // if (existingUser) {
          //   throw new GraphQLError('This email is already subscribed.', {
          //     extensions: { code: 'FORBIDDEN' }
          //   });
          // }

          // Create a new subscription
          const newSubscription = new SubscribedUser({ email });
          await newSubscription.save();


          const params = thankYouForSubscribing(email); // Your email template function
          const command = params;
          const response = await sendEmail(command);

          console.log('Subscription confirmation email sent:', response);

          return `Discount email sent to your email`;
        } catch (error) {
          console.log('ERROR', error);
          throw new GraphQLError('Error subscribing user.', {
            extensions: { code: 'INTERNAL_SERVER_ERROR' }
          });
        }
      }
    }

    ///// end mutation ///////

  }
})

module.exports = mutation
