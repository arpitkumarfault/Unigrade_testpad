import Teacher from '@/models/teachers/teacherModels'
import University from '@/models/university/universityModel'
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import sendTeacherApprovedEmail from '@/helpers/university/sendTeacherApprovalMail'

export async function POST(req: NextRequest) {
  await dbConnect()

  try {
    const { id } = await req.json()


    if (!id) {
      return NextResponse.json(
        { message: 'Teacher ID is required', status: false }, 
        { status: 400 }
      )
    }

    const existingPendingTeacher = await Teacher.findById(id)

    

    if (!existingPendingTeacher) {
      return NextResponse.json(
        { message: 'No teacher found with this ID', status: false }, 
        { status: 404 }
      )
    }

    if (existingPendingTeacher.isApproved) {
      return NextResponse.json(
        { message: 'Teacher is already approved', status: false }, 
        { status: 400 }
      )
    }

    const university = await University.findOne({ 
      universityEmail: existingPendingTeacher.universityEmail 
    })


    existingPendingTeacher.isApproved = true

    if (university && !existingPendingTeacher.universityId) {
      existingPendingTeacher.universityId = university._id
    }

    const savedTeacher = await existingPendingTeacher.save({ validateBeforeSave: false })

    
    try {
      await sendTeacherApprovedEmail({
        to: existingPendingTeacher.email,
        teacherName: existingPendingTeacher.name,
        teacherId: existingPendingTeacher._id.toString(),
        universityCode: university?.universityCode ||  'N/A',
        department: existingPendingTeacher.department,
      })
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError)
    }

    return NextResponse.json(
      {
        message: 'Teacher approved successfully',
        status: true,
        data: savedTeacher,
      },
      { status: 200 }
    )

  } catch (error) {
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
