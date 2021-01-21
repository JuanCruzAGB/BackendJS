// ? External packages|repositories
import mongoose from 'mongoose';

// ? BackendJS
import { Class } from "../../Class.js";

/**
 * * Connection manage the MongoDB connection.
 * @export
 * @class Connection
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Connection extends Class {
    /**
     * * Creates an instance of Connection.
     * @param {object} [properties] Connection properties:
     * @param {string} [url='mongodb://localhost:27017/api'] Connection URL.
     * @param {object} [options='mongodb://localhost:27017/api'] Connection options.
     * @param {object} [states] Connection states:
     * @param {object} [callback] Connection callback:
     * @param {function} [callback.function] Connection callback function.
     * @param {object} [callback.params] Connection callback function params.
     * @memberof Connection
     */
    constructor (properties = {
        url: 'mongodb://localhost:27017/api',
        options: {
            //
    }}, states = {
        //
    }, callback = {
        function: (params) => {
            /* console.log(params) */
        }, params: {
            //
    }}) {
        super(properties, states);
        this.setCallback(callback);
        this.connect();
    }

    /**
     * * Executes the Connection callback.
     * @memberof Connection
     */
    execute () {
        let params = this.getCallback('params');
        params.connection = this;
        this.getCallback('function')(params);
    }

    /**
     * * Connect the Database.
     * @memberof Connection
     */
    connect () {
        let instance = this;
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        mongoose.connect(this.getProperties('url'), this.getProperties('options'))
                .then((e) => {
                    instance.execute();
                });
    }

    /**
     * * Generates a Connection.
     * @static
     * @param {string} [host='127.0.0.1'] Connection host.
     * @param {number} [port=27017] Connection port.
     * @param {string} [name='api'] Connection name.
     * @returns {Connection}
     * @memberof Connection
     */
    static generate (host = '127.0.0.1', port = 27017, name = 'api') {
        return new this({
            url: `mongodb://${ host }:${ port }/${ name }`,
            options: {
                //
        }}, {}, {
            function: (params) => {
                /* console.log(params) */
            }, params: {
                //
        }});
    }
}