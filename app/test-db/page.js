import { dbConnect } from "@/lib/dbConnect";
import { Course } from "@/model/course-model";
import { leanSanitize } from "@/lib/mongo-utils";
import mongoose from "mongoose";

export default async function TestDBPage() {
    let statusMessage = "";
    let createdCourse = null;

    try {
        await dbConnect();

        // Clear previous test course if exists
        await Course.deleteOne({ title: "Next.js 16 Masterclass" });

        // Dummy ObjectIds to test unpopulated FK references
        const dummyCategoryId = new mongoose.Types.ObjectId();
        const dummyInstructorId = new mongoose.Types.ObjectId();
        const dummyModuleId1 = new mongoose.Types.ObjectId();
        const dummyModuleId2 = new mongoose.Types.ObjectId();

        // 2. Create Course Document
        const rawCourse = await Course.create({
            title: "Next.js 16 Masterclass",
            description: "Learn App Router & Server Actions from scratch.",
            thumbnail: "https://example.com/thumb.jpg",
            price: 49.99,
            active: true,
            category: dummyCategoryId,
            instructor: dummyInstructorId,
            modules: [dummyModuleId1, dummyModuleId2],
            testimonials: [],
        });

        createdCourse = leanSanitize(rawCourse.toObject());

        statusMessage = "✅ Successfully connected & created test course!";
    } catch (error) {
        statusMessage = `❌ DB Test Failed: ${error.message}`;
    }

    return (
        <div style={{ padding: 40, fontFamily: "sans-serif" }}>
            <h1>MongoDB Course Model Tester</h1>
            <p style={{ fontWeight: "bold" }}>{statusMessage}</p>

            {createdCourse && (
                <div>
                    <h3>Created Course Document:</h3>
                    <pre style={{ background: "#f4f4f4", padding: 15, borderRadius: 5 }}>
                        {JSON.stringify(createdCourse, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}