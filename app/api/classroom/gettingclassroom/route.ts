// app/api/teacher/classrooms/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import Classroom from "@/models/classroom/classroomModel";
import jwt from "jsonwebtoken";

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

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Use decoded.id directly here
    const classrooms = await Classroom.find({ teacher: decoded.id });

    return NextResponse.json(
      { status: true, classrooms },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /teacher/classrooms error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
