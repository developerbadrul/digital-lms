import { dbConnect } from "@/lib/dbConnect";
import { leanSanitize } from "@/lib/mongo-utils";
import { Category } from "@/model/category-model";

export async function getCategories() {
    await dbConnect();
    const categories = await Category.find({}).lean();
    return leanSanitize(categories)
}