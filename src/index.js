import express from "express";
import "dotenv/config";
import "./config/dbConfig.js";
import sneakerRoute from "./routes/sneakerRoute.js";
import websiteRoute from "./routes/websiteRoute.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/sneaker", sneakerRoute);
app.use("/api/website", websiteRoute);

app.listen(5000, () => {
  console.log(`server running on port 5000`)
});