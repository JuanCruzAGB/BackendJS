/**
 * * Slug manage the Models slug.
 * @export
 * @class Slug
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Slug {
    /**
     * @var {array} config Configuration.
     * @static
     * @memberof Slug
     */
    static config = {
        // ? This is the field from which to build the slug.
        'source': null,
        // ? By default, updating a model will not try and generate a new slug value. If you want to regenerate one set on true.
        'onUpdate': false,
        // ? This defines the separator used when building a slug.
        'separator': '-',
        // ? This is a boolean defining whether slugs should be unique among all models of the given type.
        'unique': true,
        // ? An array of values that will never be allowed as slugs.
        'reserved': null,
        // ? Setting this to a positive integer will ensure that your generated slugs are restricted to a maximum length.
        'maxLength': null,
    };
}