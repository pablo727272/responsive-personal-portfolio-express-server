console.log('hello from /js/main.js');

$(document).ready(function() { // begin jQuery
    console.log( "jQuery ready!" )


    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

// SMOOTH SCROLLING...  DOESN'T WORK WITHOUT "BLINKING" WHEN SCROLLED TO #
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
      }, 1000, function() {
          // Callback after animation - REMOVED NOT WORKING WITHOUT "FLASHING REFRESH ERROR"
          // Must change focus!
        //   var $target = $(target);
        //   $target.focus();
        //   if ($target.is(":focus")) { // Checking if the target was focused
        //     return false;
        //   } else {
        //     $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
        //     $target.focus(); // Set focus again
        //   };
        });
      }
    }
  });

}) //end jQuery
