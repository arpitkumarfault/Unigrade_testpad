// app/api/teacher/me/route.ts
import dbConnect from "@/database/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Teacher from "@/models/teachers/teacherModels";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

interface JwtPayload {
  id: string;
  email: string;
  universityCode: string;
  iat: number;
  exp: number;
}

async function gettingTeacherId(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Read JWT from cookie
    const token = req.cookies.get("teacher_token")?.value; // <- use .value
    if (!token) {
      return NextResponse.json(
        { status: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2. Verify and decode token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json(
        { status: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const teacherId = decoded.id;

    // 3. Fetch teacher (example)
    const teacher = await Teacher.findById(teacherId)
      .select("-password")
      .lean();

    if (!teacher) {
      return NextResponse.json(
        { status: false, message: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: true, teacher },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export default gettingTeacherId
