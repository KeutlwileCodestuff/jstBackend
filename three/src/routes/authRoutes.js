import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import DB from '../db.js'
import e from 'express'
import prisma from '../prismaClient.js'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const route = express.Router()

route.post('/register' , async (req , res) =>{
    console.log('in register route')

    const {username , password} = req.body
    const hashPassword = bcrypt.hashSync(password , 8)

    // save username and hashed password to the database

    try{

        // insert data into the todo table in the database
        const insertUserData = await prisma.user.create({
            data: {
                username : username,
                password : hashPassword
            }
        })

        
        await prisma.todo.create({
            data: {
                user_id: insertUserData.id , 
                task   : 'add your first todo.'
            }
        })       

        // create a token for the user 
        const token = jwt.sign({id: insertUserData.id },process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})

    }catch(err){
        console.error(err)
        res.send(501)
    }
})

route.post('/login' , async (req , res) =>{
    console.log('in login route')

    // One eay encrypt the password the user entered using the same algorithem and then
    // search for a password that may match the entered one within the database to authanticate the 
    // user

    const {username , password} = req.body

    try{
        const getUser = await prisma.user.findUnique({
            where: {
                username : username
            }
        })

        if(!ifUser){
            return res.status(404).send({message: 'User not found'})
        }

        const comparePasswords = bcrypt.compareSync(password ,ifUser.password )
        console.log(comparePasswords)
        if(!comparePasswords){
            return res.status(401).send({message: 'Invalid password'})
        }
        const token = jwt.sign({id: ifUser.id},process.env.JWT_SECRET, {expiresIn: '24h'})


        return res.json({token})

    }catch(err){
        console.error(err)
        res.send(501)
    }

})

export default route