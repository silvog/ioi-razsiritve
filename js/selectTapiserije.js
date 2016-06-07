var tapiserija1Global = null;
var tapiserija2Global = null;

$(document).ready(function () {

    isOnPlaylist = false;
    $("select").imagepicker({
        show_label: true,
        limit: 2,
        selected: function () {
            var izbraneTapiserijeArray = $("select").data('picker').selected_values();
            if (izbraneTapiserijeArray.length == 2) {
                $("#izbraneTapiserijeModal").modal();
                tapiserija1Global = "slika" + izbraneTapiserijeArray[0];
                tapiserija2Global = "slika" + izbraneTapiserijeArray[1];
            }
        }

    });

});

function commenceExcerptPick() {

    $('#mainContent').load('excerptPick.html');
    

}