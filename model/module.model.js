import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    status: {
        type: String,
        default: "draft",
        enum: ["draft", "publish", "private"]
    },
    slug: {
        type: String,
        required: [true, "slug is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "Course is required"],
    },
    lessonIds: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
    ],
},
    {
        timestamps: true,
    }
)


export const Module = mongoose.models?.Module ?? mongoose.model("Module", moduleSchema);