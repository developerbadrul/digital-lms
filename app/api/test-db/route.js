import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model/user-model";
import { leanSanitize } from "@/lib/mongo-utils";


export async function GET() {
  try {
    await dbConnect();

    await User.deleteOne({ email: "test.student@example.com" });

    // 1. Try to find the user
    let rawUser = await User.findOne({ email: "test.student@example.com" }).lean();

    // 2. If user doesn't exist, create it automatically!
    if (!rawUser) {
      const created = await User.create({
        firstName: "Md",
        lastName: "Test",
        email: "test.student@example.com",
        password: "hashedpassword123",
        phone: "+8801700000000",
        bio: "Testing Mongoose schema creation.",
        socialMedia: {
          github: "https://github.com/test",
          linkedin: "https://linkedin.com/in/test",
        },
      });

      rawUser = created.toObject();
    }

    // 3. Sanitize plain object
    const user = leanSanitize(rawUser);

    return NextResponse.json(
      {
        message: "✅ User retrieved successfully!",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `❌ Failed to fetch/create user: ${error.message}` },
      { status: 500 }
    );
  }
}