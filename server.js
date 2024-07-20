const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')

// ? creating instamce for express application
const app = express()

// Connect Database
connectDB()

// Use CORS middleware
app.use(cors())

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
