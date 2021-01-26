// ? BackendJS
import { config } from '../../../../config.js';

/**
 * * Autoload controls the Middleware autoload.
 * @export
 * @class Autoload
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Autoload {
    /**
     * * Returns the Middlewares created or an specific.
     * @static
     * @param {string} [name=''] Middleware name.
     * @returns {string|*}
     * @memberof Autoload
     */
    static middlewares (name = '') {
        let properties;
        let defaultMiddlewares = ((config.hasOwnProperty('middlewares') ? config.middlewares : {}));
        for (const file of defaultMiddlewares) {
            properties = file;
        }
        return ((name) ? properties : defaultMiddlewares);
    }
}