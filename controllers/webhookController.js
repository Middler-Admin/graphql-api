//// STRIPE
const stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_LIVE_SECRET_KEY)

exports.handleWebhook = async (req, res) => {

  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.NODE_ENV == 'development'
        ? process.env.STRIPE_WEBHOOK_ENDPOINT_LOCAL_SECRET
        : process.env.STRIPE_WEBHOOK_ENDPOINT_LIVE_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed', err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'customer.subscription.updated':
        await handleCustomerSubscriptionUpdated(event)
        break
        
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event)
        break

      case 'charge.refunded':
        await handleChargeRefunded(event)
        break

      case 'customer.subscription.deleted':
        await handleCustomerSubscriptionDeleted(event)

      case 'charge.failed':
        await handleInvoicePaymentFailed(event);

      case 'test_helpers.test_clock.ready':
        await handleInvoicePaymentSucceeded(event)

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Error handling webhook event', error)
    res.status(500).send('Internal Server Error')
  }

}

const handleCustomerSubscriptionUpdated = async (event) => {

  // console.log('SUBSCRIPTION UPDATED EVENT TYPE TRIGGERED', event.data.object)
  // console.log('DETAILS', event.data.object.cancellation_details)
  console.log('PREVIOUS ATTRIBUTES', event.data.previous_attributes)

  try {
    // console.log('EVENT OBJECT', event.data.object)
    const customer                            = await stripe.customers.retrieve(event.data.object.customer)

    const subscription                        = await stripe.subscriptions.retrieve(event.data.object.id)

    const User                                = require('../models/user')
    const checkUser                           = await User.findById(customer.metadata.userID).populate('payments')


    if(checkUser.payments.length == 0){
      
      let codes                               = [...checkUser.codes]

      codes = codes.map(item => {

        if (item.code === event.data.object.metadata.code) {
          return { ...item, status: 'succeeded' } // Update item and return new object
        }

        return item
        
      })

      let invoices                            = [...checkUser.invoices]
      let object                              = new Object()
      object.subscriptionID                   = event.data.object.id
      object.invoiceID                        = event.data.object.latest_invoice

      const invoice                           = await stripe.invoices.retrieve(event.data.object.latest_invoice)
      
      object.invoiceHostedUrl                 = invoice.hosted_invoice_url
      object.invoicePdf                       = invoice.invoice_pdf
      invoices.push(object)

      const Payment                           = require('../models/payments')
      let paymentObject                       = new Object()
      paymentObject.userID                    = checkUser.id
      paymentObject.userEmail                 = checkUser.email
      paymentObject.orderID                   = event.data.object.metadata.orderID
      paymentObject.subscriptionID            = event.data.object.id
      paymentObject.invoices                  = invoices
      paymentObject.invoiceHostedUrl          = invoice.hosted_invoice_url
      paymentObject.invoicePdf                = invoice.invoice_pdf
      paymentObject.subscriptionStatus        = event.data.object.status
      paymentObject.paymentPlan               = event.data.object.metadata.paymentPlan

      const newPayment                        = await new Payment({ ...paymentObject }).save()
      // console.log('PAYMENT', newPayment)
    
      let payments                            = [...checkUser.payments]
      payments.push(newPayment.id)
      checkUser.customerID                    = customer.id
      checkUser.subscriptionID                = event.data.object.id
      checkUser.invoices                      = invoices
      checkUser.subscribedAt                  = event.data.object.start_date
      checkUser.currentPeriodStart            = event.data.object.current_period_start
      checkUser.currentPeriodEnd              = event.data.object.current_period_end 
      checkUser.payments                      = payments
      checkUser.paymentPlan                   = event.data.object.metadata.paymentPlan
      checkUser.codes                         = [...codes]
      // console.log(checkUser)
      await checkUser.save()

    }

    if(checkUser.payments.length > 0){
      
      let codes                               = [...checkUser.codes]
      
      let latestPayment = checkUser.payments[checkUser.payments.length - 1]

      if(latestPayment.subscriptionStatus == 'canceled'){

        // console.log('TESTING WIN-BACK', event.data.object)

        codes = codes.map(item => {

          if (item.code === event.data.object.metadata.code) {
            return { ...item, status: 'succeeded' } // Update item and return new object
          }

          return item
          
        })

        let invoices                            = [...checkUser.invoices]

        let object                              = new Object()
        object.subscriptionID                   = event.data.object.id
        object.invoiceID                        = event.data.object.latest_invoice

        const invoice                           = await stripe.invoices.retrieve(event.data.object.latest_invoice)
        
        object.invoiceHostedUrl                 = invoice.hosted_invoice_url
        object.invoicePdf                       = invoice.invoice_pdf
        invoices.push(object)

        const Payment                           = require('../models/payments')
        let paymentObject                       = new Object()
        paymentObject.userID                    = checkUser.id
        paymentObject.userEmail                 = checkUser.email
        paymentObject.orderID                   = event.data.object.metadata.orderID
        paymentObject.subscriptionID            = event.data.object.id
        paymentObject.invoices                  = invoices
        paymentObject.invoiceHostedUrl          = invoice.hosted_invoice_url
        paymentObject.invoicePdf                = invoice.invoice_pdf
        paymentObject.subscriptionStatus        = event.data.object.status
        paymentObject.paymentPlan               = event.data.object.metadata.paymentPlan

        const newPayment                        = await new Payment({ ...paymentObject }).save()
      
        let payments                            = [...checkUser.payments]
        payments.push(newPayment.id)
        checkUser.customerID                    = customer.id
        checkUser.subscriptionID                = event.data.object.id
        checkUser.invoices                      = invoices
        checkUser.subscribedAt                  = event.data.object.start_date
        checkUser.currentPeriodStart            = event.data.object.current_period_start
        checkUser.currentPeriodEnd              = event.data.object.current_period_end 
        checkUser.payments                      = payments
        checkUser.paymentPlan                   = event.data.object.metadata.paymentPlan
        checkUser.codes                         = [...codes]
        
        await checkUser.save()
        
      }
      
    }   
    
    if(event.data.object.cancellation_details && event.data.object.cancellation_details.reason == 'cancellation_requested'){
      console.log('PAUSE SUBSCRIPTION', event.data.object)

      if(event.data.object.cancel_at_period_end){
        // Find and update payment record
        const Payment                          = require('../models/payments')
        const payment                          = await Payment.findOne({ subscriptionID: event.data.object.id })
        payment.subscriptionStatus             = 'paused'
        payment.save()

        // Find and update user subscription status
        const User                             = require('../models/user')
        const updatedUser                      = await User.updateOne({ _id: payment.userID }, // Find the user by their ID
          { 
            $set: {
              subscribed: true, // Update the subscribed field
              paymentPlan: 'paused' // Update the payment plan
            }
          }
        )
      }

    }

    if(event.data.previous_attributes && event.data.previous_attributes.cancellation_details && event.data.previous_attributes.cancellation_details.reason){

      if(event.data.previous_attributes.cancellation_details && event.data.previous_attributes.cancellation_details.reason == 'cancellation_requested'){

        if(event.data.object.status == 'active'){

          console.log('RESUME SUBSCRIPTION', event.data.object)
          const subscription                  = event.data.object

          // Update the user's subscription status in the database
          const User                          = require('../models/user')
          const Payment                       = require('../models/payments')

          // Find the user by customer ID (from the subscription object)
          const customerID                    = subscription.customer
          const user                          = await User.findOne({ customerID: customerID }).populate('payments')
          console.log('USER', user)
          const latestPayment                 = user.payments[user.payments.length - 1]

          if (user) {
            // Update user subscription details to indicate it's resumed
            user.subscribed                   = true
            user.subscriptionID               = subscription.id
            user.paymentPlan                  = latestPayment.paymentPlan // Assuming a single plan per subscription
            user.currentPeriodStart           = subscription.current_period_start
            user.currentPeriodEnd             = subscription.current_period_end
            await user.save()

            latestPayment.subscriptionStatus  = 'active'
            await latestPayment.save()

            console.log(`Subscription for user ${user.email} has been resumed.`)


          }
          
        }
        
      }
      
    }
    
  } catch (err) {
    console.log('SUBSCRIPTION UPDATED ERROR ', err)
    return
  }
  
}

const handleInvoicePaymentSucceeded = async (event) => {

  console.log('INVOICE PAYMENT EVENT TYPE TRIGGERED', event.type)

  const invoice = event.data.object

  // console.log('INVOICE', invoice)

  if (invoice.billing_reason === 'subscription_cycle') {

    const subscription                = await stripe.subscriptions.retrieve(invoice.subscription)
    const customer                    = await stripe.customers.retrieve(invoice.customer)

    console.log('SUBSCRIPTION CYCLE', subscription)
    // console.log('CUSTOMER', customer)

    const User                        = require('../models/user')

    const checkUser                   = await User.findById(customer.metadata.userID)

    if (!checkUser) {
      throw new Error('User not found')
    }

    // console.log('USER', checkUser)
    console.log('START DATE', new Date(subscription.current_period_start * 1000))
    console.log('END DATE', new Date(subscription.current_period_end * 1000))

    checkUser.currentPeriodStart      = subscription.current_period_start
    checkUser.currentPeriodEnd        = subscription.current_period_end

    checkUser.invoices.push({
      subscriptionID: subscription.id,
      invoiceID: invoice.id,
      invoiceHostedUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
    })

    await checkUser.save()

  }

}

const handleChargeRefunded = async (event) => {

  console.log('CHARGE REFUNDED EVENT TYPE TRIGGERED', event.type)

  const charge                      = event.data.object
  const customer                    = await stripe.customers.retrieve(charge.customer)

  // console.log('CHARGE', charge)
  // console.log('CUSTOMER', customer)
  
  const User                        = require('../models/user')

  const user                        = await User.findById(customer.metadata.userID)
  if (!user) {
    throw new Error('User not found')
  }

  const subscriptionID              = user.subscriptionID
  // console.log('USER FOUND', user)

  // Update the user's payment and subscription status
  const Payment                     = require('../models/payments')

  const payment                     = await Payment.findOne({ subscriptionID })

  if (!payment) {
    throw new Error('Payment record not found')
  }

  payment.subscriptionStatus = 'canceled'
  await payment.save()

  await User.updateOne(
    { _id: payment.userID },
    {
      $set: {
        subscribed: false,
        paymentPlan: 'canceled',
      },
    }
  )

  const canceledSubscription        = await stripe.subscriptions.cancel(subscriptionID)
  // console.log('CANCEL SUBSCRIPTION', canceledSubscription)

  console.log(`Subscription ${subscriptionID} canceled and refunded successfully.`)
  
}

const handleCustomerSubscriptionDeleted = async (event) => {

  console.log('SUBSCRIPTION DELETED EVENT TYPE TRIGGERED', event.type)
  // console.log('EVENT PREVIOUS', event)

  // Fetch the subscription details from Stripe
  const subscription                  = event.data.object
  // console.log('SUBSCRIPTION', subscription)

  // Calculate dates for comparison
  const currentDate                   = new Date()
  const dateStart                     = new Date(subscription.current_period_start * 1000)
  const dateEnd                       = new Date(subscription.current_period_end * 1000)
  
  // Check if the user is within 7 days of starting the subscription
  const sevenDaysInMs                 = 7 * 24 * 60 * 60 * 1000
  const isWithinSevenDays             = currentDate - dateStart <= sevenDaysInMs

  let subscriptionStatus
  let paymentPlan

  // Fetch the customer ID from the subscription
  const customerID                    = subscription.customer

  // Update the user's subscription status in your database
  const User                          = require('../models/user')
  const Payment                       = require('../models/payments')

  // Find the user by customer ID
  const user                          = await User.findOne({ customerID: customerID })
  const subscriptionID                = user.subscriptionID

  if (isWithinSevenDays) {
    // If within 7 days, cancel the subscription immediately and issue a refund
    if(subscription.status !== 'canceled') await stripe.subscriptions.cancel(subscriptionID)

    // Issue a refund
    const invoice                     = await stripe.invoices.retrieve(subscription.latest_invoice)
    console.log('INVOICE TO REFUND', invoice)
    await stripe.refunds.create({ charge: invoice.charge })

    subscriptionStatus                = 'canceled' // Change the status to 'canceled'
    paymentPlan                       = 'canceled'

  } else {

    // If after 7 days, just pause the subscription at the end of the period
    if(subscription.status !== 'canceled') await stripe.subscriptions.cancel(subscriptionID)
    
    subscriptionStatus                = 'canceled' // Change the status to 'paused'
    paymentPlan                       = 'canceled'

  }

  // Find and update payment record
  const payment                       = await Payment.findOne({ subscriptionID: subscriptionID })
  payment.subscriptionStatus          = subscriptionStatus
  payment.save()
  
  // Find and update user subscription status
  const updatedUser                   = await User.updateOne({ _id: payment.userID }, // Find the user by their ID
    { 
      $set: {
        subscribed: subscriptionStatus === 'canceled' ? false : true, // Update the subscribed field
        paymentPlan: paymentPlan ? paymentPlan : activeUser.paymentPlan // Update the payment plan
      }
    }
  )
  
}

const handleInvoicePaymentFailed = async (event) => {

  try {

  const charge = event.data.object

  console.log('CHARGE FAILED', charge)

  if(charge.failure_code == 'card_declined'){

    const customer                  = await stripe.customers.retrieve(charge.customer)
    const subscriptionStatus        = 'card_declined'

    if (!customer || !customer.metadata || !customer.metadata.userID) {
      console.error('Customer or user ID metadata not found')
      return
    }

    // Find and update user subscription status
    const User                      = require('../models/user')
    const activeUser                = await User.findById(customer.metadata.userID)

    // Find and update payment record
    const payment                   = await this.findOne({ subscriptionID: activeUser.subscriptionID })
    payment.subscriptionStatus      = subscriptionStatus
    payment.save()
  
    console.log('Payment status updated successfully:', customer)
    
  }

  } catch (error) {
    console.error('Error handling invoice payment failed event:', error);
  }

}