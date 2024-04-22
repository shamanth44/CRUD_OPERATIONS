import { Router } from "express";
import { loginAdmin, logoutAdmin, refreshAccessToken, registerAdmin } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createEmployee } from "../controllers/employee.controller.js";

const router = Router();


router
  .route("/create-employee")
  .post(verifyJwt, upload.fields([{ name: "image", maxCount: 1 }]), createEmployee);


export default router;
