const { ObjectId } = require("mongodb");

const getWorkout = async (req, res) => {
	const usernameInput = req.username;
	const roleInput = req.role;
	try {
		let workoutlist;
		if (roleInput === "user") {
			workoutlist = await req.db
				.collection("workouts")
				.find({ maker: usernameInput })
				.toArray();
		} else {
			workoutlist = await req.db.collection("workouts").find().toArray();
		}
		res.status(200).json({
			message: "Success Read All Workout List",
			data: workoutlist,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// ADD ACTIVITY
const createRunning = async (req, res) => {
	const usernameInput = req.username;
	try {
		const { title, description, distance, time, date } = req.body;
		const calorieCostPerKm = 70;
		const activityType = "running";
		const calories = (calorieCostPerKm * distance * time) / 60;

		const newWorkout = await req.db.collection("workouts").insertOne({
			title,
			description,
			distance,
			activityType,
			time,
			calorie: calories,
			date,
			maker: usernameInput,
		});

		res.status(200).json({
			ID: newWorkout.insertedId,
			message: `Add Running Success.`,
			data: newWorkout,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const createCycling = async (req, res) => {
	const usernameInput = req.username;
	try {
		const { title, description, distance, time, date } = req.body;
		const calorieCostPerKm = 50;
		const activityType = "cycling";
		const calories = parseInt((calorieCostPerKm * distance * time) / 60);

		const timeInt = parseInt(time, 10);
		const distanceInt = parseInt(distance, 10);

		const newWorkout = await req.db.collection("workouts").insertOne({
			title,
			description,
			distance,
			activityType,
			time,
			date,
			calorie: calories,
			maker: usernameInput,
		});

		res.status(200).json({
			ID: newWorkout.insertedId,
			message: `Add Cycling Success.`,
			data: newWorkout,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const createSwimming = async (req, res) => {
	const usernameInput = req.username;
	try {
		const { title, description, distance, time, date } = req.body;
		const calorieCostPerKm = 80;
		const activityType = "swimming";
		const calories = (calorieCostPerKm * distance * time) / 60;
		const newWorkout = await req.db.collection("workouts").insertOne({
			title,
			description,
			distance,
			activityType,
			time,
			date,
			calorie: calories,
			maker: usernameInput,
		});

		res.status(200).json({
			ID: newWorkout.insertedId,
			message: `Add Swimming Success.`,
			data: newWorkout,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateWorkout = async (req, res) => {
	const id = req.params.id;
	const { title, description, distance, time, date } = req.body;
	try {
		const workout = await req.db
			.collection("workouts")
			.findOne({ _id: new ObjectId(id) });

		if (!workout) {
			return res.status(400).json({
				message: `Workout with ID ${id} not found.`,
			});
		}
		// Get activityType from the database
		const activityType = workout.activityType;
		let calorieCostPerKm;
		if (activityType === "running") {
			calorieCostPerKm = 70;
		} else if (activityType === "cycling") {
			calorieCostPerKm = 50;
		} else if (activityType === "swimming") {
			calorieCostPerKm = 80;
		}
		const calorie = (calorieCostPerKm * distance * time) / 60;
		await req.db.collection("workouts").findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{
				$set: {
					title,
					description,
					distance,
					time,
					date,
					calorie,
				},
			}
		);
		console.log(calorieCostPerKm);
		res.status(200).json({
			message: "Successfully Update Workout",
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteWorkout = async (req, res) => {
	const id = req.params.id;
	const usernameInput = req.username;
	try {
		const workoutToDelete = await req.db
			.collection("workouts")
			.findOne({ _id: new ObjectId(id) });
		if (!workoutToDelete) {
			return res.status(400).json({
				message: `Workout with ID ${id} not found.`,
			});
		}
		if (usernameInput === "admin" && workoutToDelete.maker !== "admin") {
			return res.status(403).json({
				message: "Admin can only delete workouts made by admins.",
			});
		}
		await req.db.collection("workouts").deleteOne({ _id: new ObjectId(id) });
		res.status(200).json({
			message: `Workout with ID ${id} has been deleted successfully.`,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getWorkout,
	createRunning,
	createCycling,
	createSwimming,
	updateWorkout,
	deleteWorkout,
};
