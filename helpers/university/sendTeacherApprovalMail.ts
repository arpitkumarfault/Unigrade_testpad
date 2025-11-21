import nodemailer from 'nodemailer'

type TeacherApprovedEmailArgs = {
  to: string
  teacherName: string
  teacherId?: string
  universityCode: string
  department?: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL!,
    pass: process.env.USER_PASSWORD!,
  },
})

export default async function sendTeacherApprovedEmail({ 
  to, 
  teacherName, 
  teacherId,
  universityCode,
  department
}: TeacherApprovedEmailArgs) {
  const loginUrl = process.env.LOGIN_URL || 'https://unigrade-testpad.com/teacherlogin'

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; background-color:#f9f9f9;">
    <div style="background-color:#27ae60; color:#ffffff; padding:20px; text-align:center; border-radius:6px 6px 0 0; margin:-20px -20px 20px -20px;">
      <div style="font-size:48px; margin-bottom:10px;">✓</div>
      <h2 style="margin:0; color:#ffffff; font-size:24px;">Registration Approved!</h2>
    </div>

    <p>Dear <strong>${teacherName}</strong>,</p>
    
    <p>Congratulations! Your registration for <strong>Unigrade TestPad</strong> has been <strong style="color:#27ae60;">approved</strong>.</p>

    <div style="background-color:#d4edda; border-left:4px solid #28a745; padding:15px; margin:20px 0; border-radius:4px;">
      <p style="margin:0; color:#155724; font-weight:600;">🎉 Your account is now active! Login using your registered email and password.</p>
    </div>

    <h3 style="color:#2c3e50; font-size:18px; margin-bottom:10px;">Your Account Details</h3>

    <div style="background-color:#ffffff; border:1px solid #ddd; border-radius:6px; padding:16px; margin:15px 0;">
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold; width:45%;">Teacher Name:</td>
          <td style="padding:10px 0; color:#2c3e50;">${teacherName}</td>
        </tr>
        ${teacherId ? `
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold;">Teacher ID:</td>
          <td style="padding:10px 0; color:#16a085; font-family:monospace;">${teacherId}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold;">Email:</td>
          <td style="padding:10px 0; color:#16a085;">${to}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold;">University Code:</td>
          <td style="padding:10px 0; color:#9b59b6; font-family:monospace; font-size:16px;">${universityCode}</td>
        </tr>
        ${department ? `
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold;">Department:</td>
          <td style="padding:10px 0; color:#2c3e50;">${department}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <div style="text-align:center; margin:25px 0;">
      <a href="${loginUrl}" style="background-color:#27ae60; color:#ffffff; padding:14px 35px; text-decoration:none; border-radius:5px; display:inline-block; font-weight:bold; font-size:16px;">Login to Dashboard</a>
    </div>

    <h3 style="color:#2c3e50; font-size:18px; margin-top:25px;">What You Can Do Now:</h3>
    
    <ul style="line-height:1.8; color:#555; padding-left:20px;">
      <li>Create and schedule exams</li>
      <li>Build question banks</li>
      <li>Manage student assessments</li>
      <li>View real-time results and analytics</li>
      <li>Generate performance reports</li>
    </ul>

    <p style="margin-top:25px; font-size:14px; color:#555;">If you have any questions or need assistance, please contact our support team.</p>

    <p style="margin-top:20px;">Best regards,<br><strong>The Unigrade TestPad Team</strong></p>
    
    <hr style="border:none; border-top:1px solid #eee; margin-top:25px;">
    <p style="font-size:12px; color:#777; text-align:center;">This is an automated notification. Please do not reply to this email.</p>
  </div>`

  await transporter.sendMail({
    from: `"Unigrade TestPad" <${process.env.USER_EMAIL}>`,
    to,
    subject: '✓ Account Approved - Welcome to Unigrade TestPad',
    html,
  })
}
