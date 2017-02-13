function getOffsetNav() {
  var $nav = $('.nav-wrap');
  var $navholder = $('.nav-holder');
  var $navTop = $navholder.offset().top;
  $nav.attr('data-offset-top', $navTop);
  $navholder.height($nav.outerHeight());
}

$(document).on('ready', function(){
  getOffsetNav();
  $("a[href^='#section-']").on('click',function(e) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - $('.nav-holder').outerHeight()
      }, 1000);
    }
  });

  $('.main .nav-cards [data-toggle="tab"]').on('click', function(){
    $('.nav-cards [data-toggle="tab"]').removeClass('active');
    $(this).addClass('active');
    $('.nav-cards').toggleClass('nav--is-active');
  });

  $('.secondary-page .nav li a').on('click', function() {
    $('.nav').toggleClass('nav--is-active');
    $('.nav-wrap-btn').toggleClass('nav-wrap-btn--is-active');
  });

  $('.nav-cards [data-toggle="tab"]').on('click', function(){
    // $('.nav-cards [data-toggle="tab"]').removeClass('active');
    // $(this).addClass('active');
    var currentText = $(this).text();
    var currentImg = $('img', this).attr('src');

    $('.tab-active-mobile span').text(currentText);
    $('.tab-active-mobile img').attr('src', currentImg);
    $('.nav-cards').toggleClass('nav--is-active');
    $('.nav-wrap-btn').toggleClass('nav-wrap-btn--is-active');
    $('.nav').toggleClass('nav--is-active');
  });

  $('.tabs-secondary [data-toggle="tab"]').on('click', function(){
    $('.tabs-secondary [data-toggle="tab"]').removeClass('active');
    $(this).addClass('active');
  });

  $('#select-links li a').on('click',function(e) {
    e.preventDefault();
    $('#select-links li a').removeClass('active');
    $(this).addClass('active');
  });
  $('.nav-wrap-btn').on('click', function() {
		$(this).toggleClass('nav-wrap-btn--is-active');
		$('.nav').toggleClass('nav--is-active');
	});

  function breakpointDetect () {
    // console.log(breakpoint.value);
    if (breakpoint.value == 'mobile') {
      if( $('.carousel').length > 0 &&  !$('.carousel').hasClass('slick-initialized')) {

        $('.carousel').slick({
          dots: true,
          arrows: true,
          infinite: true,
          speed: 500,
          cssEase: 'linear'
        });
      }
      getOffsetNav();
    }

    if (breakpoint.value == 'tablet') {
      // console.log("unslick");
      if($('.carousel.slick-initialized').length > 0) {
        $('.carousel').slick('unslick');
      }
    }

  }

  var breakpoint = {};
  breakpoint.refreshValue = function () {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  };

  $(window).on('resize', function () {
    breakpoint.refreshValue();
    breakpointDetect();
    getOffsetNav();
  }).resize();

  var stickyNav = function(){
    var stickyNavTop = $('.nav-wrap').attr('data-offset-top');
    var scrollTop = $(window).scrollTop();

    if (scrollTop > stickyNavTop) {
      $('.nav-wrap').addClass('affix');
    } else {
      $('.nav-wrap').removeClass('affix');
    }
  };

  stickyNav();

  function isScrolledIntoView(el) {
      var elemTop = el.getBoundingClientRect().top;
      var elemBottom = el.getBoundingClientRect().bottom;
      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      return isVisible;
  }

  $(window).on('scroll',function() {
    stickyNav();
    $('[data-section]').each(function(index) {
      var top = $(window).scrollTop(),
      divBottom = $(this).offset().top + $(this).outerHeight();
      if (divBottom > top) {
        if( $(document).scrollTop() > $(this).offset().top  - ($('.nav-holder').outerHeight() + 5) )  {
          console.log("view " + (index + 1) );
          $('.nav-cards li').removeClass('active');
          $($('.nav-cards li')[index]).addClass('active');
        }
      }
    });
  });

  $('.toggle-link').click(function(){
    var categoria = $(this).data('categoria');
    var link = $(this).data('link');
    console.log(link);
    $('#boton-'+categoria).attr('href', link);
  });

});
