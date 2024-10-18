const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();
const URL = process.env.DB;

const DB_NAME = "movie_db";
const COLLECTION_NAME = "movies";

app.use(
  cors({
    origin: "*",
  })
);

let db, collection;

// Connect to MongoDB once when the server starts
const client = new MongoClient(URL, {});
client.connect().then(() => {
  db = client.db(DB_NAME);
  collection = db.collection(COLLECTION_NAME);
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("Error connecting to MongoDB", error);
});

app.get("/movie/get-movies", async (req, res) => {
  try {
    // Step 4. Fetch all movies from the collection
    let movies = await collection.find({}).toArray();
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/movie/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch a single movie by its ID
    let movie = await collection.findOne({ _id: new ObjectId(id) });
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/book-ticket", (req, res) => {
  // Logic for booking a ticket can go here
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
