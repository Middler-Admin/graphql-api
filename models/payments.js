const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//// STRIPE
const stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_LIVE_SECRET_KEY)

const Payment = new Schema(
  {
    userID: {
      type: String,
      default: ''
    },
    userEmail: {
      type: String,
      default: ''
    },
    orderID: {
      type: String,
      default: ''
    },
    subscriptionID: {
      type: String,
      default: ''
    },
    paymentPlan: {
      type: String,
      default: ''
    },
    paymentIntent: {
      type: String,
      default: ''
    },
    invoiceHostedUrl: {
      type: String,
      default: ''
    },
    invoicePdf: {
      type: String,
      default: ''
    },
    invoices: {
      type: Array,
      default: []
    },
    subscriptionStatus: {
      type: String
    }
  },
  {
    timestamps: true
  })

Payment.statics.subscriptionInfo = async function (subscriptionID, paymentIntent) {

  try {

    const payment = await this.findOne({ subscriptionID: subscriptionID })

    if (!payment) {
      throw new GraphQLError('payment_unknown', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      })
    }

    if (paymentIntent) {
      payment.paymentIntent = paymentIntent
      payment.save()

      const intentInfo = await stripe.paymentIntents.retrieve(paymentIntent)
      const subscriptionInfo = await stripe.subscriptions.retrieve(subscriptionID)

      const User = require('./real_user')
      const activeUser = await User.findById(payment.userID)
      activeUser.subscribed = activeUser.paymentPlan !== 'canceled' ? true : false
      activeUser.save()

      const dateStart = new Date(subscriptionInfo.current_period_start * 1000)
      const dateEnd = new Date(subscriptionInfo.current_period_end * 1000)

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // Use 12-hour format with AM/PM
      }

      return {
        name: activeUser.firstName ? `${activeUser.firstName} ${activeUser.lastName ? activeUser.lastName : ''}` : activeUser.estimatorName,
        email: payment.userEmail,
        order: payment.orderID,
        invoiceHostedUrl: payment.invoiceHostedUrl,
        invoicePdf: payment.invoicePdf,
        paymentStatus: intentInfo.status,
        periodStart: dateStart.toLocaleString('en-US', options),
        periodEnd: dateEnd.toLocaleString('en-US', options),
        subscriptionStatus: payment.subscriptionStatus ? payment.subscriptionStatus : subscriptionInfo.status,
        paymentPlan: payment.paymentPlan,
        paymentIntent: payment.paymentIntent
      }

    }

    return {
      message: 'No payment intent found'
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

Payment.statics.cancelSubscription = async function (subscriptionID) {

  try {

    // Fetch the subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionID)

    // Calculate dates for comparison
    const currentDate = new Date();
    const dateStart = new Date(subscription.current_period_start * 1000)
    const dateEnd = new Date(subscription.current_period_end * 1000)

    // Check if the user is within 7 days of starting the subscription
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
    const isWithinSevenDays = currentDate - dateStart <= sevenDaysInMs

    let subscriptionStatus
    let paymentPlan

    if (isWithinSevenDays) {
      // If within 7 days, cancel the subscription immediately and issue a refund
      const subscription = await stripe.subscriptions.cancel(subscriptionID)

      // Issue a refund
      const invoice = await stripe.invoices.retrieve(subscription.latest_invoice)
      await stripe.refunds.create({ charge: invoice.charge })

      subscriptionStatus = 'canceled' // Change the status to 'canceled'
      paymentPlan = 'canceled'

    } else {

      // If after 7 days, just pause the subscription at the end of the period
      const pausedSubscription = await stripe.subscriptions.update(subscriptionID, { cancel_at_period_end: true })
      subscriptionStatus = 'paused' // Change the status to 'paused'

    }

    // Find and update payment record
    const payment = await this.findOne({ subscriptionID: subscriptionID })
    payment.subscriptionStatus = subscriptionStatus
    payment.save()

    // Find and update user subscription status
    const User = require('./real_user')
    const activeUser = await User.findById(payment.userID)

    const updatedUser = await User.updateOne({ _id: payment.userID }, // Find the user by their ID
      {
        $set: {
          subscribed: subscriptionStatus === 'canceled' ? false : true, // Update the subscribed field
          paymentPlan: paymentPlan ? paymentPlan : activeUser.paymentPlan // Update the payment plan
        }
      }
    )

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Use 12-hour format with AM/PM
    }

    return {
      name: activeUser.firstName ? `${activeUser.firstName} ${activeUser.lastName ? activeUser.lastName : ''}` : activeUser.estimatorName,
      email: payment.userEmail,
      order: payment.orderID,
      invoiceHostedUrl: payment.invoiceHostedUrl,
      invoicePdf: payment.invoicePdf,
      paymentStatus: 'succeeded',
      periodStart: dateStart.toLocaleString('en-US', options),
      periodEnd: dateEnd.toLocaleString('en-US', options),
      subscriptionStatus: subscriptionStatus,
      paymentPlan: paymentPlan ? paymentPlan : activeUser.paymentPlan,
      paymentIntent: payment.paymentIntent
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

Payment.statics.resumeSubscription = async function (subscriptionID) {

  try {

    // Fetch the subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionID)

    // Calculate dates for comparison
    const currentDate = new Date();
    const dateStart = new Date(subscription.current_period_start * 1000)
    const dateEnd = new Date(subscription.current_period_end * 1000)

    const pausedSubscription = await stripe.subscriptions.update(subscriptionID, { cancel_at_period_end: false })
    const subscriptionStatus = 'active'

    // Find and update payment record
    const payment = await this.findOne({ subscriptionID: subscriptionID })
    payment.subscriptionStatus = subscriptionStatus
    payment.save()

    // Find and update user subscription status
    const User = require('./real_user')
    const activeUser = await User.findById(payment.userID)

    const updatedUser = await User.updateOne({ _id: payment.userID }, // Find the user by their ID
      {
        $set: {
          subscribed: true, // Update the subscribed field
          paymentPlan: activeUser.paymentPlan // Update the payment plan
        }
      }
    )

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Use 12-hour format with AM/PM
    }

    return {
      name: activeUser.firstName ? `${activeUser.firstName} ${activeUser.lastName ? activeUser.lastName : ''}` : activeUser.estimatorName,
      email: payment.userEmail,
      order: payment.orderID,
      invoiceHostedUrl: payment.invoiceHostedUrl,
      invoicePdf: payment.invoicePdf,
      paymentStatus: 'succeeded',
      periodStart: dateStart.toLocaleString('en-US', options),
      periodEnd: dateEnd.toLocaleString('en-US', options),
      subscriptionStatus: subscriptionStatus,
      paymentPlan: activeUser.paymentPlan,
      paymentIntent: payment.paymentIntent
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

module.exports = mongoose.model('payment', Payment)
