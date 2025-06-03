exports.sendEstimateMinimal = (
  id,
  userID,
  clientURL,
  email,
  businessLogo,
  businessName,
  estimatorName,
  businessEmail,
  businessPhone,
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
  interiorItems,
  interiorIndividualItems,
  doorsAndDrawers,
  exteriorSquareFeet,
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
  return {
    Source: `Middler <estimate@middler.com>`,
    Destination: {
      ToAddresses: [email],
    },
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
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="https://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

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
          <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Poppins:ital,wght@0,400;0,400;0,600" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Fira+Sans:ital,wght@0,400;0,400;0,500;0,700" rel="stylesheet" />
          <title>Middler</title>
          <!-- Made with Postcards by Designmodo https://designmodo.com/postcards -->
          <!--[if !mso]><!-- -->
          <style>
          @media  all {
                                                          /* cyrillic-ext */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmojLazX3dGTP.woff2) format('woff2');
                          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                      }
                      /* cyrillic */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
                          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                      }
                      /* latin-ext */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmYjLazX3dGTP.woff2) format('woff2');
                          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                      }
                      /* latin */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
                          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                      }
                                              /* cyrillic-ext */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 500;
                          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSxf6Xl7Gl3LX.woff2) format('woff2');
                          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                      }
                      /* cyrillic */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 500;
                          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
                          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                      }
                      /* latin-ext */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 500;
                          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSBf6Xl7Gl3LX.woff2) format('woff2');
                          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                      }
                      /* latin */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 500;
                          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
                          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                      }
                                              /* cyrillic-ext */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSxf6Xl7Gl3LX.woff2) format('woff2');
                          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                      }
                      /* cyrillic */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2');
                          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                      }
                      /* latin-ext */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSBf6Xl7Gl3LX.woff2) format('woff2');
                          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                      }
                      /* latin */
                      @font-face {
                          font-family: 'Fira Sans';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2');
                          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                      }
                                          }
          </style>
          <!--<![endif]-->
          <style>
          html,
                  body {
                      margin: 0 !important;
                      padding: 0 !important;
                      min-height: 100% !important;
                      width: 100% !important;
                      -webkit-font-smoothing: antialiased;
                  }

                  * {
                      -ms-text-size-adjust: 100%;
                  }

                  #outlook a {
                      padding: 0;
                  }

                  .ReadMsgBody,
                  .ExternalClass {
                      width: 100%;
                  }

                  .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass td,
                  .ExternalClass div,
                  .ExternalClass span,
                  .ExternalClass font {
                      line-height: 100%;
                  }

                  table,
                  td,
                  th {
                      mso-table-lspace: 0 !important;
                      mso-table-rspace: 0 !important;
                      border-collapse: collapse;
                  }

                  u + .body table, u + .body td, u + .body th {
                      will-change: transform;
                  }

                  body, td, th, p, div, li, a, span {
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                      mso-line-height-rule: exactly;
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

                  .pc-gmail-fix {
                      display: none;
                      display: none !important;
                  }

                  .body .pc-project-body {
                      background-color: transparent !important;
                  }

                  @media (min-width: 621px) {
                      .pc-lg-hide {
                          display: none;
                      } 

                      .pc-lg-bg-img-hide {
                          background-image: none !important;
                      }
                  }
          </style>
          <style>
          @media (max-width: 620px) {
          .pc-project-body {min-width: 0px !important;}
          .pc-project-container {width: 100% !important;}
          .pc-sm-hide {display: none !important;}
          .pc-sm-bg-img-hide {background-image: none !important;}
          .pc-w620-width-120 {width: 120px !important;}
          .pc-w620-height-auto {height: auto !important;}
          .pc-w620-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
          .pc-w620-padding-32-24-32-24 {padding: 32px 24px 32px 24px !important;}
          table.pc-w620-spacing-0-0-0-0 {margin: 0px 0px 0px 0px !important;}
          td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin: 0 !important;padding: 0px 0px 0px 0px !important;}
          .pc-w620-width-80 {width: 80px !important;}
          .pc-w620-fontSize-32px {font-size: 32px !important;}
          .pc-w620-lineHeight-120pc {line-height: 120% !important;}
          table.pc-w620-spacing-0-0-16-0 {margin: 0px 0px 16px 0px !important;}
          td.pc-w620-spacing-0-0-16-0,th.pc-w620-spacing-0-0-16-0{margin: 0 !important;padding: 0px 0px 16px 0px !important;}
          .pc-w620-padding-0-0-0-0 {padding: 0px 0px 0px 0px !important;}
          .pc-w620-fontSize-14px {font-size: 14px !important;}
          .pc-w620-lineHeight-140pc {line-height: 140% !important;}
          .pc-w620-radius-16-16-16-16 {border-radius: 16px 16px 16px 16px !important;}
          .pc-w620-itemsSpacings-0-30 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 15px !important;padding-bottom: 15px !important;}
          table.pc-w620-spacing-0-0-32-0 {margin: 0px 0px 32px 0px !important;}
          td.pc-w620-spacing-0-0-32-0,th.pc-w620-spacing-0-0-32-0{margin: 0 !important;padding: 0px 0px 32px 0px !important;}
          .pc-w620-itemsSpacings-0-8 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 4px !important;padding-bottom: 4px !important;}
          .pc-w620-width-fill {width: 100% !important;}
          .pc-w620-padding-12-0-12-0 {padding: 12px 0px 12px 0px !important;}
          .pc-w620-fontSize-20px {font-size: 20px !important;}
          .pc-w620-padding-0-0-40-0 {padding: 0px 0px 40px 0px !important;}
          table.pc-w620-spacing-16-0-24-0 {margin: 16px 0px 24px 0px !important;}
          td.pc-w620-spacing-16-0-24-0,th.pc-w620-spacing-16-0-24-0{margin: 0 !important;padding: 16px 0px 24px 0px !important;}
          .pc-w620-padding-0-50-0-50 {padding: 0px 50px 0px 50px !important;}
          .pc-w620-padding-32-16-0-16 {padding: 32px 16px 0px 16px !important;}
          .pc-w620-itemsSpacings-0-20 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 10px !important;padding-bottom: 10px !important;}
          .pc-w620-dir-ltr {direction: ltr !important;}
          .pc-w620-valign-top {vertical-align: top !important;}
          td.pc-w620-halign-center,th.pc-w620-halign-center {text-align: center !important;}
          table.pc-w620-halign-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
          img.pc-w620-halign-center {margin-right: auto !important;margin-left: auto !important;}
          .pc-w620-padding-0-40-40-40 {padding: 0px 40px 40px 40px !important;}
          .pc-w620-itemsSpacings-0-16 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 8px !important;padding-bottom: 8px !important;}
          div.pc-w620-align-center,th.pc-w620-align-center,a.pc-w620-align-center,td.pc-w620-align-center {text-align: center !important;text-align-last: center !important;}
          table.pc-w620-align-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
          img.pc-w620-align-center {margin-right: auto !important;margin-left: auto !important;}
          .pc-w620-width-56 {width: 56px !important;}
          div.pc-w620-textAlign-center,th.pc-w620-textAlign-center,a.pc-w620-textAlign-center,td.pc-w620-textAlign-center {text-align: center !important;text-align-last: center !important;}
          table.pc-w620-textAlign-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
          img.pc-w620-textAlign-center {margin-right: auto !important;margin-left: auto !important;}
          .pc-w620-lineHeight-24 {line-height: 24px !important;}
          .pc-w620-itemsSpacings-0-15 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 7.5px !important;padding-bottom: 7.5px !important;}
          .pc-w620-valign-bottom {vertical-align: bottom !important;}
          .pc-w620-fontSize-16px {font-size: 16px !important;}
          .pc-w620-width-100pc {width: 100% !important;}
          .pc-w620-padding-0-16-0-16 {padding: 0px 16px 0px 16px !important;}
          .pc-w620-height-1 {height: 1px !important;}
          .pc-w620-itemsSpacings-0-24 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 12px !important;padding-bottom: 12px !important;}
          .pc-w620-valign-middle {vertical-align: middle !important;}

          .pc-w620-width-hug {width: auto !important;}
          .pc-w620-width-140 {width: 140px !important;}
          .pc-w620-itemsSpacings-40-0 {padding-left: 20px !important;padding-right: 20px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
          .pc-w620-itemsSpacings-10-0 {padding-left: 5px !important;padding-right: 5px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
          .pc-w620-padding-32-32-32-32 {padding: 32px 32px 32px 32px !important;}

          .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
          .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
          .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
          .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;}
          .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
          .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
          .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
          .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}

          .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
          .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
          .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
          .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}

          .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
          .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
          .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
          .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
          .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
          .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
          }
          @media (max-width: 520px) {
          .pc-w520-padding-25-25-25-25 {padding: 25px 25px 25px 25px !important;}
          }
          </style>
          <!--[if !mso]><!-- -->
          <style>
          @media all { @font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w3aXw.woff') format('woff'), url('https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w3aXo.woff2') format('woff2'); } @font-face { font-family: 'Poppins'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1JlEw.woff') format('woff'), url('https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1JlFQ.woff2') format('woff2'); } @font-face { font-family: 'Poppins'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJnedA.woff') format('woff'), url('https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJnecg.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjN.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjL.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6.woff2') format('woff2'); } }
          </style>
          <!--<![endif]-->
          <!--[if mso]>
              <style type="text/css">
                  .pc-font-alt {
                      font-family: Arial, Helvetica, sans-serif !important;
                  }
              </style>
              <![endif]-->
          <!--[if gte mso 9]>
              <xml>
                  <o:OfficeDocumentSettings>
                      <o:AllowPNG/>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
          </head>

          <body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #ffffff;" bgcolor="#ffffff">
          <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #ffffff;" bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
            <tr>
            <td align="center" valign="top">
              <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
                  <tr>
                  <td valign="top">
                    <!-- BEGIN MODULE: Estimate -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tr>
                      <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse: separate; border-spacing: 0px;">
                        <tr>
                        <td valign="top" class="pc-w620-padding-32-16-0-16" style="padding: 0px 0px 0px 0px; border-radius: 0px; background-color: #f8f9fd;" bgcolor="#f8f9fd">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding: 0px 0px 30px 0px;">
                            <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr class="pc-grid-tr-first pc-grid-tr-last">
                              <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="center" valign="top" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                              </td>
                              </tr>
                            </table>
                            </td>
                          </tr>
                          </table>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding: 0px 20px 0px 20px;">
                            <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr class="pc-grid-tr-first pc-grid-tr-last">
                              <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                                <tr>
                                  <td align="left" valign="top" style="padding: 20px 10px 20px 10px; border-top: 1px solid #417CD6; border-right: 1px solid #417CD6; border-bottom: 1px solid #417CD6; border-left: 1px solid #417CD6;">
                                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                    <tr>
                                    <td align="left" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="left" style="border-collapse: separate; border-spacing: 0;">
                                      <tr>
                                        <td valign="top" align="left">
                                        <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 22px; font-weight: normal; font-variant-ligatures: normal; color: #333333; text-align: left; text-align-last: left;">
                                          <div><span style="font-weight: 700;font-style: normal;">Estimates</span>
                                          </div>
                                        </div>
                                        </td>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td align="left" valign="top">
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td style="padding: 20px 0px 0px 0px; ">
                                        <table class="pc-width-fill pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                                          <tbody>
                                          <tr align="center" valign="middle">
                                            <td align="center" valign="middle" style="padding: 10px 10px 10px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                              <tr>
                                              <td valign="top" align="center">
                                                <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; font-variant-ligatures: normal; color: #535a6e; text-transform: uppercase; text-align: center; text-align-last: center;">
                                                <div><span style="text-transform: uppercase;font-weight: 700;font-style: normal;color: rgb(83, 90, 110);">Interior Total</span>
                                                </div>
                                                </div>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                            <td width="121" valign="middle">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tr>
                                              <td style="padding: 10px 10px 10px 10px;" align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                                <tr>
                                                  <td valign="top" align="center">
                                                  <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; font-variant-ligatures: normal; color: #535a6e; text-transform: uppercase; text-align: center; text-align-last: center;">
                                                    <div><span style="text-transform: uppercase;font-weight: 700;font-style: normal;color: rgb(83, 90, 110);">Exterior Total</span>
                                                    </div>
                                                  </div>
                                                  </td>
                                                </tr>
                                                </table>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                            <td width="126" valign="middle">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tr>
                                              <td style="padding: 10px 10px 10px 10px;" align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                                <tr>
                                                  <td valign="top" align="center">
                                                  <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; font-variant-ligatures: normal; color: #535a6e; text-transform: uppercase; text-align: center; text-align-last: center;">
                                                    <div><span style="text-transform: uppercase;font-weight: 700;font-style: normal;color: rgb(83, 90, 110);">Cabinet Total</span>
                                                    </div>
                                                  </div>
                                                  </td>
                                                </tr>
                                                </table>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                            <td width="172" valign="middle">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tr>
                                              <td style="padding: 10px 10px 10px 10px;" align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                                <tr>
                                                  <td valign="top" align="center">
                                                  <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; font-variant-ligatures: normal; color: #535a6e; text-transform: uppercase; text-align: center; text-align-last: center;">
                                                    <div><span style="text-transform: uppercase;font-weight: 700;font-style: normal;color: rgb(83, 90, 110);">Total</span>
                                                    </div>
                                                  </div>
                                                  </td>
                                                </tr>
                                                </table>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                          </tr>
                                          <tr align="center" valign="middle">
                                            <td align="center" valign="middle" style="padding: 10px 10px 10px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                              <tr>
                                              <td valign="top" align="center">
                                                <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold; font-variant-ligatures: normal; color: #1d42f3; text-align: center; text-align-last: center;">
                                                <div><span style="font-weight: 700;font-style: normal;color: rgb(29, 66, 243);">$${interiorTotal}</span>
                                                </div>
                                                </div>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                            <td width="121" valign="middle">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tr>
                                              <td style="padding: 10px 10px 10px 10px;" align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                                <tr>
                                                  <td valign="top" align="center">
                                                  <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold; font-variant-ligatures: normal; color: #1d42f3; text-align: center; text-align-last: center;">
                                                    <div><span style="font-weight: 700;font-style: normal;color: rgb(29, 66, 243);">$${exteriorTotal}</span>
                                                    </div>
                                                  </div>
                                                  </td>
                                                </tr>
                                                </table>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                            <td width="126" valign="middle">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tr>
                                              <td style="padding: 10px 10px 10px 10px;" align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                                <tr>
                                                  <td valign="top" align="center">
                                                  <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold; font-variant-ligatures: normal; color: #1d42f3; text-align: center; text-align-last: center;">
                                                    <div><span style="font-weight: 700;font-style: normal;color: rgb(29, 66, 243);">$${cabinetTotal}</span>
                                                    </div>
                                                  </div>
                                                  </td>
                                                </tr>
                                                </table>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                            <td width="172" valign="middle">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tr>
                                              <td style="padding: 10px 10px 10px 10px;" align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                                <tr>
                                                  <td valign="top" align="center">
                                                  <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold; font-variant-ligatures: normal; color: #1d42f3; text-align: center; text-align-last: center;">
                                                    <div><span style="font-weight: 700;font-style: normal;color: rgb(29, 66, 243);">$${total}</span>
                                                    </div>
                                                  </div>
                                                  </td>
                                                </tr>
                                                </table>
                                              </td>
                                              </tr>
                                            </table>
                                            </td>
                                          </tr>
                                          </tbody>
                                        </table>
                                        </td>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                  </table>
                                  </td>
                                </tr>
                                </table>
                              </td>
                              </tr>
                            </table>
                            </td>
                          </tr>
                          </table>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td class="pc-w620-spacing-0-0-32-0" align="center" valign="top" style="padding: 30px 0px 48px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                              <tr>
                              <td valign="top" class="pc-w620-padding-0-0-0-0" align="center" style="padding: 20px 30px 0px 0px;">
                                <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #2d2d2f; text-align: center; text-align-last: center;">
                                <div><span>We would like to thank you for the opportunity to provide you with our estimate for your project and hope that we will be able to complete it for you to our highest standards. Please find below a link to a detailed summary of the job and our estimate. If you have any questions please do not hesitate to contact us. Again we sincerely appreciate the opportunity to estimate your project and look forward to working together.</span>
                                </div>
                                </div>
                              </td>
                              </tr>
                            </table>
                            </td>
                          </tr>
                          </table>
                          
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td>
                            <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr class="pc-grid-tr-first pc-grid-tr-last">
                              <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                                <tr>
                                  <td class="pc-w620-padding-0-0-40-0" align="center" valign="middle" style="padding: 0px 0px 24px 0px; background-color: #e9efff;">
                                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                    <tr>
                                    <td align="center" valign="top">
                                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td class="pc-w620-spacing-16-0-24-0" valign="top" style="padding: 16px 0px 24px 0px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="border-collapse: separate; border-spacing: 0;">
                                          <tr>
                                          <td valign="top" class="pc-w620-padding-0-50-0-50" align="center">
                                            <div class="pc-font-alt pc-w620-lineHeight-120pc" style="line-height: 140%; letter-spacing: -0px; font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 32px; font-weight: bold; font-variant-ligatures: normal; color: #030303; text-transform: capitalize; text-align: center; text-align-last: center;">
                                            <div><span style="color: #030303;">See full details of your job.</span>
                                            </div>
                                            </div>
                                          </td>
                                          </tr>
                                        </table>
                                        </td>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td align="center" valign="top">
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <th valign="top" align="center" style="text-align: center; font-weight: normal; line-height: 1;">
                                        <!--[if mso]>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                          <td valign="middle" align="center" style="border-radius: 8px; background-color: #5c6ef0; text-align:center; color: #ffffff; padding: 14px 19px 14px 19px; mso-padding-left-alt: 0; margin-left:19px;" bgcolor="#5c6ef0">
                                              <a href="${clientURL}/estimate/${id}?painter=${userID}" class="pc-font-alt" style="display: inline-block; text-decoration: none; font-variant-ligatures: normal; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: -0.2px; text-align: center; color: #ffffff;" href="https://designmodo.com/postcards" target="_blank"><span style="display: block;"><span>Click here</span></span></a>
                                          </td>
                      </tr>
                  </table>
                  <![endif]-->
                                        <!--[if !mso]><!-- -->
                                        <a href="${clientURL}/estimate/${id}?painter=${userID}" style="display: inline-block; box-sizing: border-box; border-radius: 8px; background-color: #5c6ef0; padding: 14px 19px 14px 19px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: -0.2px; color: #ffffff; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="https://designmodo.com/postcards" target="_blank"><span style="display: block;"><span>Click here</span></span></a>
                                        <!--<![endif]-->
                                        </th>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                  </table>
                                  </td>
                                </tr>
                                </table>
                              </td>
                              </tr>
                            </table>
                            </td>
                          </tr>
                          </table>

                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                            <td>
                            <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr class="pc-grid-tr-first pc-grid-tr-last">
                              <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="left" valign="top" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                                <tr>
                                  <td class="pc-w620-padding-0-0-40-0" align="center" valign="middle" style="padding: 0px 0px 24px 0px; background-color: #e9efff;">
                                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                    <tr>
                                    <td align="center" valign="top">
                                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td class="pc-w620-spacing-16-0-24-0" valign="top" style="padding: 16px 100px 24px 100px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="border-collapse: separate; border-spacing: 0;">
                                          <tr>
                                          <td valign="top" class="pc-w620-padding-0-50-0-50" align="center">
                                            <div class="pc-font-alt pc-w620-lineHeight-120pc" style="line-height: 140%; letter-spacing: -0px; font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 500; font-variant-ligatures: normal; color: #030303; text-transform: capitalize; text-align: center; text-align-last: center;">
                                            <div><span style="color: #030303;">This is a Certified Middler Estimate. Click the image for more details on what this means.</span>
                                            </div>
                                            </div>
                                          </td>
                                          </tr>
                                        </table>
                                        </td>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td align="center" valign="top">
                                    <tr>
                                      <td align="center" valign="top" style="padding: 0px 16px 30px 16px; mso-padding-left-alt: 0; margin-left:16px;">
                                      <a href="https://middler.com">
                                        <img src="${clientURL}/assets/seal.png" class="pc-w620-radius-16-16-16-16" width="142" height="auto" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:25%; height: auto; border-radius: 8px 8px 8px 8px; border: 0;" />
                                      </a>
                                      </td>
                                    </tr>
                                    </td>
                                    </tr>
                                  </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="pc-w620-padding-0-0-40-0" align="center" valign="middle" style="padding: 0px 0px 24px 0px; background-color: #e9efff;">
                                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                    <tr>
                                    <td align="center" valign="top">
                                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td class="pc-w620-spacing-16-0-24-0" valign="top" style="padding: 16px 100px 24px 100px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="border-collapse: separate; border-spacing: 0;">
                                          <tr>
                                          <td valign="top" class="pc-w620-padding-0-50-0-50" align="center">
                                            <div class="pc-font-alt pc-w620-lineHeight-120pc" style="line-height: 140%; letter-spacing: -0px; font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 500; font-variant-ligatures: normal; color: #030303; text-transform: capitalize; text-align: center; text-align-last: center;">
                                            <div><span style="color: #030303;">Only use the best paints in the industry.</span>
                                            </div>
                                            </div>
                                          </td>
                                          </tr>
                                        </table>
                                        </td>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                    <tr>
                                      <td align="center" valign="top">
                                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                          <tr>
                                            <!-- First Row -->
                                            <td align="center" valign="top" style="padding: 10px;">
                                              <div style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                                <img src="${clientURL}/assets/sherman-williams.png" alt="Sherman Williams" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
                                              </div>
                                            </td>
                                            <td align="center" valign="top" style="padding: 10px;">
                                              <div style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                                <img src="${clientURL}/assets/behr.png" alt="Paint Company 1" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
                                              </div>
                                            </td>
                                            <td align="center" valign="top" style="padding: 10px;">
                                              <div style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                                <img src="${clientURL}/assets/benjamin-moore.png" alt="Paint Company 2" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <!-- Second Row -->
                                            <td align="center" valign="top" style="padding: 10px;">
                                              <div style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                                <img src="${clientURL}/assets/dunn-edwards.png" alt="Paint Company 3" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
                                              </div>
                                            </td>
                                            <td align="center" valign="top" style="padding: 10px;">
                                              <div style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                                <img src="${clientURL}/assets/ppg.png" alt="Paint Company 4" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
                                              </div>
                                            </td>
                                            <td align="center" valign="top" style="padding: 10px;">
                                              <div style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                                <img src="${clientURL}/assets/valspar.png" alt="Paint Company 5" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>                                                                        
                                  </table>
                                  </td>
                                </tr>
                                </table>
                              </td>
                              </tr>
                            </table>
                            </td>
                          </tr>
                          </table>
                          
                        </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    </table>
                    <!-- END MODULE: Estimate -->
                  </td>
                  </tr>
                  <tr>
                  <td valign="top">
                    <!-- BEGIN MODULE: Footer -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tr>
                      <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse: separate; border-spacing: 0px;">
                        <tr>
                        <!--[if !gte mso 9]><!-- -->
                        <td valign="top" class="pc-w620-padding-32-32-32-32" style="background-size: cover; background-position: center; background-repeat: no-repeat; padding: 0px 24px 32px 24px; border-radius: 0px 0px 24px 24px; background-color: #f8f9fd;" bgcolor="#f8f9fd" background="images/image-172342160469112.png">
                          <!--<![endif]-->
                          <!--[if gte mso 9]>
                          <td valign="top" align="center" style="background-size: cover; background-position: center; background-repeat: no-repeat; background-color: #f8f9fd; border-radius: 0px 0px 24px 24px;" bgcolor="#f8f9fd" background="images/image-172342160469112.png">
                      <![endif]-->
                          <!--[if gte mso 9]>
                          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                              <v:fill src="images/image-172342160469112.png" color="#f8f9fd" type="frame" size="1,1" aspect="atleast" origin="0,0" position="0,0"/>
                              <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                                  <div style="font-size: 0; line-height: 0;">
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                          <tr>
                                              <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                                  <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                      <tr>
                                                          <td colspan="3" height="0" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                          <td width="24" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                          <td valign="top" align="left">
                          <![endif]-->
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                            <td class="pc-w620-spacing-0-0-32-0" valign="top" style="padding: 0px 20px 32px 20px;mso-padding-left-alt: 0; margin-left:20px;">
                            <table class="pc-w620-width-100pc" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                              <!--[if gte mso 9]>
                              <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #d6d6d652;">&nbsp;</td>
                          <![endif]-->
                              <!--[if !gte mso 9]><!-- -->
                              <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #d6d6d652;">&nbsp;</td>
                              <!--<![endif]-->
                              </tr>
                            </table>
                            </td>
                          </tr>
                          </table>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td class="pc-w620-spacing-0-0-32-0 pc-w620-valign-middle pc-w620-halign-center" style="padding: 0px 20px 32px 20px; mso-padding-left-alt: 0; margin-left:20px;">
                            <table class="pc-width-fill pc-w620-gridCollapsed-1 pc-w620-halign-center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr class="pc-grid-tr-first pc-grid-tr-last">
                                <td class="pc-grid-td-first pc-w620-itemsSpacings-0-24" align="center" valign="middle" style="padding: 0;">
                                  <table class="pc-w620-width-fill" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0;">
                                    <tr>
                                      <td align="center" valign="middle">
                                        <img src="${clientURL}/assets/logo.png" class="pc-w620-align-center" width="60" height="60" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 60px; height: auto; max-width: 100%; border: 0;" />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>                            
                            </td>
                          </tr>
                          </table>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                            <table class="pc-width-hug pc-w620-gridCollapsed-0" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr class="pc-grid-tr-first pc-grid-tr-last">
                              <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-10-0" valign="top" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                  <td align="center" valign="top">
                                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                    <tr>
                                    <td align="center" valign="top">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td valign="top" style="padding: 0px 0px 32px 0px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                          <tr>
                                          <td valign="top" align="center">
                                            <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #2d2d2f; text-align: center; text-align-last: center;">
                                              <div><span style="font-weight: 400;font-style: normal;color: rgb(45, 45, 47);">Interested in changing the emails you get from us? Update your preferences </span><a href="https://middler.com/console" target="_blank" style="text-decoration: none; color: #2d2d2f;"><span style="text-decoration: underline;font-weight: 400;font-style: normal;color: rgb(45, 45, 47);">here</span></a><span style="font-weight: 400;font-style: normal;color: rgb(45, 45, 47);"> or unsubscribe </span><a href="https://middler.com/console" target="_blank" style="text-decoration: none; color: #2d2d2f;"><span style="text-decoration: underline;font-weight: 400;font-style: normal;color: rgb(45, 45, 47);">here</span></a><span style="font-weight: 400;font-style: normal;color: rgb(45, 45, 47);">. Our privacy policy is available </span><a href="https://middler.com/privacy-policy" target="_blank" style="text-decoration: none; color: #2d2d2f;"><span style="text-decoration: underline;font-weight: 400;font-style: normal;color: rgb(45, 45, 47);">here</span></a><span style="font-weight: 400;font-style: normal;color: rgb(45, 45, 47);">.</span>
                                              </div>
                                            </div>
                                          </td>
                                          </tr>
                                        </table>
                                        </td>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td align="center" valign="top">
                                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="border-collapse: separate; border-spacing: 0;">
                                          <tr>
                                          <td valign="top" align="center">
                                            <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0.3px; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 600; font-variant-ligatures: normal; color: #2d2d2f; text-align: center; text-align-last: center;">
                                            <div><span>Middler</span>
                                            </div>
                                            </div>
                                          </td>
                                          </tr>
                                        </table>
                                        </td>
                                      </tr>
                                      </table>
                                    </td>
                                    </tr>
                                  </table>
                                  </td>
                                </tr>
                                </table>
                              </td>
                              </tr>
                            </table>
                            </td>
                          </tr>
                          </table>
                          <!--[if gte mso 9]>
                                                          </td>
                                                          <td width="24" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                                      </tr>
                                                      <tr>
                                                          <td colspan="3" height="32" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </div>
                                  <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                              </v:textbox>
                          </v:rect>
                          <![endif]-->
                        </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    </table>
                    <!-- END MODULE: Footer -->
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
          <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </div>
          </body>
          </html>
          `,
        },
      },
    },
  };
};
