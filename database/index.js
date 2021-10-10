// General imports
import Sequelize from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

// Schema imports
import userSchema from './schemas/user/index.js';

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'sqlite',
    host: process.env.DB_HOST || ":memory:"
})

export const modules = {
    User: userSchema(sequelize, Sequelize.DataTypes)
}

export default sequelize;
