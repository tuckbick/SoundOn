define([
    'util'
], function(util) {
    
    var Dir = function() {

        return {
            replace: true,
            transclude: true,
            templateUrl: 'partials/note.html',
            scope: true,
            link: function(scope, element, attrs) {
                scope.$watch('note.enabled', function(new_val, old_val) {
                    if (new_val === old_val) return;
                    if (util.isUndefined(new_val) && util.isUndefined(old_val)) return;
                    scope.compileSong();
                })
            }
        }
    }

    Dir.$inject = [];
    return Dir;
})