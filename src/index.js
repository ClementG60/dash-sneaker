import express from "express";
import "dotenv/config";
import "./config/dbConfig.js";
import sneakerRoute from "./routes/sneakerRoute.js";
import stuffRoute from "./routes/stuffRoute.js";
import websiteRoute from "./routes/websiteRoute.js";
import expensiveRoute from "./routes/expensivesRoute.js";
import statisticsRoute from "./routes/statisticsRoute.js";
import trackingsRoute from "./routes/trackingsRoute.js";
import brandsRoute from "./routes/brandsRoute.js";
import cors from "cors";

const app = express();
//cors
app.use(cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/sneaker", sneakerRoute);
app.use("/api/stuff", stuffRoute);
app.use("/api/website", websiteRoute);
app.use("/api/expensive", expensiveRoute);
app.use("/api/statistics", statisticsRoute);
app.use("/api/brand", brandsRoute);
app.use("/api/tracking", trackingsRoute);

app.listen(5000, () => {
  console.log(`server running on port 5000`)
});