import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '@/models/students/studentModel';
import University from '@/models/university/universityModel';
import dbConnect from '@/database/dbConnect';

interface LoginBody {
  universityCode: string;
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { universityCode, email, password }: LoginBody = await req.json();

    if (!universityCode || !email || !password) {
      return NextResponse.json(
        { status: false, message: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Ensure case-insensitive email search
    const student = await Student.findOne({ email: email.toLowerCase() }).lean();
    if (!student) {
      console.log(`Login failed: Student not found with email: ${email}`);
      return NextResponse.json(
        { status: false, message: 'No student found with this email' },
        { status: 404 }
      );
    }

    const university = await University.findOne({ universityCode }).lean();
    if (!university) {
      console.log(`Login failed: University not found with code: ${universityCode}`);
      return NextResponse.json(
        { status: false, message: 'No university found with this university code' },
        { status: 404 }
      );
    }

    // Compare university codes case-insensitively
    if (universityCode.toLowerCase() !== university.universityCode.toLowerCase()) {
      console.log(`Login failed: Mismatch university code for student: ${universityCode} vs ${university.universityCode}`);
      return NextResponse.json(
        { status: false, message: 'Invalid university code for this student' },
        { status: 403 }
      );
    }

    // Fetch password explicitly
    const studentWithPassword = await Student.findById(student._id).select('+password');
    if (!studentWithPassword) {
      console.error('Student found but unable to fetch password field');
      return NextResponse.json(
        { status: false, message: 'User data incomplete' },
        { status: 500 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, studentWithPassword.password);
    if (!passwordMatch) {
      console.log(`Login failed: Incorrect password for student email: ${email}`);
      return NextResponse.json(
        { status: false, message: 'Incorrect password' },
        { status: 401 }
      );
    }

    if (!studentWithPassword.isApproved) {
      console.log(`Login failed: Student account not active for email: ${email}`);
      return NextResponse.json(
        { status: false, message: 'Your account is pending approval' },
        { status: 403 }
      );
    }

    // Successful login
    const token = jwt.sign(
      {
        id: studentWithPassword._id,
        email: studentWithPassword.email,
        universityCode,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        status: true,
        message: 'Login successful',
        token,
        student: {
          id: studentWithPassword._id,
          name: studentWithPassword.name,
          email: studentWithPassword.email,
          universityName: studentWithPassword.universityName,
          department: studentWithPassword.department,
          isActive: studentWithPassword.isActive,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Student login error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
