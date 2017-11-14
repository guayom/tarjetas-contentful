$('#ver-mas-beneficios-btn').change(function(){
  var target = $('.benefit-filters');
  var label = $('.ver-mas-beneficios-btn-label');

  if(this.checked) {
    target.slideDown();
    var labelText = "Ocultar Beneficios";
  } else {
    target.slideUp();
    var labelText = "Ver más beneficios";
  }

  label.text(labelText);
});

$("#hamburger-btn").click(function(){
  $("#ver-mas-beneficios-btn").click();
});

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
    'fast');
  });

  //click para más información
  $(".mas-info-btn").click(function(){
    var tarjeta = $(this).data('tarjeta');
    if ($(this).hasClass( "open" )) {
      var action = 'Ocultar información';
    } else {
      var action = 'Mostrar Información'
    }
    ga('send', 'event', 'lp tarjetas - 2017 v3', action, tarjeta);
    $(this).toggleClass('open');
    $(this).parent().find('div.mas-info-container').toggleClass('open');
  });
  //click para más información con la imagen
  $(".card-image").click(function(){
    $(this).toggleClass('open');
    $(this).parent().find('.mas-info-btn').click();
  });

});

function displayFilters(action, target){
  var targetDiv = $(target);

  if (action === 'collapse') {
    targetDiv.hide();
  } else {
    targetDiv.show();
  }
}

//Sticky menu
$(window).scroll(function() {
	var scrollPosition = $(window).scrollTop();
	var headerHeight = $('.logo-header').outerHeight();
	var filtersHeight = $('.filters-container').outerHeight();
  var bodyPaddingTop = headerHeight + filtersHeight;

  //Aparece el cuadro de aeropost
  if(scrollPosition > (headerHeight + filtersHeight)) {
		$("body").addClass('sticky');
		$(".mobile-menu").addClass('shown');
		$(".aeropost").addClass('expanded');
	} else{
		$("body").removeClass('sticky');
		$(".mobile-menu").removeClass('shown');
		$(".aeropost").removeClass('expanded');
	}
});
