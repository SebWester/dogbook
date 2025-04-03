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
  // try {
  //   console.log(req.body);
  // res.status(200).json({ data: req.body });
  // } catch (err) {
  //   console.error("Something went wrong:", err);
  //   res.status(500).json({ error: "Error uploading data", error });
  // }

  try {
    const { name, age, bio } = req.body;
    const profilePic = req.file;
    console.log("Data received:", { name, age, bio, profilePic });

    // const newDog = new dogs({
    //   name: name,
    //   age: age,
    //   bio: bio,
    //   checkedIn: false,
    //   friends: [],
    // });

    // await newDog.save();
    // res.status(200).json({ savedDog: newDog });
    res.status(200).json({ data: req.body });
  } catch (err) {
    console.error("Could not post:", err);
  }
});

export default createRouter;
