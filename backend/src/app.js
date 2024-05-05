import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
    // origin: `${process.env.CORS_ORIGIN}`,
    // origin: "http://localhost:5173",
    origin: "https://employee-dashboard-ashen.vercel.app/",
    credentials: true
    }
))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes

import adminRouter from "./routes/admin.routes.js";
import employeeRouter from "./routes/employee.routes.js"


app.use(adminRouter)
app.use("/api/v1/admin", adminRouter) // http://localhost:8000/api/v1/admin/register

app.use("/api/v1/employee", employeeRouter) // http://localhost:8000/api/v1/employee/create-employee






export { app }