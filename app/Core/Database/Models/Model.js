/**
 * * Model manage the database models.
 * @export
 * @class Model
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Model {
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
        this.setProperties(properties);
        this.setStates(states);
    }

    /**
     * * Set the Model properties.
     * @param {object} [properties] Model properties.
     * @memberof Model
     */
    setProperties (properties = {
        //
    }) {
        this.properties = {};
        if (Object.entries(properties)) {
            for (const entry of Object.entries(properties)) {
                const key = entry[0];
                const value = entry[1];
                this.properties[key] = value;
            }
        }
    }

    /**
     * * Returns the Model properties or an specific property.
     * @param {string} [name=''] Property name.
     * @returns {Object|*}
     * @memberof Model
     */
    getProperties (name = '') {
        if (name && name != '') {
            return this.properties[name];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {string} name Property name.
     * @returns {Boolean}
     * @memberof Model
     */
    hasProperty (name) {
        if (this.properties.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {string} name Property name.
     * @param {*} value Property value.
     * @memberof Model
     */
    changeProperty (name , value) {
        if (this.hasProperty(name)) {
            this.properties[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }
    
    /**
     * * Set the Model states.
     * @param {object} [states] Model states.
     * @memberof Model
     */
    setStates (states = {
        //
    }) {
        this.states = {};
        if (Object.entries(states)) {
            for (const entry of Object.entries(states)) {
                const key = entry[0];
                const value = entry[0];
                this.states[key] = value;
            }
        }
    }

    /**
     * * Returns the Model states or an specific states.
     * @param {string} [name=''] States name.
     * @returns {Object|*}
     * @memberof Model
     */
    getStates (name = '') {
        if (name && name != '') {
            return this.states[name];
        } else {
            return this.states;
        }
    }

    /**
     * * Check if there is a status.
     * @param {string} name Status name.
     * @returns {Boolean}
     * @memberof Model
     */
    hasStates (name) {
        if (this.states.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a status value.
     * @param {string} name Status name.
     * @param {*} value Status value.
     * @memberof Model
     */
    changeStatus (name, value) {
        if (this.hasStates(name)) {
            this.states[name] = value;
        }
        switch (name) {
            default:
                break;
        }
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