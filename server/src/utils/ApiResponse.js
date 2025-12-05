class ApiResponse {
    constructor(statesCode, data, message = "Success") {
        this.statusCode = statesCode,
            this.data = data,
            this.message = message,
            this.success = statesCode < 400
    };
}
export { ApiResponse };