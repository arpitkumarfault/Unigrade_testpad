// helpers/sendUniversityWelcome.ts
import nodemailer from "nodemailer";

type WelcomeArgs = {
  to: string;
  universityCode: string;
  password?: string; 
};

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.USER_EMAIL!,
    pass: process.env.USER_PASSWORD!,
  },
});

export default async function sendUniversityWelcome({
  to,
  universityCode,
  password,
}: WelcomeArgs) {
  const loginUrl = process.env.LOGIN_URL || "https://unigrade-testpad.com/login";

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; background-color:#f9f9f9;">
    <h2 style="color:#2c3e50; text-align:center;">Welcome to Unigrade TestPad</h2>
    <p>Dear University Administrator,</p>
    <p>Welcome to <strong>Unigrade TestPad</strong> — your platform for secure, streamlined assessments and evaluations.</p>
    <p>Use the details below to access your dashboard:</p>
    <div style="background-color:#ffffff; border:1px solid #ddd; border-radius:6px; padding:12px 16px; margin:15px 0;">
      <p style="margin:0;"><strong>University Code:</strong> <span style="color:#16a085;">${universityCode}</span></p>
      ${
        password
          ? `<p style="margin:0;"><strong>Password:</strong> <span style="color:#c0392b;">${password}</span></p>`
          : ``
      }
    </div>
    <p>Login here: <a href="${loginUrl}" style="color:#2980b9; text-decoration:none;">${loginUrl}</a></p>
    <p style="margin-top:12px;">For security, please change your password immediately after the first login.</p>
    <p>Best regards,<br><strong>The Unigrade TestPad Team</strong></p>
    <hr style="border:none; border-top:1px solid #eee;">
    <p style="font-size:12px; color:#777; text-align:center;">This is an automated message. Please do not reply.</p>
  </div>`;

  await transporter.sendMail({
    from: `"Unigrade TestPad" <${process.env.USER_EMAIL}>`,
    to,
    subject: "Welcome to Unigrade TestPad - Your Access Details",
    html,
  });
}
