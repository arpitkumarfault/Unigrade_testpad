import Teacher from '@/models/teachers/teacherModels'
import University from '@/models/university/universityModel'
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import sendTeacherRejectedEmail from '@/helpers/university/sendTeacherRejectionMail'

export async function POST(req: NextRequest) {
  await dbConnect()

  try {
    const { id } = await req.json() 

    console.log('Rejecting teacher with ID:', id)

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

    const university = await University.findOne({ 
      email: existingPendingTeacher.universityEmail 
    })

    const teacherData = {
      email: existingPendingTeacher.email,
      name: existingPendingTeacher.name,
      department: existingPendingTeacher.department,
      universityCode: university?.code || university?.name || 'University'
    }

    await Teacher.findByIdAndDelete(id)

    console.log('Teacher rejected and deleted:', id)

    try {
      await sendTeacherRejectedEmail({
        to: teacherData.email,
        teacherName: teacherData.name,
        universityCode: teacherData.universityCode,
        department: teacherData.department,
      })
      console.log('Rejection email sent successfully')
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError)
    }

    return NextResponse.json(
      {
        message: 'Teacher rejected successfully',
        status: true,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error rejecting teacher:', error)

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
