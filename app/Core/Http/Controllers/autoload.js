// ? BackendJS
import { config } from '../../../../config/controllers.js';

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
        for (const file of config) {
            properties = file;
        }
        return ((name) ? properties : config);
    }
}