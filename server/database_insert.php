 <?php
 //echo "vnasan podatke";
include 'database_credentials.php';


if (isset($_POST['predpona'])){
        $predpona = $_POST['predpona'];
        //$cas = $_POST['cas'];
         $cas = date( "Y-m-d H:i:s", strtotime($_POST['cas']) );
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO aktivnost (cas, predpona)
        VALUES ( '$cas', '$predpona')";
        /*$sql = "INSERT INTO aktivnost (cas, predpona)
                VALUES ( NOW(), $predpona)";*/

        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();

    }
?> 