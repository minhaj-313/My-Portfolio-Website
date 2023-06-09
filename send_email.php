<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
