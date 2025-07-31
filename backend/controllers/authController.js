import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message: "user already exists"})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(201).json({message: "user registered successfully"})
    } catch (err) {
        res.status(500).json({message: "server error"})
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!User) return res.status(400).json({message: "invalid email"})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: "invalid password"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({message: "server error"})
    }
}