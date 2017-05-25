$(document).ready(function(){
  $('.tb-megamenu-item.level-1').hover(function(){
      $(this).find('.dropdown-menu').css('display', 'block');
      }, function(){
      $(this).find('.dropdown-menu').css('display', 'none');
  });

  $('.head-country-selector').click(function(){
    $('.head-side-menu .head-countries').toggleClass('show');
  });

  $('.toggle-topbar a').click(function(){
    console.log('hola');
    $('.top-bar').toggleClass('expanded');
  });
});
