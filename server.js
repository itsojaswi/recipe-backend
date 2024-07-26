const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const favoriteRoutes = require('./routes/favoriteRoutes')
const mealRoutes = require('./routes/mealPlannerRoutes')
// ? creating instace for express application
const app = express()

// Connect Database
connectDB()

// Use CORS middleware
app.use(cors())

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))
app.use('/api/recipe', recipeRoutes)
app.use('/api', userRoutes)
app.use('/api/favorite', favoriteRoutes)
app.use('/api/meal', mealRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
