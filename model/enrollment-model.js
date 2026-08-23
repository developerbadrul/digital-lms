import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
    enrollment_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "active", "completed", "cancelled"],
        default: "active",
        required: true
    },
    completion_date: {
        type: Date,
        default: null
    },

    method: {
        type: String,
        required: true
    },

    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },

    student: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

},
    {
        timestamps: true,
    }
)


export const Enrollment =
    mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema)