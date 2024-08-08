export const passwordResetTemplate = function(resetPageLink) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Password Reset Request</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        color: #333;
        font-size: 24px;
      }
      .content {
        margin-bottom: 20px;
      }
      .content p {
        color: #555;
        font-size: 16px;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        color: #777;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <p><a href="${resetPageLink}" target="_blank">Reset Password</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>Book Rental Application</p>
        <p>If you need further assistance, please contact our support team.</p>
      </div>
    </div>
  </body>
  </html>
    `;
  }
  