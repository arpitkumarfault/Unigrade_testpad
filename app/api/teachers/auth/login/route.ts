import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "@/models/teachers/teacherModels";
import dbConnect from "@/database/dbConnect";

interface LoginBody {
  universityCode: string;
  email: string;
  password: string;  
}

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body - FIXED: Added await
    const reqBody: LoginBody = await req.json();
    const { universityCode, email, password } = reqBody;

    // Validate required fields
    if (!universityCode || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
          status: false,
        },
        { status: 400 }
      );
    }

    // Find teacher by email - FIXED: Added await and findOne instead of find
    const teacher = await Teacher.findOne({ email }).lean();

    if (!teacher) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          status: false,
        },
        { status: 401 }
      );
    }

    // Verify university code
    if (teacher.universityCode !== universityCode) {
      return NextResponse.json(
        {
          message: "Invalid university code",
          status: false,
        },
        { status: 401 }
      );
    }

    // Compare password with hashed password - CORRECT WAY
    const isPasswordValid = await bcrypt.compare(password, teacher.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          status: false,
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: teacher._id,
        email: teacher.email,
        role: "teacher",
        universityCode: teacher.universityCode,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Create response with teacher data (exclude password)
    const response = NextResponse.json(
      {
        message: "Login successful",
        status: true,
        teacher: {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          department: teacher.department,
          universityCode: teacher.universityCode,
        },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for token
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
