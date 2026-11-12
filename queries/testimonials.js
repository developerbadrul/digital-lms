import { dbConnect } from "@/lib/dbConnect";
import { leanSanitize } from "@/lib/mongo-utils";
import { Testimonial } from "@/model/testimonial-model";
import mongoose from "mongoose";

export async function getTestimonialsForCourse(courseId) {
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
        return [];
    }

    try {
        await dbConnect();
        const testimonials = await Testimonial.find({ course: courseId }).lean();
        return leanSanitize(testimonials)
    } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return [];
    }
}