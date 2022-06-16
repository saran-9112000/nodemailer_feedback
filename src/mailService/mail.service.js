
require("dotenv").config();
const nodemailer = require("nodemailer");
const sendEmail = async (mailObj, path) => {
  const { user , subject, customerFeedback, file } = mailObj;
  console.log(process.env.ADMIN,process.env.PASSWORD)
 console.log(file.hapi.filename)
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure:true,
      auth: {
        user: process.env.ADMIN,
        pass: process.env.PASSWORD,
      },
      
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.ADMIN, // sender address
      to: user, // list of receivers
      cc:  process.env.ADMIN1,
      subject: subject, // Subject line
      text: customerFeedback,
      html: customerFeedback, // plain text body
      attachments : [
        {
            filename: file.hapi.filename,
            path: path
        }
    ],
    });

    console.log(`Message sent: ${info.messageId}`);
    return `Message sent: ${info.messageId}`;
  } catch (error) {
    console.error(error);
    throw new Error(
        `Something went wrong in the sendmail method. Error: ${error.message}`
      );
  }
};

module.exports = sendEmail;