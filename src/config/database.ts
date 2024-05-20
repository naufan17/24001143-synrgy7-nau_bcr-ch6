import knex from "knex";
import { Model } from 'objection';
import knexConfig from '../../knexfile';

const environment = process.env.ENVIRONMENT || 'development';
const db = knex(knexConfig[environment]);

Model.knex(db)

const checkDatabaseConnection = async () => {
    try {
        await db.raw('SELECT 1+1 AS result');
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkDatabaseConnection();

export default db;