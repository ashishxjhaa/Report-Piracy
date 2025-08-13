import express from "express";
const app = express();

import { z } from 'zod';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Report, User } from "./db";
dotenv.config();

import jwt from 'jsonwebtoken';
import cors from 'cors';
import { verifyToken } from "./middleware";
import nodemailer from 'nodemailer';
import { creators } from "./creators";

app.use(cors())
app.use(express.json());

const signupSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(3)
});

app.post('/api/auth/signup', async (req, res) => {
    try {
        const parseResult = signupSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(400).json({
                errors: "All fields required"
            })
        }

        const { fullName, email, password } = parseResult.data;

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        res.json({
            message: "Signup Done"
        })
    } catch (err: any) {
        if (err.code === 11000 && err.keyPattern?.email) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

app.post('/api/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password!);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                error: "Invalid password" 
            });
        }

        const token = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET!)

        res.json({
            token
        });
    } catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

app.get("/api/dashboard", verifyToken, (req, res) => {
    res.json({ 
        message: "Welcome to your dashboard" 
    });
});

app.get("/api/dashboard-form", verifyToken, (req, res) => {
    res.json({
        message: "Report Pirated Content"
    })
})

app.get('/api/me', verifyToken, async (req, res) => {
    try{
        //@ts-ignore
        const user = await User.findById(req.user.userId).select('fullName');
        res.json(user);
    } catch (err) {
        res.status(500).json({ 
            message: 'Error fetching user'
        });
    }
})

app.get('/api/profile', verifyToken, async (req, res) => {
    try {
        //@ts-ignore
        const user = await User.findById(req.user.userId).select('fullName email createdAt');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/api/creators', (req, res) => {
  res.json(creators.map(c => ({ name: c.name })));
});

app.post('/api/report', verifyToken, async (req, res) => {
    try {
        const { contentUrl, description, creatorName } = req.body;

        if (!contentUrl || !description || !creatorName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (description.length < 10) {
            return res.status(400).json({ message: "Description must be at least 10 characters" });
        }

        const creator = creators.find(c => c.name === creatorName);

        const report = await Report.create({
            //@ts-ignore
            userId: req.user.userId,
            creatorName,
            contentUrl,
            description
        });

        if (creator) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
            });

            await transporter.sendMail({
                to: creator.email,
                subject: 'Piracy Report for Your Content',
                text: `URL: ${contentUrl}\nDescription: ${description}`
            });
        }

        res.json({
            message: "Reported Successfully", report
        })
    } catch (err: any) {
        console.log(err);
    }
})

app.get('/api/report', verifyToken, async (req, res) => {
    
    const reports = await Report.find({ 
        //@ts-ignore
        userId: req.user.userId 
    }).sort({ createdAt: -1 });

    res.json({
        reports
    })
})

app.delete('/api/report/delete', verifyToken, async (req, res) => {
    const report = await Report.findOneAndDelete({
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
    })
})


async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        app.listen(3001, () => {
            console.log("Port is listing on 3001")
        });
    } catch (e) {
        console.log("DB connection error")
    }
}

main()