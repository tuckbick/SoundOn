define([], function() {
    
    var Dir = function() {

        return {
            replace: true,
            transclude: true,
            templateUrl: 'partials/beat.html'
        }
    }

    Dir.$inject = [];
    return Dir;
})