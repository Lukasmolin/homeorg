function isString(object){
    return (typeof object === 'string' || object instanceof String);
}

function isFilledString(object){
    if(object instanceof String){
        if(object.trim().length > 0)
            return true;
    } else if (typeof object === 'string') {
        if(object != 0)
            return true;
    }
    return false;
}

module.exports = {
    isString, isFilledString
};