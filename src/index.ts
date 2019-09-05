import { ConnectionOptions, Database } from "./interfaces";
import mysql, { Connection } from "mysql";

let db: Connection;

class SqlDatabase implements Database {
  constructor(private options: ConnectionOptions) {}

  connect(): Promise<any> {
    db = mysql.createConnection(this.options);

    return new Promise((resolve: any, reject: any) => {
      db.connect((err: any) => {
        return err ? reject(err.stack) : resolve();
      });
    });
  }

  connection(logs: boolean): void {
    return;
  }
}

function Sql(options: ConnectionOptions): SqlDatabase {
  const sql = new SqlDatabase(options);
  return sql;
}

function Query<T>(query: string): Promise<T> {
  return new Promise((resolve, reject) => {
    db.query(query, (err: any, result: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

export { Query, Sql };
