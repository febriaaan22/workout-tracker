const { Router } = require("express");
const { register, login, profile } = require("../service/userService");
const LoginLimiter = require("../middleware/rateLimit");
const authMiddleware = require("../middleware/authentication-middleware");

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", LoginLimiter, login);
userRouter.get("/profile", authMiddleware, profile);

module.exports = userRouter;
