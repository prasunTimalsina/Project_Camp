import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resendEmailVerification,
  verifyEmail,
} from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/resend-email-verification").post(resendEmailVerification);
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
