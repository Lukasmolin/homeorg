/**
 * @param {Object} toSend valid JSON or instanceOf Error Object to send
 * @param {Boolean} [error = false] if the request had error,
 * defaults true if toSend is instanceOf Error, defaults to false otherwise
 * @returns {JSON} JSON formatted to comply with JSON API
 * @see {@link "https://jsonapi.org/format/"} for more info
 */
function format(toSend, error = false){
    const resp = {};
    if(toSend instanceof Error)
        resp.error = toSend.message;
    else if(error)
        resp.error = toSend;
    else
        resp.data = toSend;

    return resp;
}
module.exports = format;