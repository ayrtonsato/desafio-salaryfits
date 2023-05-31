import { ControllerBaseError } from './controller-base-error';

export class AuthenticationError extends ControllerBaseError {
    constructor() {
        super({
            statusCode: 401,
            errorMessage: 'Authentication Error',
        });
    }
}
