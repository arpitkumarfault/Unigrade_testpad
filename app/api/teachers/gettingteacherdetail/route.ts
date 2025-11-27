// app/api/teacher/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/database/dbConnect";
import Teacher from "@/models/teachers/teacherModels";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

interface JwtPayload {
  id: string;
  email: string;
  universityCode: string;
  iat: number;
  exp: number;
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { status: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json(
        { status: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const teacher = await Teacher.findById(decoded.id)
      .select("-password")
      .lean();

    if (!teacher) {
      return NextResponse.json(
        { status: false, message: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        teacher,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /teacher/me error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
