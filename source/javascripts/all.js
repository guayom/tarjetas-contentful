$(document).ready(function(){

  function unselectAllFilters() {
    $('.filter-item').removeClass('active');
  }

  function filtrarTarjetas (category) {
    $('.card-row').hide();
    $('*[data-category="'+ category +'"]').show();
  }

  $('.filter-item').click(function(){
    var category = $(this).data('category');
    unselectAllFilters();
    $(this).addClass('active');
    filtrarTarjetas (category);
  });

  //inicializar filtros
  $('*[data-category="ninguna"]').show();
});
