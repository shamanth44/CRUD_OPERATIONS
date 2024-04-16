import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: Number,
    required: true,
    unique: ture,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

export const Employee = mongoose.model("Employee", employeeSchema);
