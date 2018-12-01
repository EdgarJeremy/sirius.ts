import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';

export interface TokenAttributes {
    id?: number;
    refresh_token: string;
    used: boolean;
}

export interface TokenInstance extends Sequelize.Instance<TokenAttributes>, TokenAttributes {

}

export const TokenFactory: Factory<TokenInstance, TokenAttributes> = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TokenInstance, TokenAttributes> => {
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
        sequelize.define<TokenInstance, TokenAttributes>(
            'token',
            attributes,
            { underscored: true }
        );

    return Token;
}