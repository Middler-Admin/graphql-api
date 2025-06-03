exports.tempPassword = (email, name, password) => {
  return {
    Source: `Middler <estimate@middler.com>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: 'Password & 3 Day Trial',
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
          <link href="https://fonts.googleapis.com/css?family=Outfit:ital,wght@0,400;0,400;1,400;0,500;0,600;1,700" rel="stylesheet" />
          <title>Appointment Reminder and Payment</title>
          <!-- Made with Postcards by Designmodo https://designmodo.com/postcards -->
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
          table.pc-w620-spacing-0-0-28-0 {margin: 0px 0px 28px 0px !important;}
          td.pc-w620-spacing-0-0-28-0,th.pc-w620-spacing-0-0-28-0{margin: 0 !important;padding: 0px 0px 28px 0px !important;}
          .pc-w620-padding-0-0-0-0 {padding: 0px 0px 0px 0px !important;}
          .pc-w620-fontSize-30 {font-size: 30px !important;}
          .pc-w620-lineHeight-40 {line-height: 40px !important;}
          .pc-w620-fontSize-16 {font-size: 16px !important;}
          .pc-w620-lineHeight-26 {line-height: 26px !important;}
          .pc-w620-fontSize-14px {font-size: 14px !important;}
          .pc-w620-width-auto {width: auto !important;}
          .pc-w620-height-auto {height: auto !important;}
          .pc-w620-width-fill {width: 100% !important;}
          .pc-w620-width-100pc {width: 100% !important;}
          table.pc-w620-spacing-0-0-0-0 {margin: 0px 0px 0px 0px !important;}
          td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin: 0 !important;padding: 0px 0px 0px 0px !important;}
          .pc-w620-padding-20-20-0-20 {padding: 20px 20px 0px 20px !important;}
          .pc-w620-fontSize-16px {font-size: 16px !important;}
          .pc-w620-padding-20-20-20-20 {padding: 20px 20px 20px 20px !important;}
          .pc-w620-padding-28-28-28-28 {padding: 28px 28px 28px 28px !important;}
          .pc-w620-padding-0-0-15-0 {padding: 0px 0px 15px 0px !important;}
          .pc-w620-lineHeight-140pc {line-height: 140% !important;}
          table.pc-w620-spacing-0-0-18-0 {margin: 0px 0px 18px 0px !important;}
          td.pc-w620-spacing-0-0-18-0,th.pc-w620-spacing-0-0-18-0{margin: 0 !important;padding: 0px 0px 18px 0px !important;}
          table.pc-w620-spacing-0-16-12-0 {margin: 0px 16px 12px 0px !important;}
          td.pc-w620-spacing-0-16-12-0,th.pc-w620-spacing-0-16-12-0{margin: 0 !important;padding: 0px 16px 12px 0px !important;}
          div.pc-w620-align-left,th.pc-w620-align-left,a.pc-w620-align-left,td.pc-w620-align-left {text-align: left !important;text-align-last: left !important;}
          table.pc-w620-align-left{float: none !important;margin-right: auto !important;margin-left: 0 !important;}
          img.pc-w620-align-left{margin-right: auto !important;margin-left: 0 !important;}
          .pc-w620-width-102 {width: 102px !important;}
          .pc-w620-height-102 {height: 102px !important;}
          table.pc-w620-spacing-0-0-4-0 {margin: 0px 0px 4px 0px !important;}
          td.pc-w620-spacing-0-0-4-0,th.pc-w620-spacing-0-0-4-0{margin: 0 !important;padding: 0px 0px 4px 0px !important;}
          table.pc-w620-spacing-0-0-12-0 {margin: 0px 0px 12px 0px !important;}
          td.pc-w620-spacing-0-0-12-0,th.pc-w620-spacing-0-0-12-0{margin: 0 !important;padding: 0px 0px 12px 0px !important;}
          .pc-w620-width-100 {width: 100px !important;}
          .pc-w620-height-100 {height: 100px !important;}
          .pc-w620-width-200 {width: 200px !important;}
          div.pc-w620-align-right,th.pc-w620-align-right,a.pc-w620-align-right,td.pc-w620-align-right {text-align: right !important;text-align-last: right !important;}
          table.pc-w620-align-right{float: none !important;margin-left: auto !important;margin-right: 0 !important;}
          img.pc-w620-align-right{margin-right: 0 !important;margin-left: auto !important;}
          .pc-w620-fontSize-20px {font-size: 20px !important;}
          .pc-w620-lineHeight-32 {line-height: 32px !important;}
          .pc-w620-padding-16-28-16-28 {padding: 16px 28px 16px 28px !important;}
          .pc-w620-fontSize-30px {font-size: 30px !important;}
          .pc-w620-itemsSpacings-16-10 {padding-left: 8px !important;padding-right: 8px !important;padding-top: 5px !important;padding-bottom: 5px !important;}
          .pc-w620-padding-28-28-20-28 {padding: 28px 28px 20px 28px !important;}
          .pc-w620-valign-middle {vertical-align: middle !important;}
          td.pc-w620-halign-center {text-align: center !important;}
          table.pc-w620-halign-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
          img.pc-w620-halign-center {margin-right: auto !important;margin-left: auto !important;}
          .pc-w620-padding-30-20-20-20 {padding: 30px 20px 20px 20px !important;}
          .pc-w620-fontSize-28px {font-size: 28px !important;}
          div.pc-w620-align-center,th.pc-w620-align-center,a.pc-w620-align-center,td.pc-w620-align-center {text-align: center !important;text-align-last: center !important;}
          table.pc-w620-align-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
          img.pc-w620-align-center {margin-right: auto !important;margin-left: auto !important;}
          .pc-w620-itemsSpacings-0-12 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 6px !important;padding-bottom: 6px !important;}
          td.pc-w620-halign-left {text-align: left !important;}
          table.pc-w620-halign-left {float: none !important;margin-right: auto !important;margin-left: 0 !important;}
          img.pc-w620-halign-left {margin-right: auto !important;margin-left: 0 !important;}
          .pc-w620-valign-bottom {vertical-align: bottom !important;}
          .pc-w620-padding-16-16-16-16 {padding: 16px 16px 16px 16px !important;}
          .pc-w620-width-410 {width: 410px !important;}
          div.pc-w620-textAlign-center,th.pc-w620-textAlign-center,a.pc-w620-textAlign-center,td.pc-w620-textAlign-center {text-align: center !important;text-align-last: center !important;}
          table.pc-w620-textAlign-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
          img.pc-w620-textAlign-center {margin-right: auto !important;margin-left: auto !important;}
          .pc-w620-padding-16-0-16-0 {padding: 16px 0px 16px 0px !important;}
          .pc-w620-itemsSpacings-0-30 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 15px !important;padding-bottom: 15px !important;}
          .pc-w620-itemsSpacings-20-12 {padding-left: 10px !important;padding-right: 10px !important;padding-top: 6px !important;padding-bottom: 6px !important;}
          .pc-w620-width-60 {width: 60px !important;}
          .pc-w620-height-60 {height: 60px !important;}
          .pc-w620-padding-20-28-30-28 {padding: 20px 28px 30px 28px !important;}
          table.pc-w620-spacing-0-0-20-0 {margin: 0px 0px 20px 0px !important;}
          td.pc-w620-spacing-0-0-20-0,th.pc-w620-spacing-0-0-20-0{margin: 0 !important;padding: 0px 0px 20px 0px !important;}
          .pc-w620-itemsSpacings-20-0 {padding-left: 10px !important;padding-right: 10px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
          .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;}
          
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
          .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
          }
          </style>
          <!--[if !mso]><!-- -->
          <style>
          @media all { @font-face { font-family: 'Outfit'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4i0FQ.woff') format('woff'), url('https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4i0Ew.woff2') format('woff2'); } @font-face { font-family: 'Outfit'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1O4i0FQ.woff') format('woff'), url('https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1O4i0Ew.woff2') format('woff2'); } @font-face { font-family: 'Outfit'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yO4i0FQ.woff') format('woff'), url('https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yO4i0Ew.woff2') format('woff2'); } }
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

          <body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #e3dad5;" bgcolor="#e3dad5">
          <table class="pc-project-body" style="table-layout: fixed; min-width: 600px;" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
            <tr>
            <td align="center" valign="top">
              <table class="pc-project-container" style="width: 600px; max-width: 600px;" width="600" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
                  <tr>
                  <td valign="top">
                    <!-- BEGIN MODULE: Header -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tr>
                      <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                        <tr>
                        <td valign="top" class="pc-w620-padding-28-28-28-28" style="padding: 24px 40px 40px 40px; border-radius: 0px; background-color: #1D42F3;" bgcolor="#1D42F3">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td class="pc-w620-spacing-0-0-28-0" align="center" valign="top" style="padding: 0px 0px 32px 0px;">
                            <img src="https://middler.com/assets/logo-white.png" class="" width="80" height="51" alt="" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:80px; height: auto; max-width: 100%;" />
                            </td>
                          </tr>
                          </table>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center" valign="top" style="padding: 0px 0px 12px 0px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                              <tr>
                              <td valign="top" align="center" style="padding: 0px 0px 0px 0px;">
                                <div class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40" style="line-height: 128%; letter-spacing: -0.2px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 38px; font-weight: 500; font-variant-ligatures: normal; color: #ffffff; text-align: center; text-align-last: center; text-transform: capitalize;">
                                <div><span>3 Day Free Trial!</span>
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
                            <td align="left" valign="top" style="padding: 0px 0px 12px 0px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                              <tr>
                              <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                                <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" style="line-height: 156%; letter-spacing: -0.2px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 19px; font-weight: normal; font-variant-ligatures: normal; color: #ffffff; text-align: left; text-align-last: left;">
                                <div><span>Hello ${name},</span>
                                </div>
                                <div><span>﻿</span>
                                </div>
                                <div><span>Every time you give an estimate with Middler you’re building your reputation as a leader in the painting industry because your estimates are trustworthy, consistent and accurate every time.</span>
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
                            <table class="pc-width-fill pc-w620-tableCollapsed-1" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" style="border-collapse: separate; border-spacing: 0; width: 100%; background-color:#ffffff; border-radius: 8px 8px 8px 8px;">
                              <tbody>
                              <tr>
                                <td class="pc-w620-width-100pc" width="176" valign="top">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                  <td style="padding: 20px 20px 20px 20px;" align="center">
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td align="center" valign="top" style="padding: 0px 0px 8px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="pc-w620-width-100pc" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                        <tr>
                                        <td valign="top" align="center" style="padding: 0px 0px 0px 0px;">
                                          <div class="pc-font-alt pc-w620-fontSize-16px" style="line-height: 140%; letter-spacing: -0.2px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 600; font-variant-ligatures: normal; color: #656E81; text-align: center; text-align-last: center;">
                                          <div><span>Temporary Password</span>
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
                                      <td align="left" valign="top" style="padding: 0px 0px 8px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="pc-w620-width-100pc" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                        <tr>
                                        <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                                          <div class="pc-font-alt" style="line-height: 140%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 600; font-variant-ligatures: normal; color: #0f0e0d; text-align: center; text-align-last: center;">
                                          <div><span>
                                            ${password}
                                          </span>
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
                              </tbody>
                            </table>
                            </td>
                          </tr>
                          </table>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="left" valign="top" style="padding: 0px 0px 12px 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                <tr>
                                <td valign="top" align="left" style="padding: 0px 0px 0px 0px;">
                                  <div class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" style="line-height: 156%; letter-spacing: -0.2px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 19px; font-weight: normal; font-variant-ligatures: normal; color: #ffffff; text-align: left; text-align-last: left;">
                                  <br>
                                  <div><span>You can login with the temporary password to access the dashboard and manage your estimates. To update your password go to the user account settings.</span>
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
                    <!-- END MODULE: Header -->
                  </td>
                  </tr>
                  <tr>
                  <td valign="top">
                    <!-- BEGIN MODULE: Detail Item Order -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tr>
                      <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                        <tr>
                        <td valign="top" class="pc-w620-padding-16-28-16-28" style="padding: 40px 40px 24px 40px; border-radius: 0px; background-color: #ffffff;" bgcolor="#ffffff">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td class="pc-w620-spacing-0-0-0-0" align="left" valign="top" style="padding: 0px 0px 4px 0px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                              <tr>
                              <td valign="top" class="pc-w620-padding-0-0-0-0" align="left" style="padding: 0px 0px 0px 0px;">
                                <div class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40" style="line-height: 128%; letter-spacing: -0.6px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 32px; font-weight: 500; font-variant-ligatures: normal; color: #1b110c; text-align: left; text-align-last: left;">
                                <div><span>Upgrade Now</span>
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
                            <td class="pc-w620-spacing-0-0-18-0" align="left" valign="top" style="padding: 0px 0px 18px 0px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                              <tr>
                              <td valign="top" class="pc-w620-padding-10-0-0-0" align="left" style="padding: 10px 0px 0px 0px;">
                                <div class="pc-font-alt pc-w620-fontSize-18px pc-w620-lineHeight-140pc" style="line-height: 128%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #2a1e19cc; text-align: left; text-align-last: left;">
                                <div>
                                  <span>&#8226; We save your business info in the system for quicker estimating</span>
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
                              <td class="pc-w620-spacing-0-0-18-0" align="left" valign="top" style="padding: 0px 0px 18px 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                <tr>
                                <td valign="top" class="pc-w620-padding-0-0-0-0" align="left" style="padding: 0px 0px 0px 0px;">
                                  <div class="pc-font-alt pc-w620-fontSize-18px pc-w620-lineHeight-140pc" style="line-height: 128%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #2a1e19cc; text-align: left; text-align-last: left;">
                                  <div>
                                    <span>&#8226; Keep track of past estimates</span>
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
                              <td class="pc-w620-spacing-0-0-18-0" align="left" valign="top" style="padding: 0px 0px 18px 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                <tr>
                                <td valign="top" class="pc-w620-padding-0-0-0-0" align="left" style="padding: 0px 0px 0px 0px;">
                                  <div class="pc-font-alt pc-w620-fontSize-18px pc-w620-lineHeight-140pc" style="line-height: 128%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #2a1e19cc; text-align: left; text-align-last: left;">
                                  <div>
                                    <span>&#8226; See stats of your estimates</span>
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
                              <td class="pc-w620-spacing-0-0-18-0" align="left" valign="top" style="padding: 0px 0px 18px 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                <tr>
                                <td valign="top" class="pc-w620-padding-0-0-0-0" align="left" style="padding: 0px 0px 0px 0px;">
                                  <div class="pc-font-alt pc-w620-fontSize-18px pc-w620-lineHeight-140pc" style="line-height: 128%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #2a1e19cc; text-align: left; text-align-last: left;">
                                  <div>
                                    <span>&#8226; Middler Certified Estimates</span>
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
                              <td class="pc-w620-spacing-0-0-18-0" align="left" valign="top" style="padding: 0px 0px 18px 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                <tr>
                                <td valign="top" class="pc-w620-padding-0-0-0-0" align="left" style="padding: 0px 0px 0px 0px;">
                                  <div class="pc-font-alt pc-w620-fontSize-18px pc-w620-lineHeight-140pc" style="line-height: 128%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #2a1e19cc; text-align: left; text-align-last: left;">
                                  <div>
                                    <span>&#8226; Unlimited use of the estimator</span>
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
                              <td class="pc-w620-spacing-0-0-18-0" align="left" valign="top" style="padding: 0px 0px 18px 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                <tr>
                                <td valign="top" class="pc-w620-padding-0-0-0-0" align="left" style="padding: 0px 0px 0px 0px;">
                                  <div class="pc-font-alt pc-w620-fontSize-18px pc-w620-lineHeight-140pc" style="line-height: 128%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #2a1e19cc; text-align: left; text-align-last: left;">
                                  <div>
                                    <span>&#8226; New upcoming features coming soon</span>
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
                    <!-- END MODULE: Detail Item Order -->
                  </td>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                  <td valign="top">
                    <!-- BEGIN MODULE: Email Us -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tr>
                      <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                        <tr>
                        <td valign="top" class="pc-w620-padding-20-28-30-28" style="padding: 40px 40px 40px 40px; border-radius: 0px; background-color: #1D42F3;" bgcolor="#d8e3e5">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td>
                            <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tr class="pc-grid-tr-first pc-grid-tr-last">
                              <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="center" valign="middle" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                                <tr>
                                  <td class="pc-w620-halign-center pc-w620-valign-middle" align="left" valign="middle">
                                  <table class="pc-w620-halign-center" align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                                    <tr>
                                    <td class="pc-w620-halign-center" align="left" valign="top">
                                      <table class="pc-w620-halign-center" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td class="pc-w620-valign-middle pc-w620-halign-center" align="left">
                                        <table class="pc-width-hug pc-w620-gridCollapsed-1 pc-w620-width-fill pc-w620-halign-center" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                          <tr class="pc-grid-tr-first pc-grid-tr-last">
                                          <td class="pc-grid-td-first pc-w620-itemsSpacings-20-12" valign="middle" style="padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 0px;">
                                            <table class="pc-w620-width-fill" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0;">
                                            <tr>
                                              <td class="pc-w620-halign-center pc-w620-valign-middle" align="left" valign="top">
                                              <table class="pc-w620-halign-center pc-w620-width-fill" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                <td class="pc-w620-halign-center" align="left" valign="top">
                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                    <td class="pc-w620-halign-center" align="left" valign="top">
                                                    <img src="https://middler.com/icons/emailicon-white.png" class="pc-w620-width-60 pc-w620-height-60 pc-w620-align-center" width="80" height="80" alt="" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width:80px; height:80px; border-radius: 8px;" />
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
                                          <td class="pc-grid-td-last pc-w620-itemsSpacings-20-12" valign="middle" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px;">
                                            <table class="pc-w620-width-fill" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0;">
                                            <tr>
                                              <td class="pc-w620-halign-center pc-w620-valign-middle" align="left" valign="top">
                                              <table class="pc-w620-halign-center pc-w620-width-fill" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                <td class="pc-w620-halign-center" align="left" valign="top">
                                                  <table class="pc-w620-halign-center" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                    <td class="pc-w620-spacing-0-0-4-0" valign="top" style="padding: 0px 0px 4px 0px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                                      <tr>
                                                      <td valign="top" class="pc-w620-padding-0-0-0-0 pc-w620-align-center" align="left" style="padding: 0px 0px 0px 0px;">
                                                        <div class="pc-font-alt pc-w620-align-center" style="line-height: 150%; letter-spacing: -0.1px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 500; font-variant-ligatures: normal; color: #fafafa; text-align: left; text-align-last: left;">
                                                        <div><span>Want to talk business with us?</span>
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
                                                <td class="pc-w620-halign-center" align="left" valign="top">
                                                  <table class="pc-w620-halign-center" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                    <td valign="top" style="padding: 0px 0px 0px 0px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                                      <tr>
                                                      <td valign="top" class="pc-w620-align-center" align="left">
                                                        <div class="pc-font-alt pc-w620-align-center" style="line-height: 143%; letter-spacing: -0px; font-family: 'Outfit', Arial, Helvetica, sans-serif; font-size: 15px; font-weight: normal; font-variant-ligatures: normal; color: #ffffff; text-align: left; text-align-last: left;">
                                                        <div><span>Feel free to reach out to us at </span><span style="font-weight: 700; font-style: italic; color: #ffffff;">estimate@middler.com</span><span> We open opportunities for all forms of business collaboration</span>
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
                    <!-- END MODULE: Email Us -->
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
