/**
 * * Class controls the default classes.
 * @export
 * @class App
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Class {
    /**
     * * Creates an instance of Class.
     * @param {object} [properties] Class properties:
     * @param {object} [states] Class states:
     * @memberof Class
     */
    constructor (properties = {
        // ? Properties
    }, states = {
        // ? States
    }) {
        this.setProperties(properties);
        this.setStates(states);
    }

    /**
     * * Set the Class properties.
     * @param {object} [properties] Class properties:
     * @memberof Class
     */
    setProperties (properties = {
        // ? Properties
    }) {
        if (!this.properties) {
            this.properties = {};
        }
        if (Object.entries(properties)) {
            for (const entry of Object.entries(properties)) {
                const key = entry[0];
                const value = entry[1];
                this.properties[key] = value;
            }
        }
    }

    /**
     * * Returns the Class properties or an specific property.
     * @param {string} [name=''] Property name.
     * @returns {Object|*}
     * @memberof Class
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
     * @memberof Class
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
     * @memberof Class
     */
    changeProperty (name, value) {
        if (this.hasProperty(name)) {
            this.properties[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }
    
    /**
     * * Set the Class states.
     * @param {object} [states] Class states:
     * @memberof Class
     */
    setStates (states = {
        // ? States
    }) {
        if (!this.states) {
            this.states = {};
        }
        if (Object.entries(states)) {
            for (const entry of Object.entries(states)) {
                const key = entry[0];
                const value = entry[1];
                this.states[key] = value;
            }
        }
    }

    /**
     * * Returns the Class states or an specific states.
     * @param {string} [name=''] States name.
     * @returns {Object|*}
     * @memberof Class
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
     * @memberof Class
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
     * @memberof Class
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

    /**
     * * Set the Class callback.
     * @param {object} [callback] Class callback:
     * @param {function} [callback.function] Class callback function.
     * @param {object} [callback.params] Class callback function params.
     * @memberof Class
     */
    setCallback (callback = {
        function: (params) => {
            /* console.log(params) */
        }, params: {
            // ? Params
    }}) {
        this.callback = {
            function: ((callback.hasOwnProperty('function')) ? callback.function : (params) => {
                /* console.log(params) */
            }), params: ((callback.hasOwnProperty('params')) ? callback.params : {
                //
        })};
    }

    /**
     * * Returns the Class callback.
     * @param {string} [name=''] Callback data name.
     * @returns {Object|*}
     * @memberof Class
     */
    getCallback (name = '') {
        if (name && name != '') {
            return this.callback[name];
        } else {
            return this.callback;
        }
    }

    /**
     * * Change the Class callback function params.
     * @param {*} [params={}] Class callback function params.
     * @memberof Class
     */
    changeCallbackParams (params = {
        // ? Params
    }) {
        this.callback.params = ((params) ? params : {
            // ? Params
        });
    }

    /**
     * * Executes the Class callback function.
     * @param {object} params Optional callback params.
     * @memberof Class
     */
    execute (params = {
        // ? Params
    }) {
        this.getCallback('function')({ ...this.getCallback('params'), ...params});
    }

    /**
     * * Set Class data.
     * @param {*} [data=null] Class data.
     * @memberof Class
     */
    setData (data = null) {
        this.data = data;
    }

    /**
     * * Returns the Class data.
     * @returns {*}
     * @memberof Class
     */
    getData () {
        return this.data;
    }
}