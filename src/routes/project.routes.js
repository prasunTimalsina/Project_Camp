import { Router } from "express";
import {
  validateProjectPermission,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import { createProjectValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
} from "../controllers/project.controllers.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router
  .route("/")
  .post(createProjectValidator(), validate, verifyJWT, createProject)
  .get(verifyJWT, getProjects);

router
  .route("/:projectId")
  .get(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.MEMBER,
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    getProjectById
  )
  .delete(
    verifyJWT,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteProject
  )
  .put(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    updateProject
  );

router
  .route("/:projectId/members")
  .get(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    getProjectMembers
  )
  .post(
    verifyJWT,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberToProject
  );

router
  .route("/:projectId/members/:memberId")
  .delete(
    verifyJWT,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteMember
  )
  .put(
    verifyJWT,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateMemberRole
  );

export default router;
