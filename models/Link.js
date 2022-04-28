import mongoose from "mongoose";
const { Schema } = mongoose;

const linkSchema = new Schema(
    {
        longlink: {
            type: String,
            required: true,
            trim: true,
        },
        nanolink: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        uid: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Link = mongoose.model("Link", linkSchema);
