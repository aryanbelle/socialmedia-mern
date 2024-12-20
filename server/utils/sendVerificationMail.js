import nodemailer from "nodemailer";
async function sendVerificationMail(email, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    // Ensure text is always a string
    const emailText = text.toString();

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      text: emailText, // Plain text version
      html: `<h2>${emailText}</h2>`, // Optional: HTML version of the email content
    });

    console.log("Verification mail sent!");
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

export default sendVerificationMail;
