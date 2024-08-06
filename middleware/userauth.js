const express = require("express");
const { User } = require("../db/database");
const { resolveSoa } = require("dns");

function userauth(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;
    if(!username || !password){
        res.send("username and password required")
        return
    }

    const found = User.findOne({username:username , password:password})
    if(!found){
        res.send("user not found")
        return
    }
    next();
}   
    


module.exports = {userauth}

