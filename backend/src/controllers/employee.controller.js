import { Employee } from "../models/employeeDetails.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEmployee = asyncHandler(async (req, res) => {
try {
        const { uniqueId, name, email, mobileNo, designation, gender, course } = req.body;
    
        if([uniqueId, name, email, mobileNo, designation, gender, course].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }
    
        const existedEmployee = await Employee.findOne({
            $or: [ {uniqueId}, {name}, {email}],
        });
    
        if(existedEmployee) {
            throw new ApiError(409, "Employee already existed");
        }
    
        const imageLocalPath = req.files?.image[0].path;
    
        if(!imageLocalPath) {
            throw new ApiError(400, "Image is required");
        }
    
        const image = await uploadOnCloudinary(imageLocalPath);
    
        if(!image) {
            throw new ApiError(400, "Image is required");
        }
    
        const employee = await Employee.create({
            uniqueId,
            name,
            email,
            mobileNo,
            designation,
            gender,
            course,
            image: image.url,
        })
    
    
        if(!employee) {
            throw new ApiError(500, "Something went wrong while creating employee")
        }
    
        return res
        .status(201)
        .json(new ApiResponse(200, employee, "Employee created successfully"))
} catch (error) {
    throw new ApiError(500, "Something went wrong");
}
})

export{ createEmployee } ; 