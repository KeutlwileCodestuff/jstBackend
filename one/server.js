const express = require('express')
const app = express()
const port = 3000


let data = ["keu"]

//Middleware to configure otu project
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/display', (req, res) => {
  res.send(`<h1>${data}</h1>`)
})

//CRUD


app.post('/api/data' , (req , res) => {
  const enqry = req.body
  data.push(enqry.name)

  console.log(`${enqry.name} added to data`)
})


app.delete('/api/delete' , (req , res) => {
  data.pop(req.body.name)
  console.log(`${req.body.name} deleted from data`)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
