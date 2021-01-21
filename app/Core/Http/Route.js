// ? BackendJS
import { Class } from "../Class.js";
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
export class Route extends Class {
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
    }, callback = callback = {
        function: (params) => {
            /* console.log(params) */
        }, params: {
            //
    }}) {
        super(properties, states);
        this.setCallback(callback);
    }

    /**
     * * Prepare the Route callback.
     * @param {App} app
     * @memberof Route
     */
    prepare (app) {
        let callback, instance = this;
        switch (typeof this.getCallback('function')) {
            case 'function':
                callback = this.getCallback('function');
                break;
            default:
                let controller = Controller.find(app.getControllers(), Controller.getCallbackName(this.getCallback('function')));
                callback = controller.getFunction(Controller.getCallbackFunction(this.getCallback('function')));
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