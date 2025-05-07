import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
} from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";
import {
  userLoginValidator,
  userRegisterValidator,
  userResetForgottenPasswordValidator,
  userChangeCurrentPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/resend-email-verification").post(resendEmailVerification);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/forgot-password").put(forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .put(userResetForgottenPasswordValidator(), validate, resetForgottenPassword);
router.route("/reset-refresh-token").put(verifyJWT, refreshAccessToken);
router
  .route("/change-password")
  .put(
    userChangeCurrentPasswordValidator(),
    validate,
    verifyJWT,
    changeCurrentPassword
  );
router.route("/get-me").get(verifyJWT, getCurrentUser);
export default router;
