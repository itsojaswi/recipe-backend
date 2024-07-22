const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables.');
        }

        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
            socketTimeoutMS: 45000, // Timeout for socket operations
        });

        console.log('MongoDB connected successfully...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;