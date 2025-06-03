const express = require('express')
const router = express.Router()
const stripeWebhookController = require('../controllers/webhookController')

router.post('/stripe-webhook', express.raw({ type: 'application/json' }), stripeWebhookController.handleWebhook);

module.exports = router;