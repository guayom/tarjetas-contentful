$(document).ready(function(){
	$('.hamburger').click(function(){
		$(this).toggleClass('open');
	});
	$('.search').click(function(){
		$('.search-form').slideToggle();
	});
});
