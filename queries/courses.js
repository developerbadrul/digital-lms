import { dbConnect } from "@/lib/dbConnect";
import { leanSanitize } from "@/lib/mongo-utils";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";

export async function getCourseList() {
  try {
    await dbConnect();

    const selectFields = [
      "title",
      "description",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
      "testimonials",
    ];

    const courses = await Course.find({})
      .select(selectFields)
      .populate({
        path: "category",
        model: Category,
      })
      .populate({
        path: "instructor",
        model: User,
        select: "-password",
      })
      .populate({
        path: "testimonials",
        model: Testimonial,
        // populate: {
        //   path: "user",
        //   model: User,
        //   select: "firstName lastName profilePicture role", 
        // },
      })
      .populate({
        path: "modules",
        model: Module,
      })
      .lean();

    return leanSanitize(courses);
  } catch (error) {
    console.error("Failed to fetch course list:", error);
    throw new Error(`Database query failed: ${error.message}`);
  }
}