// app/api/admin/approve-teacher/route.ts
import { NextRequest, NextResponse } from "next/server";
import Teacher from "@/models/teachers/teacherModels";
import dbConnect from "@/database/dbConnect";
import sendTeacherApprovedEmail from "@/helpers/teachers/approvalConfirmation";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { teacherId, approved, universityCode } = await req.json();

    const teacher = await Teacher.findById(teacherId);
    
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found", status: false },
        { status: 404 }
      );
    }

    teacher.isApproved = approved;
    await teacher.save();

    if (approved) {
      await sendTeacherApprovedEmail({
        to: teacher.email,
        teacherName: teacher.name,
        teacherId: teacher._id.toString(),
        universityCode: universityCode,
        password: "TempPass123!", 
        department: teacher.department,
      });
    }

    return NextResponse.json(
      {
        message: approved ? "Teacher approved and credentials sent via email" : "Teacher rejected",
        status: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Approval error:", error);
    return NextResponse.json(
      { message: "Error processing approval", status: false },
      { status: 500 }
    );
  }
}
