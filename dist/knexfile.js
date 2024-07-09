"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DEVELOPMENT_USERNAME, DEVELOPMENT_PASSWORD, DEVELOPMENT_DATABASE, DEVELOPMENT_HOST, DEVELOPMENT_PORT, PRODUCTION_USERNAME, PRODUCTION_PASSWORD, PRODUCTION_DATABASE, PRODUCTION_HOST, } = process.env;
const config = {
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
exports.default = config;
