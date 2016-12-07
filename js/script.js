//ua
var _ua = (function(u){
	return {
		ios:(u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1),
		isTablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
		|| u.indexOf("ipad") != -1
		|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
		|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
		|| u.indexOf("kindle") != -1
		|| u.indexOf("silk") != -1
		|| u.indexOf("playbook") != -1,
		isMobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
		|| u.indexOf("iphone") != -1
		|| u.indexOf("ipod") != -1
		|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
		|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
		|| u.indexOf("blackberry") != -1

	}
})(window.navigator.userAgent.toLowerCase());

if(_ua.ios||_ua.isTablet||_ua.isMobile){
}else{
	$('body').addClass('pc');
}


$(window).bind('resize load', function(){
	$("html").css("zoom" , $(window).width()/screen.width );
});




//modal
$(function(){
	//画面中央を計算する関数を実行
//	centerringResize();


 
	//画面の左上かsectionの横幅・高さを引き、その値を2で割ると画面中央の位置が計算できます
//	$(window).resize(centerringResize);
//	function centerringResize(){
//		var w = $(window).width();
//		var h = $(window).height();
//		var cw = $("section").outerWidth();
//		var ch = $("section").outerHeight();
//
//		//取得した値をcssに追加する
//		$("section").css({
//			"left": ((w - cw)/2) + "px",
//			"top": ((h - ch)/2) + "px"
//		});
//	}
});


