import express from "express";
import {
  renderLogin,
  renderSignUp,
  handleLogin,
  handleSignUp,
  logout,
  renderlayout,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/", renderLogin);
router.get("/login", renderLogin);
router.get("/signup", renderSignUp);
router.post("/login", handleLogin);
router.post("/signup", handleSignUp);
router.post("/logout", logout);

export { router as userRoutes };
