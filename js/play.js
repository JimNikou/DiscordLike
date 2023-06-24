var youTubePlayer;
var debug = true;

function onYouTubeIframeAPIReady() {
    'use strict';

    var videoId = "YVkUvmDQ3HY"; // the element show an error has ocured because there is no videos id
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
        player.playVideo();
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
                // 'autohide': 0,
                // 'cc_load_policy': 0,
                // 'controls': 2,
                // 'disablekb': 1,
                // 'iv_load_policy': 3,
                // 'modestbranding': 1,
                // 'rel': 0,
                // 'showinfo': 0,
                // 'start': 3
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

    console.log("Player done")
}


/**
* :return: true if the player is active, else false
*/
function youTubePlayerActive() {
    return youTubePlayer && youTubePlayer.hasOwnProperty('getPlayerState');
}


/**
* Get videoId from the #YouTube-video-id HTML item value,
* load this video, pause it
* and show new infos.
*/
function youTubePlayerChangeVideoId(videoId) {
    
    // var inputVideoId = document.getElementById('YouTube-video-id');
    // var videoId = inputVideoId.value;
    console.log(videoId)
    youTubePlayer.loadVideoById({
        suggestedQuality: 'tiny',
        videoId: videoId
    });
    youTubePlayer.pauseVideo();
    console.log("done")
}


/*
Move the video's time
*/
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

let isPlaying = false;
let isMuted = false;

function youTubePlayerPause() { youTubePlayer.pauseVideo(); }
function youTubePlayerPlay() { youTubePlayer.playVideo(); }

function playPause() {
    if (!isPlaying) {
        youTubePlayer.playVideo();
        isPlaying = true;
        document.getElementById('play-btn').innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        youTubePlayer.pauseVideo();
        isPlaying = false;
        document.getElementById('play-btn').innerHTML = '<i class="fa fa-play"></i>';
    }
  }

function youTubePlayerStop() {
    youTubePlayer.stopVideo();
    youTubePlayer.clearVideo();
}

function youTubePlayerVolumeChange(volume) { youTubePlayer.setVolume(volume); }

function mute() {
    if (!isMuted) {
        youTubePlayer.mute();
        isMuted = true;
        document.getElementById('mute-btn').innerHTML = '<i class="fa fa-volume-off"></i>';
    } else {
        youTubePlayer.unMute();
        isMuted = false;
        document.getElementById('mute-btn').innerHTML = '<i class="fa fa-volume-up"></i>';
    }
  }

window.addEventListener('load', () => {asyncApiLoad(); setInterval(youTubePlayerDisplayInfos, 1000);});

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
    

    // '-1': 'unstarted',   // YT.PlayerState.
    // '0': 'ended',        // YT.PlayerState.ENDED
    // '1': 'playing',      // YT.PlayerState.PLAYING
    // '2': 'paused',       // YT.PlayerState.PAUSED
    // '3': 'buffering',    // YT.PlayerState.BUFFERING
    // '5': 'video cued'

    var state = youTubePlayer.getPlayerState();
    var fraction = (youTubePlayer.hasOwnProperty('getVideoLoadedFraction')
        ? youTubePlayer.getVideoLoadedFraction()
        : 0);

    var url = youTubePlayer.getVideoUrl();
    var volume = youTubePlayer.getVolume();
    console.log(
        'URL: ' + url + '  ,  '
        + 'State : ' + state + '  ,  '
        + 'Quality: ' + youTubePlayer.getPlaybackQuality() + '  ,  '
        + 'Available quality: ' + youTubePlayer.getAvailableQualityLevels() + '  ,  '
        + 'Loaded: ' + (fraction * 100).toFixed(1) + '%  ,  '
        + 'Duration: ' + current.toFixed(2) + '/' + duration.toFixed(2) + 's = ' + currentPercent.toFixed(2) + '%  ,  '
        + 'Volume: ' + volume + '%'
    )
    

    console.log("Error: " + youTubePlayer.personalPlayer.errors)
}


function asyncApiLoad(){
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}


function search(event){
    console.log("search")
    if (event.keyCode === 13) {
        event.preventDefault();
        query = event.target.value;
        api_key = "060b77379c7f472d236b78d538dd2a3b"
        url = "https://ws.audioscrobbler.com/2.0/?method=track.search&track="+ query +"&api_key="+ api_key +"&format=json"
        const Http = new XMLHttpRequest();
        Http.open("GET", url);
        Http.send();
        let video_url;
    
        Http.onreadystatechange = (e) => {
            //console.log(Http.responseText)
            console.log("---------------")
            console.log(JSON.parse(Http.responseText).results.trackmatches.track[0].name)
            video_url = JSON.parse(Http.responseText).results.trackmatches.track[0].url
            console.log(video_url)
            $.ajax({ url: video_url, success: function(data) { 
                var el = document.createElement( 'html' );
                el.innerHTML = data
                video_id = el.getElementsByClassName("header-new-playlink")[0].getAttribute("href").replace('https://www.youtube.com/watch?v=', '');
                console.log(video_id);
                youTubePlayerChangeVideoId(video_id);
            } });
        }
        
    }
}


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