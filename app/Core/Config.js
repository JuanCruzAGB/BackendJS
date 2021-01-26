// ? BackendJS
import { Class } from './Class.js';
import { config } from "../../config.js";

/**
 * * Config manage the server config.
 * @export
 * @class Config
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Config extends Class {
    /**
     * * Creates an instance of Config.
     * @param {object} [properties] Config properties:
     * @param {object} [states] Config states:
     * @param {*} [data] Config data
     * @memberof Config
     */
    constructor (properties = {
        //
    }, states = {
        //
    }, data = null) {
        super(properties, states);
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
     * @param {string} [name=''] Config name.
     * @returns {object[Config]}
     * @memberof Config
     */
    static generate (name = '') {
        let aux = {};
        if (name != '') {
            for (const key in config) {
                if (Object.hasOwnProperty.call(config, key) && name == key) {
                    return this.parseConfigData(key, config[key]);
                }
            }
        } else {
            for (const key in config) {
                if (Object.hasOwnProperty.call(config, key)) {
                    aux[key] = this.parseConfigData(key, config[key]);
                }
            }
            return aux;
        }
    }

    /**
     * * Returns the parsed data based on the Config name.
     * @static
     * @param {string} name Config name.
     * @param {*} data Config data.
     * @returns {Config}
     * @memberof Config
     */
    static parseConfigData (name, data) {
        switch (name) {
            case 'database':
                return new this({
                    type: ((data.hasOwnProperty('type')) ? data.type : 'MongoDB'),
                    host: ((data.hasOwnProperty('host')) ? data.host : '127.0.0.1'),
                    port: ((data.hasOwnProperty('port')) ? data.port : 27017),
                    name: ((data.hasOwnProperty('name')) ? data.name : 'api'),
                    username: ((data.hasOwnProperty('username')) ? data.username : 'root'),
                    password: ((data.hasOwnProperty('password')) ? data.password : ''),
                });
            default :
                return new this({}, {}, data);
        }
    }
}