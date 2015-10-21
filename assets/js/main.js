var headerHeight = $(window).height();
var headerPresentation = (( $(window).height() ) / 2) - 100;
var headerArrow = $(window).height() - 100;

$(document).ready(function () {
    $(".main-nav").css("height", headerHeight);
    $(".main-nav--presentation").css("margin-top", headerPresentation);
    $(".main-nav--arrow").css("margin-top", headerArrow);

    $('a[href^="#"]').click(function(){
    	var the_id = $(this).attr("href");

    	$('html, body').animate({
    		scrollTop:$(the_id).offset().top
    	}, 'slow');
    	return false;
    });
})
