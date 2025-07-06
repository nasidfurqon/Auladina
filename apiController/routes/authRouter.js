const express = require("express");
require("dotenv").config();
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const round = 10;

router.post("/register", async(req, res)=>{
    try{
        const{nama, email, password_hash} = req.body;
        if(!nama || !email || !password_hash){
            return res.status(400).json({success: false, message: "nama, email, password cant be empty"});
        }

        const [existing] = await db.query("SELECT * FROM guru WHERE email = ?",[email]);
        if(existing.length > 0){
            return res.status(400).json({success: false, message: "email already exist"});
        }

        const hashed = await bcrypt.hash(password_hash, round);
        const [result] = await db.query(
            "INSERT INTO guru (nama, email, password_hash) VALUES (?, ?, ?)", [nama, email, hashed]
        );

        res.status(200).json({success: true, message: "Registratsi is Successfull", id: result.insertId});
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
})

router.post("/login", async(req, res)=>{
    try{
        const {email, password_hash} = req.body;
        const [users] = await db.query("SELECT * FROM guru WHERE email = ?", [email]);

        if(users.length === 0){
            return res.status(401).json({success: false, message: "email not found"});
        }

        const user = users[0];
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