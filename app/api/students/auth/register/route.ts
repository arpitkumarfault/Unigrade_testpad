import { NextRequest, NextResponse } from 'next/server'
import Student from '@/models/students/studentModel'
import bcrypt from 'bcrypt'
import sendStudentRegistrationApprovalRequest from '@/helpers/students/approvalRequests'
import dbConnect from '@/database/dbConnect'

interface RequestCredentials {
  name: string
  email: string
  enrollmentNumber: string
  department: string
  universityName: string
  batch: string
  teacherEmail: string
  password: string
  enrollementNumber: string
}
dbConnect()
export async function POST(req: NextRequest) {
  try {
    const reqBody: RequestCredentials = await req.json()
    const { name, email, enrollmentNumber, department, universityName, batch, teacherEmail, password } = reqBody

    if (!name || !email || !department || !universityName || !batch || !teacherEmail || !password) {
      return NextResponse.json(
        {
          message: 'All fields are required',
          status: false,
        },
        { status: 400 },
      )
    }

    const existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return NextResponse.json(
        {
          message: 'Student already registered',
          status: false,
        },
        { status: 409 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newStudent = await Student.create({
      name,
      email,
      enrollmentNumber,
      department,
      universityName,
      batch,
      teacherEmail,
      password: hashedPassword,
      isActive: false,
    })

    await sendStudentRegistrationApprovalRequest({
      teacherEmail,
      name,
      email,
      enrollmentNumber,
      department,
      batch,
    })

    return NextResponse.json({
      message: 'Student registration received and pending approval',
      data: { id: newStudent._id, name: newStudent.name, email: newStudent.email },
      status: true,
    })
  } catch (error) {
    console.error('Student registration error:', error)
    return NextResponse.json({ error: 'Invalid JSON or server error', status: false }, { status: 400 })
  }
}
