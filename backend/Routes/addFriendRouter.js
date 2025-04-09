import express from "express";
import { dogs } from "../models/dogSchema.js";

const addFriendRouter = express.Router();

addFriendRouter.get("/friendlist", async (req, res) => {
  const friendId = req.query.id;
  const thisDog = await dogs.findById(friendId);
  res.status(200).json({ dog: thisDog });
});

addFriendRouter.put("/", async (req, res) => {
  try {
    const thisDogId = req.body.thisDog;
    const friendDogId = req.body.friendDog;

    const thisDog = await dogs.findById({ _id: thisDogId });
    const friendDog = await dogs.findById(friendDogId);

    if (
      !thisDog.friends.some((friend) => friend._id.toString() === friendDogId)
    ) {
      const cleanFriendDog = { ...friendDog.toObject() };
      delete cleanFriendDog.friends;

      const cleanThisDog = { ...thisDog.toObject() };
      delete cleanThisDog.friends;

      thisDog.friends.push(cleanFriendDog);
      friendDog.friends.push(cleanThisDog);

      await thisDog.save();
      await friendDog.save();
    }

    res.status(200).json({ newFriend: friendDog });
  } catch (err) {
    console.error("Could not add friend:", err);
    res.status(500).json({ error: err });
  }
});

export default addFriendRouter;
