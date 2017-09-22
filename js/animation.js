$(document).ready(function () {
	var all = $(".project");
	showDivs(slideIndex);

	$(".project-name").hover(function () {
		var index = $(".project-name").index(this);
		$("#projects p").css('opacity', '0.2');
		all[index].style.opacity = 1;
		all[index].style.backgroundColor = '#0B0B0B';
		$("#projects").css('background-image', 'url(' + "img/projects/" + $(this).html().toLowerCase() + ".jpg)");
	}, function () {
		$("#projects p").css('opacity', '1');
		$("#projects p").css('background-color', 'transparent');
		$("#projects").css('background-image', 'none');
	});

	$(".nav-bar ul li").click(function () {
		var pos = '';
		var x = -30;
		switch ($(this).prevAll().length) {
			case 0:
				pos = "#banner";
				break;
			case 1:
				pos = "#timeline";
				break;
			case 2:
				pos = "#interest";
				x = 130;
				break;
			case 3:
				x = 0;
				pos = "#projects";
				break;
		}
		$('html, body').animate({
			'scrollTop': $(pos).position().top - x
		});

	});
});

var slideIndex = 1;
var timer;
var firsttime = true;

function plusDivs(n) {
	showDivs(slideIndex += n);
}

function currentDiv(n) {
	showDivs(slideIndex = n);
}

function showDivs(n) {
	clearTimeout(timer);
	var i;
	var x = $(".mySlides");
	var dots = $(".badge");
	if (n > x.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = x.length;
	}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i = i + 2) {
		dots[i].style.backgroundColor = "black";
		dots[i].style.color = "#D4D4D4";
	}
	x[slideIndex - 1].style.display = "block";
	$('#interest').css('background-image', 'url(' + x[slideIndex - 1].getAttribute("src") + ')');
	dots[slideIndex * 2 - 2].style.backgroundColor = "white";
	dots[slideIndex * 2 - 2].style.color = "black";

	timer = setTimeout(function () {
		plusDivs(1);
	}, 2000);
}