require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { corsOptions } = require("./middleware/cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/authentication-middleware");
const databaseMiddleware = require("./middleware/database-middleware");
const userRouter = require("./routes/userRoutes");
const workoutRouter = require("./routes/workoutRoutes");
const dbConnection = require("./config/dbconfig");
const { applyHelmet } = require("./middleware/helmet");
const bmiCalculatorRouter = require("./routes/bmiCalculatorRoutes");

const app = express();
app.use(cors(corsOptions));
dbConnection();
applyHelmet(app);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(databaseMiddleware);

app.get("/", (req, res) => {
	res.send("Workout App - Final Project");
});

app.use("/api", userRouter);
app.use("/api", authMiddleware, workoutRouter);
app.use("/api", authMiddleware, bmiCalculatorRouter);

app.listen(3000, () => console.log("Server is running on port 3000"));
