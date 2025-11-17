import nodemailer from 'nodemailer'

type TeacherApprovalRequestArgs = {
  universityEmail: string
  name: string
  email: string
  department: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL!,
    pass: process.env.USER_PASSWORD!,
  },
})

export default async function sendTeacherRegistrationApprovalRequest({
  universityEmail,
  name,
  email,
  department
}: TeacherApprovalRequestArgs) {
  const loginUrl = process.env.LOGIN_URL || 'https://unigrade-testpad.com/login'

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; background-color:#f9f9f9;">
    <h2 style="color:#2c3e50; text-align:center;">Teacher Registration Approval Request</h2>
    
    <p>Dear University Administrator,</p>
    
    <p>A new teacher has registered on <strong>Unigrade TestPad</strong>. Please review the details below:</p>

    <div style="background-color:#ffffff; border:1px solid #ddd; border-radius:6px; padding:12px 16px; margin:15px 0;">
      <p style="margin:8px 0;"><strong>Teacher Name:</strong> <span style="color:#2c3e50;">${name}</span></p>
      <p style="margin:8px 0;"><strong>Email:</strong> <span style="color:#16a085;">${email}</span></p>
      <p style="margin:8px 0;"><strong>Department:</strong> <span style="color:#2c3e50;">${department}</span></p>
    </div>

    <p>Please approve or reject this registration from your admin dashboard.</p>

    <p>Login here: <a href="${loginUrl}" style="color:#2980b9; text-decoration:none;">${loginUrl}</a></p>

    <p style="margin-top:20px;">Best regards,<br><strong>The Unigrade TestPad Team</strong></p>
    
    <hr style="border:none; border-top:1px solid #eee;">
    <p style="font-size:12px; color:#777; text-align:center;">This is an automated message. Please do not reply.</p>
  </div>`

  await transporter.sendMail({
    from: `"Unigrade TestPad" <${process.env.USER_EMAIL}>`,
    to: universityEmail,
    subject: 'Teacher Registration - Approval Required',
    html,
  })
}
