import type { Knex } from "knex";
import dotenv from 'dotenv';
import { DatabaseConfig } from "./src/interfaces/Database";

dotenv.config();

const {
  DEVELOPMENT_USERNAME,
  DEVELOPMENT_PASSWORD,
  DEVELOPMENT_DATABASE,
  DEVELOPMENT_HOST,
  DEVELOPMENT_PORT,
  PRODUCTION_USERNAME,
  PRODUCTION_PASSWORD,
  PRODUCTION_DATABASE,
  PRODUCTION_HOST,
} = process.env as Required<DatabaseConfig>;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: DEVELOPMENT_DATABASE,
      user: DEVELOPMENT_USERNAME,
      password: DEVELOPMENT_PASSWORD,
      host: DEVELOPMENT_HOST,
      port: Number(DEVELOPMENT_PORT)
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: PRODUCTION_DATABASE,
      user: PRODUCTION_USERNAME,
      password: PRODUCTION_PASSWORD,
      host: PRODUCTION_HOST,
      ssl: {
        rejectUnauthorized: false,
      }  
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};

export default config;