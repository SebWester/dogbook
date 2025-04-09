import express from "express";
import multer from "multer";
import path from "path";

const uploadRouter = express.Router();

// Multer config
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

uploadRouter.post("/", upload.single("profileImage"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file to upload" });

  try {
    console.log("File uploaded");
    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error uploading file", err });
  }
});

export default uploadRouter;
