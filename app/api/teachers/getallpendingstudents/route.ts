// app/api/teacher/pendingStudents/route.ts

import { NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import Student from '@/models/students/studentModel'


export async function GET() {
   await dbConnect()
  try {
    const pendingStudents = await Student.find({
      isApproved: false,
    })
      .sort({ createdAt: -1 })
      .lean()
     
    return NextResponse.json({
      messsage: 'Successfully pending students fetched',
      status: true,
      data: pendingStudents,
    })
  } catch (error) {
    console.error('Error fetching pending students:', error)

    return NextResponse.json(
      {
        message: 'Failed to fetch pending students',
        status: false,
      },
      { status: 500 }
    )
  }
}
