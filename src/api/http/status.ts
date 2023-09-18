
export class RequestStatus {

    statusCode: number = NaN;

    setErrorStatus(code: number) {
        this.statusCode = code;
    }

    setNetworkError() {
        this.statusCode = -1;
    }

    isNetworkError(): boolean {
        return this.statusCode == -1;
    }

    isWrongAuth(): boolean {
        return this.statusCode == 401;
    }

    isTooMuchWrongAuth(): boolean {
        return this.statusCode == 403;
    }

    isServerError(): boolean {
        return this.statusCode == 500;
    }

    resetStatusError() {
        this.statusCode = NaN;
    }
}