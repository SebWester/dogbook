import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { dogs } from "../models/dogSchema.js";

const updateRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Update checked in status
updateRouter.put("/checkin", async (req, res) => {
  try {
    const id = req.body.dogId;
    const thisDog = await dogs.findById(id);

    thisDog.checkedIn = !thisDog.checkedIn;
    await thisDog.save();

    res.status(200).json({ dogId: thisDog });
  } catch (err) {
    console.log("Something went wrong:", err);
    res.status(500).json({ error: err });
  }
});

updateRouter.put(
  "/doginfo/:id",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { name, nickname, age, bio } = req.body;
      const profilePic = req.file ? req.file.path : null;

      const dog = await dogs.findById(id);

      if (profilePic && dog.profilePic !== null) {
        try {
          await fs.unlink(dog.profilePic);
        } catch (err) {
          console.warn("Could not delete old profile pic");
        }
      }

      const updatedFields = {
        name,
        nickname,
        age,
        bio,
      };

      if (profilePic) {
        updatedFields.profilePic = profilePic;
      }

      const updatedDog = await dogs.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });

      res.status(200).json({ newDog: updatedDog });
    } catch (err) {
      console.error("Something went wrong:", err);
      res.status(500).json({ error: err });
    }
  }
);

export default updateRouter;
