const generateConfirmationEmail = (
  username,
  confirmationCode,
  confirmationLink
) => `
    <h1>Hello ${username}, </h1>
    <p>Thank you for registering with us.</p>
    <p>Your confirmation code is: <strong>${confirmationCode}</strong></p>
    <p>Please use this code to confirm your email address.</p>
    <p>Or click on this link to confirm your email: <a href="${confirmationLink}">Confirm Email</a></p>
    `;

export { generateConfirmationEmail };
