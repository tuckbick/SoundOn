define([
    'angular',
    'angular-animate',
    'controllers/main',
    'directives/beat',
    'directives/note'
], function (angular, ngAnimate, MainCtrl, BeatDir, NoteDir) {

    var app = angular.module('app', ['ngAnimate']);

    app.controller('MainCtrl', MainCtrl);
    app.directive('beat', BeatDir);
    app.directive('note', NoteDir);

    angular.bootstrap(document, ['app']);
    
});