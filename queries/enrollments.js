import { dbConnect } from "@/lib/dbConnect";
import { leanSanitize } from "@/lib/mongo-utils";
import { Enrollment } from "@/model/enrollment-model";
import mongoose from "mongoose";

export async function getEnrollmentsForCourse(courseId) {
    if (!courseId) return [];

    try {
        await dbConnect();
        const validCourseId = typeof courseId === "string" && mongoose.Types.ObjectId.isValid(courseId)
            ? new mongoose.Types.ObjectId(courseId) : courseId;

        const enrollments = await Enrollment.find({ course: validCourseId }).lean();
        return leanSanitize(enrollments)
    } catch (error) {
        console.error("Failed to fetch enrollments for course:", error);
        return [];
    }
}