const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ?? 3000


const app = express()



app.use(express)
app.use(cors())


app.get('/', (req, res) => {
    res.send({
        message: 'hello world'
    })
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}... `)
})