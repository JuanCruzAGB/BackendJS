// ? Local
import { Autoload } from "./autoload.js";

/**
 * * Controller manage the server controllers.
 * @export
 * @class Controller
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Controller {
    /**
     * * Creates an instance of Controller.
     * @param {object} [properties] Controller properties:
     * @param {string} [properties.name] Controller name.
     * @param {object} [states] Controller states:
     * @param {object} [classObject=null] Controller class object.
     * @memberof Controller
     */
    constructor (properties = {
        name: null,
    }, states = {
        //
    }, classObject = null) {
        this.setProperties(properties);
        this.setStates(states);
        this.setClass(classObject);
    }

    /**
     * * Set the Controller properties.
     * @param {object} [properties] Controller properties:
     * @param {string} [properties.name] Controller name.
     * @memberof Controller
     */
    setProperties (properties = {
        name: null,
    }) {
        this.properties = {};
        this.setNameProperty(properties);
    }

    /**
     * * Returns the Controller properties or an specific property.
     * @param {string} [name=''] Property name.
     * @returns {Object|*}
     * @memberof Controller
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
     * @memberof Controller
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
     * @memberof Controller
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
     * * Set the Controller name.
     * @param {object} [properties] Controller properties:
     * @param {string} [properties.name] Controller name.
     * @memberof Controller
     */
    setNameProperty (properties = {
        name: null,
    }) {
        this.properties.name = ((properties.hasOwnProperty('name')) ? properties.name : null);
    }
    
    /**
     * * Set the Controller states.
     * @param {object} [states] Controller states:
     * @memberof Controller
     */
    setStates (states = {
        //
    }) {
        this.states = {};
    }

    /**
     * * Returns the Controller states or an specific states.
     * @param {string} [name=''] States name.
     * @returns {Object|*}
     * @memberof Controller
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
     * @memberof Controller
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
     * @memberof Controller
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
     * * Set the Controller class object.
     * @param {object} [classObject=null] Controller class object.
     * @memberof Controller
     */
    setClass (classObject = null) {
        this.class = ((classObject) ? classObject : null)
    }

    /**
     * * Returns the Controller class object
     * @returns {object}
     * @memberof Controller
     */
    getClass () {
        return this.class;
    }

    /**
     * * Returns the Controller function.
     * @param {string} name Function name.
     * @returns {function}
     * @memberof Controller
     */
    getFunction (name) {
        if (this.getClass().hasOwnProperty(name)) {
            return this.getClass()[name];
        }
    }

    /**
     * * Returns the Controller callback name.
     * @static
     * @param {string} name Controller name and function name
     * @returns {string}
     * @memberof Controller
     */
    static getCallbackName (name) {
        return name.split('@')[0];
    }

    /**
     * * Returns the Controller callback funtion.
     * @static
     * @param {string} name Controller name and function name
     * @returns {string}
     * @memberof Controller
     */
    static getCallbackFunction (name) {
        return name.split('@')[1];
    }

    /**
     * * Returns the Controller callback funtion.
     * @static
     * @param {string} name Controller name and function name
     * @returns {function}
     * @memberof Controller
     */
    static find (controllers, name) {
        for (const controller of controllers) {
            if (controller.getProperties('name') == name) {
                return controller;
            }
        }
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
        for (const properties of app.getConfig('controllers').getData()) {
            let controller = Autoload.controllers(properties.name);
            controller = new this(this.generateProperties(controller), {}, properties.class);
            aux.push(controller);
        }
        return aux;
    }

    /**
     * * Returns the Controller properties.
     * @static
     * @param {object} properties Controllers config file properties.
     * @returns {object}
     * @memberof Controller
     */
    static generateProperties (properties) {
        return {
            name: ((properties.hasOwnProperty('name')) ? properties.name : null),
        };
    }
}