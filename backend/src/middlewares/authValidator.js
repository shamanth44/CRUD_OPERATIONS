import zod from "zod";

const signupSchema = zod.object({
    name: zod.string({required_error: "Name is required"}).trim().min(3, {message: "Name must me atleast 3 character"}),
    email: zod.string({required_error: "Email is required"}).trim().min(3, {message: "Email must me atleast 3 character"}),
    password: zod.string({required_error: "Password is required"}).trim().min(8, {message: "Password must me atleast 8 character"}),
    image: zod.any()

    .refine((file) =>  file?.image?.length >= 0 ,"Image is required")
    .refine((file) => {return !file?.image?.[0]  || file?.image?.[0]?.size  <= 4000000, 'File size must be less than 4MB'})
    .refine((file) => {return !file?.image?.[0] || ['image/jpeg', 'image/png'].includes(file?.image?.[0]?.mimetype), ' Image is not found Only JPEG and PNG images allowed'})
});


export default signupSchema;