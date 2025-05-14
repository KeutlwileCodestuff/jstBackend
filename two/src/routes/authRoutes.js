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
        const creatUser = insertUserData.run(username , hashPassword)
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
    // One eay encrypt the password the user entered using the same algorithem and then
    // search for a password that may match the entered one within the database to authanticate the 
    // user

    const {username , password} = req.body
    const hashPassword = bcrypt.hashSync(password , 8)

    try{
        const getUser = DB.prepare('SELECT * FROM user WHERE user_name = ? ')
        const ifUser = getUser.get(username)

        if(!ifUser){
            return res.status(404).send({message: 'User not found'})
        }else{
            const comparePasswords = bcrypt.compare(ifUser.password , hashPassword)
            if(!comparePasswords){
                return res.status(401).send({message: 'Invalid password'})
            }else{
                const token = jwt.sign({id: ifUser.id},process.env.JWT_SECRET, {expiresIn: '48'})
                res.json(token)
            }
        }

    }catch(err){
        console.error(err)
        res.send(501)
    }

})

export default route