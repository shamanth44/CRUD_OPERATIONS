const validate = (schema) => async(req, res , next) => {
    try {
        console.log(req.body)
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
    } catch (err) {
        // const message = err.errors[0].message
        res.status(400).json({message: err})
    }
}

export default validate;