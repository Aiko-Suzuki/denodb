import { SurrealClient } from "../../deps.ts";
import type { Connector, ConnectorOptions } from "./connector.ts";
import { SurrealTranslator } from "../translators/surreal-translator.ts";
import type { SupportedSQLDatabaseDialect } from "../translators/surreal-translator.ts";
import type { QueryDescription } from "../query-builder.ts";
import type { Values } from "../data-types.ts";

interface SurrealOptionsWith extends ConnectorOptions {
  database: string;
  uri: string;
  username: string;
  password: string;
  port?: number;
}


export type SurrealOptions = SurrealOptionsWith;

export class SurrealConnector implements Connector {
  _dialect: SupportedSQLDatabaseDialect = "surreal";

  _client: SurrealClient;
  _options: SurrealOptions;
  _translator: SurrealTranslator;
  _connected = false;

  /** Create a PostgreSQL connection. */
  constructor(options: SurrealOptions) {
    this._options = options;
    if ("uri" in options) {
      this._client = SurrealClient.Instance;
    } else {
		throw new Error("Surreal URI is required");
    }
    this._translator = new SurrealTranslator(this._dialect);
  }

  async _makeConnection() {
    if (this._connected) {
      return;
    }

    await this._client.connect(this._options.uri);
	await this._client.signin({
		user: this._options.username,
		pass: this._options.password,
	})
    this._connected = true;
  }

  async ping() {
    await this._makeConnection();

    try {
      return await this._client.ping();
    } catch {
      return false;
    }
  }

  // deno-lint-ignore no-explicit-any
  async query(queryDescription: QueryDescription): Promise<any | any[]> {
    await this._makeConnection();

    const query = this._translator.translateToQuery(queryDescription);
    const response = await this._client.query(query);
    const results = response.rows as Values[];

    if (queryDescription.type === "insert") {
      return results.length === 1 ? results[0] : results;
    }

    return results;
  }

  async close() {
    if (!this._connected) {
      return;
    }

    await this._client.close();
    this._connected = false;
  }
}
