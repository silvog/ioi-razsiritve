$(document).ready(function () {
    isOnPlaylist = false;
    $("body").removeAttr("class");
    $("body").removeAttr("style");


    document.getElementById("userAvatarFaceNaming").src = userImageURL;
    document.getElementById("userAvatarFaceNaming").width = 240;
    document.getElementById("userAvatarFaceNaming").height = 180;


    var timeToRecord = 10000;
    var bar = new ProgressBar.Line('#progressLine', {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: timeToRecord,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'}
    });

    $(this).delay(2000).queue(function () {
        recordAudio();
        bar.animate(1.0);  // Number from 0.0 to 1.0

        $(this).dequeue();
    });

    $(this).delay(10000 + timeToRecord).queue(function () {
        $('#mainContent').load('excerptNamingPlaylist.html');
    });


    var levaPredlogaNameRecord = document.getElementById('levaIzbiraTapiserijaName');
    var desnaPredlogaNameRecord = document.getElementById('desnaIzbiraTapiserijaName');
    levaPredlogaNameRecord.src = levaIzbira;
    desnaPredlogaNameRecord.src = desnaIzbira;


});


