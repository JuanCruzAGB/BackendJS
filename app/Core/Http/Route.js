// ? External
import express from 'express';

// ? BackendJS
import { Class } from "../Class.js";
import { Controller } from "./Controllers/Controller.js";

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
        let instance = this;
        for (const controller of app.getControllers()) {
            if (this.hasProperty('get')) {
                if (controller.getProperties('name') == Controller.getCallbackName(instance.getProperties('get')[1])) {
                    app.getRouter().get(instance.getProperties('get')[0], controller[Controller.getCallbackFunction(instance.getProperties('get')[1])]);
                }
            }
            if (this.hasProperty('post')) {
                if (controller.getProperties('name') == Controller.getCallbackName(instance.getProperties('post')[1])) {
                    app.getRouter().get(instance.getProperties('post')[0], controller[Controller.getCallbackFunction(instance.getProperties('post')[1])]);
                }
            }
            if (this.hasProperty('put')) {
                if (controller.getProperties('name') == Controller.getCallbackName(instance.getProperties('put')[1])) {
                    app.getRouter().get(instance.getProperties('put')[0], controller[Controller.getCallbackFunction(instance.getProperties('put')[1])]);
                }
            }
            if (this.hasProperty('delete')) {
                if (controller.getProperties('name') == Controller.getCallbackName(instance.getProperties('delete')[1])) {
                    app.getRouter().get(instance.getProperties('delete')[0], controller[Controller.getCallbackFunction(instance.getProperties('delete')[1])]);
                }
            }
        }
    }

    /**
     * * Generates the App Route.
     * @static
     * @param {App} app
     * @param {Array} routes
     * @returns {object[Route]}
     * @memberof Route
     */
    static generate (app, routes) {
        let auxRoutes = [];
        for (const properties of routes) {
            if (properties.hasOwnProperty('groupBy')) {
                this.groupRoutes(app, properties, auxRoutes);
            } else {
                let route = new this(properties, {}, ((properties.hasOwnProperty('callback')) ? properties.callback : {
                    function: false,
                }));
                route.prepare(app);
                auxRoutes.push(route);
            }
        }
        return auxRoutes;
    }

    /**
     * * Group Routes.
     * @static
     * @param {App} app
     * @param {Object} group
     * @param {Array} auxRoutes
     * @returns {Array}
     * @memberof Route
     */
    static groupRoutes (app, group, auxRoutes) {
        for (const properties of ((group.hasOwnProperty('routes')) ? group.routes : [])) {
            if (properties.hasOwnProperty('get')) {
                properties.get[0] = group.groupBy + properties.get[0];
            }
            if (properties.hasOwnProperty('post')) {
                properties.post[0] = group.groupBy + properties.post[0];
            }
            if (properties.hasOwnProperty('put')) {
                properties.put[0] = group.groupBy + properties.put[0];
            }
            if (properties.hasOwnProperty('delete')) {
                properties.delete[0] = group.groupBy + properties.delete[0];
            }
            let route = new this(properties, {}, ((properties.hasOwnProperty('callback')) ? properties.callback : {
                function: false,
            }));
            route.prepare(app);
            auxRoutes.push(route);
        }
        return auxRoutes;
    }
}