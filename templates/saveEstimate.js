exports.saveEstimate = (
  clientURL,
  email,
  interiorTotal,
  exteriorTotal,
  cabinetTotal,
  total,
  clientName,
  clientPhone,
  clientEmail,
  clientAddress,
  notesAndDisclosures,
  interiorSquareFeet,
  interiorCondition,
  interiorDetail,
  interiorItems,
  interiorIndividualItems,
  doorsAndDrawers,
  insideCabinet,
  cabinetCondition,
  cabinetDetail,
  exteriorSquareFeet,
  exteriorCondition,
  exteriorDetail,
  exteriorItems,
  exteriorIndividualItems,
  paintBrand,
  paintQuality,
  warranty,
  payments,
  deposit,
  painterTapeRolls,
  plasticRolls,
  dropCloths
) => {
  const interiorSectionHtml =
    interiorSquareFeet && interiorItems && interiorItems.length
      ? `
      <tr>
        <td style="padding: 0 20px 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; background-color: #ffffff; border: 1px solid #ddd;">
            <tr>
              <td colspan="2" style="background-color: #3366ff; color: #ffffff; padding: 15px; font-size: 18px; font-weight: bold;">
                Interior — Here are the details of what you're painting
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; width: 50%; vertical-align: top;">
                <p style="margin: 0; font-weight: bold;">Interior Sqft</p>
                <p style="margin: 0;">${interiorSquareFeet}</p><br/>
                <p style="margin: 0; font-weight: bold;">Interior Detail</p>
                <p style="margin: 0;">${interiorDetail || 'Unknown'}</p><br/>
                <p style="margin: 0; font-weight: bold;">Extras</p>
                <p style="margin: 0;">${Array.isArray(interiorIndividualItems) &&
        interiorIndividualItems.length > 0
        ? interiorIndividualItems
          .map((i) => `${i.title} - ${i.price}`)
          .join(', ')
        : '—'
      }
              </p>
              </td>
              <td style="padding: 15px; width: 50%; vertical-align: top;">
                <p style="margin: 0; font-weight: bold;">Interior Condition</p>
                <p style="margin: 0;">${interiorCondition || 'Unknown'}</p><br/>
                <p style="margin: 0; font-weight: bold;">Items to be Painted</p>
                <p style="margin: 0;">${Array.isArray(interiorItems) && interiorItems.length
        ? interiorItems
          .map(
            (i) =>
              `<span style="display: inline-block; background-color: #eeeeee; padding: 5px 10px; border-radius: 20px; font-size: 12px; margin-right: 5px;">${i.title}</span>`
          )
          .join('')
        : '—'
      }
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : '';

  const cabinetSectionHtml = doorsAndDrawers
    ? `
      <tr>
        <td style="padding: 0 20px 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; background-color: #ffffff; border: 1px solid #ddd;">
            <tr>
              <td colspan="2" style="background-color: #3366ff; color: #ffffff !important; padding: 15px; font-size: 18px; font-weight: bold; mso-style-textfill-type:solid; mso-style-textfill-fill-color:#ffffff;">
                Cabinets — Project Details
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; width: 50%; vertical-align: top;">
                <p style="margin: 0; font-weight: bold;">Number of Cabinets</p>
                <p style="margin: 0;">${doorsAndDrawers}</p>
              </td>
              <td style="padding: 15px; width: 50%; vertical-align: top;">
                <p style="margin: 0; font-weight: bold;">Cabinet Condition</p>
                <p style="margin: 0;">${cabinetCondition || 'Unknown'}</p><br/>
                <p style="margin: 0; font-weight: bold;">Cabinet Detail</p>
                <p style="margin: 0;">${cabinetDetail || 'Unknown'}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : '';

  const exteriorSectionHtml =
    exteriorSquareFeet && exteriorItems && exteriorItems.length
      ? `
      <tr>
        <td style="padding: 0 20px 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; background-color: #ffffff; border: 1px solid #ddd;">
            <tr>
              <td colspan="2" style="background-color: #3366ff; color: #ffffff; padding: 15px; font-size: 18px; font-weight: bold;">
                Exterior — What you're painting outside
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; width: 50%; vertical-align: top;">
                <p style="margin: 0; font-weight: bold;">Exterior Sqft</p>
                <p style="margin: 0;">${exteriorSquareFeet}</p><br/>
                <p style="margin: 0; font-weight: bold;">Exterior Detail</p>
                <p style="margin: 0;">${exteriorDetail || 'Unknown'}</p><br/>
                <p style="margin: 0; font-weight: bold;">Extras</p>
                <p style="margin: 0;">${Array.isArray(exteriorIndividualItems) &&
        exteriorIndividualItems.length
        ? exteriorIndividualItems
          .map((i) => `${i.title} - ${i.price}`)
          .join(', ')
        : '—'
      }
              </p>
              </td>
              <td style="padding: 15px; width: 50%; vertical-align: top;">
                <p style="margin: 0; font-weight: bold;">Exterior Condition</p>
                <p style="margin: 0;">${exteriorCondition || 'Unknown'}</p><br/>
                <p style="margin: 0; font-weight: bold;">Items to be Painted</p>
                <p style="margin: 0;">
                  ${Array.isArray(exteriorItems) && exteriorItems.length
        ? exteriorItems
          .map(
            (i) =>
              `<span style="display: inline-block; background-color: #eeeeee; padding: 5px 10px; border-radius: 20px; font-size: 12px; margin-right: 5px;">${i.title}</span>`
          )
          .join('')
        : '—'
      }
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : '';

  return {
    Source: `Middler <info@middler.com>`,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: ['no-reply@middler.com'],
    Message: {
      Subject: {
        Data: 'Painting Estimate',
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: 'Email service from Middler',
          Charset: 'UTF-8',
        },
        Html: {
          Charset: 'UTF-8',
          Data: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <title>Estimate Email</title>
                <style>
                  html, body {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                  }
                  body, table.main-wrapper {
                    background-color: #ffffff !important;
                  }
                  span, p, h1, h2, h3, h4, h5, h6 {
                    color: #000000 !important;
                  }
                </style>
              </head>
              <body style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,sans-serif;">
                <table class="main-wrapper" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 30px 0; background-color: #ffffff;">
                  <tr><td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
                      <tr><td align="center" style="padding:30px 20px 10px;font-size:24px;font-weight:bold;color:#333">Thank you for using Middler.</td></tr>
                      <tr><td align="center" style="padding:0 20px 20px;font-size:16px;color:#555555">If you have any questions, comments or feedback we would love to hear from you. Just reply to this email!</td></tr>
                      <tr><td align="center" style="padding:20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr><td align="center" style="font-size:24px;font-weight:bold;color:#000">Middler Prices</td></tr>
                          <tr><td align="center" style="font-size:14px;color:#555555">These prices include all labor, materials and paint.</td></tr>
                        </table>
                      </td></tr>

                      <!-- Price Summary -->
                      <tr>
                        <td align="center" style="padding: 0 20px 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background-color: #3366ff; color: #ffffff !important; font-weight: bold; padding: 12px 10px; border-radius: 8px 8px 0 0; font-size: 18px; mso-style-textfill-type:solid; mso-style-textfill-fill-color:#ffffff;">
                                Interior Estimate
                              </td>
                              <td style="background-color: #f9f9f9; font-size: 18px; font-weight: bold; padding: 12px 10px;">
                                $${interiorTotal}
                              </td>
                            </tr>
                            <tr><td colspan="2" height="10"></td></tr>
                            <tr>
                              <td style="background-color: #3366ff; color: #ffffff !important; font-weight: bold; padding: 12px 10px; border-radius: 8px 8px 0 0; font-size: 18px; mso-style-textfill-type:solid; mso-style-textfill-fill-color:#ffffff;">
                                Cabinets Estimate
                              </td>
                              <td style="background-color: #f9f9f9; font-size: 18px; font-weight: bold; padding: 12px 10px;">
                                $${cabinetTotal}
                              </td>
                            </tr>
                            <tr><td colspan="2" height="10"></td></tr>
                            <tr>
                              <td style="background-color: #3366ff; color: #ffffff !important; font-weight: bold; padding: 12px 10px; border-radius: 8px 8px 0 0; font-size: 18px; mso-style-textfill-type:solid; mso-style-textfill-fill-color:#ffffff;">
                                Exterior Estimate
                              </td>
                              <td style="background-color: #f9f9f9; font-size: 18px; font-weight: bold; padding: 12px 10px;">
                                $${exteriorTotal}
                              </td>
                            </tr>
                            <tr><td colspan="2" height="10"></td></tr>
                            <tr>
                              <td style="background-color: #3366ff; color: #ffffff !important; font-weight: bold; padding: 12px 10px; border-radius: 8px 8px 0 0; font-size: 18px; mso-style-textfill-type:solid; mso-style-textfill-fill-color:#ffffff;">
                                Total Estimate
                              </td>
                              <td style="background-color: #f9f9f9; font-size: 18px; font-weight: bold; padding: 12px 10px;">
                                $${total}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${interiorSectionHtml}
                      ${cabinetSectionHtml}
                      ${exteriorSectionHtml}

                     <tr>
                        <td style="padding: 0 20px 30px;">
                          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; background-color: #ffffff; border: 1px solid #ddd;">
                            <tr>
                              <td colspan="2" style="background-color: #3366ff; color: #ffffff; padding: 15px; font-size: 18px; font-weight: bold;">
                                Terms
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 15px; width: 100%; vertical-align: top;">
                                <p style="margin: 0; font-weight: bold;">Paint Brand:</p>
                                <p style="margin: 0;">${paintBrand ? String(paintBrand).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Unknown'}</p><br/>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr><td align="center" style="padding:20px;font-size:12px;color:#999">© 2025 Middler. All rights reserved.</td></tr>
                    </table>
                  </td></tr>
                </table>
              </body>
            </html>
          `,
        },
      },
    },
  };
};
