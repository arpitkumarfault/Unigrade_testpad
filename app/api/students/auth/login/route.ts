import { NextRequest, NextResponse } from 'next/server';
import Student from '@/models/students/studentModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginRequest {
  classroomCode: string;
  enrollmentNumber: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { classroomCode, enrollmentNumber, password }: LoginRequest = await req.json();

    if (!classroomCode || !enrollmentNumber || !password) {
      return NextResponse.json({ message: 'All fields are required', status: false }, { status: 400 });
    }

    // Find student by enrollment number and classroom (institution) code
    const student = await Student.findOne({ 
      enrollmentNumber,
      universityName: classroomCode,
    });

    if (!student) {
      return NextResponse.json({ message: 'Invalid enrollment number or classroom code', status: false }, { status: 401 });
    }

    // Check if student is active (approved)
    if (!student.isActive) {
      return NextResponse.json({ message: 'Your account is pending approval', status: false }, { status: 403 });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Incorrect password', status: false }, { status: 401 });
    }

    // Generate JWT (adjust secret + expiry as per your setup)
    const token = jwt.sign(
      { id: student._id, role: 'student', institutionId: student.universityName },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    return NextResponse.json({
      message: 'Login successful',
      status: true,
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        enrollmentNumber: student.enrollmentNumber,
      },
    });
    
  } catch (error) {
    return NextResponse.json({ message: 'Server error', status: false }, { status: 500 });
  }
}
