// ? Local
import { Model } from "../Core/Database/Models/Model.js";

/**
 * * User manage the user model.
 * @export
 * @class User
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class User extends Model {
    /**
     * @var {string} table Database table name.
     * @static
     * @memberof User
     */
    static table = 'users';
        
    /**
     * @var {string} primaryKey Primary key name.
     * @static
     * @memberof User
     */
    static primaryKey = 'id_user';

    /**
     * @var {array} fillable Attributes that are mass assignable.
     * @static
     * @memberof User
     */
    static fillable = [
        'name', 'email', 'password', 'slug',
    ];

    /**
     * @var {array} fillable Attributes that should be hidden for arrays.
     * @static
     * @memberof User
     */
    static hidden = [
        'password',
    ];

    /**
     * @var {array} validation Validation messages and rules.
     * @static
     * @memberof User
     */
    static $validation = {
        'log-in': {
            'rules': {
                'email': 'required|email',
                'password': 'required|min:4|max:40',
            }, 'messages': {
                'en': {
                    'email.required': 'The email is required.',
                    'email.email': 'The email must be a valid email.',
                    'password.required': 'The password is required.',
                    'password.min': 'The password min length is :min.',
                    'password.max': 'The password max length is :max.',
                }, 'es': {
                    'email.required': 'El correo es obligatorio.',
                    'email.email': 'El correo no es un formato válido.',
                    'password.required': 'La contraseña es obligatoria.',
                    'password.min': 'La contraseña no puede tener menos de :min caracteres.',
                    'password.max': 'La contraseña no puede tener más de :max caracteres.',
        }}}, 'register': {
            //
        }, 'add': {
            //
        }, 'update': {
            //
        }, 'delete': {
            //
    }};
    
    /**
     * @var {object} slug Slug configuration for the Model.
     * @static
     * @memberof User
     */
    static slug = {
        'source': 'name',
        'onUpdate': true,
    };
}