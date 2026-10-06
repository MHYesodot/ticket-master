import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ServiceError } from '../errors';

const toErrorPayload = (error: Error) => ({
    name: error.name,
    type: error.name,
    message: error.message,
    retryAttempts: typeof (error as any).retryAttempts === 'number'
        ? (error as any).retryAttempts
        : undefined,
});

export const errorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).send({
            ...toErrorPayload(error),
            message: fromZodError(error).message,
        });
    } else if (error instanceof ServiceError) {
        res.status(error.code).send(toErrorPayload(error));
    } else {
        res.status(500).send(toErrorPayload(error));
    }

    next();
};
