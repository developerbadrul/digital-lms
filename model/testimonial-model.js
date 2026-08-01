import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    content: {
        type: String,
        require: [true, "Content is required"],
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "Course is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"], 
        max: [5, "Rating cannot exceed 5"],
    }
},
    {
        timestamps: true
    }
)

export const Testimonial = mongoose.models.Testimonial ?? mongoose.model("Testimonial", testimonialSchema)