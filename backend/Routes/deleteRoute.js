import express from "express";
import { dogs } from "../models/dogSchema.js";
import fs from "fs/promises";

const deleteRouter = express.Router();

deleteRouter.delete("/", async (req, res) => {
  try {
    const id = req.body.id;
    const thisDog = await dogs.findById({ _id: id });
    const imgPath = `./${thisDog.profilePic}`;

    // Delete profile pic if not null
    if (thisDog.profilePic !== null) {
      try {
        await fs.unlink(imgPath);
      } catch (err) {
        console.warn("Could not delete image from ./uploads");
      }
    }

    // Delete dog as friend
    const allDogs = await dogs.find();
    for (let i = 0; i < allDogs.length; i++) {
      const updatedFriends = allDogs[i].friends.filter(
        (friend) => friend._id.toString() !== id.toString()
      );

      if (updatedFriends.length !== allDogs[i].friends.length) {
        await dogs.updateOne(
          { _id: allDogs[i]._id },
          { $set: { friends: updatedFriends } }
        );
      }
    }

    // Delete dog from database
    await dogs.deleteOne({ _id: id });
    res.status(200).json({ status: `Dog deleted: ${id}` });
  } catch (err) {
    console.error("Could not delete dog:", err);
    res.status(500).json({ error: err });
  }
});

export default deleteRouter;
