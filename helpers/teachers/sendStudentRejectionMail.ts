import nodemailer from 'nodemailer'

type StudentRejectedEmailArgs = {
  to: string
  studentName: string
  universityCode: string
  department?: string
  reason?: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL!,
    pass: process.env.USER_PASSWORD!,
  },
})

export default async function sendStudentRejectedEmail({
  to,
  studentName,
  universityCode,
  department,
  reason,
}: StudentRejectedEmailArgs) {
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@unigrade-testpad.com'
  const registrationUrl = process.env.REGISTRATION_URL || 'https://unigrade-testpad.com/student/register'

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; background-color:#f9f9f9;">
    <div style="background-color:#e74c3c; color:#ffffff; padding:20px; text-align:center; border-radius:6px 6px 0 0; margin:-20px -20px 20px -20px;">
      <div style="font-size:48px; margin-bottom:10px;">✕</div>
      <h2 style="margin:0; color:#ffffff; font-size:24px;">Registration Not Approved</h2>
    </div>

    <p>Dear <strong>${studentName}</strong>,</p>
    
    <p>Thank you for your interest in joining <strong>Unigrade TestPad</strong>.</p>

    <div style="background-color:#f8d7da; border-left:4px solid #dc3545; padding:15px; margin:20px 0; border-radius:4px;">
      <p style="margin:0; color:#721c24; font-weight:600;">Unfortunately, your registration request has not been approved at this time.</p>
      ${reason ? `<p style="margin-top:8px; color:#721c24;"><strong>Reason:</strong> ${reason}</p>` : ''}
    </div>

    <h3 style="color:#2c3e50; font-size:18px; margin-bottom:10px;">Application Details</h3>

    <div style="background-color:#ffffff; border:1px solid #ddd; border-radius:6px; padding:16px; margin:15px 0;">
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold; width:45%;">Applicant Name:</td>
          <td style="padding:10px 0; color:#2c3e50;">${studentName}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold;">Email:</td>
          <td style="padding:10px 0; color:#555;">${to}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold;">University Code:</td>
          <td style="padding:10px 0; color:#555; font-family:monospace;">${universityCode}</td>
        </tr>
        ${
          department
            ? `
        <tr>
          <td style="padding:10px 0; color:#555; font-weight:bold;">Department:</td>
          <td style="padding:10px 0; color:#555;">${department}</td>
        </tr>
        `
            : ''
        }
      </table>
    </div>

    <h3 style="color:#2c3e50; font-size:18px; margin-top:25px;">What's Next?</h3>
    
    <ul style="line-height:1.8; color:#555; padding-left:20px;">
      <li>Verify that all your information is correct</li>
      <li>Contact your university administrator for clarification</li>
      <li>Ensure you're using the correct university code and email address</li>
      <li>Reach out to our support team if you believe this is an error</li>
    </ul>

    <div style="background-color:#e7f3ff; border-left:4px solid #2196F3; padding:15px; margin:20px 0; border-radius:4px;">
      <p style="margin:0; color:#0d47a1; font-size:14px;">
        <strong>💡 Need Help?</strong><br>
        If you have questions or believe this decision was made in error, please contact our support team at 
        <a href="mailto:${supportEmail}" style="color:#2196F3; text-decoration:none; font-weight:600;">${supportEmail}</a>
      </p>
    </div>

    <div style="text-align:center; margin:25px 0;">
      <a href="${registrationUrl}" style="background-color:#2196F3; color:#ffffff; padding:14px 35px; text-decoration:none; border-radius:5px; display:inline-block; font-weight:bold; font-size:16px;">Register Again</a>
    </div>

    <p style="margin-top:25px; font-size:14px; color:#555;">We appreciate your understanding and hope to assist you in the future.</p>

    <p style="margin-top:20px;">Best regards,<br><strong>The Unigrade TestPad Team</strong></p>
    
    <hr style="border:none; border-top:1px solid #eee; margin-top:25px;">
    <p style="font-size:12px; color:#777; text-align:center;">This is an automated notification. Please do not reply to this email.</p>
  </div>`

  await transporter.sendMail({
    from: `"Unigrade TestPad" <${process.env.USER_EMAIL}>`,
    to,
    subject: '✕ Registration Status - Unigrade TestPad',
    html,
  })
}
