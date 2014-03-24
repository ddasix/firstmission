$(document).on('mousemove',function(e){
	var window_center = window.outerWidth/2;
	var w = 18;
	var rate = 0;

	rate = w * (window_center - e.pageX)/window_center;

	$('.back-image').css({
		'background-position': rate-30 + 'px 0'
	});
});
$('#trigger-nav').on('click',function(e){
	e.preventDefault();
	$('#trigger-nav').toggleClass('nav-open');
	$('#page').toggleClass('nav-open');
	$('.main-navigation').toggleClass('nav-open');
	$('footer').toggleClass('nav-open');
});
$('.closed').on('click',function(e){
	e.preventDefault();
	$('#trigger-nav').toggleClass('nav-open');
	$('#page').toggleClass('nav-open');
	$('.main-navigation').toggleClass('nav-open');
	$('footer').toggleClass('nav-open');
});
$(document).scroll(function(){
	var mission = $('#mission').position().top;
	var products = $('#products').position().top;
	var tools = $('#tools').position().top;
	var team = $('#team').position().top;
	var contact = $('#contact').position().top;

	var this_scroll = $(this).scrollTop();
	var cur_pos = '';
	var expand = false;

	if(this_scroll<mission){
		cur_pos = 'menu-item-0';
	}else if(this_scroll>=contact){
		cur_pos = 'menu-item-5';
	}else if(this_scroll>=team && this_scroll<contact){
		cur_pos = 'menu-item-4';
	}else if(this_scroll>=tools && this_scroll<team){
		cur_pos = 'menu-item-3';
	}else if(this_scroll>=products && this_scroll<tools){
		cur_pos = 'menu-item-2';
	}else if(this_scroll>=mission && this_scroll<products){
		cur_pos = 'menu-item-1';
	}
	if (this_scroll<mission-88) {
		expand = true;
	};
	$('.cur-pos').removeClass('cur-pos');
	$('#'+cur_pos).addClass('cur-pos');
	showExpand(expand);
});
var showExpand = function(flag){
	if (flag) {
		$('#header-container.container-1140').addClass('expand');
		$('.site-title').css({display:''});
	}else{
		function runit(callback){
			$('#header-container.container-1140').removeClass('expand');
			if (typeof callback === 'function') {
				callback(true);
			};
		}
		runit(function(f){
			if (f) {
				$('.site-title').css({display:'none'});
			};
		});

	}
};