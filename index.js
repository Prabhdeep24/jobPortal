import express, { urlencoded } from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();
// connect db
connectDB();
const PORT = process.env.PORT || 8080;
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods",
             "GET, HEAD, OPTIONS, POST, PUT DELETE");
  res.header("Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
const corsOptions = {
  origin: "https://66cb14ae882f3dfbd3c736d3--incredible-platypus-0bea99.netlify.app/",
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Health Check");
});
// api's route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
