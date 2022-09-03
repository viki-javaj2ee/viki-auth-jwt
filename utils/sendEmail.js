const nodemailer = require("nodemailer");

module.exports = async (user, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: "test@gmail.com", pass: "your password" },
    });

    const mailOptions = {
      from: "test@gmail.com",
      to: user.email,
      subject: "Verify Email",
      content: "Please enter your email address",
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error occured while sending a mail ---> ", error);
  }
};
