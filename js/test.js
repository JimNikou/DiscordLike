/*var youTubePlayer;
var debug = true;

function onYouTubeIframeAPIReady() {
    'use strict';

    var videoId = ""; // the element show an error has ocured because there is no videos id
    var suggestedQuality = 'tiny';
    var height = 0;
    var width = 0;
    var youTubePlayerVolumeItemId = 'YouTube-player-volume';


    function onError(event) {
        youTubePlayer.personalPlayer.errors.push(event.data);
    }


    function onReady(event) {
        var player = event.target;

        player.loadVideoById({
            suggestedQuality: suggestedQuality,
            videoId: videoId
        });
        player.pauseVideo();
    }


    function onStateChange(event) {
        var volume = Math.round(event.target.getVolume());
        var volumeItem = document.getElementById(youTubePlayerVolumeItemId);

        if (volumeItem && (Math.round(volumeItem.value) != volume)) {
            volumeItem.value = volume;
        }
    }


    youTubePlayer = new YT.Player('YouTube-player',
        {
            videoId: videoId,
            height: height,
            width: width,
            playerVars: {
                'autohide': 0,
                'cc_load_policy': 0,
                'controls': 2,
                'disablekb': 1,
                'iv_load_policy': 3,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'start': 3
            },
            events: {
                'onError': onError,
                'onReady': onReady,
                'onStateChange': onStateChange
            }
        });

    // Add private data to the YouTube object
    youTubePlayer.personalPlayer = {
        'currentTimeSliding': false,
        'errors': []
    };
}


/**
* :return: true if the player is active, else false
*
function youTubePlayerActive() {
    return youTubePlayer && youTubePlayer.hasOwnProperty('getPlayerState');
}


/**
* Get videoId from the #YouTube-video-id HTML item value,
* load this video, pause it
* and show new infos.
*
function youTubePlayerChangeVideoId() {

    var inputVideoId = document.getElementById('YouTube-video-id');
    var videoId = inputVideoId.value;

    youTubePlayer.cueVideoById({
        suggestedQuality: 'tiny',
        videoId: videoId
    });
    youTubePlayer.pauseVideo();
}


/*
Move the video's time
*
function youTubePlayerCurrentTimeChange(currentTime) {
    youTubePlayer.personalPlayer.currentTimeSliding = false;
    youTubePlayer.seekTo(currentTime * youTubePlayer.getDuration() / 100, true);
}


function youTubePlayerDisplayInfos() {
    'use strict';

    if ((this.nbCalls === undefined) || (this.nbCalls >= 3)) {
        this.nbCalls = 0;
    }
    else {
        ++this.nbCalls;
    }

    if (youTubePlayerActive()) {

        var current = youTubePlayer.getCurrentTime();
        var duration = youTubePlayer.getDuration();
        var currentPercent = (current && duration
            ? current * 100 / duration
            : 0);

        if (!current) {
            current = 0;
        }
        if (!duration) {
            duration = 0;
        }

        if (!youTubePlayer.personalPlayer.currentTimeSliding) {
            document.getElementById('YouTube-player-progress').value = currentPercent;
        }

    }
}

function youTubePlayerPause() { youTubePlayer.pauseVideo(); }

function youTubePlayerPlay() { youTubePlayer.playVideo(); }

function youTubePlayerStop() {
    youTubePlayer.stopVideo();
    youTubePlayer.clearVideo();
}

function youTubePlayerVolumeChange(volume) { youTubePlayer.setVolume(volume); }

window.addEventListener('load', () => {setInterval(youTubePlayerDisplayInfos, 1000);});

function logDebugInfo() {
    var current = youTubePlayer.getCurrentTime();
    var duration = youTubePlayer.getDuration();
    var currentPercent = (current && duration
        ? current * 100 / duration
        : 0);


    if (!current) {
        current = 0;
    }
    if (!duration) {
        duration = 0;
    }
    
    var state = youTubePlayer.getPlayerState();
    var fraction = (youTubePlayer.hasOwnProperty('getVideoLoadedFraction')
        ? youTubePlayer.getVideoLoadedFraction()
        : 0);

    var url = youTubePlayer.getVideoUrl();
    var volume = youTubePlayer.getVolume();
    console.log(
        'URL: ' + url + '  ,  '
        + 'Quality: ' + youTubePlayer.getPlaybackQuality() + '  ,  '
        + 'Available quality: ' + youTubePlayer.getAvailableQualityLevels() + '  ,  '
        + 'Loaded: ' + (fraction * 100).toFixed(1) + '%  ,  '
        + 'Duration: ' + current.toFixed(2) + '/' + duration.toFixed(2) + 's = ' + currentPercent.toFixed(2) + '%  ,  '
        + 'Volume: ' + volume + '%'
    )
    //+ 'State : ' + state + ' : ' + youTubePlayerStateValueToDescription(state) + '  ,  '

    console.log("Error: " + youTubePlayer.personalPlayer.errors)
}
*/
/*
function asyncApiLoad(){
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}
*/


/**
* Mark that the HTML slider move.

function youTubePlayerCurrentTimeSlide() {
    'use strict';

    youTubePlayer.personalPlayer.currentTimeSliding = true;
}
*/

/**
* Return the state decription corresponding of the state value.
* If this value is incorrect, then return unknow.
*
* See values:
* https://developers.google.com/youtube/iframe_api_reference#Playback_status
*
* :param number: any
* :param unknow: any
*
* :return: 'unstarted', 'ended', 'playing', 'paused', 'buffering', 'video cued' or unknow
*/
/*
function youTubePlayerStateValueToDescription(state, unknow) {
    'use strict';

    var STATES = {
        '-1': 'unstarted',   // YT.PlayerState.
        '0': 'ended',        // YT.PlayerState.ENDED
        '1': 'playing',      // YT.PlayerState.PLAYING
        '2': 'paused',       // YT.PlayerState.PAUSED
        '3': 'buffering',    // YT.PlayerState.BUFFERING
        '5': 'video cued'
    };  // YT.PlayerState.CUED

    return (state in STATES
        ? STATES[state]
        : unknow);
}
*/

const stream = require('youtube-audio-stream')
const url = 'http://youtube.com/watch?v=34aQNMvGEZQ'
const decoder = require('lame').Decoder
const speaker = require('speaker')

stream(url)
.pipe(decoder())
.pipe(speaker())