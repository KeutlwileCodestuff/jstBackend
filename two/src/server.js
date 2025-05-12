import express from 'express'
import path, { dirname} from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 3001
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename )


// In this case express doesnt really know the correct path for our files so Middlesware is used to 
//configure the project do that correct paths for the files are set. this also help html files to locate css files.
app.use(express.static(path.join(__dirname , '../public' )))

app.get('/', (req, res) => {
  // display the contents of "index.html file"
  res.sendFile(path.join(__dirname , 'public' , 'index.html'))
  
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})