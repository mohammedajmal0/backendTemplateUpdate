export const verifyEmail=(verificationLink:string)=>{
    return `
    <h1>Email Verification</h1>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationLink}">Verify Email</a>`
}

export const forgetPasswordMail=(token:string)=>{
    return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Password Reset</title>
            <style>
              body {
                font-family: sans-serif;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 400px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
              }
              h1 {
                color: #568cea;
              }
              .button {
                display: inline-block;
                background-color: #5a8ce1;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-bottom: 1rem;
              }
              .logo {
                width: 300px;
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img
                src="https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Logo"
                class="logo"
              />
              <h1>Forgot Your Password?</h1>
              <p>
                Don't worry, we've got you covered! Click the button below to reset your password.
              </p>
              <a href="https://vulcans.in/reset-password?email=${token}" class="button">Reset Password</a>
              <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
          </body>
          </html>`
}