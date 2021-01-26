// ? External packages|repositories
import mongoose from 'mongoose';
import mysql from 'mysql';
import { promisify } from 'util';

// ? BackendJS
import { Class } from "../Class.js";

/**
 * * Connection manage the MySQL connection.
 * @export
 * @class Connection
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Connection extends Class {
    /**
     * * Returns the Database Connection.
     * @static
     * @param {Database} database
     * @returns {*}
     * @memberof Connection
     */
    static generate (database) {
        let pool = mysql.createPool({
            host: database.getProperties('host'),
            user: database.getProperties('username'),
            password: database.getProperties('password'),
            database: database.getProperties('name'),
        });
        pool.getConnection((error, connection) => {
            if (error) {
                switch (error.code) {
                    case 'PROTOCOL_CONECTION_LOST':
                        console.error('Database connection was closed');
                        break;
                    case 'ER_CON_COUNT_ERROR':
                        console.error('Database has to many connections');
                        break;
                    case 'ECONNREFUSED':
                        console.error('Database connection was refused');
                        break;
                    case 'ER_NO_DB_ERROR':
                        console.error('No database selected');
                        break;
                }
                return;
            }
            if (connection) {
                connection.release();
                return;
            }
        });
        pool.query = promisify(pool.query);
        return pool;
    }
}