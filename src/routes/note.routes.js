import { Router } from "express";
import {
  validateProjectPermission,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { notesValidator } from "../validators/index.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getNotes
  )
  .post(
    notesValidator(),
    validate,
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    createNote
  );

router
  .route("/:noteId")
  .get(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getNoteById
  )
  .put(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    updateNote
  )
  .delete(
    verifyJWT,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    deleteNote
  );
export default router;
