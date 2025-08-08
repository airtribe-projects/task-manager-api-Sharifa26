export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    if (statusCode >= 400 && statusCode < 500) {
        return res.error(err.message, statusCode, {
            error: err,
            // stack: err.stack,
        });
    }

    if (statusCode === 500) {
        // Programming or unknown errors
        return res.error("Something went wrong", 500);
    }
};
