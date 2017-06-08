$(document).ready(function(){

  function unselectAllFilters() {
    console.log('Des - seleccionando filtros')
    $('.filter-item').removeClass('active');
  }

  $('.filter-item').click(function(){
    unselectAllFilters();
    $(this).addClass('active');
  });
});
