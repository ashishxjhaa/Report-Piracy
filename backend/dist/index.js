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
const middleware_1 = require("./middleware");
const nodemailer_1 = __importDefault(require("nodemailer"));
const creators_1 = require("./creators");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const signupSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3)
});
app.post('/api/auth/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
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
            message: "Signup Done"
        });
    }
    catch (err) {
        if (err.code === 11000 && ((_a = err.keyPattern) === null || _a === void 0 ? void 0 : _a.email)) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}));
app.post('/api/auth/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
            userId: user._id,
        }, process.env.JWT_SECRET);
        res.json({
            token
        });
    }
    catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}));
app.get("/api/dashboard", middleware_1.verifyToken, (req, res) => {
    res.json({
        message: "Welcome to your dashboard"
    });
});
app.get('/api/me', middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const user = yield db_1.User.findById(req.user.userId).select('fullName');
        res.json(user);
    }
    catch (err) {
        res.status(500).json({
            message: 'Error fetching user'
        });
    }
}));
app.get('/api/creators', (req, res) => {
    res.json(creators_1.creators.map(c => ({ name: c.name })));
});
app.post('/api/report', middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentUrl, description, creatorName } = req.body;
    const creator = creators_1.creators.find(c => c.name === creatorName);
    const report = yield db_1.Report.create({
        //@ts-ignore
        userId: req.user.userId,
        creatorName,
        contentUrl,
        description
    });
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
    });
    yield transporter.sendMail({
        to: creator === null || creator === void 0 ? void 0 : creator.email,
        subject: 'Piracy Report for Your Content',
        text: `URL: ${contentUrl}\nDescription: ${description}`
    });
    res.json({
        message: "Reported Successfully", report
    });
}));
app.get('/api/report', middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield db_1.Report.find({
        //@ts-ignore
        userId: req.user.userId
    }).sort({ createdAt: -1 });
    res.json({
        reports
    });
}));
app.delete('/api/report/delete', middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield db_1.Report.findOneAndDelete({
        _id: req.params.id,
        //@ts-ignore
        userId: req.user.userId
    });
    if (!report) {
        return res.status(404).json({
            error: 'Report not found or unauthorized'
        });
    }
    res.json({
        message: "Deleted sucessfully"
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI);
            app.listen(3001, () => {
                console.log("Port is listing on 3001");
            });
        }
        catch (e) {
            console.log("DB connection error");
        }
    });
}
main();
