// ? External packages|repositories
import mongoose from 'mongoose';

/**
 * * Connection manage the MongoDB connection.
 * @export
 * @class Connection
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Connection {
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
        function: (params) => { /* console.log(params) */ },
        params: {
            //
    }}) {
        this.setProperties(properties);
        this.setStates(states);
        this.setCallback(callback);
        this.connect();
    }

    /**
     * * Set the Connection properties.
     * @param {object} [properties] Connection properties:
     * @param {string} [url='mongodb://localhost:27017/api'] Connection URL.
     * @param {object} [options='mongodb://localhost:27017/api'] Connection options.
     * @memberof Connection
     */
    setProperties (properties = {
        url: 'mongodb://localhost:27017/api',
        options: {
            //
    }}) {
        this.properties = {};
        this.setURLProperty();
        this.setOptionsProperty();
    }

    /**
     * * Returns the Connection properties or an specific property.
     * @param {string} [name=''] Property name.
     * @returns {Object|*}
     * @memberof Connection
     */
    getProperties (name = '') {
        if (name && name != '') {
            return this.properties[name];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {string} name Property name.
     * @returns {Boolean}
     * @memberof Connection
     */
    hasProperty (name) {
        if (this.properties.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {string} name Property name.
     * @param {*} value Property value.
     * @memberof Connection
     */
    changeProperty (name, value) {
        if (this.hasProperty(name)) {
            this.properties[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }

    /**
     * * Set the Connection URL property.
     * @param {object} [properties] Connection properties:
     * @param {string} [url='mongodb://localhost:27017/api'] Connection URL.
     * @memberof Connection
     */
    setURLProperty (properties = {
        url: 'mongodb://localhost:27017/api',
    }) {
        this.properties.url = ((properties.hasOwnProperty('url')) ? properties.url : 'mongodb://localhost:27017/api');
    }

    /**
     * * Set the Connection options property.
     * @param {object} [properties] Connection properties:
     * @param {object} [options='mongodb://localhost:27017/api'] Connection options.
     * @memberof Connection
     */
    setOptionsProperty (properties = {
        options: {
            //
    }}) {
        this.properties.options = ((properties.hasOwnProperty('options')) ? properties.options : {
            //
        });
    }
    
    /**
     * * Set the Connection states.
     * @param {object} [states] Connection states:
     * @memberof Connection
     */
    setStates (states = {
        //
    }) {
        this.states = {};
    }

    /**
     * * Returns the Connection states or an specific states.
     * @param {string} [name=''] States name.
     * @returns {Object|*}
     * @memberof Connection
     */
    getStates (name = '') {
        if (name && name != '') {
            return this.states[name];
        } else {
            return this.states;
        }
    }

    /**
     * * Check if there is a status.
     * @param {string} name Status name.
     * @returns {Boolean}
     * @memberof Connection
     */
    hasStates (name) {
        if (this.states.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a status value.
     * @param {string} name Status name.
     * @param {*} value Status value.
     * @memberof Connection
     */
    changeStatus (name, value) {
        if (this.hasStates(name)) {
            this.states[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }

    /**
     * * Set the Connection callback.
     * @param {object} [callback] Connection callback:
     * @param {function} [callback.function] Connection callback function.
     * @param {object} [callback.params] Connection callback function params.
     * @memberof Connection
     */
    setCallback (callback = {
        function: (params) => { /* console.log(params) */ },
        params: {
            //
    }}) {
        this.callback = {
            function: ((callback.hasOwnProperty('function')) ? callback.function : (params) => { /* console.log(params) */ }),
            params: ((callback.hasOwnProperty('params')) ? callback.params : {
                //
            }),
        };
    }

    /**
     * * Returns the Connection callback.
     * @returns {object}
     * @memberof Connection
     */
    getCallback () {
        return this.callback;
    }

    /**
     * * Executes the Connection callback.
     * @memberof Connection
     */
    execute () {
        let params = this.getCallback().params;
        params.connection = this;
        this.getCallback().function(params);
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
            function: (params) => { /* console.log(params) */ },
            params: {
                //
        }});
    }
}