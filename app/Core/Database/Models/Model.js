// ? BackendJS
import { Class } from "../../Class.js";

/**
 * * Model manage the database models.
 * @export
 * @class Model
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Model extends Class {
    /**
     * * Creates an instance of Model.
     * @param {object} [properties] Model properties.
     * @param {object} [states] Model states.
     * @memberof Model
     */
    constructor (properties = {
        //
    }, states = {
        //
    }) {
        super(properties, states);
    }

    static all () {
        console.log(this);
    }

    static find () {
        console.log(this);
    }

    static findBy () {
        console.log(this);
    }

    static where () {
        console.log(this);
    }

    static orderBy () {
        console.log(this);
    }

    static limit () {
        console.log(this);
    }
}