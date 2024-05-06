import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// const allowedOrigins = process.env.CORS_ORIGIN
// const corsOptions = {
//     origin: process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()),
//     // Add other CORS options if needed (e.g., methods, headers)
//   };
app.use(cors(
  {
  // origin: corsOptions,
  origin: `${process.env.CORS_ORIGIN}`,
    // origin: ["http://localhost:5173", "https://employee-dashboard-ashen.vercel.app"],
    credentials: true
    }
))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

console.log(process.env.CORS_ORIGIN)
// routes

import adminRouter from "./routes/admin.routes.js";
import employeeRouter from "./routes/employee.routes.js"


// app.use(adminRouter)

app.get("/", (req, res) => {
  res.send("Server")
})

app.use("/api/v1/admin", adminRouter) // https://employee-dashboard-backend-three.vercel.app/api/v1/admin/register

app.use("/api/v1/employee", employeeRouter) // https://employee-dashboard-backend-three.vercel.app/api/v1/employee/create-employee






export { app }