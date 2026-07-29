import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"]
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"]
        },
        role: {
            type: String,
            required: true,
            enum: ["Student", "Instructor", "Admin"],
            default: "Student",
        },
        bio: {
            type: String,
            default: ""
        },
        socialMedia: {
            github: { type: String, default: "" },
            linkedin: { type: String, default: "" },
        },
        profilePicture: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

// Prevent re-declaring model during Next.js Hot Module Replacement (HMR)
export const User = mongoose.models?.User || mongoose.model("User", userSchema);