// ? Local
import { Controller } from "./Controllers/Controller.js";
import { routes } from "../../../routes.js";

// ? External
import express from 'express';

/**
 * * Route manage the server routes.
 * @export
 * @class Route
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Route {
    /**
     * * Creates an instance of Route.
     * @param {object} [properties] Route properties:
     * @param {string} [properties.name] Route name.
     * @param {string} [properties.method] Route method.
     * @param {string} [properties.url] Route URL.
     * @param {object} [states] Route states:
     * @param {string|function} [callback] Route callback.
     * @memberof Route
     */
    constructor (properties = {
        name: 'index',
        method: 'GET',
        url: '/',
    }, states = {
        //
    }, callback = (params) => { /* console.log(params) */ }) {
        this.setProperties(properties);
        this.setStates(states);
        this.setCallback(callback);
    }

    /**
     * * Set the Route properties.
     * @param {object} [properties] Route properties:
     * @param {string} [properties.name] Route name.
     * @param {string} [properties.method] Route method.
     * @param {string} [properties.url] Route URL.
     * @memberof Route
     */
    setProperties (properties = {
        name: 'index',
        method: 'GET',
        url: '/',
    }) {
        this.properties = {};
        this.setNameProperty(properties);
        this.setMethodProperty(properties);
        this.setURLProperty(properties);
    }

    /**
     * * Returns the Route properties or an specific property.
     * @param {string} [name=''] Property name.
     * @returns {Object|*}
     * @memberof Route
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
     * @memberof Route
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
     * @memberof Route
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
     * * Set the Route name property.
     * @param {object} [properties] Route properties:
     * @param {string} [properties.name] Route name.
     * @memberof Route
     */
    setNameProperty (properties = {
        name: 'index',
    }) {
        this.properties.name = ((properties.hasOwnProperty('name')) ? properties.name : 'index');
    }

    /**
     * * Set the Route method property.
     * @param {object} [properties] Route properties:
     * @param {string} [properties.method] Route method.
     * @memberof Route
     */
    setMethodProperty (properties = {
        method: 'GET',
    }) {
        this.properties.method = ((properties.hasOwnProperty('method')) ? properties.method.toUpperCase() : 'GET');
    }

    /**
     * * Set the Route URL property.
     * @param {object} [properties] Route properties:
     * @param {string} [properties.url] Route URL.
     * @memberof Route
     */
    setURLProperty (properties = {
        url: 'index',
    }) {
        this.properties.url = ((properties.hasOwnProperty('url')) ? properties.url : '/');
    }
    
    /**
     * * Set the Route states.
     * @param {object} [states] Route states:
     * @memberof Route
     */
    setStates (states = {
        //
    }) {
        this.states = {};
    }

    /**
     * * Returns the Route states or an specific states.
     * @param {string} [name=''] States name.
     * @returns {Object|*}
     * @memberof Route
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
     * @memberof Route
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
     * @memberof Route
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
     * * Set the Route callback.
     * @param {string|function} [callback] Route callback.
     * @memberof Route
     */
    setCallback (callback = (params) => { /* console.log(params) */ }) {
        this.callback = ((callback) ? callback : (params) => { /* console.log(params) */ });
    }

    /**
     * * Returns the Route callback.
     * @returns {string|function}
     * @memberof Route
     */
    getCallback () {
        return this.callback;
    }

    /**
     * * Prepare the Route callback.
     * @param {App} app
     * @memberof Route
     */
    prepare (app) {
        let callback, instance = this;
        switch (typeof this.getCallback()) {
            case 'function':
                callback = this.getCallback();
                break;
            default:
                let controller = Controller.find(app.getControllers(), Controller.getCallbackName(this.getCallback()));
                callback = controller.getFunction(Controller.getCallbackFunction(this.getCallback()));
                break;
        }
        app.getRouter()[this.getProperties('method').toLowerCase()](instance.getProperties('url'), callback);
    }

    /**
     * * Generates the App Route.
     * @static
     * @param {App} app
     * @returns {object[Route]}
     * @memberof Route
     */
    static generate (app) {
        let aux = [];
        for (const properties of routes) {
            let route = new this(properties, {}, properties.callback);
            route.prepare(app);
            aux.push(route);
        }
        return aux;
    }
}