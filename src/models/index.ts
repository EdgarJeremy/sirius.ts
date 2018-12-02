import Sequelize from 'sequelize';
import ModelFactoryInterface from './typings/ModelFactoryInterface';
import { UserFactory } from './User';
import { TokenFactory } from './Token';

const createModels: Function = (): ModelFactoryInterface => {
    const { DB_HOST, DB_DIALECT, DB_DATABASE = "sirius", DB_USER = "sirius", DB_PASS = "sirius" }: NodeJS.ProcessEnv = process.env;
    const sequelize: Sequelize.Sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        dialectOptions: {
            useUTC: true
        },
        timezone: "+08:00",
        operatorsAliases: false
    });
    const db: ModelFactoryInterface = {
        sequelize,
        Sequelize,
        User: UserFactory(sequelize, Sequelize),
        Token: TokenFactory(sequelize, Sequelize)
    };

    Object.keys(db).forEach((model: string): void => {
        if(db[model].associate) {
            db[model].associate(db);
        }
    });

    return db;
}

export default createModels;