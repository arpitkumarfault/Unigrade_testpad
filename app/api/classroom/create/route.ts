// app/api/teacher/classrooms/route.ts
import { NextRequest, NextResponse } from "next/server";
import classRoom from "@/models/classroom/classroomModel";
import Teacher from "@/models/teachers/teacherModels";
import dbConnect from "@/database/dbConnect";

function generateClassCode(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  let code = "";
  for (let i = 0; i < 6; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  for (let i = 0; i < 2; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      className,
      roomNumber,
      section,
      subject,
      capacity,
      description,
      teacherId,
    } = body;

    // Basic validation
    if (!className || !roomNumber || !section || !subject || !teacherId) {
      return NextResponse.json(
        { message: "please filled all credential properly" },
        { status: 400 }
      );
    }

    // Optional: verify teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    // Generate invitation / classroom code
    const classCode = generateClassCode();

    // 1) Create classroom document
    const newClass = await classRoom.create({
      className,
      roomNumber,
      section,
      subject,
      capacity,
      description,
      classCode,
      teacher: teacherId, // link from classroom to teacher
    });

    // 2) Add classroom reference into teacher.classRoom array
    await Teacher.findByIdAndUpdate(
      teacherId,
      { $addToSet: { classRoom: newClass._id } }, // use $push if duplicates are OK
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Classroom created successfully",
        data: newClass,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /teacher/classrooms error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          message: "Duplicate value for a unique field",
          details: error.keyValue,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
