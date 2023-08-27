import mongoose from "mongoose";

const {Schema} = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, "Name must be larger than 2 characters"],
        maxLength: [50, "Name must be lesser than 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/, "Invalid Email Address"],
    },
    message: {
        type: String,
        required: [true, "Message is required."],
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true}
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);