import express from 'express'
import DB from '../db.js'

const router = express.Router()

// get all todos for logged user
router.get('/' , (req , res) => {
    console.log('in get todo route')
    const getTodos = DB.prepare('SELECT * FROM todo WHERE user_id = ? ')
    const todos = getTodos.all(req.userId )
    res.json(todos)
})

//add a todo to the db and displays on the browser.
router.post('/' , (req , res) => {

    const {task} = req.body
    const insertTask = DB.prepare('INSERT INTO todo (user_id , task) VALUES (?, ?)')
    insertTask.run(req.userId , task)

    res.json({id: insertTask.lastID ,  task , completed: 0})
    
})

//update 
router.put('/:id' , (req , res) => {

    const {id} = req.params
    const {task , completed} = req.body
    const updateTask = DB.prepare('UPDATE todo SET completed = 1 WHERE id = ? AND user_id = ?')
    updateTask.run(id , req.userId)

    res.json({message: 'Todo Completed !'})

})

router.delete('/:id' , (req , res) => {
    const {id} = req.params
    const deleteTodo = DB.prepare('DELETE FROM todo WHERE id = ? AND user_id = ?')
    deleteTodo.run(id , req.userId)

    res.json({message: 'Deleted Todo'})
})

export default router