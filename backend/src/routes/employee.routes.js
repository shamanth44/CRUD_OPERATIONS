import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../controllers/employee.controller.js";

const router = Router();

router
  .route("/create-employee")
  .post(
    verifyJwt,
    upload.fields([{ name: "image", maxCount: 1 }]),
    createEmployee
  );
  
  router
  .route("/get-employees")
  .get(
    verifyJwt,
    getAllEmployees
  );

  router
  .route("/get-employee/:id")
  .get(
    verifyJwt,
    getEmployee
  );
  
router
  .route("/update-employee/:id")
  .put(
    verifyJwt,
    upload.fields([{ name: "image", maxCount: 1 }]),
    updateEmployee
  );
  

  router
  .route("/delete-employee/:id")
  .delete(
    verifyJwt,
    deleteEmployee
  );

  

export default router;
