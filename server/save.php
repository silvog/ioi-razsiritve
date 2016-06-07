<?php
//foreach(array('video', 'audio') as $type) {
foreach(array('audio') as $type) {

    if (isset($_FILES["${type}-blob"])) {

        $fileName = $_POST["${type}-filename"];
        //$uploadDirectory = "uploads/$fileName";

        $uploadDirectory = "../../razsiritve_uploads/$fileName";
        if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory)) {
            echo("problem moving uploaded file");
        }

        echo($uploadDirectory);
    }
}
?>