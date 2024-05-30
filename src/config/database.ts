import knex, { Knex } from "knex";
import { Model } from 'objection';
import knexConfig from '../../knexfile';

const environment: string = process.env.ENVIRONMENT || 'development';
const db: Knex = knex(knexConfig[environment]);

Model.knex(db)

const checkDatabaseConnection = async (): Promise<void> => {
    try {
        await db.raw('SELECT 1+1 AS result');
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkDatabaseConnection();