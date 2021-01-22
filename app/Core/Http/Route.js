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
     * @param {object} [states] Route states:
     * @param {string|function} [callback] Route callback.
     * @memberof Route
     */
    constructor (properties = {
        name: 'index',
    }, states = {
        //
    }, callback = {
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
        if (this.hasProperty('get')) {
            callback = Controller.find(app.getControllers(), instance.getProperties('get')[1]);
            app.getRouter().get(instance.getProperties('get')[0], callback);
        }
        if (this.hasProperty('post')) {
            callback = Controller.find(app.getControllers(), instance.getProperties('post')[1]);
            app.getRouter().post(instance.getProperties('post')[0], callback);
        }
        if (this.hasProperty('put')) {
            callback = Controller.find(app.getControllers(), instance.getProperties('put')[1]);
            app.getRouter().put(instance.getProperties('put')[0], callback);
        }
        if (this.hasProperty('delete')) {
            callback = Controller.find(app.getControllers(), instance.getProperties('delete')[1]);
            app.getRouter().delete(instance.getProperties('delete')[0], callback);
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
        for (const properties of routes) {
            let route = new this(properties, {}, ((properties.hasOwnProperty('callback')) ? properties.callback : {
                function: false,
            }));
            route.prepare(app);
            aux.push(route);
        }
        return aux;
    }
}