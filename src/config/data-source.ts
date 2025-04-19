import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import * as dotenv from "dotenv";

// Read the .env file.
dotenv.config();

const dblog: boolean = process.env.DB_LOG == "true" || false;
const dbsync: boolean = process.env.DB_SYNC == "true" || false;
const dbOptions: DataSourceOptions = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    type: "postgres",
    database: process.env.DB_NAME || "logique",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    logging: dblog,
    synchronize: dbsync,
    entities: [join(__dirname, "..", "entities", "*.{ts,js}")],
    subscribers: [join(__dirname, "subscribers", "*.{ts,js}")],
    migrations: [join(__dirname, "migration", "*.{ts,js}")],
    migrationsTableName: "migrations",
    poolSize: Number(process.env.DB_POOL_SIZE) || 3,
};

const AppDataSource = new DataSource(dbOptions);

export default AppDataSource;
