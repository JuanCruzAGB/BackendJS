// ? BackendJS
import { Controller } from "../../Core/Http/Controllers/Controller.js";

// ? Custom files
import { User } from "../../Models/User.js";

/**
 * * WebController manage the general website backend.
 * @export
 * @class WebController
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class WebController extends Controller {
    /**
     * * Controls the index route.
     * @param {*} request
     * @param {*} response
     * @returns {*}
     * @memberof WebController
     */
    async index (request, response) {
        try {
            let users = await User.all('id_user', '=', '1');
            users = users.orderBy('created_at', 'DESC').get();
            return response.status(200).send({
                status: {
                    code: 200,
                    message: 'Everything is ok :D',
                    data: {
                        users: users,
            }}});
        } catch (error) {
            if (!error.hasOwnProperty('code')) {
                console.log(error);
            }
            return response.status(200).send(((error.hasOwnProperty('code'))) ? {
                status: error,
            } : {
                status: {
                    code: 500,
                    message: 'Internal server error'
            }});
        }
    }
}