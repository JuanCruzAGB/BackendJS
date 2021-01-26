// ? BackendJS
import { Class } from "../../Class.js";
import { Config } from "../../Config.js";
import { Database } from "../Database.js";

/**
 * * Model manage the database models.
 * @export
 * @class Model
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Model {
    /**
     * * Creates an instance of Model.
     * @param {object} [data] Model data:
     * @memberof Model
     */
    constructor (data = {
        // ? Data
    }) {
        this.setData(data);
    }

    /**
     * * Set Class data.
     * @param {*} [data=null] Class data.
     * @memberof Class
     */
    setData (data = null) {
        if (Object.entries(data)) {
            for (const entry of Object.entries(data)) {
                const key = entry[0];
                const value = entry[1];
                this[key] = value;
            }
        }
    }

    /**
     * * Returns the Class data.
     * @returns {*}
     * @memberof Class
     */
    getData () {
        return this.data;
    }

    /**
     * * Set the array of Models.
     * @param {Model[]} models
     * @memberof Model
     */
    setModels (models) {
        this.models = models;
    }

    /**
     * * Returns the array of Models.
     * @param {Model[]} models
     * @memberof Model
     */
    getModels () {
        return this.models;
    }

    /**
     * * Returns the array of Models.
     * @returns {Model[]}
     * @memberof Model
     */
    get () {
        return this.getModels();
    }

    /**
     * * Order the array of Models.
     * @param {string} field Model field.
     * @param {string} [order='ASC'] Order position.
     * @returns {Model}
     * @memberof Model
     */
    orderBy (field, order = 'ASC') {
        if (field) {
            let models = [];
            for (const model of this.getModels()) {
                let position = false;
                if (model.hasOwnProperty(field) && model[field]) {
                    position = this.loopOrderAuxiliarModels(model, models, field, order);
                }
                if (position !== false) {
                    models.splice(position, 0, model);
                } else {
                    models.push(model);
                }
            }
            this.setModels(models);
            return this;
        } else {
            throw {
                code: 404,
                message: 'The field is required',
            };
        }
    }

    /**
     * * Loop an auxiliar array of Models.
     * @param {Model} model Model to comparate.
     * @param {Model[]} models Auxiliar array of Models.
     * @param {string} field Model field.
     * @param {string} [order='ASC'] Order position.
     * @returns {number}
     * @memberof Model
     */
    loopOrderAuxiliarModels (model, models, field, order = 'ASC') {
        let position
        for (const key in models) {
            if (models.hasOwnProperty(key)) {
                const innerModel = models[key];
                if (this.orderPositionComparate(model, innerModel, field, order)) {
                    position = key;
                }
            }
        }
        return position;
    }

    /**
     * * Comparates the position of Models.
     * @param {Model} model Model to comparte.
     * @param {Model} innerModel Model comparated
     * @param {string} field Model field.
     * @param {string} [order='ASC'] Order position.
     * @returns {boolean}
     * @memberof Model
     */
    orderPositionComparate (model, innerModel,field, order = 'ASC') {
        switch (order.toUpperCase()) {
            case 'ASC':
                if (String(model[field]).toUpperCase() < String(innerModel[field]).toUpperCase()) {
                    return true;
                }
                break;
            default:
                if (String(model[field]).toUpperCase() > String(innerModel[field]).toUpperCase()) {
                    return true;
                }
                break;
        }
    }

    /**
     * * Limit the array of Models.
     * @param {number} length Array max length.
     * @returns {Model}
     * @memberof Model
     */
    limit (length) {
        if (length) {
            let models = [];
            for (const key in this.getModels()) {
                if (this.getModels().hasOwnProperty(key)) {
                    let push = false;
                    const model = this.getModels()[key];
                    if (key < length) {
                        push = true;
                    }
                    if (push !== false) {
                        models.push(model);
                    }
                }
            }
            this.setModels(models);
            return this;
        } else {
            throw {
                code: 404,
                message: 'The length is required',
            };
        }
    }

    /**
     * * Returns Model entries.
     * @static
     * @param {string} query Database query.
     * @param {function} callback Callback (when Database query ends).
     * @returns {*}
     * @memberof Model
     */
    static async query (query) {
        if (query) {
            let database = new Database(Config.generate('database').getProperties(), {
                // ? Database states
            });
            return await database.connection.query(query)
                .then((entries) => {
                    return entries;
                }).catch((error) => {
                    throw error;
                });
        } else {
            throw {
                code: 404,
                message: 'The query is required',
            };
        }
    }

    /**
     * * Returns the Model table name.
     * @static
     * @returns {string}
     * @memberof Model
     */
    static getTableName () {
        return this.table;
    }

    /**
     * * Returns the Model primary key.
     * @static
     * @returns {string}
     * @memberof Model
     */
    static getPrimaryKeyName () {
        return this.primaryKey;
    }

    /**
     * * Returns the fillable data as string.
     * @static
     * @returns {string}
     * @memberof Model
     */
    static getFillableData () {
        let fillable = `${ this.getPrimaryKeyName() }`;
        if (this.hasOwnProperty('fillable')) {
            if (this.hasOwnProperty('hidden')) {
                fillable = this.getFillableDataWithoutHiddenFields();
            } else {
                for (const field of this.fillable) {
                    fillable = `${ fillable }, \`${ field }\``;
                }
            }
        }
        fillable = `${ fillable }, created_at, updated_at`;
        return fillable;
    }

    /**
     * * Returns the fillable data as string without the hidden fields.
     * @static
     * @returns {string}
     * @memberof Model
     */
    static getFillableDataWithoutHiddenFields () {
        let fillable = `${ this.getPrimaryKeyName() }`;
        for (const field of this.fillable) {
            let hide = false;
            for (const hiddenField of this.hidden) {
                if (field == hiddenField) {
                    hide = true;
                }
            }
            if (!hide) {
                fillable = `${ fillable }, \`${ field }\``;
            }
        }
        fillable = `${ fillable }, created_at, updated_at`;
        return fillable;
    }

    /**
     * * Returns all the Model entries.
     * @static
     * @returns {Model}
     * @memberof Model
     */
    static async all () {
        try {
            let models = [];
            let entries = await this.query(`SELECT ${ this.getFillableData() } FROM \`${ this.getTableName() }\``);
            for (let data of entries) {
                let model = new this(data);
                models.push(model);
            }
            return new this({models});
        } catch (error) {
            throw error;
        }
    }

    /**
     * * Returns a Model entry.
     * @static
     * @param {*} id Model primary key.
     * @returns {Model}
     * @memberof Model
     */
    static async find (id) {
        if (id) {
            try {
                let entries = await this.query(`SELECT ${ this.getFillableData() } FROM \`${ this.getTableName() }\` WHERE ${ this.getPrimaryKeyName() } = ${ id } LIMIT 1`);
                let model = new this(entries[0]);
                return model;
            } catch (error) {
                throw error;
            }
        } else {
            throw {
                code: 404,
                message: 'The ID is required',
            };
        }
    }

    /**
     * * Returns a Model entry that have the field = not null (optionally, a value can be given).
     * @static
     * @param {string} field Model field.
     * @param {*} [value] Model field value.
     * @returns {Model}
     * @memberof Model
     */
    static async findBy (field, value) {
        if (field) {
            try {
                let entries, model;
                if (value) {
                    entries = await this.query(`SELECT ${ this.getFillableData() } FROM \`${ this.getTableName() }\` WHERE ${ field } = ${ value } LIMIT 1`);
                    model = new this(entries[0]);
                } else {
                    entries = await this.query(`SELECT ${ this.getFillableData() } FROM \`${ this.getTableName() }\` WHERE ${ field } IS NOT NULL LIMIT 1`);
                }
                return model;
            } catch (error) {
                throw error;
            }
        } else {
            throw {
                code: 404,
                message: 'The field is required',
            };
        }
    }

    /**
     * * Returns all the Model entries that has the field, matched against a value.
     * @static
     * @param {string} field Model field.
     * @param {string} comparator Comparator.
     * @param {*} value Model field value.
     * @returns {Model}
     * @memberof Model
     */
    static async where (field, comparator, value) {
        if (field) {
            if (comparator) {
                if (value) {
                    try {
                        let models = [];
                        let entries = await this.query(`SELECT ${ this.getFillableData() } FROM \`${ this.getTableName() }\` WHERE ${ field } ${ comparator } ${ value }`);
                        for (let data of entries) {
                            let model = new this(data);
                            models.push(model);
                        }
                        return new this({models});
                    } catch (error) {
                        throw error;
                    }
                } else {
                    throw {
                        code: 404,
                        message: 'The value is required',
                    };
                }
            } else {
                throw {
                    code: 404,
                    message: 'The comparator is required',
                };
            }
        } else {
            throw {
                code: 404,
                message: 'The field is required',
            };
        }
    }
}