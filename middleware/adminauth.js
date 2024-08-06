const express = require("express");
const { Admin } = require("../db/database");

async function adminauth(req, res, next) {
    const { username, password } = req.headers
    if (!username || !password) {
        res.status(400).send("username and password are required")
    }
    const found = await Admin.findOne({ username: username, password: password })
    if (!found) {
        res.status(400).send("User connot be found")
    } else
        next();
}




module.exports = { adminauth }

