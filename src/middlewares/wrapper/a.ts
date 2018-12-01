import express from 'express';
import { ErrorResponse, OkResponse, ErrorItem } from '../../routes/typings/BodyBuilderInterface';
import Sequelize from 'sequelize';
import { A } from '../../routes/typings/RouteInterface';

const a: A = (handler: express.Handler): express.Handler => {
    return (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Handler> => {
        return Promise.resolve(handler(req, res, next)).catch((err: Error | Sequelize.UniqueConstraintError | Sequelize.ValidationError) => {
            if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
                res.status(422);
                res.json(extractErrorResponse(err));
            } else {
                res.status(500);
                res.json(err.toString());
            }
        });
    }
}

const extractErrorResponse: Function = (err: Sequelize.UniqueConstraintError | Sequelize.ValidationError): ErrorResponse => {
    const errors: ErrorItem[] = err.errors.map((errItem: Sequelize.ValidationErrorItem): ErrorItem => ({
        field: errItem.path,
        value: errItem.value,
        message: errItem.message
    }));
    return { errors };
}

export default a;