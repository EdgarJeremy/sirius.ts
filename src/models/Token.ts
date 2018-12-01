import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';

export interface TokenAttributes {
    id?: number;
    refresh_token: string;
    used: boolean;
}

export interface TokenInstance extends Sequelize.Instance<TokenAttributes>, TokenAttributes {

}

export const TokenFactory: Function = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TokenInstance, TokenAttributes> => {
    const attributes: SequelizeAttributes<TokenAttributes> = {
        refresh_token: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
    const Token: Sequelize.Model<TokenInstance, TokenAttributes> =
        sequelize.define<TokenInstance, TokenAttributes>('token', attributes);

    return Token;
}