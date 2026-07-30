import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
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

    thumbnail: {
        type: String,
        required: [true, "Thumbnail is Required"],
        trim: true
    },

    modules: [
        { type: Schema.Types.ObjectId, ref: "Module" }
    ],

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price can not be negative"]
    },

    active: {
        type: Boolean,
        required: true,
        default: false,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    },

    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Instructor is Required"]
    },

    quizzes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Quiz"
        }
    ],

    testimonials: [{
        type: Schema.Types.ObjectId,
        ref: "Testimonial"
    }],
},
    {
        timestamps: true
    }
)


export const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema)