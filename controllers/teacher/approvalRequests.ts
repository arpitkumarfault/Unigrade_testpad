import Teacher from '@/models/teachers/teacherModels'
import dbConnect from '@/database/dbConnect'

export async function getPendingTeachers() {
  try {
    await dbConnect()

    const pendingTeachers = await Teacher.find({
      isApproved: false,
    })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean()

    return pendingTeachers
  } catch (error) {
    console.error('Error fetching pending teachers:', error)
    throw new Error('Failed to fetch pending teachers')
  }
}
