<?php
try {
    if (isset($_POST['submit'])) {
        if (preg_match('/\.bad$|\.exe$|\.vbs$|\.pl$/', basename($_FILES['uploadedfile']['name'])) < 1) {
            // Where the file is going to be placed
            $path = $_POST['path'];
            $target_path = $path;
            $target_path = $target_path . basename($_FILES['uploadedfile']['name']);
            if (file_exists($target_path)) {
                @unlink($target_path);
            }
            if (true /* move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path) */) {
                $r = "fake upload success !!";
            } else {
                if (!file_exists($path)) {
                    $r = "<b>Directory $path nicht gefunden </b>";
                } else {
                    $r = "<b>Fehler beim laden (Datei größer 100KB ??); bitte nochmals versuchen</b>";
                }
            }
        } else {
            $r = "<b>Datein diesen Typs werden nicht hochgeladen</b>";
        }
    } else {
        $r = "HILFE";
    }
} catch (ErrorException $e) {
    $r = $e->getMessage();
}
echo $r;
