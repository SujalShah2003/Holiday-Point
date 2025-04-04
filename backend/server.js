import "dotenv/config";
import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const MONGO_URI =
  "mongodb+srv://admin:Holiday%40061207@holiday-point.kepnlri.mongodb.net/client_reviews";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

console.log("MongoDB URI:", MONGO_URI);

// MongoDB Connection
connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Review Schema
const reviewSchema = new Schema(
  {
    username: String,
    location: String,
    rating: Number,
    reviewDetails: String,
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);

// GET all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from MongoDB
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET review by ID
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const reviews = await Review.findById(req.params.id); // Fetch all reviews from MongoDB
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST new review
app.post("/api/reviews", async (req, res) => {
  try {
    const { username, location, rating, reviewDetails } = req.body;

    if (!username || !location || !rating || !reviewDetails) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset)
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    const newReview = new Review({
      username,
      location,
      rating,
      reviewDetails,
      time: istTime,
    });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
