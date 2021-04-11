const express = require('express')
const router = express.Router()
const db = require('../config/db')

  router.get("/", (req, res) => {
    db.query("SELECT * FROM Images", (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
  });

// Upload Likes Into Database

  router.post('/like',(req,res)=>{

    const userLiking = req.body.userLiking
    const postId = req.body.postId

    db.query("INSERT INTO Likes(userLiking,postId) VALUES (?,?)",[userLiking,postId], (err, results) => {
      if (err) {
        console.log(err);
      }

      db.query("UPDATE Images SET likes = likes+1 WHERE idimages = ? ", postId, (err2,results2)=>{
        res.send(results);

      })
    });

  })

  router.get("/byUser/:email", (req, res) => {
    const email = req.params.email
    
    db.query("SELECT * FROM Images WHERE author = ?", email , (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
  });


  module.exports = router