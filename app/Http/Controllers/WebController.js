// ? Local
import { Controller } from "../../Core/Http/Controllers/Controller.js";
import { User } from "../../Models/User.js";

/**
 * * WebController manage the general website backend.
 * @export
 * @class WebController
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class WebController extends Controller {
    static index (request, response) {
        return response.status(200).send({
            status: {
                code: 200,
                message: 'Everything is ok :D',
                data: [
                    //
        ]}});
    }
}