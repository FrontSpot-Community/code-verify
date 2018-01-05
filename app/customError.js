class CustomError {
    constructor(message, status) {
        this.error = new Error();
        this.error.message = message;
        status ? this.error.status = status : null;
    }
}

export default CustomError;
