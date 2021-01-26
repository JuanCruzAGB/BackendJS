// ? BackendJS
import { Class } from "../Class.js";
import { Connection } from './Connection.js';

/**
 * * Database manage the database logic.
 * @export
 * @class Database
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Database extends Class {
    /**
     * * Creates an instance of Database.
     * @param {object} [properties] Database properties:
     * @param {object} [states] Database states:
     * @param {object} [callback] Database callback:
     * @param {function} [callback.function] Database callback function.
     * @param {*} [callback.params] Database callback function parameters.
     * @memberof Database
     */
    constructor (properties = {
        //
    }, states = {
        //
    }) {
        super(properties, states);
        this.setConnection();
    }

    /**
     * * Set the Database Connection.
     * @memberof Database
     */
    setConnection () {
        this.connection = Connection.generate(this);
    }
}