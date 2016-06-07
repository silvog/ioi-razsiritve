$(document).ready(function () {

    $('.links').click(function () {
        if (!isOnPlaylist)
            $("#mainContent").load($(this).attr("page") + ".html");
        else//smo na playlist
            if ($(this).attr("page") === "about") {
                abortTimer(tidPlaylist);
                $("#mainContent").load($(this).attr("page") + ".html");
        }
    });

});
