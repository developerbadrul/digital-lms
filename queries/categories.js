import { leanSanitize } from "@/lib/mongo-utils";
import { Category } from "@/model/category-model";

export async function getCategories() {
    const categories = await Category.find({}).lean();
    return leanSanitize(categories)
}