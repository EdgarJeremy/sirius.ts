import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';
import { TokenInstance, TokenAttributes } from './Token';

export interface UserAttributes {
    id?: number;
    name: string;
    username: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    getTokens: Sequelize.HasManyGetAssociationsMixin<TokenInstance>;
    setTokens: Sequelize.HasManySetAssociationsMixin<TokenInstance, TokenInstance['id']>;
    addTokens: Sequelize.HasManyAddAssociationsMixin<TokenInstance, TokenInstance['id']>;
    addToken: Sequelize.HasManyAddAssociationMixin<TokenInstance, TokenInstance['id']>;
    createToken: Sequelize.HasManyCreateAssociationMixin<TokenAttributes, TokenInstance>;
    removeToken: Sequelize.HasManyRemoveAssociationMixin<TokenInstance, TokenInstance['id']>;
    removeTokens: Sequelize.HasManyRemoveAssociationsMixin<TokenInstance, TokenInstance['id']>;
    hasToken: Sequelize.HasManyHasAssociationMixin<TokenInstance, TokenInstance['id']>;
    hasTokens: Sequelize.HasManyHasAssociationsMixin<TokenInstance, TokenInstance['id']>;
    countTokens: Sequelize.HasManyCountAssociationsMixin;
}

export interface Associate {
    (models: ModelFactoryInterface): void;
}

export const UserFactory: Factory<UserInstance, UserAttributes> = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(191),
            allowNull: false,
            unique: true
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
            { underscored: true }
        );

    User.associate = (models: Sequelize.Models): void => {
        User.hasMany(models.Token, { onDelete: 'cascade' });
    }

    return User;
}