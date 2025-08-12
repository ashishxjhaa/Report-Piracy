"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const signupSchema = new mongoose_1.default.Schema({
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
const contentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.User = mongoose_1.default.model("User", signupSchema);
exports.Report = mongoose_1.default.model('Report', contentSchema);
