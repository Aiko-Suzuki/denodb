import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Database, SQLite3Connector } from "../mod.ts";

const env = config();

const defaultMySQLOptions = {
  database: "test",
  host: "127.0.0.1",
  username: env.DB_USER,
  password: env.DB_PASS,
  port: Number(env.DB_PORT),
};

const defaultSQLiteOptions = {
  filepath: "test.sqlite",
};

const defaultPostgreSQLPoolOptions = {
  uri: "postgres://postgres:user@localhost:5432/test",
  size: 2,
  lazy: true
};

const defaultPostgreSQLOptions = {
  uri: "postgres://postgres:user@localhost:5432/test"
};

const getMySQLConnection = (options = {}, debug = true): Database => {
  const connection: Database = new Database(
    { dialect: "mysql", debug },
    {
      ...defaultMySQLOptions,
      ...options,
    },
  );

  return connection;
};

const getSQLiteConnection = (options = {}, debug = true): Database => {
  const connection = new SQLite3Connector(defaultSQLiteOptions);

  const database = new Database(connection);

  return database;
};

const getPostgreSQLPoolConnection = (options = {}, debug = true): Database => {
  const connection: Database = new Database(
    { dialect: "postgres", debug },
    {
      ...defaultPostgreSQLPoolOptions,
      ...options,
    },
  );

  return connection;
};

const getPostgreSQLConnection = (options = {}, debug = true): Database => {
  const connection: Database = new Database(
    { dialect: "postgres", debug },
    {
      ...defaultPostgreSQLOptions,
      ...options,
    },
  );

  return connection;
};

export { getMySQLConnection, getSQLiteConnection, getPostgreSQLPoolConnection, getPostgreSQLConnection };
