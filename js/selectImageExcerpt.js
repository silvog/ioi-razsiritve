var $levaTap = null;
var $desnaTap = null;
var levaIzbira = null;
var desnaIzbira = null;
var levaIzbiraObstaja = false;
var desnaIzbiraObstaja = false;
var firstClickLeftVar = true;
var firstClickRightVar = true;

$(document).ready(function () {

    isOnPlaylist = false;

    $('#potrdiIzbraneOdseke').hide();
    $('#konfliktButton').hide();
    $('#razresitevButton').hide();

    $(".modal-backdrop").remove();

    $("body").removeAttr("class");
    $("body").removeAttr("style");


    $("#levaTapiserija").attr("src", "images/" + tapiserija1Global + ".bmp");
    $("#desnaTapiserija").attr("src", "images/" + tapiserija2Global + ".bmp");
    $("#levaTapiserijaPreview").attr("src", "images/" + tapiserija1Global + ".bmp");
    $("#desnaTapiserijaPreview").attr("src", "images/" + tapiserija2Global + ".bmp");

    $levaTap = $('#levaTapiserija').imgAreaSelect({
        instance: true,
        aspectRatio: '4:3',
        handles: true,
        maxWidth: 120,
        maxHeight: 120,
        onSelectChange: previewLeft,
        onSelectEnd: function (img, selection) {

            if (selection.height > 0 && selection.width > 0)
                levaIzbiraObstaja = true;
            else
                levaIzbiraObstaja = false;

            if (levaIzbiraObstaja && desnaIzbiraObstaja)
                $('#potrdiIzbraneOdseke').show();

            var originalSlika = new Image();

            originalSlika.src = "images/" + tapiserija1Global + ".bmp";
            var sc = originalSlika.width * 1.0 / img.width;

            var levaSelekcija = {};
            levaSelekcija.x1 = selection.x1;
            levaSelekcija.y1 = selection.y1;
            levaSelekcija.x2 = selection.x2;
            levaSelekcija.y2 = selection.y2;
            levaSelekcija.width = selection.width;
            levaSelekcija.height = selection.height;

            if (selection.width === 0) {

                levaSelekcija.x2 = selection.x1 + 100;
                levaSelekcija.y2 = selection.y1 + 75;
                levaSelekcija.width = 100;
                levaSelekcija.height = 75;
            }


            var canvasObj = $('<canvas/>').attr({
                    'id': 'cropCanvas',
                    'width': levaSelekcija.width * sc,
                    'height': levaSelekcija.height * sc
                })
                .css({
                    'display': 'none',

                    'position': 'fixed',
                });

            $('body').append(canvasObj);

            var canvas = document.getElementById('cropCanvas'),
                context = canvas.getContext('2d');

            // img, sx, sy, swidth, sheight, x, y, width, height

            context.drawImage(originalSlika, levaSelekcija.x1 * sc, levaSelekcija.y1 * sc, levaSelekcija.width * sc, levaSelekcija.height * sc, 0, 0, levaSelekcija.width * sc, levaSelekcija.height * sc);

            levaIzbira = canvas.toDataURL();

            $('#cropCanvas').remove();
        }
    });

    $desnaTap = $('#desnaTapiserija').imgAreaSelect({
        instance: true,
        aspectRatio: '4:3',
        handles: true,
        maxWidth: 120,
        maxHeight: 120,
        onSelectChange: previewRight,
        onSelectEnd: function (img, selection) {
            if (selection.height > 0 && selection.width > 0)
                desnaIzbiraObstaja = true;
            else
                desnaIzbiraObstaja = false;

            if (levaIzbiraObstaja && desnaIzbiraObstaja)
                $('#potrdiIzbraneOdseke').show();

            var originalSlikaR = new Image();

            originalSlikaR.src = "images/" + tapiserija2Global + ".bmp";
            var scR = originalSlikaR.width * 1.0 / img.width;


            var desnaSelekcija = {};
            desnaSelekcija.x1 = selection.x1;
            desnaSelekcija.y1 = selection.y1;
            desnaSelekcija.x2 = selection.x2;
            desnaSelekcija.y2 = selection.y2;
            desnaSelekcija.width = selection.width;
            desnaSelekcija.height = selection.height;

            if (selection.width === 0) {

                desnaSelekcija.x2 = selection.x1 + 100;
                desnaSelekcija.y2 = selection.y1 + 75;
                desnaSelekcija.width = 100;
                desnaSelekcija.height = 75;
            }

            var canvasObjR = $('<canvas/>').attr({
                    'id': 'cropCanvasR',
                    'width': desnaSelekcija.width * scR,
                    'height': desnaSelekcija.height * scR
                })
                .css({
                    'display': 'none',

                    'position': 'fixed',
                });

            $('body').append(canvasObjR);

            var canvasR = document.getElementById('cropCanvasR'),
                contextR = canvasR.getContext('2d');

            contextR.drawImage(originalSlikaR, desnaSelekcija.x1 * scR, desnaSelekcija.y1 * scR, desnaSelekcija.width * scR, desnaSelekcija.height * scR, 0, 0, desnaSelekcija.width * scR, desnaSelekcija.height * scR);

            desnaIzbira = canvasR.toDataURL();
            console.log(desnaSelekcija.width * scR);
            $('#cropCanvasR').remove();
        }
    });

    function previewLeft(img, selection) {
        var scaleX = 100 / selection.width;
        var scaleY = 100 / selection.height;

        $("#levaTapiserijaPreview").css({//#thumbnail + div > img
            width: Math.round(scaleX * img.clientWidth) + "px",
            height: Math.round(scaleY * img.clientHeight) + "px",
            marginLeft: "-" + Math.round(scaleX * selection.x1) + "px",
            marginTop: "-" + Math.round(scaleY * selection.y1) + "px"

        });


    }

    function previewRight(img, selection) {
        var scaleX = 100 / selection.width;
        var scaleY = 100 / selection.height;

        $("#desnaTapiserijaPreview").css({//#thumbnail + div > img
            width: Math.round(scaleX * img.clientWidth) + "px",
            height: Math.round(scaleY * img.clientHeight) + "px",
            marginLeft: "-" + Math.round(scaleX * selection.x1) + "px",
            marginTop: "-" + Math.round(scaleY * selection.y1) + "px"
        });

    }

});

function clearTapiserijaSelection() {
    if ($levaTap !== null && $desnaTap !== null) {
        $levaTap.cancelSelection();
        $desnaTap.cancelSelection();
    }
}

function firstClickLeft() {
    if (firstClickLeftVar) {
        $levaTap.setSelection(50, 50, 150, 125, true);
        $levaTap.setOptions({show: true});
        $levaTap.update();
        firstClickLeftVar = false;
    }
}

function firstClickRight() {
    if (firstClickRightVar) {
        $desnaTap.setSelection(50, 50, 150, 125, true);
        $desnaTap.setOptions({show: true});
        $desnaTap.update();
        firstClickRightVar = false;
    }
}

function showKonfRazOptions() {
    clearTapiserijaSelection();
    document.getElementById("izbiraPodslikHeading").innerHTML = "<strong>Izberi kaj hočeš opisati: KONFLIKT ali RAZREŠITEV</strong>";
    $('#konfliktButton').show();
    $('#razresitevButton').show();
    
    $('#potrdiIzbraneOdseke').remove();

}

function commenceToNaming() {
    $('#mainContent').load('excerptNameRecord.html');
}