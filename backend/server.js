import "dotenv/config";
import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const MONGO_URI = "mongodb+srv://admin:05AFGMfnnBzm8t6k@holiday-point.apk3z1r.mongodb.net/holiday-point-db"
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


// -------------------------------------- Reviews ------------------------------------------------------------ 

// Review Schema
const reviewSchema = new Schema({
  username: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewDetails: { type: String, required: true },
  time: { type: String },
});
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

// DELETE REVIEW BY ID
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
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

// ---------------------------------------------- Contact Us ----------------------------------------------------

// Contact Schema
const contactSchema = new Schema({
  username: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  location: { type: String, required: true },
  members: { type: Number, required: true },
  category: { type: String, required: true },
  contact: { type: String, required: true },
  time: { type: String }, // Optional - save submission time in IST
});

const Contact = model("Contact", contactSchema);

// GET All Contacts
app.get("/api/contact-details", async (req, res) => {
  try {
    const reviews = await Contact.find(); // Fetch all reviews from MongoDB
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE Contact Info by ID
app.delete("/api/contact-details/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// POST Contact Details
app.post("/api/contact", async (req, res) => {
  try {
    const { username, checkIn, checkOut, location, members, category, contact } = req.body;

    if (!username || !checkIn || !checkOut || !location || !members || !category || !contact) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset)
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    const newContact = new Contact({
      username,
      checkIn,
      checkOut,
      location,
      members,
      category,
      contact,
      time: istTime,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ------------------------------------------------------ Admin Login --------------------------------------------------

// Admin Login Schema
const adminDataSchema = new Schema({
  admin_username: { type: String, required: true },
  admin_password:{type : String,required : true},
});
const AdminData = model("admin-user", adminDataSchema);

// GET All Admin Data
app.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await AdminData.findOne({
      admin_username: username.trim(),
      admin_password: password.trim(),
    });
    if (admin) {
      res.status(200).json({
        username: admin.admin_username,
        isAdmin: true,
      });
    } else {
      res.status(200).json({
        isAdmin: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
