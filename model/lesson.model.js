import { Schema } from "mongoose";

const lessonSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },

    duration: {
        type: Number,
        required: [true, "Duration is required"],
        min: [0, "Duration cannot be negative"]
    },

    video_url: {
        type: String,
        required: [true, "Video URL is required"],
        trim: true
    },

    published: {
        type: Boolean,
        default: false
    },

    slug: {
        type: String,
        required: [true, "Slug is required"],
        lowercase: true,
        unique: true,
        trim: true
    },

    access: {
        type: String,
        enum: ["free", "paid"],
        default: "paid",
        required: true
    },

    order: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true
    }
)


export const Lesson =
    mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

