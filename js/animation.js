$(document).ready(function () {
	var all = $(".project");
	show(0);

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


// interest
var timer;
const NUMBER_BADGES = 8;
const url = [
	'http://www.the-fanboy-perspective.com/uploads/1/7/3/8/17382151/rgfesdgfes_orig.jpg',
	'https://wallpaperscraft.com/image/liverpool_uefa_evrofinal_england_cup_27760_1920x1080.jpg',
	'http://wallpapersdota2.com/wp-content/uploads/2015/02/wallpapersdota2.com-699.jpg',
	'http://stuffpoint.com/dragonball-z-anime/image/114886-dragonball-z-anime-goku-wallpaper.jpg'
]

function set(dot, highlight) {
	dot.style.backgroundColor = highlight ? "white" : "black";
	dot.style.color = highlight ? "black" : "#D4D4D4";
}

function show(n) {
	clearTimeout(timer);
	var dots = $(".badge");

	for (let i = 0; i < dots.length; i = i + 2) {
		set(dots[i], false);
	}

	$('#interest').css('background-image', 'url(' + url[n] + ')');
	set(dots[n * 2], true);

	timer = setTimeout(function () {
		show(n == dots.length / 2 - 1 ? 0 : ++n)
	}, 2000);
}