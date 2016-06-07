var seznamDatotek;
var seznam;
var stevec = 0;
$(document).ready(function () {
    $('#videoRow').css("display", "none");
    isOnPlaylist = true;
    var audioPlaylist = document.getElementById("audioPlaylist");
    var timestampHolder = document.getElementById("timestampPlaylist");

    var fileLocation = "../../razsiritve_uploads/";

    var xhrReq = new XMLHttpRequest();
    xhrReq.open('GET', '/razsiritve/server/get_list.php');

    xhrReq.onreadystatechange = function () {
        if (xhrReq.readyState == 4 && xhrReq.status == 200) {

            seznamDatotek = xhrReq.responseText;

            if (seznamDatotek.length > 1) {
                try {
                    seznamDatotek = JSON.parse(seznamDatotek);
                    seznam = seznamDatotek;
                }
                catch(err) {
                    console.log("Napaka pri pridobivanju podatkov");
                }

            }

            $('#neobstojeciVnosi').toggle( seznam === undefined || seznam.length === 0);
            $('#obstojeciVnosi').toggle( !(seznam === undefined || seznam.length === 0));

            if(!(seznam === undefined || seznam.length === 0)) {
                posodobiVsebino(0, seznam);

                tidPlaylist = setInterval(function () {
                    stevec++;
                    if (stevec >= seznam.length) stevec = 0;
                    posodobiVsebino(stevec, seznam);
                }, 20000);


                function posodobiVsebino(stevec, seznam) {

                    if (stevec >= seznam.length) {
                        stevec = 0;
                    }

                    $("#leviOdsekPlaylist").fadeOut(500, function () {
                        $("#leviOdsekPlaylist").attr("src", fileLocation + seznam[stevec].predpona + "_left.png");
                    }).fadeIn(500);

                    $("#desniOdsekPlaylist").fadeOut(500, function () {
                        $("#desniOdsekPlaylist").attr("src", fileLocation + seznam[stevec].predpona + "_right.png");
                    }).fadeIn(500);

                    $("#uporabnikPlaylist").fadeOut(500, function () {
                        $("#uporabnikPlaylist").attr("src", fileLocation + seznam[stevec].predpona + "_user.png");
                    }).fadeIn(500);

                    audioPlaylist.src = fileLocation + seznam[stevec].predpona + ".wav";

                    timestampHolder.innerHTML = seznam[stevec].cas;
                    audioPlaylist.load();
                    $(this).delay(2000).queue(function () {
                        audioPlaylist.play();
                        $(this).dequeue();
                    });

                }
            }

        }
    };

    xhrReq.send();
    
});

function abortTimer(timer) { // to be called when you want to stop the timer
    clearInterval(timer);
}