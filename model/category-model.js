import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"],
        trim: true
    },

},
    {
        timestamps: true
    }
)

export const Category = mongoose.models.Category ?? mongoose.model("Category", categorySchema)