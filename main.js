/* ============================================ */
/* -------- Developed By : Shaikh Minhaj ------ */
/* ============================================ */

const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav__link");

hamburger.addEventListener("click", () => {
    navLink.classList.toggle("hide");
});

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 180 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 180;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-rotate");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

Resources;

function visible(partial) {
    var $t = partial,
        $w = jQuery(window),
        viewTop = $w.scrollTop(),
        viewBottom = viewTop + $w.height(),
        _top = $t.offset().top,
        _bottom = _top + $t.height(),
        compareTop = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

}

$(window).scroll(function () {

    if (visible($('.count-digit'))) {
        if ($('.count-digit').hasClass('counter-loaded')) return;
        $('.count-digit').addClass('counter-loaded');

        $('.count-digit').each(function () {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 5000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
    }
})


$(document).on("click", '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});


// contact form js

const form = document.querySelector('#contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent form from submitting normally

  const formData = new FormData(form); // get form data
  const xhr = new XMLHttpRequest(); // create new XMLHttpRequest object
  
  xhr.open('POST', 'send_email.php'); // set endpoint
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  xhr.onload = function() { // handle response from server
    if (xhr.status === 200) {
      alert('Message sent successfully!');
      form.reset(); // clear form
    } else {
      alert('Error sending message. Please try again later.');
    }
  };
  
  xhr.send(new URLSearchParams(formData).toString()); // send data as URL encoded string
});
