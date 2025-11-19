import Teacher from "@/models/teachers/teacherModels";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";



export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "teacher id is required", status: false },
        { status: 400 }
      );
    }

    const existingPendingTeacher = await Teacher.findById(id);

    if (!existingPendingTeacher) {
      return NextResponse.json(
        { message: "no existing teacher present with this id", status: false },
        { status: 404 }
      );
    }

    existingPendingTeacher.isApproved = false;
    await existingPendingTeacher.save();

    return NextResponse.json(
      {
        message: "Teacher rejected successfully",
        status: true,
        data: existingPendingTeacher,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        status: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
