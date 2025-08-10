import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const contentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    creatorName: { 
        type: String, 
        required: true 
    },
    contentUrl: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


export const User = mongoose.model("User", signupSchema);
export const Report = mongoose.model('Report', contentSchema);