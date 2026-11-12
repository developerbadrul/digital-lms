import { dbConnect } from "@/lib/dbConnect";
import { leanSanitize } from "@/lib/mongo-utils";
import { Lesson } from "@/model/lesson.model";

export async function getLesson(lessonId) {
    if (!lessonId || !mongoose.Types.ObjectId.isValid(lessonId)) {
        return null;
    }

    try {
        await dbConnect();

        const lesson = await Lesson.findById(lessonId).lean();

        return leanSanitize(lesson);
    } catch (error) {
        console.error("Failed to fetch lesson:", error);
        return null; 
    }
}