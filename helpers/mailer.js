// helpers/mailer.js
const sgMail = require('@sendgrid/mail')

// Load and validate API key
const API_KEY = (process.env.SENDGRID_API_KEY || '').trim()
if (!API_KEY) {
  console.warn('[mailer] SENDGRID_API_KEY is not set. Emails will fail.')
} else {
  sgMail.setApiKey(API_KEY)
}

// Optional sandbox flag: set SENDGRID_SANDBOX=true to test without sending
const SANDBOX = String(process.env.SENDGRID_SANDBOX || '').toLowerCase() === 'true'

// Default From
const DEFAULT_FROM =
  process.env.SENDGRID_DEFAULT_FROM ||
  process.env.SENDGRID_FROM || // fallback if you used a different name
  ''

function list(v) {
  return Array.isArray(v) ? v.filter(Boolean) : v ? [v] : []
}

function asEmailObj(s) {
  if (!s) return undefined
  const str = String(s).trim()
  // Support "Name <email@x.com>"
  const m = /^(.*)<([^>]+)>$/.exec(str)
  if (m) {
    const name = m[1].trim().replace(/^"|"$/g, '')
    const email = m[2].trim()
    return name ? { email, name } : { email }
  }
  // Plain email
  return { email: str }
}

function normalizeFrom(s) {
  const src = (s || DEFAULT_FROM || '').trim()
  if (!src) return null
  return asEmailObj(src)
}

function toBase64(content) {
  if (content == null) return ''
  // If it decodes to valid base64, leave it. Otherwise, encode.
  // Quick heuristic: only base64 chars and divisible by 4
  const str = Buffer.isBuffer(content) ? content.toString('base64') : String(content)
  const looksLikeB64 = /^[A-Za-z0-9+/=\s]+$/.test(str) && str.replace(/\s+/g, '').length % 4 === 0
  return Buffer.isBuffer(content)
    ? content.toString('base64')
    : looksLikeB64
      ? str
      : Buffer.from(str, 'utf8').toString('base64')
}

/**
 * Send an email using SES-style params mapped to SendGrid.
 * Expected shape (SES-like):
 *  - Source
 *  - Destination.{ToAddresses[], CcAddresses[], BccAddresses[]}
 *  - Message.{Subject.Data, Body.{Text.Data, Html.Data}}
 *  - ReplyToAddresses[]
 *  - Attachments[] with { Content|Data|content, Name|filename, ContentType|type }
 */
async function sendEmail(params) {
  if (!API_KEY) throw new Error('[mailer] Missing SENDGRID_API_KEY')

  const from = normalizeFrom(params.Source)
  if (!from || !from.email) {
    throw new Error('[mailer] Missing valid From. Set Source or SENDGRID_DEFAULT_FROM to a verified sender.')
  }

  const to = list(params.Destination?.ToAddresses).map(asEmailObj).filter(Boolean)
  const cc = list(params.Destination?.CcAddresses).map(asEmailObj).filter(Boolean)
  const bcc = list(params.Destination?.BccAddresses).map(asEmailObj).filter(Boolean)

  if (!to.length) throw new Error('[mailer] Missing ToAddresses')

  const subject = params.Message?.Subject?.Data || ''
  const text = params.Message?.Body?.Text?.Data
  const html = params.Message?.Body?.Html?.Data
  const replyToRaw = list(params.ReplyToAddresses)[0]
  const replyTo = replyToRaw ? asEmailObj(replyToRaw) : undefined

  const attachments = (params.Attachments || []).map(a => {
    const content = a?.Content ?? a?.Data ?? a?.content
    const filename = a?.Name ?? a?.filename ?? 'attachment'
    const type = a?.ContentType ?? a?.type ?? 'application/octet-stream'
    return {
      filename,
      type,
      disposition: 'attachment',
      content: toBase64(content),
    }
  })

  // Build message
  const msg = {
    from,
    personalizations: [
      {
        to,
        cc: cc.length ? cc : undefined,
        bcc: bcc.length ? bcc : undefined,
        subject,
      },
    ],
    text,
    html,
    replyTo,
    attachments: attachments.length ? attachments : undefined,
    mailSettings: SANDBOX ? { sandboxMode: { enable: true } } : undefined,
  }

  try {
    const [res] = await sgMail.send(msg, false)
    return {
      statusCode: res?.statusCode,
      messageId: res?.headers?.['x-message-id'],
    }
  } catch (e) {
    const code = e?.code || e?.response?.statusCode
    const body = e?.response?.body
    const reason = Array.isArray(body?.errors) ? body.errors.map(er => er.message || er).join(' | ') : ''
    // Log with detail so you see the *exact* SendGrid reason
    console.error('[mailer] SendGrid error', {
      code,
      errors: body?.errors,
    })

    // Helpful mapping for common 403 causes
    if (code === 403) {
      throw new Error(
        `[mailer] Forbidden by SendGrid. Likely causes: ` +
        `1) From not a verified sender, ` +
        `2) Domain not authenticated, ` +
        `3) API key missing "Mail Send". ` +
        `Details: ${reason || 'no body from API'}`
      )
    }
    if (code === 401) {
      throw new Error(`[mailer] Unauthorized. Bad/old API key or not provided. Details: ${reason || 'no body from API'}`)
    }
    throw e
  }
}

module.exports = { sendEmail }
