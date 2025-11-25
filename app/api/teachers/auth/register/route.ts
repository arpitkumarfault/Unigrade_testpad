import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
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

    // Validate required fields
    if (!name || !email || !department || !universityEmail  || !password) {
      return NextResponse.json(
        { message: "All fields are required", status: false },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format", status: false },
        { status: 400 }
      );
    }
    if (!emailRegex.test(universityEmail)) {
      return NextResponse.json(
        { message: "Invalid university email format", status: false },
        { status: 400 }
      );
    }

    // Check if teacher email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return NextResponse.json(
        { message: "This email is already registered. Please use a different email.", status: false },
        { status: 409 }
      );
    }

    // Password length validation
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long", status: false },
        { status: 400 }
      );
    }

    // Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new teacher document
    const newTeacher = await Teacher.create({
      name,
      email,
      department,
      universityEmail,
      password: hashedPassword,
      isApproved: false,
    });

    // Send approval request email to university admin
    await sendTeacherRegistrationApprovalRequest({
      universityEmail,
      name,
      email,
      department,
    });

    return NextResponse.json(
      {
        message: "Registration submitted! Approval request sent to university admin. Check your email after approval.",
        status: true,
        teacher: {
          id: newTeacher._id.toString(),
          name: newTeacher.name,
          email: newTeacher.email,
          department: newTeacher.department,
          isApproved: newTeacher.isApproved,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error", status: false, error: error.message },
      { status: 500 }
    );
  }
}
