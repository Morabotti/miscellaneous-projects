$(document).ready(function() {
	'use strict';
	$('#logo').css('opacity',0).animate({opacity:1}, 800, function(){
		$('#buttoncommunity').css('opacity',0).animate({opacity:1}, 700, function(){
			$('#buttonrace').css('opacity',0).animate({opacity:1}, 600);
			$('#buttonitem').css('opacity',0).animate({opacity:1}, 600);
			$('#buttonhowtoplay').css('opacity',0).animate({opacity:1}, 600);
			$('#middlesection').css('opacity',0).animate({opacity:1}, 600, function(){
				$('#content-under').css('opacity',0).animate({opacity:1}, 600);
			});
		});
	});
	
	$("#buttoncommunity").click(function(){
		$('#buttonrace').css('opacity',1).animate({opacity:0}, 300);
		$('#buttonitem').css('opacity',1).animate({opacity:0}, 300);
		$('#buttonhowtoplay').css('opacity',1).animate({opacity:0}, 300);
		$('#logo').css('opacity',1).animate({opacity:0}, 300);
		$('#middlesection').css('opacity',1).animate({opacity:0}, 300);
		$('#content-under').css('opacity',1).animate({opacity:0}, 300);
		$('#buttoncommunity').css('opacity',1).animate({opacity:0}, 700, function(){
			$('#mainbox').css("display","none");
			$('#page-items').css("display","none");
			$('#page-races').css("display","none");
			$('#page-community').fadeIn(800);
			$('#backbutton').fadeIn(800);
		});
	});
	
	$("#buttonrace").click(function(){
		$('#buttonitem').css('opacity',1).animate({opacity:0}, 300);
		$('#buttoncommunity').css('opacity',1).animate({opacity:0}, 300);
		$('#buttonhowtoplay').css('opacity',1).animate({opacity:0}, 300);
		$('#logo').css('opacity',1).animate({opacity:0}, 300);
		$('#middlesection').css('opacity',1).animate({opacity:0}, 300);
		$('#content-under').css('opacity',1).animate({opacity:0}, 300);
		$('#buttonrace').css('opacity',1).animate({opacity:0}, 700, function(){
			$('#mainbox').css("display","none");
			$('#page-items').css("display","none");
			$('#page-community').css("display","none");
			$('#page-races').fadeIn(800);
			$('#backbutton').fadeIn(800);
		});
	});
	
	$("#buttonitem").click(function(){
		$('#buttonrace').css('opacity',1).animate({opacity:0}, 300);
		$('#buttoncommunity').css('opacity',1).animate({opacity:0}, 300);
		$('#buttonhowtoplay').css('opacity',1).animate({opacity:0}, 300);
		$('#logo').css('opacity',1).animate({opacity:0}, 300);
		$('#middlesection').css('opacity',1).animate({opacity:0}, 300);
		$('#content-under').css('opacity',1).animate({opacity:0}, 300);
		$('#buttonitem').css('opacity',1).animate({opacity:0}, 700, function(){
			$('#mainbox').css("display","none");
			$('#page-races').css("display","none");
			$('#page-community').css("display","none");
			$('#page-items').fadeIn(800);
			$('#backbutton').fadeIn(800);
		});
	});
	
	$("#backbutton").click(function(){
		$('#page-items').css("display","none");
		$('#page-races').css("display","none");
		$('#page-community').css("display","none");
	
		$('#backbutton').fadeOut(800);
		$('#mainbox').css("display","block");
		
		$('#logo').css('opacity',0).animate({opacity:1}, 800);
		$('#buttoncommunity').css('opacity',0).animate({opacity:1}, 800);
		$('#buttonrace').css('opacity',0).animate({opacity:1}, 800);
		$('#buttonitem').css('opacity',0).animate({opacity:1}, 800);
		$('#buttonhowtoplay').css('opacity',0).animate({opacity:1}, 800);
		$('#middlesection').css('opacity',0).animate({opacity:1}, 800);
		$('#content-under').css('opacity',0).animate({opacity:1}, 800);
	});
});

