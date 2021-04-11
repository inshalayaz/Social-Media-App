const express = require('express')
const router = express.Router()
const db = require('../config/db')

// For Register

router.post('/register',(req,res)=>{

    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    db.query(
        "INSERT INTO Users(username,password,email) VALUES (?,?,?)", [username,password,email],
        (err,results)=>{
        console.log(err)
        res.send(results)
    })
})

// For Login

router.post('/login',(req,res)=>{

    const password = req.body.password
    const email = req.body.email

    db.query(
        "SELECT * FROM Users WHERE email = ?", 
        email,
        (err,results)=>{
            if(err){
                console.log(err)
            }
            if(results.length > 0){
                if(password == results[0].password){
                    res.json({loggedIn:true, email: email, message: "Successfully Logged In"})
                }else{
                    res.json({loggedIn:false, message: "Wrong username or password"})
                }
            }else{
                res.json({loggedIn:false, message: "User Dosen't exist"})
            }
        
    })
})


// For Upload 


router.post('/upload',(req,res)=>{
    
    const description = req.body.description
    const title = req.body.title
    const img = req.body.img
    const email = req.body.author
    
    db.query(
        "INSERT INTO Images(description,title,img,author) VALUES (?,?,?,?)", [description,title,img,email],
        (err,results)=>{
            if(err){
                console.log(err)
            }
            if(results){
                if(results){
                    res.json({ message: "Posted Successfully"})
                    console.log(email + ' des')
                    console.log('this is request' + req.body)

                }
            }else{
                res.json({ message: "Post Failed"})
            }
        
    })
})


// Backed Request


module.exports = router