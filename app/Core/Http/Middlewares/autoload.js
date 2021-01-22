// ? BackendJS
import { config } from '../../../../config/controllers.js';

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
        for (const file of config) {
            properties = file;
        }
        return ((name) ? properties : config);
    }
}