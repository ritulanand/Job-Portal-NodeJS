import express from "express";
import {
  renderJobs,
  renderJobDetails,
  createNewJob,
  updateJobDetails,
  deleteJobPost,
  applyToJob,
} from "../controllers/job.controller.js";
import { upload } from "../middleware/fileUpload.js";

const router = express.Router();

// Job Routes
router.get("/", renderJobs);
router.get("/:id", renderJobDetails);
router.post("/", createNewJob);
router.put("/:id", updateJobDetails);
router.delete("/:id", deleteJobPost);

// Application Routes
router.post("/:id/apply", upload.single("resume"), applyToJob);

export { router as jobRoutes };
