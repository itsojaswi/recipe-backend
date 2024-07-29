const mongoose = require('mongoose')

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating allowed is 1
      max: 5 // Maximum rating allowed is 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps to the document
)

module.exports = reviewSchema
