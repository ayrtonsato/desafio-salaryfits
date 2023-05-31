interface ControllerErrorParams {
    statusCode: number;
    errorMessage: string;
    errorIsPublic?: boolean;
}

export class ControllerBaseError extends Error {
    public statusCode: number;
    public errorIsPublic: boolean;

    constructor({ statusCode,
        errorMessage,
        errorIsPublic = false,
    }: ControllerErrorParams) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorIsPublic = errorIsPublic;
    }
}
