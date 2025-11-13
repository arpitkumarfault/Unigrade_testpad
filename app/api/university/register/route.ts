// app/api/university/route.ts
import { NextRequest, NextResponse } from "next/server";
import University from "@/models/university/universityModel";
import bcrypt from "bcrypt";
import dbConnect from "@/database/dbConnect";
import { customAlphabet } from "nanoid";
import sendUniversityWelcome from "@/helpers/mailSender";

dbConnect();

const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 8);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { universityName, universityEmail, contactNumber, password, address } = body || {};

    if (!universityName || !universityEmail || !contactNumber || !password) {
      return NextResponse.json(
        { message: "Please fill all the required fields.", success: false },
        { status: 400 }
      );
    }

    const existing = await University.findOne({
      $or: [{ universityEmail }, { universityName }],
    })
      .select("_id universityEmail universityName")
      .lean();

    if (existing) {
      return NextResponse.json(
        {
          message:
            "A university with this email or name already exists. Use a different email/name.",
          success: false,
        },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let universityCode = "";
    const maxAttempts = 5;
    for (let i = 0; i < maxAttempts; i++) {
      universityCode = nanoid();
      const taken = await University.exists({ universityCode });
      if (!taken) break;
      if (i === maxAttempts - 1) {
        return NextResponse.json(
          {
            message: "Could not generate a unique university code. Please try again.",
            success: false,
          },
          { status: 500 }
        );
      }
    }

    const created = await University.create({
      universityCode,
      universityName,
      universityEmail,
      contactNumber: String(contactNumber),
      address: address || "",
      password: hashedPassword,
    });

    let mailSent = false;
    try {
      await sendUniversityWelcome({
        to: universityEmail,
        universityCode,
        password, 
      });
      mailSent = true;
    } catch (e) {
      console.error("Failed to send welcome email:", e);
    }

    return NextResponse.json(
      {
        message: "University registered successfully.",
        success: true,
        emailSent: mailSent,
        data: {
          id: created._id.toString(),
          universityCode: created.universityCode,
          universityName: created.universityName,
          universityEmail: created.universityEmail,
          contactNumber: created.contactNumber,
          address: created.address,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log("error message >>>", err);

    if (err?.code === 11000) {
      const field = Object.keys(err?.keyPattern || {})[0] || "field";
      return NextResponse.json(
        {
          message: `Duplicate value for unique ${field}. Please use a different ${field}.`,
          success: false,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: err?.message ?? "Internal server error", success: false },
      { status: 500 }
    );
  }
}
