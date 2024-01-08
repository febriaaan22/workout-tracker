const { Router } = require("express");
const {
	getWorkout,
	deleteWorkout,
	createRunning,
	createCycling,
	createSwimming,
	updateWorkout
} = require("../service/workoutService");
const authenticationMiddleware = require("../middleware/authentication-middleware");

const workoutRouter = Router();

workoutRouter.get("/tasks", authenticationMiddleware, getWorkout);
workoutRouter.post("/tasks/running", authenticationMiddleware, createRunning);
workoutRouter.post("/tasks/cycling", authenticationMiddleware, createCycling);
workoutRouter.post("/tasks/swimming", authenticationMiddleware, createSwimming);
workoutRouter.put("/tasks/:id", authenticationMiddleware, updateWorkout);
workoutRouter.delete("/tasks/:id", authenticationMiddleware, deleteWorkout);

module.exports = workoutRouter;
