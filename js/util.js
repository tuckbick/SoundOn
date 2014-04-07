define([

], function () {
    return {
        'rmHashKey': function(obj) {
            if (obj && obj['$$hashKey']) {
                delete obj['$$hashKey'];
            }
            return obj;
        },
        'isUndefined': function(val) {
            return typeof val === 'undefined';
        }
    }
});