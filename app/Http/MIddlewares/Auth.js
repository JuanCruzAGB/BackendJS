// ? BackendJS
import { Middleware } from "../../Core/Http/Middlewares/Middleware.js";

/**
 * * Auth manage the general website backend.
 * @export
 * @class Auth
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Auth extends Middleware {
    /**
     * * Handle an incoming request.
     * @static
     * @param {*} request
     * @param {*} response
     * @param {*} next
     */
    static handle(request, response, next){
        next();
    }
}