import Sequelize from 'sequelize';
import { UserInstance, UserAttributes } from '../User';
import { TokenInstance, TokenAttributes } from '../Token';

interface Obj {
    [s: string]: any;
}

export default interface ModelFactoryInterface extends Obj {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    User: Sequelize.Model<UserInstance, UserAttributes>;
    Token: Sequelize.Model<TokenInstance, TokenAttributes>;
}