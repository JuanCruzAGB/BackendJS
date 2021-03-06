// ? BackendJS
import { config } from '../../../../config.js';

/**
 * * Autoload controls the Controller autoload.
 * @export
 * @class Autoload
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Autoload {
    /**
     * * Returns the Controllers created or an specific.
     * @static
     * @param {string} [name=''] Controller name.
     * @returns {string|*}
     * @memberof Autoload
     */
    static controllers (name = '') {
        let properties;
        let defaultControllers = ((config.hasOwnProperty('controllers') ? config.controllers : {}));
        for (const file of defaultControllers) {
            properties = file;
        }
        return ((name) ? properties : defaultControllers);
    }
}