const express = require("express");
require("dotenv").config();
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const round = 10;
const sendVerificationEmail = require("../utils/mail");

router.post("/register", async(req, res)=>{
    try{
        const {email, password_hash} = req.body;
        if(!email || !password_hash){
            return res.status(400).json({success: false, message: "email, password cant be empty"});
        }

        const [existing] = await db.query("SELECT * FROM users WHERE email = ?",[email]);
        if(existing.length > 0){
            return res.status(400).json({success: false, message: "email already exist"});
        }

        const hashed = await bcrypt.hash(password_hash, round);
        const [result] = await db.query(
            "INSERT INTO users (email, password_hash, is_verified, created_at) VALUES (?, ?, ?, ?)", [email, hashed, 0, new Date()]
        );

        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"}); 
        await sendVerificationEmail(email, token);

        res.status(200).json({success: true, message: "Registratsi is Successfull", id: result.insertId});
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
})

router.get("/verify", async (req, res) =>{
    const { token } = req.query;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        await db.execute("UPDATE users SET is_verified = ? WHERE email = ?", [1, email]);
        res.send("Email successfully verified!");
    }
    catch (err) {
        res.status(400).send("Invalid or expired token.");
    }
});

router.post("/login", async(req, res)=>{
    try{
        const {email, password_hash} = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if(users.length === 0){
            return res.status(401).json({success: false, message: "email not found"});
        }

        const user = users[0]
        if (user.is_verified != 1)
        return res
            .status(403)
            .json({ message: "Please verify your email" });

        const valid = await bcrypt.compare(password_hash, user.password_hash);
        if(!valid){
            return res.status(401).json({success: false, message: "Wrong password"})
        }
        const token = jwt.sign(
            {id: user.id_guru, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            success: true,
            message: "Login Successfull",
            token: token,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
})

module.exports = router;