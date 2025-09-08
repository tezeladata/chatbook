const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
    })
}

const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
            status: err.status,
            message: err.message || "Something went wrong"
    })
}

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development"){
        return sendErrorDev(err, res)
    } else {
        return sendErrorProd(err, res)
    }
}