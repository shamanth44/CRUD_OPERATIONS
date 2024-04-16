import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerAdmin = asyncHandler(async (req, res) => {
  // get user details from frontend
  //validation - not empty
  // check if admin already exists: username, email
  // check images
  // upload them to cloudinary
  // create admin object - create entry in db
  // remove password and refresh token field form response
  //check for admin creation
  // return res

  const { name, email, password } = req.body;
  console.log(email);

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }

  const existedAdmin = Admin.findOne({
    $or: [{ name }, { email }],
  });

  if (existedAdmin) {
    throw new ApiError(409, "Email or name already exists");
  }

  const imageLocalPath = req.files?.image[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  const admin = await Admin.create({
    name,
    image: image.url,
    email,
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select("-password" -"refreshToken")

  if(!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering");
  }

  return res.status(201).json(
    new ApiResponse(200, createdAdmin, "Admin registered")
  )

});


export { registerAdmin };
