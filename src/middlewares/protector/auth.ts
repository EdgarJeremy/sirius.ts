import express from 'express';
import { ErrorResponse } from '../../routes/typings/BodyBuilderInterface';
import { UserAttributes } from '../../models/User';


function onlyAuth(): express.Handler {
    return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        if (!req.user) {
            const body: ErrorResponse = {
                errors: [{ msg: 'Akses ditolak (no session)' }]
            };
            res.status(401).json(body);
        }
    }
}

export default onlyAuth;