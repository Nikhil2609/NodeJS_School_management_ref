import { Sequelize } from "sequelize";

// Database connection
export const sequelize = new Sequelize({
    dialect: 'postgres', // You can change this to mysql, sqlite, etc.
    host: 'localhost',
    username: 'postgres',  // replace with your db username
    password: 'password',  // replace with your db password
    database: 'school_management',  // replace with your database name,
    port: 5432
});

// Test the connection
export async function databaseConnect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
