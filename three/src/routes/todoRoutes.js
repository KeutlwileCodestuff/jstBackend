import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// get all todos for logged user
router.get('/' , async (req , res) => {
    const getTodos = await prisma.todo.findMany({
        where: {
            user_id: req.userId
        }
    })
    res.json(getTodos)
})

//add a todo to the db and displays on the browser.
router.post('/' , async (req , res) => {

    const {task} = req.body
    const insertTask = await prisma.todo.create({
        data: {
            user_id: req.userId , 
            task   : task
        }
    })

    res.json(insertTask)
    
})

//update 
router.put('/:id' , async (req , res) => {

    const {id} = req.params
    await prisma.todo.update({
        where: {
            id     : parseInt(id),
            user_id:userId
        },
        data:{
            completed: !!1
        }
    })

    res.json({message: 'Todo Completed !'})

})

router.delete('/:id' , async (req , res) => {
    const {id} = req.params
    await prisma.todo.deleteMany({
        where:{
            id     : parseInt(id),
            user_id: req.userId
        }
    })
    res.json({message: 'Deleted Todo'})
})

export default router