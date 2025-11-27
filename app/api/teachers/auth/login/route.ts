import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "@/models/teachers/teacherModels";
import University from "@/models/university/universityModel";
import dbConnect from "@/database/dbConnect";

interface LoginBody {
  universityCode: string;
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { universityCode, email, password }: LoginBody = await req.json();

    if (!universityCode || !email || !password) {
      return NextResponse.json(
        { status: false, message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    const teacher = await Teacher.findOne({ email: email.toLowerCase() }).lean();
    if (!teacher) {
      return NextResponse.json(
        { status: false, message: "No teacher found with this email" },
        { status: 404 }
      );
    }

    const university = await University.findOne({ universityCode }).lean();
    if (!university) {
      return NextResponse.json(
        { status: false, message: "No university found with this university code" },
        { status: 404 }
      );
    }

    if (
      teacher.universityCode !== universityCode &&
      teacher.universityEmail.toLowerCase() !== university.universityEmail.toLowerCase()
    ) {
      return NextResponse.json(
        { status: false, message: "Invalid university code for this teacher" },
        { status: 403 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { status: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: teacher._id,
        email: teacher.email,
        universityCode,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        status: true,
        message: "Login successful",
        teacher: {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          department: teacher.department,
          universityEmail: teacher.universityEmail,
          isApproved: teacher.isApproved,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
