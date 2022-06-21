export class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.success = false;
    }
    getCode() { return 400; }
}

export class BadRequest extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Bad request";
    }
    getCode() { return 400 };
}

export class Conflict extends GeneralError {

    constructor(message) {
        super(message);
        this.name = "Conflict";
    }
    getCode() { return 409 };
}

export class NotFound extends GeneralError {

    constructor(message) {
        super(message);
        this.name = "Not found";
    }
    getCode() { return 404 };
}

export class FailedToParse extends GeneralError {

    constructor(message) {
        super(message);
        this.name = "FailedToParse";
    }
    getCode() { return 400 };
}