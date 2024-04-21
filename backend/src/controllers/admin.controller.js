import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong here");
  }
};

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

try {
    const { name, email, password } = req.body;
  
    if ([name, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "all fields are required");
    }
  
    const existedAdmin = await Admin.findOne({
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
  
    const createdAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken"
    );
  
    if (!createdAdmin) {
      throw new ApiError(500, "Something went wrong while registering");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, createdAdmin, "Admin registered"));
} catch (error) {
  throw new ApiError(500, "Something went wrong while registering 01")
}
});

const loginAdmin = asyncHandler(async (req, res) => {
  //req data from body
  //email
  //find user
  //password check
  //access and refresh token
  //send cookie

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const admin = await Admin.findOne({
    email,
  });

  if (!admin) {
    throw new ApiError(404, "User doesn't exist");
  }

  const isPassowrdValid = await admin.isPasswordCorrect(password);

  if (!isPassowrdValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin logged in"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged out"));
});

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const admin = Admin.findById(decodedToken?._id)
    
        if(!admin){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== admin?.refreshToken){
            throw new ApiError(401, "Refresh token  expired")
        }
    
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(admin._id)
    
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refressToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refressToken: newRefreshToken,
                },
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})



export { registerAdmin, loginAdmin, logoutAdmin, refreshAccessToken };
