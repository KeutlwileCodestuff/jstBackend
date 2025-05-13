import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import DB from '../db.js'
import e from 'express'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const route = express.Router()

route.post('/register' , (req , res) =>{
    const {username , password} = req.body
    const hashPassword = bcrypt.hashSync(password , 8)

    // save username and hashed password to the database

    try{
        const insertUserData = DB.prepare('INSERT INTO user (user_name , password) VALUES (?, ?)')
        const creatUser = insertUserData.run(username , password)
        // insert data into the todo table in the database
        const defaultTodo = 'add your first todo'
        const insertTodo = DB.prepare('INSERT INTO todo (user_id , task) VALUES (?, ?)')
        insertTodo.run(creatUser.lastInsertRowid , defaultTodo)        

        // create a token for the user 
        const token = jwt.sign({id: creatUser.lastInsertRowid},process.env.JWT_SECRET, {expiresIn: '48'})
        res.json({token})

    }catch(err){
        console.error(err)
        res.send(501)
    }


})

route.post('/login' , (req , res) =>{
    
})

export default route