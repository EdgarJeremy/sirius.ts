import { Request } from 'express';
import { UserInstance } from './src/models/User';
import { ParsedQuery } from './src/middlewares/pipes/parser';

declare global {
    namespace Express {
        interface Request {
            user: UserInstance;
            parsed: ParsedQuery;
        }
    }
}