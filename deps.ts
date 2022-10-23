export * as ConsoleColor from "https://deno.land/x/colorlog@v1.0/mod.ts";

// NOTE: Migrate to the official https://github.com/aghussb/dex when it's updated to the
//       latest deno version.
export { default as SQLQueryBuilder } from "https://raw.githubusercontent.com/KB-RolePlay/deno-dex/master/mod.ts";

export { camelCase, snakeCase } from "https://deno.land/x/case@2.1.1/mod.ts";

export {
  Client as MySQLClient,
  configLogger as configMySQLLogger,
  Connection as MySQLConnection,
} from "https://deno.land/x/mysql@v2.10.2/mod.ts";
export type { LoggerConfig } from "https://deno.land/x/mysql@v2.10.2/mod.ts";

export { Client as PostgresClient,Pool as PostgresPool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
export type { ClientOptions as PostgresClientOptions, ConnectionString as PostgresConnectionString } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

export { DB as SQLiteClient } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

export {
  Bson,
  MongoClient as MongoDBClient,
} from "https://deno.land/x/mongo@v0.30.1/mod.ts";
export type { ConnectOptions as MongoDBClientOptions } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
export type { Database as MongoDBDatabase } from "https://deno.land/x/mongo@v0.30.1/src/database.ts";
