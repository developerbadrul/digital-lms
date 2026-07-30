import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model/user-model";
import { leanSanitize } from "@/lib/mongo-utils"; 

export default async function TestDBPage() {
    let statusMessage = "";
    let createdUser = null;

    try {
        await dbConnect();

        await User.deleteOne({ email: "test.student@example.com" });

        // Create document
        const rawUser = await User.create({
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

        // 2. Convert Mongoose Doc to object & run through leanSanitize
        createdUser = leanSanitize(rawUser.toObject());

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