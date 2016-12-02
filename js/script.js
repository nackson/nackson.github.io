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


