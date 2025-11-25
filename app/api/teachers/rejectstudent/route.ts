
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import Student from '@/models/students/studentModel'
import University from '@/models/university/universityModel'
import sendStudentRejectedEmail from '../../../../helpers/teachers/sendStudentRejectionMail'

export async function POST(req: NextRequest) {
  await dbConnect()

  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { message: 'Student ID is required', status: false },
        { status: 400 }
      )
    }

    const existingPendingStudent = await Student.findById(id)

    if (!existingPendingStudent) {
      return NextResponse.json(
        { message: 'No student found with this ID', status: false },
        { status: 404 }
      )
    }

    const university = await University.findOne({
      universityCode: existingPendingStudent.universityCode,
    })

    const studentData = {
      email: existingPendingStudent.email,
      name: existingPendingStudent.name,
      department: existingPendingStudent.department,
      universityCode:
        university?.universityCode || university?.name || 'University',
    }

    await Student.findByIdAndDelete(id)

    try {
      await sendStudentRejectedEmail({
        to: studentData.email,
        studentName: studentData.name,
        universityCode: studentData.universityCode,
        department: studentData.department,
      })
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError)
    }

    return NextResponse.json(
      {
        message: 'Student rejected successfully',
        status: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error rejecting student:', error)

    return NextResponse.json(
      {
        message: 'Internal server error',
        status: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
