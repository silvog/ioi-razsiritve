<?php
//$upload_dir = "upload/";
/*$upload_dir = "../../razsiritve_uploads/$fileName";

$img = $_POST['hidden_data'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $upload_dir . mktime() . ".png";
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';
*/


    if (isset($_POST['image-blob'])) {
        $img = $_POST['image-blob'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $fileName = $_POST["image-filename"];
        //$uploadDirectory = "uploads/$fileName";

        $uploadDirectory = "../../razsiritve_uploads/";
        //if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory)) {
        //    echo("problem moving uploaded file");
        //}
        $success = file_put_contents($uploadDirectory . $fileName, $data);
        //echo($uploadDirectory)
        print $success ? $file : 'Unable to save the file.';
    }
?>
