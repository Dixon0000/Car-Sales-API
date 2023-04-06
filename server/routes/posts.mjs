import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 cars
router.get("/", async (req, res) => {
  let collection = (await db()).collection("cars");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.status(200).send(results);
});

// Get a single car
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let collection = (await db()).collection("cars");
  let query = { _id: ObjectId(id) };

  let result = await collection.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// Add a new car
router.post("/", async (req, res) => {
  let collection = (await db()).collection("cars");
  let newDocument = req.body;
  newDocument.date = new Date();
  
  try {
    let result = await collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: newDocument },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(201).send(result.value);
  } catch (err) {
    console.log("Error inserting the new document:", err);
    res.status(500).send("Error inserting the new document");
  } finally {
    if (!res.headersSent) {
      res.status(500).send("An unexpected error occurred");
    }
  }
});

// Delete a car by its ID
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let collection = (await db()).collection("cars");
  let query = { _id: ObjectId(id) };

  try {
    let result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Deleted successfully" });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (err) {
    console.log("Error deleting the document:", err);
    res.status(500).send({ message: "Error deleting the document" });
  }
});


export default router;
