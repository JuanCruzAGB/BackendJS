// ? Local
import { config as database } from "../../config/database.js";
import { config as controllers } from "../../config/controllers.js";

/**
 * * Config manage the server config.
 * @export
 * @class Config
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Config {
    /**
     * * Creates an instance of Config.
     * @param {object} [properties] Config properties:
     * @param {object} [states] Config states:
     * @param {*} [data] Config data
     * @memberof Config
     */
    constructor (properties = {}, states = {}, data = null) {
        this.setProperties(properties);
        this.setStates(states);
        this.setData(data);
    }

    /**
     * * Set the Config properties.
     * @param {object} [properties] Config properties:
     * @memberof Config
     */
    setProperties (properties = {
        //
    }) {
        this.properties = {};
        if (Object.entries(properties)) {
            for (const entry of Object.entries(properties)) {
                const key = entry[0];
                const value = entry[1];
                this.properties[key] = value;
            }
        }
    }

    /**
     * * Returns the Config properties or an specific property.
     * @param {string} [name=''] Property name.
     * @returns {Object|*}
     * @memberof Config
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
     * @memberof Config
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
     * @memberof Config
     */
    changeProperty (name , value) {
        if (this.hasProperty(name)) {
            this.properties[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }
    
    /**
     * * Set the Config states.
     * @param {object} [states] Config states:
     * @memberof Config
     */
    setStates (states = {
        //
    }) {
        this.states = {};
    }

    /**
     * * Returns the Config states or an specific states.
     * @param {string} [name=''] States name.
     * @returns {Object|*}
     * @memberof Config
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
     * @memberof Config
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
     * @memberof Config
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
     * * Set the Config data.
     * @param {*} [data=null]
     * @memberof Config
     */
    setData (data = null) {
        this.data = ((data) ? data : null);
    }

    /**
     * * Returns the Config data.
     * @returns {*}
     * @memberof Config
     */
    getData () {
        return this.data;
    }

    /**
     * * Generates the App Config.
     * @static
     * @returns {object[Config]}
     * @memberof Config
     */
    static generate () {
        return {
            'database': ((database) ? new this({
                host: ((database.hasOwnProperty('host')) ? database.host : '127.0.0.1'),
                port: ((database.hasOwnProperty('port')) ? database.port : 27017),
                name: ((database.hasOwnProperty('name')) ? database.name : 'api'),
                username: ((database.hasOwnProperty('username')) ? database.username : 'root'),
                password: ((database.hasOwnProperty('password')) ? database.password : ''),
            }) : false), 'controllers': ((controllers) ? new this({}, {}, controllers) : false),
        };
    }
}