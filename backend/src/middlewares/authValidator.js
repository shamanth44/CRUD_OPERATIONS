import zod from "zod";

const signupSchema = zod.object({
    name: zod.string({required_error: "Name is required"}).trim().min(3, {message: "Name must me atleast 3 character"}),
    email: zod.string({required_error: "Email is required"}).trim().min(3, {message: "Email must me atleast 3 character"}),
    password: zod.string({required_error: "Password is required"}).trim().min(8, {message: "Password must me atleast 8 character"}),
    image: zod.any()
    .refine((file) => file.size <= 4000000, 'File size must be less than 4MB')
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.mimetype), 'Only JPEG and PNG images allowed')
});


export default signupSchema;