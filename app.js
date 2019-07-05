const express = require('express')

//initializing express
const app = express()

//using mongoose for communicating with mongodb
const mongoose = require('mongoose')

//bodyparser for parsing form extracting the body 
const bodyParser = require('body-parser')

//requiring user model
const User = require('./models/User')

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//requiring mlab keys (user data)
const db = require('./config/keys').mongoURI

// connecting to mongoose
mongoose.connect(db,{useNerUrlParser:true}).then(() => console.log('mongodb connected')).catch(err => console.log('error'))

//CRUD operations

//get all the users
app.get('/users',async(req,res) => {
    try {
    const users = await User.find({}).lean()
    if(users.length === 0) {
        return res.status(404).json({
            message: "No users Found",
            success: false
          })
    }
    if(users)
    res.status(200).json({
        success: true,
        message: "Successfully fetched all the users",
        proportions: users
      });
    }
    catch (e) {
        console.log("Error at /users", e);
        res.status(500).json({
          success: false,
          message: "Something wrong",
          error: e
        });
      }
    
})

// for retrieving a specific user
app.get('/user/:id',async(req,res)=>{
    try {
       const user = await User.findById(req.params.id)

       if(!user) {
          return res.status(404).json({
               success : false,
               message:"no user found"
           })
       }
       res.status(200).json({
           success:true,
           message:"user found",
           user:user
       })
    }
    catch(e) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Something wrong"
        })
    }
})

//post a new user
app.post('/users',async(req,res)=>{
    const postObj = req.body
    try{
        const user = new User(postObj)
        const savedUser = await user.save()

        return res.status(201).json({
            success: true,
            status: 1,
            message: "success",
            User: savedUser,
          });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Something wrong"
        })
  
      }
})

//update a particular user
app.put('/user/:id',async(req,res)=>{
    try {
      const user = await User.findByIdAndUpdate(req.params.id,req.body)
      if(!user) {
        return res.status(404).json({
            success: false,
            message: "No relevant user found"
          })
      }
      if(user) {
        res.status(201).json({
            success: true,
            message: "Successfully updated user",
            User: user
          });
      }
    }
    catch(e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e
          })
    }
})

//delete a particular user
app.delete('/user/:id',async(req,res)=>{
    try {
    const response = await User.findOneAndDelete({_id:req.params.id})
    if (response) {
        return res.status(200).json({
            success: true,
            message: "Successfully deleted user"
          });
    }
    res.status(404).json({
        success: false,
        message: "Cannot find the user to delete"
      })
    }
    catch (e) {
        console.log("Error at delete /user", e);
        res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: e
        });
      }
})

//setting up port on 5001
const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`port started on ${port}`)
})

