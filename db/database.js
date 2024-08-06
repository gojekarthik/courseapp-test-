const mongoose = require('mongoose')
const { object } = require('webidl-conversions')
const connection = mongoose.connect("mongodb+srv://karthikgoje2003:Knock!!!knock1233@cluster0.ywnaizx.mongodb.net/CourseApp")
const schema = mongoose.Schema

//defining the schema of the admin and making a model of it
const AdminSchema = new schema({
    username:String,
    password:String
})

const Admin = mongoose.model("Admin",AdminSchema)

//defining the schema of the user and making a model of it
const UserSchema = new schema({
    username:String,
    password:String,
    CoursesPurchased: Array
})

const User = mongoose.model("User",UserSchema)

//defining the schema of courses and making a model of it
const CourseSchema = new schema({
    courseId : Number,
    title: String,
    description : String,
    price: Number,
    imageURL: String,
    published : Boolean
})

const Courses = mongoose.model("Courses",CourseSchema)

module.exports = {
    User ,
    Admin ,
    Courses
}





