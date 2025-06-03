const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Promotion = new Schema(
{
  type: {
    type: String
  },
  code: {
    type: String
  },
  plan: {
    type: String
  },
  days: { 
    type: String
  },
  description: { 
    type: String
  },
  expiration: {
    type: String
  },
  affiliate: { 
    type: String
  }
},
{
    timestamps: true
})

Promotion.statics.createPromotion = async function( type, code, plan, days, description, affiliate ){

  const object = new Object({
    type,
    code,
    plan,
    days,
    description,
    expiration: new Date(Date.now() + +days * 24 * 60 * 60 * 1000),
    affiliate
  })
  
  try {

    const checkIfExists = await this.findOne({ code: code })

    if(checkIfExists){
      throw new GraphQLError(`Code needs to be unique`, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      })
    }

    const promotion = await new this({ ...object }).save()

    return { message: `Promotion with code ${promotion.code} created` }
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    })
  }
  
}

Promotion.statics.applyCode = async function( id, code, paymentPlan ){

  try {

    const promotion                 = await this.findOne({ code: code })
    
    const subscribedAt              = Math.floor(Date.now() / 1000) //// unix timestamp format in seconds
    const secondsInOneDay           = 24 * 60 * 60

    const User                      = require('../models/user')
    const checkUser                 = await User.findById(id)

    let codes                       = checkUser.codes
    let newCode                     = new Object()

    if(promotion){
      newCode.type                    = promotion.type
      newCode.code                    = promotion.code
      newCode.plan                    = promotion.plan
      newCode.days                    = promotion.days
      newCode.description             = promotion.description
      newCode.expiration              = promotion.expiration
      newCode.affiliate               = promotion.affiliate
      newCode.status                  = 'intent',
      newCode.planSelected            = paymentPlan
      codes.push(newCode)

      checkUser.subscribedAt          = subscribedAt
      checkUser.currentPeriodStart    = subscribedAt
      checkUser.currentPeriodEnd      = subscribedAt + (promotion.days * secondsInOneDay)
      checkUser.subscribed            = true
      checkUser.paymentPlan           = promotion ? promotion.plan : paymentPlan
      checkUser.codes                 = codes
      checkUser.save()
      
    }

    if(!promotion){

      newCode.type                    = 'subscription'
      newCode.code                    = code
      newCode.plan                    = 'standard_free'
      newCode.days                    = 3 
      newCode.description             = ''
      newCode.expiration              = ''
      newCode.affiliate               = ''
      newCode.status                  = 'intent',
      newCode.planSelected            = paymentPlan
      codes.push(newCode)

      checkUser.codes                 = codes
      checkUser.save()

      throw new GraphQLError(`Code is invalid`, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      })
      
    }

    if(!promotion){
      throw new GraphQLError(`Code is invalid`, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      })
    }

    return {
      message: promotion ? promotion.description : 'Code applied'
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

module.exports = mongoose.model('promotion', Promotion)