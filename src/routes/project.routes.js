import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProjectValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
} from "../controllers/project.controllers.js";

const router = Router();

router
  .route("/")
  .post(createProjectValidator(), validate, verifyJWT, createProject)
  .get(getProjects);

router
  .route("/:id")
  .delete(verifyJWT, deleteProject)
  .put(verifyJWT, updateProject);

router.route("/members").post(addMemberToProject);
router.route("/members/:id").get(getProjectMembers);

router
  .route("/members/:id")
  .delete(verifyJWT, deleteMember)
  .put(verifyJWT, updateMemberRole);

export default router;
