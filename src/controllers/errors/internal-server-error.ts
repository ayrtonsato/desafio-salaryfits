import { ControllerBaseError } from './controller-base-error';

export class InternalServerError extends ControllerBaseError {
    constructor() {
        super({
            statusCode: 500,
            errorMessage: 'Internal Server Error',
        });
    }
}
