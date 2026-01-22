export class apiResponse {

    static successResponse = (res, statusCode, data, message) => {
        res.status(statusCode).json({
            success: true,
            data,
            message,
        });
    }

    static errorResponse = (res, statusCode, errorMessage, error) => {
        res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error
        });
    }
}

