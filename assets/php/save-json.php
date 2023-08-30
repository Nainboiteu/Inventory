<?php
$data = $_POST['jsonData'];
$filename = $_POST['filename'];
error_log("PHP Triggered", 0);

if ($data && $filename) {
    error_log("if1!", 0);
  $grandparentDirectory = dirname(dirname(__DIR__));// Get the grandparent directory
  $filePath = $grandparentDirectory . '/db/' . $filename;

  if (file_exists($filePath)) {
      error_log("file exists", 0);
      chmod($filePath, 0755);
    // Rename the existing file by appending the timestamp
    $timestamp = time();
    $newFilename = pathinfo($filename, PATHINFO_FILENAME) . '_' . $timestamp . '.' . pathinfo($filename, PATHINFO_EXTENSION);
    $newFilePath = $grandparentDirectory . '/db/' . $newFilename;
    //copy($filePath,$newFilePath);
    rename($filePath, $newFilePath);
  }

  $result = file_put_contents($filePath, $data);
  error_log("result", 0);
  error_log($result, 0);

  if ($result !== false) {
    $response = array('success' => true, 'message' => 'JSON data saved successfully');
  } else {
    $response = array('success' => false, 'message' => 'Error saving JSON data');
  }
} else {
  $response = array('success' => false, 'message' => 'No JSON data or filename received');
}

header('Content-Type: application/json');
echo json_encode($response);
?>
