define([], function() {
    
    var Dir = function() {

        return {
            replace: true,
            transclude: true,
            templateUrl: 'partials/note.html',
            link: function(scope, element, attrs) {
                element.on('click', function(event) {
                    // debugger;
                    // debugger;
                    scope.$apply(function() {
                        scope.enabled = !scope.enabled;
                    })
                })
            }
        }
    }

    Dir.$inject = [];
    return Dir;
})