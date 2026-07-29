import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model/user-model";


export default async function TestDBPage() {
    let statusMessage = "";
    let createdUser = null;

    try {
        // 1. Connect to MongoDB Atlas
        await dbConnect();

        // 2. Clear test user if exists, then create dummy user
        await User.deleteOne({ email: "test.student@example.com" });

        createdUser = await User.create({
            firstName: "Md",
            lastName: "Test",
            email: "test.student@example.com",
            password: "hashedpassword123",
            phone: "+8801700000000",
            role: "Student",
            bio: "Testing Mongoose schema creation.",
            socialMedia: {
                github: "https://github.com/test",
                linkedin: "https://linkedin.com/in/test",
            },
        });

        statusMessage = "✅ Successfully connected & created test user!";
    } catch (error) {
        statusMessage = `❌ DB Test Failed: ${error.message}`;
    }

    return (
        <div style={{ padding: 40, fontFamily: "sans-serif" }}>
            <h1>MongoDB Model Tester</h1>
            <p style={{ fontWeight: "bold" }}>{statusMessage}</p>

            {createdUser && (
                <div>
                    <h3>Created User Document:</h3>
                    <pre style={{ background: "#f4f4f4", padding: 15, borderRadius: 5 }}>
                        {JSON.stringify(createdUser, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}