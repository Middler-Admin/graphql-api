exports.thankYouForSubscribing = (email) => {
  return {
    // Source: `Middler <codecallogic@gmail.com>`,
    Source: `Middler <support@middler.com>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: 'Get Discount',
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: 'Thanks for submitting your email on Middler! Enjoy 10% off on your order from Five Star Painting.',
          Charset: 'UTF-8',
        },
        Html: {
          Charset: 'UTF-8',
          Data: `
          <html xmlns="https://www.w3.org/1999/xhtml">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="format-detection" content="telephone=no" />
              <title>Thank You for Submitting Your Email!</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                  padding: 20px;
                }
                .email-container {
                  background-color: #ffffff;
                  padding: 30px;
                  border-radius: 5px;
                  max-width: 600px;
                  margin: auto;
                }
                .email-header {
                  text-align: center;
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 20px;
                  color: #1D42F3;
                }
                .email-body {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-bottom: 20px;
                }
                .footer {
                  text-align: center;
                  font-size: 12px;
                  color: #888;
                  margin-top: 30px;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="email-header">
                  Thanks for submitting your email on Middler!
                </div>
                <div class="email-body">
                  <p>Enjoy 10% off on your order from Five Star Painting.</p>
                </div>
                <div class="footer">
                  <p>If you have any questions, feel free to contact us at <a href="mailto:support@middler.com">support@middler.com</a>.</p>
                  <p>&copy; 2025 Middler. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
          `,
        },
      },
    },
  };
};
