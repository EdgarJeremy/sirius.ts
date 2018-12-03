/** import modules */
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';

import ModelFactoryInterface from "./models/typings/ModelFactoryInterface";
import createModels from "./models";
import createRoutes from "./routes";
import tokenMiddleware from "./middlewares/pipes/token";

/** import .env file configuration */
dotenv.config();

/** app variables */
const app: express.Application = express();
const models: ModelFactoryInterface = createModels();
const allowOrigins: string | string[] = process.env.ALLOW_ORIGIN ? (process.env.ALLOW_ORIGIN === '*' ? '*' : (process.env.ALLOW_ORIGIN.split(',').map((origin: string) => origin.trim()))) : `http://localhost:${process.env.PORT || 1234}`;

/** middlewares */
app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '1024mb' }));
app.use(bodyParser.urlencoded({ limit: process.env.REQUEST_LIMIT || '1024mb', extended: true }));
app.use(cors({ origin: allowOrigins, credentials: true }));
app.use(tokenMiddleware(models)); // token auth

/** router configuration */
const routes: express.Router[] = createRoutes(app, models);

/** sync models & start server */
models.sequelize.sync({
    force: process.env.DB_FORCE_RENEW === 'true'
}).then((): void => {
    app.listen(process.env.PORT || 1234, (): void => {
        console.log('App running');
    });
});