const mongoose = require('mongoose');
const graphql = require('graphql');
const jwtMethod = require('jsonwebtoken')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLError } = graphql;
require('dotenv').config()

//// TYPES
const UserType        = require('../types/userType')
const EstimateType    = require('../types/estimatorOutputType')
const CodeType        = require('../types/codeOutputType')

//// DATA MODELS
const User            = require('../models/user')
const Estimate        = require('../models/client')
const Code            = require('../models/promotions')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString } 
      },
      async resolve(parentValue, { id, token }) {  

        try {
          
          // console.log('TEST', jwtMethod.verify(token, process.env.JWT_SECRET_VERIFY))
          
          jwtMethod.verify(token, process.env.JWT_SECRET_VERIFY)

          const user = await User.findById(id).populate([{ path: 'clients' }, { path: 'payments' }, { path: 'codes' }, { path: 'timeEstimates' }])
          
          return user
          
        } catch (error) {
          console.log('ERROR', error)
          throw new GraphQLError(`You're session has expired`, {
            extensions: {
              code: 'FORBIDDEN',
            },
          });
          
        }
      }
    },
    admin: {
      type: UserType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString } 
      },
      async resolve(parentValue, { id, token }) {  

        try {
          
          jwtMethod.verify(token, process.env.JWT_SECRET_LOGIN)

          const user = await User.findById(id).populate([{ path: 'clients' }, { path: 'payments' }, { path: 'codes' }])
          
          return user
          
        } catch (error) {
          console.log('ERROR', error)
          throw new GraphQLError(`You're session has expired`, {
            extensions: {
              code: 'FORBIDDEN',
            },
          })
          
        }
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: { 
        token: { type: GraphQLString } 
      },
      async resolve(parentValue, { id, token }) {  

        try {
          
          jwtMethod.verify(token, process.env.JWT_SECRET_LOGIN)

          // Find all users and populate necessary fields
          const users = await User.find().populate([
            { path: 'clients' },
            { path: 'payments' },
            { path: 'codes' }
          ])
          
          return users
          
        } catch (error) {
          console.log('ERROR', error)
          throw new GraphQLError(`You're session has expired`, {
            extensions: {
              code: 'FORBIDDEN',
            },
          });
          
        }
      }
    },
    estimates: {
      type: new GraphQLList(EstimateType),
      args: { 
        token: { type: GraphQLString } 
      },
      async resolve(parentValue, { id, token }) {  

        try {
          
          
          jwtMethod.verify(token, process.env.JWT_SECRET_LOGIN)

          // Find all users and populate necessary fields
          const estimates = await Estimate.find()
          
          return estimates
          
        } catch (error) {
          console.log('ERROR', error)
          throw new GraphQLError(`You're session has expired`, {
            extensions: {
              code: 'FORBIDDEN',
            },
          });
          
        }
      }
    },
    codes: {
      type: new GraphQLList(CodeType),
      args: { 
        token: { type: GraphQLString } 
      },
      async resolve(parentValue, { id, token }) {  

        try {
          
          jwtMethod.verify(token, process.env.JWT_SECRET_LOGIN)

          // Find all users and populate necessary fields
          const codes = await Code.find()
          
          return codes
          
        } catch (error) {
          console.log('ERROR', error)
          throw new GraphQLError(`You're session has expired`, {
            extensions: {
              code: 'FORBIDDEN',
            },
          });
          
        }
      }
    }
  })
});

module.exports = RootQuery;
