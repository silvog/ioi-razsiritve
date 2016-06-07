$(document).ready(function () {
    isOnPlaylist = false;
    
    if (trackedFaceCompleteIntro) {
        function tapestryPickContent() {
            $('#mainContent').load('tapiserijaPick.html');
        }

        continueToTapiserijaPickTimeout = setTimeout(tapestryPickContent, 20000);
    }

    $('#videoRow').css("display", "none");
});

function stopTimeout(myDelay) {
    clearTimeout(myDelay);
}