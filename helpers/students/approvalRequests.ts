import nodemailer from 'nodemailer';

type StudentApprovalRequestArgs = {
  teacherEmail: string;
  name: string;
  email: string;
  enrollmentNumber:string;
  department: string;
  batch: string;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL!,
    pass: process.env.USER_PASSWORD!,
  },
});

export default async function sendStudentRegistrationApprovalRequest({
  teacherEmail,
  name,
  email,
  enrollmentNumber,
  department,
  batch
}: StudentApprovalRequestArgs) {
  const loginUrl = process.env.LOGIN_URL || 'https://unigrade-testpad.com/login';

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; background-color:#f9f9f9;">
    <h2 style="color:#2c3e50; text-align:center;">Student Registration Approval Request</h2>
    
    <p>Dear Classroom Teacher,</p>
    
    <p>A new student has registered on <strong>Unigrade TestPad</strong> and requires your approval. Please review the details below:</p>

    <div style="background-color:#ffffff; border:1px solid #ddd; border-radius:6px; padding:12px 16px; margin:15px 0;">
      <p style="margin:8px 0;"><strong>Student Name:</strong> <span style="color:#2c3e50;">${name}</span></p>
      <p style="margin:8px 0;"><strong>Enrollement number:</strong> <span style="color:#2c3e50;">${enrollmentNumber}</span></p>
      <p style="margin:8px 0;"><strong>Email:</strong> <span style="color:#16a085;">${email}</span></p>
      <p style="margin:8px 0;"><strong>Department:</strong> <span style="color:#2c3e50;">${department}</span></p>
      <p style="margin:8px 0;"><strong>Batch:</strong> <span style="color:#2c3e50;">${batch}</span></p>
    </div>

    <p>Please approve or reject this registration from your teacher dashboard.</p>

    <p>Login here: <a href="${loginUrl}" style="color:#2980b9; text-decoration:none;">${loginUrl}</a></p>

    <p style="margin-top:20px;">Best regards,<br><strong>The Unigrade TestPad Team</strong></p>
    
    <hr style="border:none; border-top:1px solid #eee;">
    <p style="font-size:12px; color:#777; text-align:center;">This is an automated message. Please do not reply.</p>
  </div>`;

  await transporter.sendMail({
    from: `"Unigrade TestPad" <${process.env.USER_EMAIL}>`,
    to: teacherEmail,
    subject: 'Student Registration - Approval Required',
    html,
  });
}
