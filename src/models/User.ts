import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';

export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
    created_at?: Date,
    updated_at?: Date
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

}

export const UserFactory: Factory<UserInstance, UserAttributes> = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(191),
            allowNull: false
        }
    }
    const User: Sequelize.Model<UserInstance, UserAttributes> =
        sequelize.define<UserInstance, UserAttributes>(
            'user',
            attributes,
            { underscored: true, defaultScope: { attributes: { exclude: ['password'] } } }
        );

    return User;
}