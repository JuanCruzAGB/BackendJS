// ? Local
import { Config } from './Config.js';
import { Connection } from './Database/MongoDB/Connection.js';
import { Controller } from './Http/Controllers/Controller.js';
import { Route } from './Http/Route.js';

// ? External
import express from 'express';
import bodyParser from 'body-parser';

/**
 * * App manage the server app.
 * @export
 * @class App
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class App {
    /**
     * * Creates an instance of App.
     * @param {object} [properties] App properties:
     * @param {object} [states] App states:
     * @memberof App
     */
    constructor (properties = {
        //
    }, states = {
        //
    }) {
        this.setProperties(properties);
        this.setStates(states);
        this.setConfig();
        this.install();
        this.setControllers();
        this.setRoutes();
        this.setDatabase();
    }

    /**
     * * Set the App properties.
     * @param {object} [properties] App properties:
     * @memberof App
     */
    setProperties (properties = {
        //
    }) {
        this.properties = {};
    }

    /**
     * * Returns the App properties or an specific property.
     * @param {string} [name=''] Property name.
     * @returns {Object|*}
     * @memberof App
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
     * @memberof App
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
     * @memberof App
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
     * * Set the App states.
     * @param {object} [states] App states:
     * @memberof App
     */
    setStates (states = {
        //
    }) {
        this.states = {};
    }

    /**
     * * Returns the App states or an specific states.
     * @param {string} [name=''] States name.
     * @returns {Object|*}
     * @memberof App
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
     * @memberof App
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
     * @memberof App
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
     * * Set the App Config.
     * @memberof App
     */
    setConfig () {
        this.config = Config.generate();
    }

    /**
     * * Returns the App Config or an specific Config.
     * @param {string} [name=''] Config name.
     * @returns {Config[]|Config|false}
     * @memberof App
     */
    getConfig (name = '') {
        if (name != '') {
            if (this.hasConfig(name)) {
                for (const key in this.config) {
                    if (this.config.hasOwnProperty(key)) {
                        const config = this.config[key];
                        if (key == name) {
                            return config;
                        }
                    }
                }
            } else {
                return false;
            }
        } else {
            return this.config;
        }
    }

    /**
     * * Check if there is a Config.
     * @param {string} name Config name.
     * @returns {Boolean}
     * @memberof App
     */
    hasConfig (name) {
        if (this.config.hasOwnProperty(name)) {
            if (this.config[name]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * * Install the server (with express).
     * @memberof App
     */
    install () {
        this.server = express();
        this.server.use(bodyParser.urlencoded({extended: false}));
        this.server.use(bodyParser.json());
        this.router = express.Router();
    }

    /**
     * * Returns the server.
     * @returs {express}
     * @memberof App
     */
    getServer () {
        return this.server;
    }

    /**
     * * Returns the router.
     * @returs {express}
     * @memberof App
     */
    getRouter () {
        return this.router;
    }

    /**
     * * Set the App Controllers.
     * @memberof Database
     */
    setControllers () {
        this.controllers = Controller.generate(this);
    }

    /**
     * * Returns the App Controllers.
     * @memberof App
     */
    getControllers () {
        return this.controllers;
    }

    /**
     * * Set the App Routes.
     * @memberof Database
     */
    setRoutes () {
        this.routes = Route.generate(this);
        this.getServer().use('/api', this.getRouter());
    }

    /**
     * * Returns the App Routes.
     * @memberof App
     */
    getRoutes () {
        return this.routes;
    }

    /**
     * * Set the App database.
     * @memberof Database
     */
    setDatabase () {
        let instance = this;
        this.database = ((this.hasConfig('database')) ? {
            host: this.getConfig('database').host,
            port: this.getConfig('database').port,
            name: this.getConfig('database').name,
            username: this.getConfig('database').username,
            password: this.getConfig('database').password,
        } : {
            host: '127.0.0.1',
            port: 27017,
            name: 'api',
            username: 'root',
            password: '',
        });
        this.database.connection = Connection.generate(this.database.host, this.database.port, this.database.name);
        this.database.connection.setCallback({
            function: instance.mount,
            params: {
                app: instance,
        }});
    }

    /**
     * * Returns the App database.
     * @memberof App
     */
    getDatabase () {
        return this.database;
    }

    /**
     * * Mount the App.
     * @param {object} params
     * @memberof App
     */
    mount (params) {
        params.app.getServer().listen(3900, () => {
            console.log('Server mounted :D');
        });
    }
}