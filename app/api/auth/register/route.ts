import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and Password are required",
        },
        {
          status: 400,
        }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already Exist",
        },
        {
          status: 400,
        }
      );
    }
    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      {
        messages: "User registered succesfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to register User",
      },
      {
        status: 500,
      }
    );
  }
}
// FrontEnd fetching
// const res = fetch("api/auth/register",{
//     method:"POST",
//     headers:{"Content-Type":"application/json"},
//     body: JSON.stringify({email, password})
// })

// res.json()
