const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let errorCode = err.code || "INTERNAL_SERVER_ERROR";
    let message = err.message || "An unexpected error occurred on the server.";

    if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 400;
        errorCode = "DUPLICATE_EMAIL";
        message = "A registration with this email address already exists.";
    }

    res.status(statusCode).json({
        success: false,
        error: {
            code: errorCode,
            message: message
        }
    });
};

module.exports = errorHandler;