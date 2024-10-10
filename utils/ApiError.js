class ApiError extends Error {
    constructor(message, statusCode) {
        super(message) 
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(5) ? 'fail' : 'error';
        this.isOperational = true;
    }
}

module.exports = ApiError ;