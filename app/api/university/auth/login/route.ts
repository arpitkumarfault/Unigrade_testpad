import { NextRequest, NextResponse } from "next/server";
import University from "@/models/university/universityModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import dbConnect from "@/database/dbConnect";


export async function POST(req: NextRequest) {
  dbConnect();
  try {
    const body = await req.json();
    const { universityCode, password } = body || {};

    if (!universityCode || !password) {
      return NextResponse.json(
        { message: "University code and password are required.", success: false },
        { status: 400 }
      );
    }

    const uni = await University.findOne({ universityCode })
      .select("+password")
      .lean();

      
    if (!uni) {
      return NextResponse.json(
        { message: "Invalid university code or password.", success: false },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, uni.password);
    if (!ok) {
      return NextResponse.json(
        { message: "Invalid university code or password.", success: false },
        { status: 401 }
      );
    }
    

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "JWT secret not defined in environment variables.", success: false },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        id: String(uni._id),
        universityCode: uni.universityCode,
        email: uni.universityEmail,
        role: "university",
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    const res = NextResponse.json(
      {
        message: "Login successful.",
        success: true,
        token, 
        data: {
          id: String(uni._id),
          universityCode: uni.universityCode,
          universityName: uni.universityName,
          universityEmail: uni.universityEmail,
        },
      },
      { status: 200 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60, 
    });
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message ?? "Internal server error", success: false },
      { status: 500 }
    );
  }
}
