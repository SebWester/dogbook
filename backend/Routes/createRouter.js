import express from "express";
import multer from "multer";
import path from "path";
import { dogs } from "../models/dogSchema.js";

const createRouter = express.Router();

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

createRouter.post("/", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, nickname, age, bio } = req.body;
    const profilePic = req.file ? req.file.path : null;

    const newDog = new dogs({
      profilePic: profilePic,
      name: name,
      nickname: nickname,
      age: age,
      bio: bio,
      checkedIn: false,
      friends: [],
    });

    await newDog.save();
    res.status(200).json({ savedDog: newDog });
  } catch (err) {
    console.error("Could not post:", err);
  }
});

export default createRouter;
