"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const signupSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3)
});
app.post('/api/auth/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            errors: "All fields required"
        });
    }
    const { fullName, email, password } = parseResult.data;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    const newUser = yield db_1.User.create({
        fullName,
        email,
        password: hashedPassword
    });
    res.json({
        message: "Signup Done",
        user: { fullName: newUser.fullName, email: newUser.email }
    });
}));
app.post('/api/auth/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            error: "User not found"
        });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            error: "Invalid password"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user._id
    }, process.env.JWT_SECRET);
    res.json({
        message: "Signin sucess",
        token
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI);
            app.listen(3001, () => {
                console.log("Port is listing on 3000");
            });
        }
        catch (e) {
            console.log("DB connection error");
        }
    });
}
main();
