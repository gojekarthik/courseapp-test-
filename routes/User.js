const express = require('express');
const routes = express();
const { User , Admin , Courses } = require("../db/database");
routes.use(express.json());
const mongoose = require('mongoose')
const { userauth } = require('../middleware/userauth')

routes.post("/user/signup",async function(req,res,){
   const username = req.body.username;
   const password = req.body.password
   if(!username || !password){
       res.send("need username and password")
   }

  const existinguser = await User.findOne({username:username})
   if(existinguser){
       res.send("username alredy exists please change it")
   }

   const newUser = new User({
       username: username,
       password: password
   })
   newUser.save();
   res.send("new user added")

})

    routes.get("/user/courses", userauth ,async function(req,res){
        const coursedata = await Courses.find({})
        res.json(coursedata)
    })

    routes.post("/user/courses/:id" , userauth , async function(req,res){
        const id = req.params.id
        const username = req.headers.username
        await User.updateOne({username:username},{
            "$push":{
                CoursesPurchased:id
            }
        })
        res.send("course has been purchased")
    })

    routes.get("/user/purchasedCourses", userauth , async function(req,res){
            const username = req.headers.username
            const data = await User.find({username:username})
            console.log(data[0].CoursesPurchased)
            const courses = await Courses.find({
                 _id : {
                    "$in" : data[0].CoursesPurchased    
                }
            })
            console.log(courses)
            res.send("testing")
        })
        





routes.listen(3000)

