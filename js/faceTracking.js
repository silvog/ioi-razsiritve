
var counterFrame = 0;
var counterTracked = 0;
var counterUntracked = 0;
var trackingTask = null;
var trackedFaceCompleteIntro = false;

var userImageURL = null;
var isSnapshotTaken = false;


var tidPlaylist = null;
var isOnPlaylist = false;
var audioInitialized = false;
var videoInitialized = false;

var continueToTapiserijaPickTimeout;
var mediaConstraints = {
    audio: true
};



$( document ).ready(function() {
    $("#startVideoButton").toggle(false);
});


function initialize() {
    faceTracker();

}

function initialize2() {
    captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    audioInitialized = true;

    $("#startVideoButton").toggle(audioInitialized);
    $("#startAudioButton").toggle(!audioInitialized);
}

function faceTracker() {

    console.log("Initiating face tracker");
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    trackedFaceCompleteIntro = false;

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(6);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    trackingTask = tracking.track('#video', tracker, {camera: true});
    videoInitialized = true;
    $("#startVideoButton").toggle(!videoInitialized);
    //hide startButton
    //$("#startVideoButton").hide();
    //$("#startAudioButton").hide();

    tracker.on('track', function (event) {

        context.clearRect(0, 0, canvas.width, canvas.height);
        counterFrame++;

        if (event.data.length === 0) {

            // No objects were detected in this frame.
            counterUntracked++;
        } else {

            counterTracked++;

            event.data.forEach(function (rect) {
                context.strokeStyle = '#FF530D';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Ubuntu';
                context.fillStyle = "#fff";

            });
        }

        if (counterFrame > 120) {
            if (counterTracked > 100 && !trackedFaceCompleteIntro) { //OK to proceed

                if(tidPlaylist !== undefined && tidPlaylist !== null)
                    abortTimer(tidPlaylist);

                counterTracked = 0;
                counterFrame = 0;
                trackedFaceCompleteIntro = true;
                if (!isSnapshotTaken)
                    snapshot();
                $('#mainContent').load('introduction.html');

            }

            if(counterFrame % 490 === 0 && counterUntracked > 410){
                trackedFaceCompleteIntro = false;
                isSnapshotTaken = false;
                if(!isOnPlaylist){
                    if(continueToTapiserijaPickTimeout !== undefined)
                        stopTimeout(continueToTapiserijaPickTimeout);
                    $('#mainContent').load('excerptNamingPlaylist.html');

                }
                counterUntracked = 0;
                counterTracked = 0;
            }

            if (counterFrame > 500) {
                counterFrame = 0;
                counterTracked = 0;
            }
        }



    });

}

function stopTracking() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    if (trackingTask !== null) {

        trackingTask.stop();
        context.clearRect(0, 0, canvas.width, canvas.height);

    }
    var video = document.getElementById('video');
    video.src = "";

}

function showStream() {

    var video = document.getElementById('video');
    video.src = "";
    if (video.src && video.src !== "") {
        try {
            video.src = window.URL.createObjectURL(tracking.localStream);
        } catch (err) {
            console.log("There has been an error during stream placing!");
        }
    } else {
        console.log("Video already has a source stream!");
    }
}

function snapshot() {
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    if (tracking.localStream) {
        ctx.drawImage(video, 0, 0, 320, 240);

        userImageURL = canvas.toDataURL();
        isSnapshotTaken = true;
    }
}


