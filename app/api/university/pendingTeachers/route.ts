import Teacher from '@/models/teachers/teacherModels'
import dbConnect from '@/database/dbConnect'
import { NextResponse } from 'next/server'

dbConnect()
export async function GET() {
  try {

    const pendingTeachers = await Teacher.find({
      isApproved: false,
    })
      // .select('-password')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      messsage:"successfully pending teachers fetched",
      status:true,
      data:pendingTeachers
    })
  } catch (error) {
    console.error('Error fetching pending teachers:', error)
    throw new Error('Failed to fetch pending teachers')
  }
}
