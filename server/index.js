require('dotenv').config()
const path = require("path")
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }))

app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.use(express.static(path.resolve(__dirname, '..')))
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.use(errorMiddleware)

const start = () => {
    try {
        mongoose.connect('mongodb+srv://vlamale:vlamale@cluster0.cnyqd.mongodb.net/languageLearning?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        app.listen(PORT, () => {
            console.log(`Server was started on port: ${PORT}`);
        })
    } catch (err) {
        console.log(err)
    }
}

start()