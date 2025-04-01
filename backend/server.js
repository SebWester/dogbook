import express from "express";
import cors from "cors";
import mongoDB from "./database.js";

const app = express();
const PORT = 3000;

mongoDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

/* 
    Sätt upp mongoDB
    Model och Schema för databas
    GET, POST, PUT & DEL routes
    multer för att ladda upp bilder
*/

// Routes
import createRouter from "./Routes/createRouter.js";
import fetchRouter from "./Routes/fetchRouter.js";
import updateRouter from "./Routes/updateRouter.js";

app.use("/create", createRouter);
app.use("/dogdata", fetchRouter);
app.use("/update", updateRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}🚀`);
});
