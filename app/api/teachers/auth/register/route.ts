import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "@/models/teachers/teacherModels";
import dbConnect from "@/database/dbConnect";
import sendTeacherRegistrationApprovalRequest from "@/helpers/teachers/registerApproval";

interface RegisterBody {
  name: string;
  email: string;
  department: string;
  universityEmail: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const reqBody: RegisterBody = await req.json();
    const { name, email, department, universityEmail, password } = reqBody;

    if (!name || !email || !department || !universityEmail || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
          status: false,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
          status: false,
        },
        { status: 400 }
      );
    }

    if (!emailRegex.test(universityEmail)) {
      return NextResponse.json(
        {
          message: "Invalid university email format",
          status: false,
        },
        { status: 400 }
      );
    }

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return NextResponse.json(
        {
          message: "This email is already registered. Please use a different email.",
          status: false,
        },
        { status: 409 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters long",
          status: false,
        },
        { status: 400 }
      )
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newTeacher = await Teacher.create({
      name,
      email,
      department,
      universityEmail,
      password: hashedPassword,
      isApproved: false, 
    });

    await sendTeacherRegistrationApprovalRequest({
      universityEmail: universityEmail,
      name: name,
      email: email,
      department: department,
    });

    const response = NextResponse.json(
      {
        message: "Registration submitted! Approval request sent to university admin. Check your email after approval.",
        status: true,
        teacher: {
          id: newTeacher._id,
          name: newTeacher.name,
          email: newTeacher.email,
          department: newTeacher.department,
          isApproved: newTeacher.isApproved,
        },
      },
      { status: 201 }
    );

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
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
