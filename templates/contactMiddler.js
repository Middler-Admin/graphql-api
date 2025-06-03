exports.contactMiddler = (email, message) => {
  return {
    Source: `Middler <support@middler.com>`,
    Destination: {
      ToAddresses: ['support@middler.com'],
    },
    Message: {
      Subject: {
        Data: 'User Inquiry',
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
          <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

          <head>
              <meta charset="UTF-8" />
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <!--[if !mso]><!-- -->
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <!--<![endif]-->
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="format-detection" content="telephone=no" />
              <meta name="format-detection" content="date=no" />
              <meta name="format-detection" content="address=no" />
              <meta name="format-detection" content="email=no" />
              <meta name="x-apple-disable-message-reformatting" />
              <title>Untitled</title>
              <!-- Made with Postcards by Designmodo https://designmodo.com/postcards -->
              <style>
                  :root {
                      --bg-color-light: #f4f4f4;
                      --bg-color-dark: #121212;
                      --text-color-light: #2d3a41;
                      --text-color-dark: #e1e1e1;
                      --card-bg-color-light: #ffffff;
                      --card-bg-color-dark: #1f1f1f;
                      --highlight-text-color-light: #151515;
                      --highlight-text-color-dark: #f5f5f5;
                      --subtext-color-light: #9b9b9b;
                      --subtext-color-dark: #b3b3b3;
                  }

                  @media (prefers-color-scheme: dark) {
                      :root {
                          --bg-color: var(--bg-color-dark);
                          --text-color: var(--text-color-dark);
                          --card-bg-color: var(--card-bg-color-dark);
                          --highlight-text-color: var(--highlight-text-color-dark);
                          --subtext-color: var(--subtext-color-dark);
                      }
                  }

                  @media (prefers-color-scheme: light) {
                      :root {
                          --bg-color: var(--bg-color-light);
                          --text-color: var(--text-color-light);
                          --card-bg-color: var(--card-bg-color-light);
                          --highlight-text-color: var(--highlight-text-color-light);
                          --subtext-color: var(--subtext-color-light);
                      }
                  }

                  html,
                  body {
                      margin: 0 !important;
                      padding: 0 !important;
                      min-height: 100% !important;
                      width: 100% !important;
                      -webkit-font-smoothing: antialiased;
                      background-color: var(--bg-color);
                      color: var(--text-color);
                  }

                  #outlook a {
                      padding: 0;
                  }

                  .ReadMsgBody,
                  .ExternalClass {
                      width: 100%;
                  }

                  table,
                  td,
                  th {
                      mso-table-lspace: 0 !important;
                      mso-table-rspace: 0 !important;
                      border-collapse: collapse;
                  }

                  img {
                      border: 0;
                      outline: 0;
                      line-height: 100%;
                      text-decoration: none;
                      -ms-interpolation-mode: bicubic;
                  }

                  a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: none !important;
                  }

                  .pc-project-body {
                      background-color: var(--bg-color) !important;
                  }

                  .pc-card {
                      background-color: var(--card-bg-color);
                      color: var(--text-color);
                      padding: 40px;
                      border-radius: 0px;
                  }

                  .highlight-text {
                      color: var(--highlight-text-color);
                      font-weight: bold;
                  }

                  .subtext {
                      color: var(--subtext-color);
                      font-size: 18px;
                  }
              </style>
          </head>

          <body class="body pc-font-alt" style="line-height: 1.5; mso-line-height-rule: exactly; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale;">
              <table class="pc-project-body" style="table-layout: fixed; min-width: 600px;" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                      <td align="center" valign="top">
                          <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                  <td style="padding: 20px 0;" align="left" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                          <tr>
                                              <td valign="top">
                                                  <!-- BEGIN MODULE: Feature 1 -->
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                      <tr>
                                                          <td>
                                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                                  <tr>
                                                                      <td valign="top" class="pc-card">
                                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                              <tr>
                                                                                  <td align="left" valign="top" style="padding: 0 0 10px;">
                                                                                      <div class="highlight-text">Inquiry.</div>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td align="left" valign="top" style="padding: 0 0 42px;">
                                                                                      <div class="subtext">A user has sent an inquiry</div>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <!-- END MODULE: Feature 1 -->
                                              </td>
                                          </tr>
                                          <tr>
                                              <td valign="top">
                                                  <!-- BEGIN MODULE: Content 14 -->
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                      <tr>
                                                          <td>
                                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                                  <tr>
                                                                      <td valign="top" class="pc-card" style="padding: 10px 40px;">
                                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                              <tr>
                                                                                  <td align="center" valign="top" style="padding: 0 0 20px;">
                                                                                      <div class="subtext">${message}</div>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td valign="top" align="center">
                                                                                      <div class="highlight-text">${email}</div>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td valign="top" align="center">
                                                                                      <div class="subtext">Email</div>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <!-- END MODULE: Content 14 -->
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
              <!-- Fix for Gmail on iOS -->
              <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp;</div>
          </body>

          </html>
          `,
        },
      },
    },
  };
};
