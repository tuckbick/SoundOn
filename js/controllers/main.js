define([
    'underscore',
    'timbre',
    'subcollider'
], function (_, T, sc) {
    var Ctrl = function($scope, $timeout) {




        // LOGIC

        var buffer = null,
            song = null,

        compileSong = function() {
            return timbre.rec(function(output) {
                var midis = [69, 76, 69, 76, 69, 76, 69, 76];
                var msec  = timbre.timevalue("1sec");
                var synth = T("OscGen", {env:T("perc", {r:msec, ar:true})});

                T("interval", {interval:msec}, function(count) {
                    if (count < midis.length) {
                        // noteOnWithFreq(freq, velocity, opts)
                        synth.noteOn(midis[count], 100);
                    } else {
                        output.done();
                    }
                }).start();

                output.send(synth);
            }).then(function(result) {
                song = T("buffer", {buffer:result, loop:true});
            });
        },

        playSong = function() {
            song && song.play();
        },

        pauseSong = function() {
            song && song.pause();
        },

        addColumn = function(beats, ratios) {
            var beat = {};
            _.each(ratios || $scope.ratios, function(note) {
                beat[note] = false
            })
            beats.push(beat)
        };




        // SCOPE

        _.extend($scope, {
            pageReady: false,
            tempo: 120,
            beat_num: 8,
            ratios: sc.Scale.chromatic()._ratios,
            playing: false
        })




        // OBSERVERS

        $scope.$watch('playing', function(playing) {
            if (playing) {
                playSong();
            } else {
                pauseSong();
            }
        })
        $scope.$watch('tempo', function(new_val) {

        })
        $scope.$watch('beat_num', function(new_val, old_val) {
            if (new_val > old_val) {
                addColumn($scope.beats);
            }
            else if (new_val < old_val) {
                $scope.beats.splice(new_val);
            }
        })
        $scope.$watch('ratios', function(ratios, old_val, scope) {
            var beats = [];
            _.each(_.range($scope.beat_num), function() {
                addColumn(beats, ratios);
            })
            $scope.beats = beats;
        })




        // INIT

        $timeout(function() {
            compileSong();
        }, 0)




    }
    Ctrl.$inject = ['$scope', '$timeout'];
    return Ctrl;
});