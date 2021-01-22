// ? BackendJS
import { Class } from "../../Class.js";
import { Autoload } from "./autoload.js";

/**
 * * Middleware manage the server Middlewares.
 * @export
 * @class Middleware
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Middleware extends Class {
    /**
     * * Creates an instance of Middleware.
     * @param {object} [properties] Middleware properties:
     * @param {string} [properties.name] Middleware name.
     * @param {object} [states] Middleware states:
     * @param {object} [classObject=null] Middleware class object.
     * @memberof Middleware
     */
    constructor (properties = {
        name: null,
    }, states = {
        //
    }, classObject = null) {
        super(properties, states);
        this.setClass(classObject);
    }

    /**
     * * Set the Middleware class object.
     * @param {object} [classObject=null] Middleware class object.
     * @memberof Middleware
     */
    setClass (classObject = null) {
        this.class = ((classObject) ? classObject : null)
    }

    /**
     * * Returns the Middleware class object
     * @returns {object}
     * @memberof Middleware
     */
    getClass () {
        return this.class;
    }

    /**
     * * Returns the Middleware callback funtion.
     * @static
     * @param {string} name Middleware name and function name
     * @returns {function}
     * @memberof Middleware
     */
    static find (middlewares, name) {
        for (const middleware of middlewares) {
            if (middleware.getProperties('name') == this.getCallbackName(name)) {
                return middleware.getClass()[this.getCallbackFunction(name)];
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
        for (const properties of app.getConfig('middlewares').getData()) {
            let middleware = Autoload.middlewares(properties.name);
            middleware = new this(this.generateProperties(middleware), {}, properties.class);
            aux.push(middleware);
            app.getServer().use(middleware.getClass().handle);
        }
        return aux;
    }

    /**Midd
     * * Returns the Middleware properties.
     * @staticMidd
     * @param {object} properties Middlewares config file properties.
     * @returns {Middct}
     * @memberof Middleware
     */
    static generateProperties (properties) {
        return {
            name: ((properties.hasOwnProperty('name')) ? properties.name : null),
        };
    }
}