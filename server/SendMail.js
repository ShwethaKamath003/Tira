const nodemailer = require("nodemailer");

const sendOrderMail = async (email, orderId, total) => {
  try {
    console.log("📧 Sending mail to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shwethakamath905@gmail.com",
        pass: "mvtogzcaduretzem" // App Password
      }
    });

    const info = await transporter.sendMail({
      from: '"My Shop" <shwethakamath905@gmail.com>',
      to: email,
      subject: "Your Order Confirmed",
      html: `
        <div style="font-family: Arial; padding: 10px;">
          <h2 style="color: green;">Order Confirmed</h2>
          <p><b>Order ID:</b> ${orderId}</p>
          <p><b>Total:</b> ₹${total}</p>
        </div>
      `
    });

    console.log("📩 Email sent:", info.response);

  } catch (err) {
    console.log("❌ EMAIL ERROR:", err.message);
  }
};

module.exports = sendOrderMail;