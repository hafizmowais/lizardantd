// import nodemailer from 'nodemailer';

// export const sendEmail = (data) => {
//   const {subject, text, to, from, smtpConfig  } = data
//   const mailOptions = {
//     subject: subject,
//     text: text,
//     from: from,
//     to: to
//   };
//   const mailTransport = nodemailer.createTransport(smtpConfig);
//   return mailTransport.sendMail(mailOptions)
//     .then( () => {
//       console.log('New invite email sent to ', to);
//       res.send(true);
//     })
//     .catch( (err) => console.log("Send Email err",err))
// }
