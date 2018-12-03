import express from 'express';
import { ErrorResponse } from '../../routes/typings/BodyBuilderInterface';

const onlyAuth: Function = (): express.Handler => {
    return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        if (!req.user) {
            const body: ErrorResponse = {
                errors: [{ msg: 'Akses ditolak (session)' }]
            };
            res.status(401).json(body);
        }
    }
}

export default onlyAuth;