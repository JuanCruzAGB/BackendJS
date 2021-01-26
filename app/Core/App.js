// ? External packages|repositories
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

// ? BackendJS
import { Class } from './Class.js';
import { Config } from './Config.js';
import { Controller } from './Http/Controllers/Controller.js';
import { Database } from "./Database/Database.js";
import { Middleware } from './Http/Middlewares/Middleware.js';
import { Route } from './Http/Route.js';
import { routes } from '../../routes.js';

/**
 * * App manage the server app.
 * @export
 * @class App
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class App extends Class {
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
        super(properties, states);
        this.setConfig();
        this.install();
        this.setControllers();
        this.setMiddlewares();
        this.setRoutes();
        this.setDatabase();
        this.mount();
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
        let instance = this;
        this.server = express();
        this.server.set('port', process.env.PORT || 4000);
        this.server.use(morgan('dev'));
        this.server.use(bodyParser.urlencoded({extended: false}));
        this.server.use(bodyParser.json());
        this.server.use(express.static(path.join('public')));
        this.getServer().use((request, response, next) => {
            // response.locals.database = instance.getDatabase().connection;
            next();
        });
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
     * * Set the App Middlewares.
     * @memberof Database
     */
    setMiddlewares () {
        this.middlewares = Middleware.generate(this);
    }

    /**
     * * Returns the App Middlewares.
     * @memberof App
     */
    getMiddlewares () {
        return this.middlewares;
    }

    /**
     * * Set the App Routes.
     * @memberof Database
     */
    setRoutes () {
        this.routes = Route.generate(this, routes);
        this.getServer().use('/', this.getRouter());
    }

    /**
     * * Returns the App Routes.
     * @memberof App
     */
    getRoutes () {
        return this.routes;
    }

    /**
     * * Set the App Database.
     * @memberof Database
     */
    setDatabase () {
        let instance = this;
        if (this.hasConfig('database')) {
            this.database = new Database(this.getConfig('database').getProperties(), {
                //
            });
        }
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
     * @memberof App
     */
    mount ( ) {
        this.getServer().listen(this.getServer().get('port'), () => {
            console.log('Server mounted :D');
            console.log(`- https://127.0.0.1:${ this.getServer().get('port') }`);
        });
    }
}