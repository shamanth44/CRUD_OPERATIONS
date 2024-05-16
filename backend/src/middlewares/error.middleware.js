export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message
    return res.status(status).json({error})
}