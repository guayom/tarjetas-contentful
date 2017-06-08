$(document).ready(function(){

  //inicializar filtros. Hace que sólo se muestre la fila de tarjetas que tiene la categoría "ninguna"
  $('*[data-category="ninguna"]').show();

  //Funciones para los filtros
  //Esta función hace que se le quite la clase active a todos los filtros
  function unselectAllFilters() {
    $('.filter-item').removeClass('active');
  }

  //Esta función hace que se muestre sólo la fila de tarjetas seleccionada en los filtros
  function filtrarTarjetas (category) {
    $('.card-row').hide();
    $('*[data-category="'+ category +'"]').show();
  }

  function animarHeader () {
    $('.filters-container').removeClass('inicial');
  }

  $('.filter-item').click(function(){
    var category = $(this).data('category');
    unselectAllFilters();
    $(this).addClass('active');
    filtrarTarjetas (category);
    animarHeader();
  });

});
