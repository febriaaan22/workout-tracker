const { Router } = require("express");
const {
	bmiCalculator,
	getBmiCalculator,
	deleteBmiCalculator,
} = require("../service/bmiCalculator");
const authenticationMiddleware = require("../middleware/authentication-middleware");

const bmiCalculatorRouter = Router();

bmiCalculatorRouter.get(
	"/bmicalculator",
	authenticationMiddleware,
	getBmiCalculator
);
bmiCalculatorRouter.post(
	"/bmicalculator",
	authenticationMiddleware,
	bmiCalculator
);
bmiCalculatorRouter.delete(
	"/bmicalculator",
	authenticationMiddleware,
	deleteBmiCalculator
);

module.exports = bmiCalculatorRouter;
