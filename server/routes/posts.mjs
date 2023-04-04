import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = (await db()).collection("cars");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let id=req.params.id
  id=id.slice(1) //remove the colon at the start 
  let collection = (await db()).collection("cars");
  let query = {_id: ObjectId(id)};

  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = (await db()).collection("cars");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});
// Delete an entry
router.delete("/:id", async (req, res) => {
  let id=req.params.id
  id=id.slice(1) //remove the colon at the start 

  const query = { _id: ObjectId(id) };

  const collection = (await db()).collection("cars");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
