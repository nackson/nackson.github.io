//URL情報の取得
var domain = "http://"+document.domain+"/";
var protocol = location.protocol;
var hash = location.hash;
var path = location.pathname;
var retina = false;
if( window.devicePixelRatio > 1 ){
	retina = true;
};

//ua
var _ua = (function(u){
	return {
		ios:(u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1),
		ie:(u.indexOf("msie") != -1 || u.indexOf("trident") != -1),
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

if(_ua.ios){
}else if(_ua.ie){
	$('body').addClass('ieAll');
}

// linker init
ad = $.extend({
	blankIcon:'<img src="/img/common/icon_blank.png" alt="別ウィンドウで表示します" class="blank" />',
	// PDFIcon:'<img src="/img/common/icon_pdf.png" alt="" class="pdf" />',
	// WordIcon:'<img src="/img/common/icon_word.png" alt="" class="word" />',
	// ExcelIcon:'<img src="/img/common/icon_excel.png" alt="" class="excel" />',
	// PowerIcon:'<img src="/img/common/icon_ppt.png" alt="" class="ppt" />',
	notOpenURL:'a[href^="'+domain+'"],a[href^="http://maps.google.com/"],a[href^="http://www.facebook.com/"]',
	IconSideSpace:'3px',
	ieVerticalSpace:'0.3em',//for ie6
	openURL:'a.blank',
	IconHidden:'a.noIcon,.noIcon a,#topicpath a,.btnLink a,#emblem a',
	domain:domain,
	extendLink:'.formBtn a'
});

$(window).on('load resize', function(){
	if(window.innerWidth <= 768){
		$('ul.column02,ul.column04').each(function(){
			$(this).find('a').autoHeight({reset:'reset',column:2});
		});
		$('#main,#main > div.column02 section').attr('style','');
		$('#index #wrapper').css('padding-top',$('#callcenter').height() + 50);
	}else{
		$('#index #wrapper').css('padding-top','0');
		$('#main').css('min-height',$('#sub').height());
		$('div.column02').each(function(){
			$(this).children('section').autoHeight({reset:'reset',column:2,height:'min-height'});
		});
	}
	$("ul.monthTableList li span.date").autoHeight({reset:'reset',column:32});
	$("ul.monthTableList li span.week").autoHeight({reset:'reset',column:32});
	$("ul.monthTableList li span.count").autoHeight({reset:'reset',column:32});
	$("ul.dayTableList li span.date").autoHeight({reset:'reset',column:14});
	$("ul.dayTableList li span.count").autoHeight({reset:'reset',column:14});
});

$(function(){
	//linker
	$('a[href^="http://"],a[href^="https://"],' + ad.extendLink).not('span.link a').linker();
	$('a[href^="http://"],a[href^="https://"],a.blankLink,a[target="_blank"],a[target="blank"]').not('span.link a,a:has("img"),a[href$=".pdf"],a[href$=".doc"],a[href$=".docx"],a[href$=".xls"],a[href$=".xlsx"],a[href$=".ppt"],a[href$=".pptx"],'+ad.IconHidden+','+ad.notOpenURL).add(ad.openURL).wrapInner('<span class="anchorIn"></span>').children('span').after(ad.blankIcon);
	// $('a[href$=".pdf"]').not(ad.IconHidden).wrapInner('<span class="anchorIn"></span>').children('span').after(ad.PDFIcon);
	// $('a[href$=".doc"],a[href$=".docx"]').not(ad.IconHidden).wrapInner('<span class="anchorIn"></span>').children('span').after(ad.WordIcon);
	// $('a[href$=".xls"],a[href$=".xlsx"]').not(ad.IconHidden).wrapInner('<span class="anchorIn"></span>').children('span').after(ad.ExcelIcon);
	// $('a[href$=".ppt"],a[href$=".pptx"]').not(ad.IconHidden).wrapInner('<span class="anchorIn"></span>').children('span').after(ad.PowerIcon);
	//$('img.blank,img.pdf,img.word,img.excel,img.ppt').css({'border':'0','padding-right':ad.IconSideSpace,'padding-left':ad.IconSideSpace,'padding-bottom':'2px','vertical-align':'middle'});
	$('a[href$=".pdf"],a[href$=".mpg"],a[href$=".doc"],a[href$=".docx"],a[href$=".xls"],a[href$=".xlsx"],a[href$=".wmv"]').not('a[href^="http://"],a[href^="https://"],a.fancybox,a.fancybox02').click(function(){
		window.open(this.href, '_blank');
		return false;
	});

	$.phonecheck();

	//opacity
	$('.pagetop a,#emblem p.cityLogo').opacityOver();

	//accordion
	$('.infoList').children('dt').not('.nowYear > dt').on('click',function(){
		$(this).toggleClass('active');
		$(this).next('dd').slideToggle(400,'easeInOutQuad');
	})
	$('.administrationList').find('a.index').on('click',function(){
		$(this).toggleClass('active');
		$(this).next('ul').slideToggle(400,'easeInOutQuad');
		if(window.innerWidth > 768){
			setTimeout(function(){
				$('#main').animate({'min-height': $('#sub').height()},400);
			},400)
		}
	})

	//slideScrol
	var link = $('a[href^="#"],area[href^="#"]').not('.mainText a');
	link.click(function(e){
		e.preventDefault();
		var _target = $(this).attr('href');
		var _pos = $(_target).offset().top;
		if (window.innerWidth <= 768){
			var _pos = _pos - "102";
		};
		if (_target == "#wrapper"){
			_pos = $('html').offset().top;
		};
		$('body, html').animate({
			scrollTop: _pos
		}, 500,'easeOutExpo');
		return false;
	});

	//scrolltop
	$('.pagetop').hide();
	var $pagetop = $('.pagetop');
	$(window).scroll(function(){
		if($(this).scrollTop() > 100){
			$pagetop.fadeIn();
		} else {
			$pagetop.fadeOut();
		};
		$(".pagetop").css({"position":"fixed","bottom": "20px"});
	});

	/* ------------------------------
*  フォントサイズ変更、背景色変更スタイル
------------------------------ */
	var userFontSize = $.cookie('userFontSize');

	//cookieでページ遷移時のフォントサイズ、背景用スタイルを呼び出す
	switch(userFontSize){
		case'font-size:70%':$('#fontWapper').attr('style','font-size:70%');break;
		case'font-size:80%':$('#fontWapper').attr('style','font-size:80%');break;
		case'font-size:90%':$('#fontWapper').attr('style','font-size:90%');break;
		case'font-size:100%':$('#fontWapper').attr('style','font-size:100%');break;
		case'font-size:110%':$('#fontWapper').attr('style','font-size:110%');break;
		case'font-size:120%':$('#fontWapper').attr('style','font-size:120%');break;
		case'font-size:130%':$('#fontWapper').attr('style','font-size:130%');break;
		case'font-size:140%':$('#fontWapper').attr('style','font-size:140%');break;
		case'font-size:150%':$('#fontWapper').attr('style','font-size:150%');break;
		case'font-size:160%':$('#fontWapper').attr('style','font-size:160%');break;
		case'font-size:170%':$('#fontWapper').attr('style','font-size:170%');break;
		case'font-size:180%':$('#fontWapper').attr('style','font-size:180%');break;
		case'font-size:190%':$('#fontWapper').attr('style','font-size:190%');break;
		case'font-size:200%':$('#fontWapper').attr('style','font-size:200%');break;
		default:$('#fontWapper').attr('style','font-size:100%');break;
	}

	//クリック時にフォントサイズを切り替える
	$('#fontWapper a').click(function(){
		if($(this).hasClass('small')){
			new $.changeFontSizeSmall();
		}else if($(this).hasClass('normal')){
			$('#fontWapper').attr('style', 'font-size:100%');
			$.cookie('userFontSize','100%',{expires:1,path:'/'});
		}else if($(this).hasClass('big')){
			new $.changeFontSizeBig();
		}
		$('.column02').each(function(){
			$(this).children('section').autoHeight({reset:'reset',column:2});
		});
		$('#main').css('min-height',$('#sub').height());
	});

}); //function end


/* ------------------------------
*  フォントサイズ変更
------------------------------ */
$.changeFontSizeBig = function(){
	currentSize = $('#fontWapper').attr('style');
	changesize = '';
	if ( currentSize == "font-size:60%"||currentSize == "font-size: 60%;"||currentSize == "FONT-SIZE: 60%"){
		changesize = "font-size:70%";
	}
	else if ( currentSize == "font-size:70%"||currentSize == "font-size: 70%;"||currentSize == "FONT-SIZE: 70%"){
		changesize = "font-size:80%";
	}
	else if ( currentSize == "font-size:80%"||currentSize == "font-size: 80%;"||currentSize == "FONT-SIZE: 80%"){
		changesize = "font-size:90%";
	}
	else if ( currentSize == "font-size:90%"||currentSize == "font-size: 90%;"||currentSize == "FONT-SIZE: 90%"){
		changesize = "font-size:100%";
	}
	else if ( currentSize == "font-size:100%"||currentSize == "font-size: 100%;"||currentSize == "FONT-SIZE: 100%"){
		changesize = "font-size:110%";
	}
	else if ( currentSize == "font-size:110%"||currentSize == "font-size: 110%;"||currentSize == "FONT-SIZE: 110%"){
		changesize = "font-size:120%";
	}
	else if ( currentSize == "font-size:120%"||currentSize == "font-size: 120%;"||currentSize == "FONT-SIZE: 120%"){
		changesize = "font-size:130%";
	}
	else if ( currentSize == "font-size:130%"||currentSize == "font-size: 130%;"||currentSize == "FONT-SIZE: 130%"){
		changesize = "font-size:140%";
	}
	else if ( currentSize == "font-size:140%"||currentSize == "font-size: 140%;"||currentSize == "FONT-SIZE: 140%"){
		changesize = "font-size:150%";
	}
	else if ( currentSize == "font-size:150%"||currentSize == "font-size: 150%;"||currentSize == "FONT-SIZE: 150%"){
		changesize = "font-size:160%";
	}
	else if ( currentSize == "font-size:160%"||currentSize == "font-size: 160%;"||currentSize == "FONT-SIZE: 160%"){
		changesize = "font-size:170%";
	}
	else if ( currentSize == "font-size:170%"||currentSize == "font-size: 170%;"||currentSize == "FONT-SIZE: 170%"){
		changesize = "font-size:180%";
	}
	else if ( currentSize == "font-size:180%"||currentSize == "font-size: 180%;"||currentSize == "FONT-SIZE: 180%"){
		changesize = "font-size:190%";
	}
	else if ( currentSize == "font-size:190%"||currentSize == "font-size: 190%;"||currentSize == "FONT-SIZE: 190%"){
		changesize = "font-size:200%";
	}
	else if ( currentSize == "font-size:200%"||currentSize == "font-size: 200%;"||currentSize == "FONT-SIZE: 200%"){
		m = escape("これ以上文字のサイズを大きくできません。\n「中」ボタンを選択すると標準の文字サイズに戻ります。");
		alert(unescape(m));
		changesize = "font-size:200%";
	}else{
		changesize = "font-size:110%";
	}
	$('#fontWapper').attr('style', changesize);
	$.cookie('userFontSize',changesize,{expires:1,path:'/'});
};

$.changeFontSizeSmall = function(){
	currentSize = $('#fontWapper').attr('style');
	changesize = '';
	if ( currentSize == "font-size:200%"||currentSize == "font-size: 200%;"||currentSize == "FONT-SIZE: 200%"){
		changesize = "font-size:190%";
	}
	else if ( currentSize == "font-size:190%"||currentSize == "font-size: 190%;"||currentSize == "FONT-SIZE: 190%"){
		changesize = "font-size:180%";
	}
	else if ( currentSize == "font-size:180%"||currentSize == "font-size: 180%;"||currentSize == "FONT-SIZE: 180%"){
		changesize = "font-size:170%";
	}
	else if ( currentSize == "font-size:170%"||currentSize == "font-size: 170%;"||currentSize == "FONT-SIZE: 170%"){
		changesize = "font-size:160%";
	}
	else if ( currentSize == "font-size:160%"||currentSize == "font-size: 160%;"||currentSize == "FONT-SIZE: 160%"){
		changesize = "font-size:150%";
	}
	else if ( currentSize == "font-size:150%"||currentSize == "font-size: 150%;"||currentSize == "FONT-SIZE: 150%"){
		changesize = "font-size:140%";
	}
	else if ( currentSize == "font-size:140%"||currentSize == "font-size: 140%;"||currentSize == "FONT-SIZE: 140%"){
		changesize = "font-size:130%";
	}
	else if ( currentSize == "font-size:130%"||currentSize == "font-size: 130%;"||currentSize == "FONT-SIZE: 130%"){
		changesize = "font-size:120%";
	}
	else if ( currentSize == "font-size:120%"||currentSize == "font-size: 120%;"||currentSize == "FONT-SIZE: 120%"){
		changesize = "font-size:110%";
	}
	else if ( currentSize == "font-size:110%"||currentSize == "font-size: 110%;"||currentSize == "FONT-SIZE: 110%"){
		changesize = "font-size:100%";
	}
	else if ( currentSize == "font-size:100%"||currentSize == "font-size: 100%;"||currentSize == "FONT-SIZE: 100%"){
		changesize = "font-size:90%";
	}
	else if ( currentSize == "font-size:90%"||currentSize == "font-size: 90%;"||currentSize == "FONT-SIZE: 90%"){
		changesize = "font-size:80%";
	}
	else if ( currentSize == "font-size:80%"||currentSize == "font-size: 80%;"||currentSize == "FONT-SIZE: 80%"){
		changesize = "font-size:70%";
	}
	else if ( currentSize == "font-size:70%"||currentSize == "font-size: 70%;"||currentSize == "FONT-SIZE: 70%"){
		changesize = "font-size:60%";
	}
	else if ( currentSize == "font-size:60%"||currentSize == "font-size: 60%;"||currentSize == "FONT-SIZE: 60%"){
		m = escape("これ以上文字のサイズを小さくできません。\n「中」ボタンを選択すると標準の文字サイズに戻ります。");
		alert(unescape(m));
		changesize = "font-size:60%";
	}else{
		changesize = "font-size:90%";
	}
	$('#fontWapper').attr('style', changesize);
	$.cookie('userFontSize',changesize,{expires:1,path:'/'});
};

// linker
$.fn.linker = function(){
	return this.not(ad.extendLink+' a').click(function(e){
		e.preventDefault();
		if($(this).find("a").length){
			var targetAnc=$(this).find("a");
		}else{
			var targetAnc=$(this);
		};
		if($(targetAnc).attr("href")==undefined){
			$(this).css('cursor','auto');
			return false;
		}else if($(targetAnc).is(ad.pdfLink+','+ad.wordLink+','+ad.excelLink+','+ad.movieLink)){
			window.open($(targetAnc).attr("href"),"_blank");
		}else if($(targetAnc).is('a[href^="http://"]')==false && $(targetAnc).is('a[href^="https://"]')==false){
			window.location.href=$(targetAnc).attr("href");
		}else if($(targetAnc).filter(ad.notOpenURL).length && !$(targetAnc).is(ad.openURL)){
			window.location.href=$(targetAnc).attr("href");
		}else if($(targetAnc).is(ad.openURL)){
			window.open($(targetAnc).attr("href"),"_blank");
		}else{
			window.open($(targetAnc).attr("href"),"_blank");
		};
	});
};

$.fn.opacityOver = function(){
	return this.each(function(){
		$(this).hover(function(){
			$(this).animate({'opacity':0.6},{duration:100,queue:false});
		},function(){
			$(this).animate({'opacity':1},{duration:100,queue:false});
		});
	});
};

$.phonecheck = function(){
	var $tel = $('a[href^="tel:"]');
	if(_ua.isMobile ){
		$tel.addClass('telEnable');
	}else{
		$tel.addClass('telDisable').on('click', function(e){
			e.preventDefault();
		});
	};
};

/*
* jquery-auto-height.js
*
* Copyright (c) 2010 Tomohiro Okuwaki (http://www.tinybeans.net/blog/)
* Licensed under MIT Lisence:
* http://www.opensource.org/licenses/mit-license.php
* http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
*
* Since:   2010-04-19
* Update:  2013-08-16
* version: 0.04
* Comment:
*
* jQuery 1.2 <-> 1.10.2
*
*/

(function($){
	$.fn.autoHeight = function(options){
		var op = $.extend({

			column  : 0,
			clear   : 0,
			height  : 'height',
			reset   : '',
			descend : function descend (a,b){ return b-a; }

		},options || {}); // optionsに値があれば上書きする

		var self = $(this);
		var n = 0,
			hMax,
			hList = new Array(),
			hListLine = new Array();
		hListLine[n] = 0;

		// 要素の高さを取得
		self.each(function(i){
			if (op.reset == 'reset') {
				$(this).removeAttr('style');
			}
			var h = $(this).height();
			hList[i] = h;
			if (op.column > 1) {
				// op.columnごとの最大値を格納していく
				if (h > hListLine[n]) {
					hListLine[n] = h;
				}
				if ( (i > 0) && (((i+1) % op.column) == 0) ) {
					n++;
					hListLine[n] = 0;
				};
			}
		});

		// 取得した高さの数値を降順に並べ替え
		hList = hList.sort(op.descend);
		hMax = hList[0];

		// 高さの最大値を要素に適用
		var ie6 = typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined";
		if (op.column > 1) {
			for (var j=0; j<hListLine.length; j++) {
				for (var k=0; k<op.column; k++) {
					if (ie6) {
						self.eq(j*op.column+k).height(hListLine[j]);
					} else {
						self.eq(j*op.column+k).css(op.height,hListLine[j]);
					}
					if (k == 0 && op.clear != 0) {
						self.eq(j*op.column+k).css('clear','both');
					}
				}
			}
		} else {
			if (ie6) {
				self.height(hMax);
			} else {
				self.css(op.height,hMax);
			}
		}
	};
})(jQuery);

/*
* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
*
* Uses the built in easing capabilities added In jQuery 1.1
* to offer multiple easing options
*
* TERMS OF USE - jQuery Easing
*
* Open source under the BSD License.
*
* Copyright ﾂｩ 2008 George McGinley Smith
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this list of
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list
* of conditions and the following disclaimer in the documentation and/or other materials
* provided with the distribution.
*
* Neither the name of the author nor the names of contributors may be used to endorse
* or promote products derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
*  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
*  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
*  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
* OF THE POSSIBILITY OF SUCH DAMAGE.
*
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
			  {
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

//flexboxJS
!function(){window.flexibility={},Array.prototype.forEach||(Array.prototype.forEach=function(t){if(void 0===this||null===this)throw new TypeError(this+"is not an object");if(!(t instanceof Function))throw new TypeError(t+" is not a function");for(var e=Object(this),i=arguments[1],n=e instanceof String?e.split(""):e,r=Math.max(Math.min(n.length,9007199254740991),0)||0,o=-1;++o<r;)o in n&&t.call(i,n[o],o,e)}),function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.computeLayout=e()}(flexibility,function(){var t=function(){function t(e){if((!e.layout||e.isDirty)&&(e.layout={width:void 0,height:void 0,top:0,left:0,right:0,bottom:0}),e.style||(e.style={}),e.children||(e.children=[]),e.style.measure&&e.children&&e.children.length)throw new Error("Using custom measure function is supported only for leaf nodes.");return e.children.forEach(t),e}function e(t){return void 0===t}function i(t){return t===q||t===G}function n(t){return t===U||t===Z}function r(t,e){if(void 0!==t.style.marginStart&&i(e))return t.style.marginStart;var n=null;switch(e){case"row":n=t.style.marginLeft;break;case"row-reverse":n=t.style.marginRight;break;case"column":n=t.style.marginTop;break;case"column-reverse":n=t.style.marginBottom}return void 0!==n?n:void 0!==t.style.margin?t.style.margin:0}function o(t,e){if(void 0!==t.style.marginEnd&&i(e))return t.style.marginEnd;var n=null;switch(e){case"row":n=t.style.marginRight;break;case"row-reverse":n=t.style.marginLeft;break;case"column":n=t.style.marginBottom;break;case"column-reverse":n=t.style.marginTop}return null!=n?n:void 0!==t.style.margin?t.style.margin:0}function l(t,e){if(void 0!==t.style.paddingStart&&t.style.paddingStart>=0&&i(e))return t.style.paddingStart;var n=null;switch(e){case"row":n=t.style.paddingLeft;break;case"row-reverse":n=t.style.paddingRight;break;case"column":n=t.style.paddingTop;break;case"column-reverse":n=t.style.paddingBottom}return null!=n&&n>=0?n:void 0!==t.style.padding&&t.style.padding>=0?t.style.padding:0}function a(t,e){if(void 0!==t.style.paddingEnd&&t.style.paddingEnd>=0&&i(e))return t.style.paddingEnd;var n=null;switch(e){case"row":n=t.style.paddingRight;break;case"row-reverse":n=t.style.paddingLeft;break;case"column":n=t.style.paddingBottom;break;case"column-reverse":n=t.style.paddingTop}return null!=n&&n>=0?n:void 0!==t.style.padding&&t.style.padding>=0?t.style.padding:0}function d(t,e){if(void 0!==t.style.borderStartWidth&&t.style.borderStartWidth>=0&&i(e))return t.style.borderStartWidth;var n=null;switch(e){case"row":n=t.style.borderLeftWidth;break;case"row-reverse":n=t.style.borderRightWidth;break;case"column":n=t.style.borderTopWidth;break;case"column-reverse":n=t.style.borderBottomWidth}return null!=n&&n>=0?n:void 0!==t.style.borderWidth&&t.style.borderWidth>=0?t.style.borderWidth:0}function s(t,e){if(void 0!==t.style.borderEndWidth&&t.style.borderEndWidth>=0&&i(e))return t.style.borderEndWidth;var n=null;switch(e){case"row":n=t.style.borderRightWidth;break;case"row-reverse":n=t.style.borderLeftWidth;break;case"column":n=t.style.borderBottomWidth;break;case"column-reverse":n=t.style.borderTopWidth}return null!=n&&n>=0?n:void 0!==t.style.borderWidth&&t.style.borderWidth>=0?t.style.borderWidth:0}function u(t,e){return l(t,e)+d(t,e)}function y(t,e){return a(t,e)+s(t,e)}function c(t,e){return d(t,e)+s(t,e)}function f(t,e){return r(t,e)+o(t,e)}function h(t,e){return u(t,e)+y(t,e)}function m(t){return t.style.justifyContent?t.style.justifyContent:"flex-start"}function v(t){return t.style.alignContent?t.style.alignContent:"flex-start"}function p(t,e){return e.style.alignSelf?e.style.alignSelf:t.style.alignItems?t.style.alignItems:"stretch"}function x(t,e){if(e===N){if(t===q)return G;if(t===G)return q}return t}function g(t,e){var i;return i=t.style.direction?t.style.direction:M,i===M&&(i=void 0===e?A:e),i}function b(t){return t.style.flexDirection?t.style.flexDirection:U}function w(t,e){return n(t)?x(q,e):U}function W(t){return t.style.position?t.style.position:"relative"}function L(t){return W(t)===tt&&t.style.flex>0}function E(t){return"wrap"===t.style.flexWrap}function S(t,e){return t.layout[ot[e]]+f(t,e)}function k(t,e){return void 0!==t.style[ot[e]]&&t.style[ot[e]]>=0}function C(t,e){return void 0!==t.style[e]}function T(t){return void 0!==t.style.measure}function $(t,e){return void 0!==t.style[e]?t.style[e]:0}function H(t,e,i){var n={row:t.style.minWidth,"row-reverse":t.style.minWidth,column:t.style.minHeight,"column-reverse":t.style.minHeight}[e],r={row:t.style.maxWidth,"row-reverse":t.style.maxWidth,column:t.style.maxHeight,"column-reverse":t.style.maxHeight}[e],o=i;return void 0!==r&&r>=0&&o>r&&(o=r),void 0!==n&&n>=0&&n>o&&(o=n),o}function z(t,e){return t>e?t:e}function B(t,e){void 0===t.layout[ot[e]]&&k(t,e)&&(t.layout[ot[e]]=z(H(t,e,t.style[ot[e]]),h(t,e)))}function D(t,e,i){e.layout[nt[i]]=t.layout[ot[i]]-e.layout[ot[i]]-e.layout[rt[i]]}function I(t,e){return void 0!==t.style[it[e]]?$(t,it[e]):-$(t,nt[e])}function R(t,n,l,a){var s=g(t,a),R=x(b(t),s),M=w(R,s),A=x(q,s);B(t,R),B(t,M),t.layout.direction=s,t.layout[it[R]]+=r(t,R)+I(t,R),t.layout[nt[R]]+=o(t,R)+I(t,R),t.layout[it[M]]+=r(t,M)+I(t,M),t.layout[nt[M]]+=o(t,M)+I(t,M);var N=t.children.length,lt=h(t,A),at=h(t,U);if(T(t)){var dt=!e(t.layout[ot[A]]),st=F;st=k(t,A)?t.style.width:dt?t.layout[ot[A]]:n-f(t,A),st-=lt;var ut=F;ut=k(t,U)?t.style.height:e(t.layout[ot[U]])?l-f(t,A):t.layout[ot[U]],ut-=h(t,U);var yt=!k(t,A)&&!dt,ct=!k(t,U)&&e(t.layout[ot[U]]);if(yt||ct){var ft=t.style.measure(st,ut);yt&&(t.layout.width=ft.width+lt),ct&&(t.layout.height=ft.height+at)}if(0===N)return}var ht,mt,vt,pt,xt=E(t),gt=m(t),bt=u(t,R),wt=u(t,M),Wt=h(t,R),Lt=h(t,M),Et=!e(t.layout[ot[R]]),St=!e(t.layout[ot[M]]),kt=i(R),Ct=null,Tt=null,$t=F;Et&&($t=t.layout[ot[R]]-Wt);for(var Ht=0,zt=0,Bt=0,Dt=0,It=0,Rt=0;N>zt;){var jt,Ft,Mt=0,At=0,Nt=0,qt=0,Gt=Et&&gt===O||!Et&&gt!==_,Ut=Gt?N:Ht,Zt=!0,Ot=N,_t=null,Jt=null,Kt=bt,Pt=0;for(ht=Ht;N>ht;++ht){vt=t.children[ht],vt.lineIndex=Rt,vt.nextAbsoluteChild=null,vt.nextFlexChild=null;var Qt=p(t,vt);if(Qt===Y&&W(vt)===tt&&St&&!k(vt,M))vt.layout[ot[M]]=z(H(vt,M,t.layout[ot[M]]-Lt-f(vt,M)),h(vt,M));else if(W(vt)===et)for(null===Ct&&(Ct=vt),null!==Tt&&(Tt.nextAbsoluteChild=vt),Tt=vt,mt=0;2>mt;mt++)pt=0!==mt?q:U,!e(t.layout[ot[pt]])&&!k(vt,pt)&&C(vt,it[pt])&&C(vt,nt[pt])&&(vt.layout[ot[pt]]=z(H(vt,pt,t.layout[ot[pt]]-h(t,pt)-f(vt,pt)-$(vt,it[pt])-$(vt,nt[pt])),h(vt,pt)));var Vt=0;if(Et&&L(vt)?(At++,Nt+=vt.style.flex,null===_t&&(_t=vt),null!==Jt&&(Jt.nextFlexChild=vt),Jt=vt,Vt=h(vt,R)+f(vt,R)):(jt=F,Ft=F,kt?Ft=k(t,U)?t.layout[ot[U]]-at:l-f(t,U)-at:jt=k(t,A)?t.layout[ot[A]]-lt:n-f(t,A)-lt,0===Bt&&j(vt,jt,Ft,s),W(vt)===tt&&(qt++,Vt=S(vt,R))),xt&&Et&&Mt+Vt>$t&&ht!==Ht){qt--,Bt=1;break}Gt&&(W(vt)!==tt||L(vt))&&(Gt=!1,Ut=ht),Zt&&(W(vt)!==tt||Qt!==Y&&Qt!==Q||e(vt.layout[ot[M]]))&&(Zt=!1,Ot=ht),Gt&&(vt.layout[rt[R]]+=Kt,Et&&D(t,vt,R),Kt+=S(vt,R),Pt=z(Pt,H(vt,M,S(vt,M)))),Zt&&(vt.layout[rt[M]]+=Dt+wt,St&&D(t,vt,M)),Bt=0,Mt+=Vt,zt=ht+1}var Xt=0,Yt=0,te=0;if(te=Et?$t-Mt:z(Mt,0)-Mt,0!==At){var ee,ie,ne=te/Nt;for(Jt=_t;null!==Jt;)ee=ne*Jt.style.flex+h(Jt,R),ie=H(Jt,R,ee),ee!==ie&&(te-=ie,Nt-=Jt.style.flex),Jt=Jt.nextFlexChild;for(ne=te/Nt,0>ne&&(ne=0),Jt=_t;null!==Jt;)Jt.layout[ot[R]]=H(Jt,R,ne*Jt.style.flex+h(Jt,R)),jt=F,k(t,A)?jt=t.layout[ot[A]]-lt:kt||(jt=n-f(t,A)-lt),Ft=F,k(t,U)?Ft=t.layout[ot[U]]-at:kt&&(Ft=l-f(t,U)-at),j(Jt,jt,Ft,s),vt=Jt,Jt=Jt.nextFlexChild,vt.nextFlexChild=null}else gt!==O&&(gt===_?Xt=te/2:gt===J?Xt=te:gt===K?(te=z(te,0),Yt=At+qt-1!==0?te/(At+qt-1):0):gt===P&&(Yt=te/(At+qt),Xt=Yt/2));for(Kt+=Xt,ht=Ut;zt>ht;++ht)vt=t.children[ht],W(vt)===et&&C(vt,it[R])?vt.layout[rt[R]]=$(vt,it[R])+d(t,R)+r(vt,R):(vt.layout[rt[R]]+=Kt,Et&&D(t,vt,R),W(vt)===tt&&(Kt+=Yt+S(vt,R),Pt=z(Pt,H(vt,M,S(vt,M)))));var re=t.layout[ot[M]];for(St||(re=z(H(t,M,Pt+Lt),Lt)),ht=Ot;zt>ht;++ht)if(vt=t.children[ht],W(vt)===et&&C(vt,it[M]))vt.layout[rt[M]]=$(vt,it[M])+d(t,M)+r(vt,M);else{var oe=wt;if(W(vt)===tt){var Qt=p(t,vt);if(Qt===Y)e(vt.layout[ot[M]])&&(vt.layout[ot[M]]=z(H(vt,M,re-Lt-f(vt,M)),h(vt,M)));else if(Qt!==Q){var le=re-Lt-S(vt,M);oe+=Qt===V?le/2:le}}vt.layout[rt[M]]+=Dt+oe,St&&D(t,vt,M)}Dt+=Pt,It=z(It,Kt),Rt+=1,Ht=zt}if(Rt>1&&St){var ae=t.layout[ot[M]]-Lt,de=ae-Dt,se=0,ue=wt,ye=v(t);ye===X?ue+=de:ye===V?ue+=de/2:ye===Y&&ae>Dt&&(se=de/Rt);var ce=0;for(ht=0;Rt>ht;++ht){var fe=ce,he=0;for(mt=fe;N>mt;++mt)if(vt=t.children[mt],W(vt)===tt){if(vt.lineIndex!==ht)break;e(vt.layout[ot[M]])||(he=z(he,vt.layout[ot[M]]+f(vt,M)))}for(ce=mt,he+=se,mt=fe;ce>mt;++mt)if(vt=t.children[mt],W(vt)===tt){var me=p(t,vt);if(me===Q)vt.layout[rt[M]]=ue+r(vt,M);else if(me===X)vt.layout[rt[M]]=ue+he-o(vt,M)-vt.layout[ot[M]];else if(me===V){var ve=vt.layout[ot[M]];vt.layout[rt[M]]=ue+(he-ve)/2}else me===Y&&(vt.layout[rt[M]]=ue+r(vt,M))}ue+=he}}var pe=!1,xe=!1;if(Et||(t.layout[ot[R]]=z(H(t,R,It+y(t,R)),Wt),(R===G||R===Z)&&(pe=!0)),St||(t.layout[ot[M]]=z(H(t,M,Dt+Lt),Lt),(M===G||M===Z)&&(xe=!0)),pe||xe)for(ht=0;N>ht;++ht)vt=t.children[ht],pe&&D(t,vt,R),xe&&D(t,vt,M);for(Tt=Ct;null!==Tt;){for(mt=0;2>mt;mt++)pt=0!==mt?q:U,!e(t.layout[ot[pt]])&&!k(Tt,pt)&&C(Tt,it[pt])&&C(Tt,nt[pt])&&(Tt.layout[ot[pt]]=z(H(Tt,pt,t.layout[ot[pt]]-c(t,pt)-f(Tt,pt)-$(Tt,it[pt])-$(Tt,nt[pt])),h(Tt,pt))),C(Tt,nt[pt])&&!C(Tt,it[pt])&&(Tt.layout[it[pt]]=t.layout[ot[pt]]-Tt.layout[ot[pt]]-$(Tt,nt[pt]));vt=Tt,Tt=Tt.nextAbsoluteChild,vt.nextAbsoluteChild=null}}function j(t,e,i,n){t.shouldUpdate=!0;var r=t.style.direction||A,o=!t.isDirty&&t.lastLayout&&t.lastLayout.requestedHeight===t.layout.height&&t.lastLayout.requestedWidth===t.layout.width&&t.lastLayout.parentMaxWidth===e&&t.lastLayout.parentMaxHeight===i&&t.lastLayout.direction===r;o?(t.layout.width=t.lastLayout.width,t.layout.height=t.lastLayout.height,t.layout.top=t.lastLayout.top,t.layout.left=t.lastLayout.left):(t.lastLayout||(t.lastLayout={}),t.lastLayout.requestedWidth=t.layout.width,t.lastLayout.requestedHeight=t.layout.height,t.lastLayout.parentMaxWidth=e,t.lastLayout.parentMaxHeight=i,t.lastLayout.direction=r,t.children.forEach(function(t){t.layout.width=void 0,t.layout.height=void 0,t.layout.top=0,t.layout.left=0}),R(t,e,i,n),t.lastLayout.width=t.layout.width,t.lastLayout.height=t.layout.height,t.lastLayout.top=t.layout.top,t.lastLayout.left=t.layout.left)}var F,M="inherit",A="ltr",N="rtl",q="row",G="row-reverse",U="column",Z="column-reverse",O="flex-start",_="center",J="flex-end",K="space-between",P="space-around",Q="flex-start",V="center",X="flex-end",Y="stretch",tt="relative",et="absolute",it={row:"left","row-reverse":"right",column:"top","column-reverse":"bottom"},nt={row:"right","row-reverse":"left",column:"bottom","column-reverse":"top"},rt={row:"left","row-reverse":"right",column:"top","column-reverse":"bottom"},ot={row:"width","row-reverse":"width",column:"height","column-reverse":"height"};return{layoutNodeImpl:R,computeLayout:j,fillNodes:t}}();return"object"==typeof exports&&(module.exports=t),function(e){t.fillNodes(e),t.computeLayout(e)}}),!window.addEventListener&&window.attachEvent&&function(){Window.prototype.addEventListener=HTMLDocument.prototype.addEventListener=Element.prototype.addEventListener=function(t,e){this.attachEvent("on"+t,e)},Window.prototype.removeEventListener=HTMLDocument.prototype.removeEventListener=Element.prototype.removeEventListener=function(t,e){this.detachEvent("on"+t,e)}}(),flexibility.detect=function(){var t=document.createElement("p");try{return t.style.display="flex","flex"===t.style.display}catch(e){return!1}},!flexibility.detect()&&document.attachEvent&&document.documentElement.currentStyle&&document.attachEvent("onreadystatechange",function(){flexibility.onresize({target:document.documentElement})}),flexibility.init=function(t){var e=t.onlayoutcomplete;return e||(e=t.onlayoutcomplete={node:t,style:{},children:[]}),e.style.display=t.currentStyle["-js-display"]||t.currentStyle.display,e};var t,e=1e3,i=15,n=document.documentElement,r=0,o=0;flexibility.onresize=function(l){if(n.clientWidth!==r||n.clientHeight!==o){r=n.clientWidth,o=n.clientHeight,clearTimeout(t),window.removeEventListener("resize",flexibility.onresize);var a=l.target&&1===l.target.nodeType?l.target:document.documentElement;flexibility.walk(a),t=setTimeout(function(){window.addEventListener("resize",flexibility.onresize)},e/i)}};var l={alignContent:{initial:"stretch",valid:/^(flex-start|flex-end|center|space-between|space-around|stretch)/},alignItems:{initial:"stretch",valid:/^(flex-start|flex-end|center|baseline|stretch)$/},boxSizing:{initial:"content-box",valid:/^(border-box|content-box)$/},flexDirection:{initial:"row",valid:/^(row|row-reverse|column|column-reverse)$/},flexWrap:{initial:"nowrap",valid:/^(nowrap|wrap|wrap-reverse)$/},justifyContent:{initial:"flex-start",valid:/^(flex-start|flex-end|center|space-between|space-around)$/}};flexibility.updateFlexContainerCache=function(t){var e=t.style,i=t.node.currentStyle,n=t.node.style,r={};(i["flex-flow"]||n["flex-flow"]||"").replace(/^(row|row-reverse|column|column-reverse)\s+(nowrap|wrap|wrap-reverse)$/i,function(t,e,i){r.flexDirection=e,r.flexWrap=i});for(var o in l){var a=o.replace(/[A-Z]/g,"-$&").toLowerCase(),d=l[o],s=i[a]||n[a];e[o]=d.valid.test(s)?s:r[o]||d.initial}};var a={alignSelf:{initial:"auto",valid:/^(auto|flex-start|flex-end|center|baseline|stretch)$/},boxSizing:{initial:"content-box",valid:/^(border-box|content-box)$/},flexBasis:{initial:"auto",valid:/^((?:[-+]?0|[-+]?[0-9]*\.?[0-9]+(?:%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))|auto|fill|max-content|min-content|fit-content|content)$/},flexGrow:{initial:0,valid:/^\+?(0|[1-9][0-9]*)$/},flexShrink:{initial:0,valid:/^\+?(0|[1-9][0-9]*)$/},order:{initial:0,valid:/^([-+]?[0-9]+)$/}};flexibility.updateFlexItemCache=function(t){var e=t.style,i=t.node.currentStyle,n=t.node.style,r={};(i.flex||n.flex||"").replace(/^\+?(0|[1-9][0-9]*)/,function(t){r.flexGrow=t});for(var o in a){var l=o.replace(/[A-Z]/g,"-$&").toLowerCase(),d=a[o],s=i[l]||n[l];e[o]=d.valid.test(s)?s:r[o]||d.initial,"number"==typeof d.initial&&(e[o]=parseFloat(e[o]))}};var d="border:0 solid;clip:rect(0 0 0 0);display:inline-block;font:0/0 serif;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;overflow:hidden;padding:0;position:absolute;width:1em;",s={medium:4,none:0,thick:6,thin:2},u={borderBottomWidth:0,borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0,height:0,paddingBottom:0,paddingLeft:0,paddingRight:0,paddingTop:0,marginBottom:0,marginLeft:0,marginRight:0,marginTop:0,maxHeight:0,maxWidth:0,minHeight:0,minWidth:0,width:0},y=/^([-+]?0|[-+]?[0-9]*\.?[0-9]+)/,c=100;flexibility.updateLengthCache=function(t){var e,i,n,r=t.node,o=t.style,l=r.parentNode,a=document.createElement("_"),f=a.runtimeStyle,h=r.currentStyle;f.cssText=d+"font-size:"+h.fontSize,l.insertBefore(a,r.nextSibling),o.fontSize=a.offsetWidth,f.fontSize=o.fontSize+"px";for(var m in u){var v=h[m];y.test(v)||"auto"===v&&!/(width|height)/i.test(m)?/%$/.test(v)?(/^(bottom|height|top)$/.test(m)?(i||(i=l.offsetHeight),n=i):(e||(e=l.offsetWidth),n=e),o[m]=parseFloat(v)*n/c):(f.width=v,o[m]=a.offsetWidth):/^border/.test(m)&&v in s?o[m]=s[v]:delete o[m]}l.removeChild(a),"none"===h.borderTopStyle&&(o.borderTopWidth=0),"none"===h.borderRightStyle&&(o.borderRightWidth=0),"none"===h.borderBottomStyle&&(o.borderBottomWidth=0),"none"===h.borderLeftStyle&&(o.borderLeftWidth=0),o.width||o.minWidth||(/flex/.test(o.display)?o.width=r.offsetWidth:o.minWidth=r.offsetWidth),o.height||o.minHeight||/flex/.test(o.display)||(o.minHeight=r.offsetHeight)},flexibility.walk=function(t){var e=flexibility.init(t),i=e.style,n=i.display;if("none"===n)return{};var r=n.match(/^(inline)?flex$/);if(r&&(flexibility.updateFlexContainerCache(e),t.runtimeStyle.cssText="display:"+(r[1]?"inline-block":"block"),e.children=[]),Array.prototype.forEach.call(t.childNodes,function(t,n){if(1===t.nodeType){var o=flexibility.walk(t),l=o.style;o.index=n,r&&(flexibility.updateFlexItemCache(o),"auto"===l.alignSelf&&(l.alignSelf=i.alignItems),l.flex=l.flexGrow,t.runtimeStyle.cssText="display:inline-block",e.children.push(o))}}),r){e.children.forEach(function(t){flexibility.updateLengthCache(t)}),e.children.sort(function(t,e){return t.style.order-e.style.order||t.index-e.index}),/-reverse$/.test(i.flexDirection)&&(e.children.reverse(),i.flexDirection=i.flexDirection.replace(/-reverse$/,""),"flex-start"===i.justifyContent?i.justifyContent="flex-end":"flex-end"===i.justifyContent&&(i.justifyContent="flex-start")),flexibility.updateLengthCache(e),delete e.lastLayout,delete e.layout;var o=i.borderTopWidth,l=i.borderBottomWidth;i.borderTopWidth=0,i.borderBottomWidth=0,i.borderLeftWidth=0,"column"===i.flexDirection&&(i.width-=i.borderRightWidth),flexibility.computeLayout(e),t.runtimeStyle.cssText="box-sizing:border-box;display:block;position:relative;width:"+(e.layout.width+i.borderRightWidth)+"px;height:"+(e.layout.height+o+l)+"px";var a=[],d=1,s="column"===i.flexDirection?"width":"height";e.children.forEach(function(t){a[t.lineIndex]=Math.max(a[t.lineIndex]||0,t.layout[s]),d=Math.max(d,t.lineIndex+1)}),e.children.forEach(function(t){var e=t.layout;"stretch"===t.style.alignSelf&&(e[s]=a[t.lineIndex]),t.node.runtimeStyle.cssText="box-sizing:border-box;display:block;position:absolute;margin:0;width:"+e.width+"px;height:"+e.height+"px;top:"+e.top+"px;left:"+e.left+"px"})}return e}}();


/*!
* jQuery Cookie Plugin v1.4.1
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2006, 2014 Klaus Hartl
* Released under the MIT license
*/
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
