<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // set recipient email address
  $to = "sdeminhaj@gmail.com";
  
  // get form data
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  
  // set email headers
  $headers = "From: " . $name . " <" . $email . ">\r\n";
  $headers .= "Reply-To: " . $email . "\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
  
  // send email
  $subject = "New message from " . $name;
  $body = "Name: " . $name . "\r\nEmail: " . $email . "\r\nMessage:\r\n" . $message;
  $success = mail($to, $subject, $body, $headers);
  
  if ($success) {
    http_response_code(200);
    echo "Message sent successfully!";
  } else {
    http_response_code(500);
    echo "Error sending message. Please try again later.";
  }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Send email
    $to = "shaikhminhaj.dev@gmail.com";
    $subject = "New Contact Form Submission";
    $body = "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Message: " . $message . "\n";
    $headers = "From: " . $email;
    
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your message. We'll be in touch shortly.";
    } else {
        echo "Sorry, something went wrong. Please try again later.";
    }

}
?>
