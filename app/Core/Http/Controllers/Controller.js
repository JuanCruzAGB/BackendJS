// ? BackendJS
import { Class } from "../../Class.js";
import { Autoload } from "./autoload.js";

/**
 * * Controller manage the server controllers.
 * @export
 * @class Controller
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Controller extends Class {
    /**
     * * Creates an instance of Controller.
     * @param {object} [properties] Controller properties:
     * @param {string} [properties.name] Controller name.
     * @param {object} [states] Controller states:
     * @memberof Controller
     */
    constructor (properties = {
        name: null,
    }, states = {
        //
    }) {
        super(properties, states);
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
            if (controller.getProperties('name') == this.getCallbackName(name)) {
                return controller.getClass()[this.getCallbackFunction(name)];
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
            controller = new properties.class(this.generateProperties(controller), {
                // ? Controller states
            });
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