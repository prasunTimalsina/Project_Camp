import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  getTaskById,
  getTasks,
} from "../controllers/task.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  validateProjectPermission,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router({ mergeParams: true });
router
  .route("/")
  .post(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    upload.single("some_file"),
    createTask
  )
  .get(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getTasks
  );

router
  .route("/:taskId")
  .delete(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    deleteTask
  )
  .put(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    upload.single("some_file"),
    updateTask
  )
  .get(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getTaskById
  );
export default router;
