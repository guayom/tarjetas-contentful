function displayVerMasBtn(state){
  if (state === 'collapsed') {
    $('.ver-mas-beneficios-btn').slideDown();
  } else {
    $('.ver-mas-beneficios-btn').slideUp();
  }
}

function setFiltersHeight(desiredHeight){
  var titleHeight = $('.filter-title').outerHeight();
  var categoryFiltersHeight = $('.category-filters').outerHeight();
  var benefitFiltersHeight = $('.benefit-filters').outerHeight();
  var verMasHeight = $('.ver-mas-beneficios-btn').outerHeight();

  var collapsedHeight = titleHeight + categoryFiltersHeight + verMasHeight;
  var expandedHeight = titleHeight + categoryFiltersHeight + benefitFiltersHeight;

  // Aquí podría haber un tercer valor 'auto' para settear el height cuando se cambia el tamaño de pantalla
  finalHeight = desiredHeight === 'expanded' ? expandedHeight : collapsedHeight;

  $('.filters-container').css('max-height', finalHeight);
  displayVerMasBtn(desiredHeight);
}

$('#css-toggle-menu').change(function(){
  if(this.checked) {
    var desiredHeight = "expanded";
  } else {
    var desiredHeight = "collapsed";
  }
  setFiltersHeight(desiredHeight);
});

$(document).ready(function(){

  setFiltersHeight("collapsed");

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

  //Aparece el cuadro de aeropost
  if(scrollPosition > headerHeight) {
		$("body").addClass('sticky');
		$(".aeropost").addClass('expanded');
	} else{
		$("body").removeClass('sticky');
		$(".aeropost").removeClass('expanded');
	}
});
