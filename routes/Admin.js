const express = require('express');
const routes = express();
const { User , Admin , Courses } = require("../db/database");
routes.use(express.json());
const mongoose = require('mongoose')
const { adminauth } = require('../middleware/adminauth');
const { ObjectId } = require('bson');

var coursecount = 0


routes.post("/admin/signup",async function(req,res,){
    const username = req.body.username;
    const password = req.body.password
    if(!username || !password){
        res.send("need username and password")
    }

   const existinguser = await Admin.findOne({username:username})
    if(existinguser){
        res.send("username alredy exists please change it")
    }

    const newUser = new Admin({
        username: username,
        password: password
    })
    newUser.save();
    res.send("new user added")

})


routes.post("/admin/courses", adminauth , function(req,res){
    coursecount++
    const newcourse = new Courses({
        courseId : coursecount,
        title: req.body.title,
        description: req.body.discription,
        price: req.body.price,
        imageURL: req.body.imageURL,
        published : req.body.published
    })
    newcourse.save();

    res.send("course has been created")
    }
)

routes.get("/admin/courses", adminauth ,async function(req,res){
    const coursedata = await Courses.find({})
    res.json(coursedata)
})

    
routes.listen(3000)



