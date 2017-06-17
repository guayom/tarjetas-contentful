$(document).ready(function(){

	$('.hamburger').click(function(){
		$(this).toggleClass('open');
		$('.hamburger-container').toggleClass('open');
		$('.offcanvas').toggleClass('shown');
	});

	$('#explora-mas-header-btn').click(function(){
		$('.hamburger').click();
	});

	$('.search').click(function(){
		$('.search-form').slideToggle();
	});

	//Animación para el botón de ver más productoa
	$("#explora-btn-footer").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });
		$(this).toggle();
	});

	//Quitar el botón de scroll si ya el usuario está abajo
	$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $("#explora-btn-footer").hide();
   }
	});
});
