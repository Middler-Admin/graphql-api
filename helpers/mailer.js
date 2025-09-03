const sgMail = require('@sendgrid/mail');

if (!process.env.SENDGRID_API_KEY) {
  console.warn('[mailer] SENDGRID_API_KEY is not set. Emails will fail.');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(params) {
  const from = normalizeFrom(
    params.Source || process.env.SENDGRID_DEFAULT_FROM || process.env.SENDGRID_FROM
  );
  const to = list(params.Destination?.ToAddresses).map(asEmailObj);
  const cc = list(params.Destination?.CcAddresses).map(asEmailObj);
  const bcc = list(params.Destination?.BccAddresses).map(asEmailObj);
  const subject = params.Message?.Subject?.Data || '';
  const text = params.Message?.Body?.Text?.Data;
  const html = params.Message?.Body?.Html?.Data;
  const replyTo = normalizeFrom(params.ReplyToAddresses?.[0]);

  const attachments = (params.Attachments || []).map(a => ({
    content: a.Content || a.Data || a.content,
    filename: a.Name || a.filename || 'attachment',
    type: a.ContentType || a.type || 'application/octet-stream',
    disposition: 'attachment'
  }));

  if (!from) throw new Error('[mailer] Missing From (Source or SENDGRID_DEFAULT_FROM)');
  if (!to.length) throw new Error('[mailer] Missing ToAddresses');

  const msg = {
    from,
    personalizations: [{ to, cc: cc.length ? cc : undefined, bcc: bcc.length ? bcc : undefined, subject }],
    text,
    html,
    replyTo: replyTo || undefined,
    attachments: attachments.length ? attachments : undefined
  };

  const [res] = await sgMail.send(msg, false);
  return res;
}

function list(v) { return Array.isArray(v) ? v.filter(Boolean) : v ? [v] : []; }
function asEmailObj(s) {
  if (!s) return undefined;
  const m = /<([^>]+)>/.exec(String(s));
  return { email: m ? m[1].trim() : String(s).trim() };
}
function normalizeFrom(s) {
  if (!s) return null;
  const m = /^(.*)<([^>]+)>$/.exec(String(s));
  if (m) return { name: m[1].trim().replace(/^"|"$/g, ''), email: m[2].trim() };
  return String(s).includes('@') ? { email: String(s).trim() } : null;
}

module.exports = { sendEmail };
