import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  

  const res = NextResponse.json(
    { status: true, message: "Logged out" },
    { status: 200 }
  );

 
  res.cookies.set("token", "", {
    httpOnly: true,
  });

  return res;
}
