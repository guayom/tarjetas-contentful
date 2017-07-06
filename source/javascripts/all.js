$(document).ready(function(){

  //inicializar filtros. Hace que sólo se muestre la fila de tarjetas que tiene la categoría "ninguna"
  $('*[data-category="ninguna"]').show();

  //Funciones para los filtros
  //Esta función hace que se le quite la clase active a todos los filtros
  function unselectAllFilters() {
    $('.filter-item, .mobile-menu-selector').removeClass('active');
  }

  //Esta función hace que se muestre sólo la fila de tarjetas seleccionada en los filtros
  function filtrarTarjetas (category) {
    $('.card-row').hide();
    $('*[data-category="'+ category +'"]').show();
  }

  function animarHeader () {
    $('.filters-container').removeClass('inicial');
  }

  $('.filter-item, .mobile-menu-selector').click(function(){
    var category = $(this).data('category');
    unselectAllFilters();
    $('*[data-category="'+ category +'"]').addClass('active');
    filtrarTarjetas (category);
    animarHeader();

  	var headerHeight = $('.logo-header').outerHeight();
  	var filtersHeight = $('.filters-container').outerHeight();
    var mobileMenuHeight = $('.mobile-menu').outerHeight();
    $('html,body').animate({
    scrollTop: ((headerHeight + filtersHeight) - mobileMenuHeight + 5)+'px'},
    'slow');
  });

  //click para más información
  $(".mas-info-btn").click(function(){
    $(this).toggleClass('open');
    $(this).parent().find('div.mas-info-container').toggleClass('open');
  });
  //click para más información con la imagen
  $(".card-image").click(function(){
    $(this).toggleClass('open');
    $(this).parent().find('.mas-info-btn').click();
  });

});

//Sticky menu
$(window).scroll(function() {
	var scrollPosition = $(window).scrollTop();
	var headerHeight = $('.logo-header').outerHeight();
	var filtersHeight = $('.filters-container').outerHeight();
	var mobileMenuHeight = $('.mobile-menu').outerHeight();
	if(scrollPosition > ((headerHeight + filtersHeight) - mobileMenuHeight)) {
		$("body").addClass('sticky');
	} else{
		$("body").removeClass('sticky');
	}
});
