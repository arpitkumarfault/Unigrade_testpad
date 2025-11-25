// app/api/teacher/approveStudent/route.ts

import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import Student from '@/models/students/studentModel'
import University from '@/models/university/universityModel'
import sendStudentApprovedEmail from '@/helpers/teachers/sendStudentApprovalMail'

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

    if (existingPendingStudent.isApproved) {
      return NextResponse.json(
        { message: 'Student is already approved', status: false },
        { status: 400 }
      )
    }

    const university = await University.findOne({
      universityCode: existingPendingStudent.universityCode,
    })

    existingPendingStudent.isApproved = true

    if (university && !existingPendingStudent.universityId) {
      existingPendingStudent.universityId = university._id
    }

    const savedStudent = await existingPendingStudent.save({
      validateBeforeSave: false,
    })

    try {
      await sendStudentApprovedEmail({
        to: existingPendingStudent.email,
        studentName: existingPendingStudent.name,
        studentId: existingPendingStudent._id.toString(),
        universityCode: university?.universityCode || 'N/A',
        department: existingPendingStudent.department,
      })
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError)
    }

    return NextResponse.json(
      {
        message: 'Student approved successfully',
        status: true,
        data: savedStudent,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error approving student:', error)

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
