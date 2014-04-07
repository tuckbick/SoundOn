define([
    'underscore',
    'timbre',
    'subcollider',
    'util'
], function (_, T, sc, util) {
    var Ctrl = function($scope, $timeout) {




        // LOGIC

        var buffer = null,
            song = null,

        compileSong = function() {
            console.log('compile');
            localStorage.setItem('beats', JSON.stringify($scope.beats));
            return timbre.rec(function(output) {
                var key = 440; // Hz
                var msec  = timbre.timevalue((60/$scope.tempo)+"sec");
                var synth = T("OscGen", {env:T("perc", {r:msec, ar:true})});

                T("interval", {interval:msec}, function(count) {
                    if (count < $scope.beats.length) {
                        var beat = util.rmHashKey($scope.beats[count]);
                        _.each(beat, function(note) {
                            if (note.enabled) {
                                synth.noteOnWithFreq(note.ratio * key, 100);
                            }
                        })
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

        addEmptyBeat = function(beats) {
            var beat = [];
            _.each($scope.ratios, function(ratio) {
                // push note
                beat.push({
                    ratio: ratio,
                    enabled: false
                });
            })
            beats.push(beat)
        };




        // SCOPE

        _.extend($scope, {
            pageReady: false,
            tempo: parseInt(localStorage.getItem('tempo')) || 120,
            beat_num: parseInt(localStorage.getItem('beat_num')) || 8,
            ratios: sc.Scale.chromatic()._ratios.reverse(),
            playing: false,
            compileSong: compileSong
        })

        var beats = JSON.parse(localStorage.getItem('beats'));
        if (_.isEmpty(beats)) {
            var beats = [];
            _.each(_.range($scope.beat_num), function() {
                addEmptyBeat(beats);
            })
        }
        $scope.beats = beats;




        // OBSERVERS

        $scope.$watch('playing', function(playing) {
            if (playing) {
                playSong();
            } else {
                pauseSong();
            }
        })
        $scope.$watch('tempo', function(new_val) {
            if(_.isNumber(new_val)) {
                localStorage.setItem('tempo', new_val);
                compileSong();
            }
        })
        $scope.$watch('beat_num', function(new_val, old_val) {
            if (_.isNumber(new_val)) {
                localStorage.setItem('beat_num', new_val);
                if (new_val > old_val) {
                    addEmptyBeat($scope.beats);
                }
                else if (new_val < old_val) {
                    $scope.beats.splice(new_val);
                }
                compileSong();
            }
        })


    }
    Ctrl.$inject = ['$scope', '$timeout'];
    return Ctrl;
});