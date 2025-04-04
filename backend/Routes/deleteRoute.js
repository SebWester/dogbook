import express from "express";
import { dogs } from "../models/dogSchema.js";
const deleteRouter = express.Router();

deleteRouter.delete("/", async (req, res) => {
  try {
    const id = req.body.id;
    await dogs.deleteOne({ _id: id });

    res.status(200).json({ status: `Dog deleted: ${id}` });
  } catch (err) {
    console.error("Could not delete dog:", err);
    res.status(500).json({ error: err });
  }
});

export default deleteRouter;
