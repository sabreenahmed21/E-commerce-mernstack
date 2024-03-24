import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A product must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user:{
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      ratings: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user:{
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

export default mongoose.model("Product", ProductSchema);
