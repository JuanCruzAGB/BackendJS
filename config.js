// ? Custom controller files
import { WebController } from "./app/Http/Controllers/WebController.js";

// ? Custom middleware files
import { Auth } from "./app/Http/Middlewares/Auth.js";

/**
 * * App configuration.
 * @exports
 */
export var config = {
    // ? Controllers used.
    controllers: [
        {name: 'WebController', class: WebController},
    ],
    
    // ? Database configuration.
    database: {
        // ? Type of database: MySQL, MongoDB (default).
        type: 'MySQL',

        // ? Database host (default: 127.0.0.1).
        host: '127.0.0.1',

        // ? Database port (default: 27017).
        port: 27017,

        // ? Database name (default: api).
        name: 'test',

        // ? Database username (default: root).
        username: 'root',

        // ? Database password (default: '').
        password: '',
    },
    
    // ? Middlewares used.
    middlewares: [
        {name: 'auth', class: Auth},
    ],
};