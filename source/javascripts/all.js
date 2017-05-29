$(document).ready(function(){
  $('.tb-megamenu-item.level-1').hover(function(){
      $(this).find('.dropdown-menu').css('display', 'block');
      $(this).find('.dropdown-menu .dropdown-menu').css('display', 'none');
      }, function(){
      $(this).find('.dropdown-menu').css('display', 'none');
  });

  $('.head-country-selector').click(function(){
    $('.head-side-menu .head-countries').toggleClass('show');
  });

  $('.toggle-topbar a').click(function(){
    $('.top-bar').toggleClass('expanded');
  });

  $('.header-select-country').change(function(){
    window.location.replace("https://www.baccredomatic.com/" + $(this).val())
  });

  $('.footer-list-head').click(function(){
    $('.footer-list').hide();
    $(this).siblings().toggle();
  });
});
