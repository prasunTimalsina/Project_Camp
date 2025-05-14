import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
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
  );
export default router;
