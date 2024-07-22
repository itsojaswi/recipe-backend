const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
// ? creating instace for express application
const app = express()

// Connect Database
connectDB()

// Use CORS middleware
app.use(cors())

app.use((req, res, next) => {
  req.user = { id: '669b9901a4ed4787d68cb279' } // Replace with a valid user ID from your database
  next()
})

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))
app.use('/api/recipe', recipeRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
