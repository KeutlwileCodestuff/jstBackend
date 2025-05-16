import express from 'express'
import DB from '../db.js'

const router = express.Router()

// get all todos for logged user
router.get('/' , (req , res) => {
    const getTodos = DB.prepare('SELECT * FROM todo WHERE user_id= ? ')
    const todos = getTodos.all(req.user_id )
    res.json({todos})


})

router.post('/' , (req , res) => {
    
})

router.put('/' , (req , res) => {
    
})

router.delete('/' , (req , res) => {
    
})
// Create a new todo

// update a todo
export default router