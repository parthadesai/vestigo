//POTENZA var

(function ($) {
  "use strict";
  var POTENZA = {};

/*************************
  Predefined Variables
*************************/
  var $window = $(window),
    $document = $(document),
    $body = $('body'),
    $countdownTimer = $('.countdown'),
    $counter = $('.counter');
  //Check if function exists
  $.fn.exists = function () {
    return this.length > 0;
  };


/*************************
         Sticky
*************************/
POTENZA.isSticky = function () {
  $(window).on('scroll',function(event) {
        var scroll = $(window).scrollTop();
        if (scroll < 300) {
            $(".header").removeClass("sticky-top");
        }else{
            $(".header").addClass("sticky-top");
        }
    });
};

/*************************
    Secondary Sticky
*************************/
POTENZA.secondarySticky = function () {
  $(window).on('scroll',function(event) {
        var scroll = $(window).scrollTop();
        if (scroll < 500) {
            $(".header-inner-nav").removeClass("page-menu-top");
        }else{
            $(".header-inner-nav").addClass("page-menu-top");
        }
        console.log($('div').hasClass('header-inner-nav'));
        if( $('div').hasClass('header-inner-nav') ) {
          var div_height = 90 + $('.header-inner-nav').height();
          $('.is-sticky').css('top',div_height);
        } else{
          $('.is-sticky').css('top','80px');
        }
    });

	$( document ).on( 'click', '.header-inner-nav .nav-item a', function(){
		$('.header-inner-nav .nav-item a').removeClass('active');
		$(this).addClass('active');
    });
	$( document ).on( 'click', '.header-inner-nav .nav-item a', function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top-120
        }, 1000);
        return false;
    });
};

/*************************
    Menu
*************************/
POTENZA.dropdownmenu = function () {
  if ($('.navbar').exists()) {
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');
      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass("show");
      });
      return false;
    });
  }
};

/*************************
      Tooltip
*************************/
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover()

/*************************
       Counter
*************************/
  POTENZA.counters = function () {
    var counter = jQuery(".counter");
    if (counter.length > 0) {
      $counter.each(function () {
        var $elem = $(this);
        $elem.appear(function () {
          $elem.find('.timer').countTo({
            onComplete: function() {
              setTimeout(function(){
                jQuery('.timer').countTo('restart');
              }, 100);
            }
          });
        });
      });
    }
  };

/*************************
       Owl Carousel
*************************/
  POTENZA.carousel = function () {
    var owlslider = jQuery("div.owl-carousel");
    if (owlslider.length > 0) {
      owlslider.each(function () {
        var $this = $(this),
          $items = ($this.data('items')) ? $this.data('items') : 1,
          $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
          $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
          $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
          $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
          $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
          $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
          $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
          $space = ($this.attr('data-space')) ? $this.data('space') : 30,
          $animateOut = ($this.attr('data-animateOut')) ? $this.data('animateOut') : false;

        $(this).owlCarousel({
          loop: $loop,
          items: $items,
          responsive: {
            0: {
              items: $this.data('xx-items') ? $this.data('xx-items') : 1
            },
            480: {
              items: $this.data('xs-items') ? $this.data('xs-items') : 1
            },
            768: {
              items: $this.data('sm-items') ? $this.data('sm-items') : 2
            },
            980: {
              items: $this.data('md-items') ? $this.data('md-items') : 3
            },
            1200: {
              items: $items
            }
          },
          dots: $navdots,
          autoplayTimeout: $autospeed,
          smartSpeed: $smartspeed,
          autoHeight: $autohgt,
          margin: $space,
          nav: $navarrow,
          navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
          autoplay: $autoplay,
          autoplayHoverPause: true
        });
      });
    }
  }

  /*************************
      Magnific Popup
  *************************/
  POTENZA.mediaPopups = function () {
    if ($(".popup-single").exists() || $(".popup-gallery").exists() || $('.modal-onload').exists() || $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
      if ($(".popup-single").exists()) {
        $('.popup-single').magnificPopup({
          type: 'image'
        });
      }
      if ($(".popup-gallery").exists()) {
        $('.popup-gallery').magnificPopup({
          delegate: 'a.portfolio-img',
          type: 'image',
          tLoading: 'Loading image #%curr%...',
          mainClass: 'mfp-img-mobile',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
          }
        });
      }
      if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      }
      var $modal = $('.modal-onload');
      if ($modal.length > 0) {
        $('.popup-modal').magnificPopup({
          type: 'inline'
        });
        $(document).on('click', '.popup-modal-dismiss', function (e) {
          e.preventDefault();
          $.magnificPopup.close();
        });
        var elementTarget = $modal.attr('data-target');
        setTimeout(function () {
          $.magnificPopup.open({
            items: {
              src: elementTarget
            },
            type: "inline",
            mainClass: "mfp-no-margins mfp-fade",
            closeBtnInside: !0,
            fixedContentPos: !0,
            removalDelay: 500
          }, 0)
        }, 1500);
      }
    }
  }

/*************************
       Countdown
*************************/
  POTENZA.countdownTimer = function () {
    if ($countdownTimer.exists()) {
      $countdownTimer.downCount({
        date: '12/25/2020 12:00:00', // Month/Date/Year HH:MM:SS
        offset: -4
      });
    }
  }

/*************************
   SwiperAnimation
*************************/
POTENZA.swiperAnimation = function () {
  var siperslider = jQuery(".swiper-container");
  if (siperslider.length > 0) {
    var swiperAnimation = new SwiperAnimation();
        var swiper = new Swiper(".swiper-container", {
          init : true,
          autoplay: true,
          direction: "horizontal",
          effect: "slide",
          loop: true,

          keyboard: {
            enabled: true,
            onlyInViewport: true
          },
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          on: {
            init: function() {
              swiperAnimation.init(this).animate();
            },
            slideChange: function() {

              swiperAnimation.init(this).animate();
            }
          }
        });
    }
  }

/*************************
       Typer
*************************/
POTENZA.typer = function () {
  if ($('.typer').exists()) {
    }
};

/*************************
       Search
*************************/
POTENZA.searchbox = function () {
   if (jQuery('.search').exists()) {
      jQuery('.search-btn').on('click', function () {
         jQuery('.search').toggleClass("search-open");
           return false;
          });
       jQuery("html, body").on('click', function (e) {
        if (!jQuery(e.target).hasClass("not-click")) {

             jQuery('.search').removeClass("search-open");
         }
     });
    }
}

/*************************
    Shuffle
*************************/
   POTENZA.shuffle = function () {
    if (jQuery('.my-shuffle-container').exists()) {
    var Shuffle = window.Shuffle;
      var element = document.querySelector('.my-shuffle-container');
      var sizer = element.querySelector('.my-sizer-element');

      var shuffleInstance = new Shuffle(element, {
        itemSelector: '.grid-item',
        sizer: sizer, // could also be a selector: '.my-sizer-element'
        speed: 700,
        columnThreshold: 0
      });
      jQuery(document).ready(function(){
		jQuery( document ).on( 'click', '.btn-filter', function(){
          var data_group = jQuery(this).attr('data-group');
          if( data_group != 'all' ){
            shuffleInstance.filter([data_group]);
          } else {
            shuffleInstance.filter();
          }
        });
      });
    }
 }

/*************************
    Pricing Tabs
*************************/
POTENZA.pricingtabs = function () {
    jQuery('.pricing-tab-switcher').on('click', function() {
      jQuery(this).toggleClass('active');
      jQuery('.pricing-price').toggleClass('change-pricing-price');
    });
  }

/*************************
     Back to top
*************************/
  POTENZA.goToTop = function () {
    var $goToTop = $('#back-to-top');
    $goToTop.hide();
    $window.scroll(function () {
      if ($window.scrollTop() > 100) $goToTop.fadeIn();
      else $goToTop.fadeOut();
    });
    $goToTop.on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  }


/*************************
     Contact Form
*************************/
  // POTENZA.contactForm = function () {
  //           var contactmessageForm = jQuery('#contact-form');
  //         if (contactmessageForm.length) {
  //             contactmessageForm.validate({
  //                 rules: {
  //                     InputName: {
  //                         required: true,
  //                         maxlength: 50,
  //                     },
  //                     InputEmail: {
  //                         required: true,
  //                         email: true,
  //                         maxlength: 50,
  //                     },
  //                     InputContact: {
  //                         required: true,
  //                         digits: true,
  //                         minlength: 10,
  //                         maxlength: 12,
  //                     }
  //                 }, //end rules
  //                 messages: {
  //                     InputName: {
  //                         required: "Please enter name",
  //                         maxlength: "Your last name maxlength should be 50 characters long."
  //                     },
  //                     InputEmail: {
  //                         required: "Please enter valid email",
  //                         email: "Please enter valid email",
  //                         maxlength: "The email name should less than or equal to 50 characters",
  //                     },
  //                     InputContact: {
  //                         required: "Please enter contact",
  //                         minlength: "The contact should not be less than 10 digits",
  //                         digits: "Please enter only numbers",
  //                         maxlength: "The contact should not be more than 12 digits",
  //                     },
  //                 }, //end message
  //                 submitHandler: function (form) {
  //                     //e.preventDefault();
  //                     jQuery('#submit-contact').html('Sending...');
  //                     var user_name = jQuery("#InputName").val();
  //                     var user_email = jQuery("#InputEmail").val();
  //                     var user_contact = jQuery("#InputContact").val();
  //                     var user_subject = jQuery("#InputSubject").val();
  //                     var user_message = jQuery("#InputMessage").val();

  //                         var formDatanew = new FormData();
  //                             formDatanew.append("InputName", user_name);
  //                             formDatanew.append("InputEmail", user_email);
  //                             formDatanew.append("InputContact", user_contact);
  //                             formDatanew.append("InputSubject", user_subject);
  //                             formDatanew.append("InputMessage", user_message);
  //                     jQuery.ajax({
  //                         url: 'vendor/contact-process.php',
  //                         type: "POST",
  //                         data: formDatanew,
  //                         contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
  //                         processData: false,
  //                         dataType: "json",
  //                         success: function (data) {
  //                             var msgAlert = 'alert-' + data.type,
  //                                 msgText = data.message;

  //                             var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
  //                             if (msgAlert && msgText) {
  //                                 jQuery('#res_message').html(alertBox);
  //                                 jQuery(contactmessageForm)[0].reset();
  //                                 jQuery('#submit-contact').html('Send message');
  //                                 setTimeout(function () {
  //                                     jQuery('#res_message').find('.alert').remove();
  //                                 }, 10000);
  //                             }
  //                         }
  //                     });
  //                 }
  //             });
  //         }
  // }

    // POTENZA.contactFormnew = function () {
  //     var contactmessageForm = jQuery('#contact-form');
  //       if (contactmessageForm.length) {
  //         contactmessageForm.validate({
  //           rules: {
  //               InputName: {
  //                   required: true,
  //                   maxlength: 50,
  //               },
  //               InputEmail: {
  //                   required: true,
  //                   email: true,
  //                   maxlength: 50,
  //               },
  //               InputContact: {
  //                   required: true,
  //                   digits: true,
  //                   minlength: 10,
  //                   maxlength: 12,
  //               }
  //           }, //end rules
  //           messages: {
  //               InputName: {
  //                   required: "Please enter name",
  //                   maxlength: "Your last name maxlength should be 50 characters long."
  //               },
  //               InputEmail: {
  //                   required: "Please enter valid email",
  //                   email: "Please enter valid email",
  //                   maxlength: "The email name should less than or equal to 50 characters",
  //               },
  //               InputContact: {
  //                   required: "Please enter contact",
  //                   minlength: "The contact should not be less than 10 digits",
  //                   digits: "Please enter only numbers",
  //                   maxlength: "The contact should not be more than 12 digits",
  //               },
  //           }, //end message
  //           submitHandler: function (form) {
  //               //e.preventDefault();
  //               var data1={
  //                   name: $("#InputName").val(),
  //                   emailad: $("#InputEmail").val(),
  //                   phone: $("#InputContact").val(),
  //                   description:$("#InputMessage").val()
  //               }
  //               jQuery.ajax({
  //                   url: "https://covid.pibl.net/api/values",
  //                   type: "POST",
  //                   data: JSON.stringify(data1),
  //                   headers: {
  //                   "Content-Type": "application/json"
  //                   },
  //                   success: function addCell(data) {
  //                     var msgAlert = 'alert-' + data.type,
  //                       msgText = data.message;

  //                     var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
  //                     if (msgAlert && msgText) {
  //                         jQuery('#res_message').html(alertBox);
  //                         jQuery(contactmessageForm)[0].reset();
  //                         jQuery('#submit-contact').html('Send message');
  //                         setTimeout(function () {
  //                             jQuery('#res_message').find('.alert').remove();
  //                         }, 10000);
  //                     }
  //                   }
  //               });
  //           }
  //         });
  //       }
  // }


        $("#submit").click(function() {
	 $('body,html').animate({
	 scrollTop: 0
	 }, 1000);
         $("#formloader").show();
	 $("#cformopacity").css('opacity','0.5');
	 
         var data1={
         name: $("#InputName").val(),
         emailad: $("#InputEmail").val(),
         phone: $("#InputContact").val(),
         description:$("#InputMessage").val()
         
         }
         if($("#InputName").val() !="" && $("#InputEmail").val()!="" && $("#InputMessage").val()!=""){
         $.ajax({
         url: "https://covid.pibl.net/api/values",
         type: "POST",
         data: JSON.stringify(data1),
         headers: {
         "Content-Type": "application/json"
         },
         success: function addCell(data) {
         alert("Thank you for connecting Prudent !! We will get back to you.");
         console.log(data);
	 $("#cformopacity").css('opacity','1');
	 $("#formloader").hide();
         }
         })
         }
         else{alert("Please provide require details.");
 	 $("#cformopacity").css('opacity','1');
	 $("#formloader").hide();
	 }
         
         })




/*************************
     Whitepapers
*************************/
POTENZA.whitepaperForm = function () {
          var whitepaperForm1 = jQuery('#whitepaper-form1');
          if (whitepaperForm1.length) {
              whitepaperForm1.validate({
                  rules: {
                      email: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#whitepaper-submit1').html('Sending...');
                      var user_email = jQuery("#email").val();

                          var formDatanew = new FormData();
                              formDatanew.append("email", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=paper_form1',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#res_message').html(alertBox);
                                  jQuery(whitepaperForm1)[0].reset();
                                  jQuery('#whitepaper-submit1').html('Send message');
                              }
                          }
                      });
                  }
              });
          }

          var whitepaperForm2 = jQuery('#whitepaper-form2');
          if (whitepaperForm2.length) {
              whitepaperForm2.validate({
                  rules: {
                      email2: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email2: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#whitepaper-submit2').html('Sending...');
                      var user_email = jQuery("#email2").val();

                          var formDatanew = new FormData();
                              formDatanew.append("email2", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=paper_form2',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#res_message2').html(alertBox);
                                  jQuery(whitepaperForm2)[0].reset();
                                  jQuery('#whitepaper-submit2').html('Send message');
                              }
                          }
                      });
                  }
              });
          }

          var whitepaperForm3 = jQuery('#whitepaper-form3');
          if (whitepaperForm3.length) {
              whitepaperForm3.validate({
                  rules: {
                      email3: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email3: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#whitepaper-submit3').html('Sending...');
                      var user_email = jQuery("#email3").val();

                          var formDatanew = new FormData();
                              formDatanew.append("email3", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=paper_form3',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#res_message3').html(alertBox);
                                  jQuery(whitepaperForm3)[0].reset();
                                  jQuery('#whitepaper-submit3').html('Send message');
                              }
                          }
                      });
                  }
              });
          }

          var whitepaperForm4 = jQuery('#whitepaper-form4');
          if (whitepaperForm4.length) {
              whitepaperForm4.validate({
                  rules: {
                      email4: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email4: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#whitepaper-submit4').html('Sending...');
                      var user_email = jQuery("#email4").val();

                          var formDatanew = new FormData();
                              formDatanew.append("email4", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=paper_form4',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#res_message4').html(alertBox);
                                  jQuery(whitepaperForm4)[0].reset();
                                  jQuery('#whitepaper-submit4').html('Send message');
                              }
                          }
                      });
                  }
              });
          }

          var whitepaperForm5 = jQuery('#whitepaper-form5');
          if (whitepaperForm5.length) {
              whitepaperForm5.validate({
                  rules: {
                      email5: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email5: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#whitepaper-submit5').html('Sending...');
                      var user_email = jQuery("#email5").val();

                          var formDatanew = new FormData();
                              formDatanew.append("email5", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=paper_form5',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#res_message5').html(alertBox);
                                  jQuery(whitepaperForm5)[0].reset();
                                  jQuery('#whitepaper-submit5').html('Send message');
                              }
                          }
                      });
                  }
              });
          }

          var whitepaperForm6 = jQuery('#whitepaper-form6');
          if (whitepaperForm6.length) {
              whitepaperForm6.validate({
                  rules: {
                      email6: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email6: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#whitepaper-submit6').html('Sending...');
                      var user_email = jQuery("#email6").val();

                          var formDatanew = new FormData();
                              formDatanew.append("email6", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=paper_form6',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#res_message6').html(alertBox);
                                  jQuery(whitepaperForm6)[0].reset();
                                  jQuery('#whitepaper-submit6').html('Send message');
                              }
                          }
                      });
                  }
              });
          }
  }


/*************************
     Research & Findings
*************************/
POTENZA.researchForm = function () {
            var researchForm1 = jQuery('#research-form1');
          if (researchForm1.length) {
              researchForm1.validate({
                  rules: {
                      email1: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email2: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#research-submit1').html('Sending...');
                      var user_email = jQuery("#email1").val();
                      
                          var formDatanew = new FormData();
                              formDatanew.append("email1", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=research_covid_plan',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#covid_plan_res_message').html(alertBox);
                                  jQuery(researchForm1)[0].reset();
                                  jQuery('#research-submit1').html('Send message');
                              }
                          }
                      });
                  }
              });
          }

          var researchForm2 = jQuery('#research-form2');
          if (researchForm2.length) {
              researchForm2.validate({
                  rules: {
                      email2: {
                          required: true,
                          email: true,
                          maxlength: 50,
                      }
                  }, //end rules
                  messages: {
                      email2: {
                          required: "Please enter valid email",
                          email: "Please enter valid email",
                          maxlength: "The email name should less than or equal to 50 characters",
                      },
                  }, //end message
                  submitHandler: function (form) {
                      //e.preventDefault();
                      jQuery('#research-submit2').html('Sending...');
                      var user_email = jQuery("#email2").val();

                          var formDatanew = new FormData();
                              formDatanew.append("email2", user_email);
                      jQuery.ajax({
                          url: 'vendor/whitepaper-process.php?method=research_survey_report',
                          type: "POST",
                          data: formDatanew,
                          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                          processData: false,
                          dataType: "json",
                          success: function (data) {
                              var msgAlert = 'alert-' + data.type,
                                  msgText = data.message;

                              var alertBox = '<div id="form-result" class="alert ' + msgAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msgText + '</div>';
                              if (msgAlert && msgText) {
                                  jQuery('#survey_report_res_message').html(alertBox);
                                  jQuery(researchForm2)[0].reset();
                                  jQuery('#research-submit2').html('Send message');
                              }
                          }
                      });
                  }
              });
          }
  }

/****************************************************
     Preloader
****************************************************/
POTENZA.webLoader = function () {
function hideLoader() {
        $('#loader').fadeOut();
      }
      // Strongly recommended: Hide loader after 20 seconds, even if the page hasn't finished loading
      setTimeout(hideLoader, 5 * 1000);
    }


/****************************************************
     Legacy
****************************************************/
var animations = [
    {
        // Activate the second step, circle #2
        time:5000,
        step:"step-2",
        selector:'.circle'
    },
    {
        // Activate the third step
        time:3000,
        step:"step-3",
        selector:'.circle'
    },
    {
        // Activate the fourth step
        time:3000,
        step:"step-4",
        selector:'.circle'
    },
    {
        // Activate the fifth step
        time:3000,
        step:"step-5",
        selector:'.circle'
    }
];


POTENZA.animationTimeline = function () {

    function runAnimation(i, timeline){
      setTimeout(function(){
          $(animations[i].selector).addClass(animations[i].step);
      }, timeline);
    }

    var timeline = 0;

    for(var i=0; i<animations.length; i++){
        // for each step in the animation array
        // update timeline to be value of animations[i].time PLUS previous timeline value
        timeline = parseInt(animations[i].time, 10) + parseInt(timeline, 10);
        runAnimation(i, timeline);
    }
}

// Restart the animation
$('#restart').click(function(){
    $('.circle').removeClass("step-2 step-3 step-4 step-5");
    POTENZA.animationTimeline();
});

/****************************************************
     POTENZA Window load and functions
****************************************************/

  //Window load functions
  $window.on("load", function () {
    POTENZA.shuffle();
    POTENZA.animationTimeline();
  });

  //Document ready functions
  $document.ready(function () {
    POTENZA.webLoader(),
    POTENZA.isSticky(),
    POTENZA.secondarySticky(),
    POTENZA.counters(),
    POTENZA.dropdownmenu(),
    POTENZA.goToTop(),
    POTENZA.countdownTimer(),
    POTENZA.mediaPopups(),
    POTENZA.pricingtabs(),
    POTENZA.carousel(),
    POTENZA.swiperAnimation(),
    POTENZA.searchbox(),
    //POTENZA.contactFormnew(),
    POTENZA.whitepaperForm(),
    POTENZA.researchForm(),
    POTENZA.typer();
  });


})(jQuery);