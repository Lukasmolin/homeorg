function isString(object){
    return (typeof object === 'string' || object instanceof String);
}

function isFilledString(object){
    if(object instanceof String && object.trim().length > 0)
        return true;
    
    if (typeof object === 'string' && object != 0)
        return true;

    return false
}

function isValidId(object) {
    return !isNaN(object) && object > 0;
}

module.exports = {
    isString, isFilledString, isValidId
};