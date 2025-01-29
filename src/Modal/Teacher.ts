import { DataTypes, Model } from "sequelize";
import { sequelize } from "../Modal/db";

// Define the Teacher model
export class TeacherModal extends Model {
    declare id?: number;
    declare name: string;
    declare subject: string;
    declare email: string;
}

TeacherModal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'TeacherModal',
        tableName: 'teachers',
        timestamps: false
    }
);
