const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')
const stripeWebhookRoutes = require('./routes/stripeRoutes')
const { colas } = require('./helpers/colas')
const app = express()

//// STRIPE
const stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_LIVE_SECRET_KEY)

require('dotenv').config() 

// Use the routes, which will have the path `/stripe-webhook` directly
app.use(stripeWebhookRoutes)

app.use(express.json())
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'https://middler.com', 'https://admin.middler.com', 'https://middler-murex.vercel.app', 'https://middler-test-production.up.railway.app'] }))
app.options('*', cors()); // Handle preflight requests
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
})

app.use(
  '/graphql',
  (req, res, next) => 
  expressGraphQL( async () => {
    return {
      schema,
      graphiql: true,
      context: { req, res }
    }
  })(req, res, next)
)

app.get('/health', (req, res) => {
  res.status(200).send('OK');
})

mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=${process.env.DATABASE_APP_NAME}`,
  {
    family: 4
  },
  mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error)
  )
)

const server = app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
})