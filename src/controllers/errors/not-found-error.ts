import { ControllerBaseError } from './controller-base-error';

export class NotFoundError extends ControllerBaseError {
    constructor() {
        super({
            statusCode: 404,
            errorMessage: 'Not Found Error',
        });
    }
}
