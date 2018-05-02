$(function() {

	// Top 위로 버튼
	$("#goTop").on("click", function() {
		$("html, body").animate({ scrollTop: 0 }, 500);
		return false;
	});
	$(window).on('scroll', function() {
		var scr = $(window).scrollTop(),
			winHt = $(window).height();
		//var setTop = $("#setTop").offset().top;

		if (scr < winHt) {
			$("#goTop").fadeOut();
		}
		if (scr >= winHt) {
			$("#goTop").fadeIn();
		}
	});

	// 카테고리 클릭 이벤트
	// $("#rnL-ctgr .ul1 > li > a").on('click', function () {
	// 	var idx = $(this).parent().index();
	// 	$(this).parent().addClass('on').siblings().removeClass('on');
	// });
	// 카테고리 클릭 시 밑줄
	toggleOn("#rnL-ctgr .ul1 > li > a", "sib");

	// 배경 클릭 시
	$('#backDrop').click(function() {
		$('#rnL-ts .rnSltCal').hide();
		$('#rnL-ts .rnSltReg').hide();
		$(this).hide();
	});

	// 달력 등장+ 백단에서 처리하게끔 추가
	$('#rnL-ts .d1 .i-gCal, #rnL-ts .d1 span[class*=Date]').click(function() {
		if ($('#rnL-ts .rnSltCal').css('display') == 'block') {
			$('#rnL-ts .rnSltCal').hide();
		} else {
			$('#backDrop').show();
			$('#rnL-ts .rnSltReg').hide();
			$('#rnL-ts .rnSltCal').fadeIn();
			//$('#rnL-ts .rnSltCal').show();
			cal_ajax();
		}
	});

	// 지역선택 등장
	$('#rnL-ts .d1 .i-gSpot, #rnL-ts .d1 span[class*=reg]').click(function() {
		if ($('#rnL-ts .rnSltReg').css('display') == 'block') {
			$('#rnL-ts .rnSltReg').hide();
		} else {
			$('#backDrop').show();
			$('#rnL-ts .rnSltCal').hide();
			$('#rnL-ts .rnSltReg').fadeIn();
		}
	});

	// 지역 모달
	$('#rnL-ts .rnSltReg .slt-dep1 > ul > li').on('click',function() {
		$(this).addClass('on').siblings().removeClass('on');
		$(this).closest('div').next().show();
		var thTxt = $(this).find('a').text();

		$('#rnL-ts .rnSltReg .slt-dep2 > ul > li').on('click', function() {
			var thTxt2 = $(this).find('a').text();
			$('#rnL-ts .d1 .regName').text(thTxt);
			$('#rnL-ts .d1 .regDetail').text(thTxt2);

			$('#rnL-ts .rnSltReg').hide();
		});

	});

	// faq기능
	faq();

	//$('#schBor input').click(function() {//폼태그때매 매칭이안되는거같음
	$("input[name='hotel_detail']").click(function() {
		if ($(this).closest('div.schBox').find('.schEx').css('display') == 'block') {
			$(this).closest('div.schBox').find('.schEx').hide();
		} else {
			top_search();
			$(this).closest('div.schBox').find('.schEx').fadeIn();
		}
	});
	//$('#schBor input').focusout(function() {
	$("input[name='hotel_detail']").focusout(function() {
		$(this).closest('div.schBox').find('.schEx').fadeOut('fast');
	});

});

function top_search() {
	$.ajax({
		type	:	"POST",
		url		:	"/state.php",
		data	:	{"mode":"top_search", "keyword":$("input[name='hotel_detail']").val()},
		success	:	function(e) {
			$(".schEx").html(e);
		}
	})
}


function popOpen(itm) {
	$(itm).show();
	$(itm).on('scroll touchmove mousewheel', function(event){
		event.preventDefault();
		event.stopPropagation();
		return false;
	});
}

function popClose(itm) {
	$(itm).closest(".allPopupWrap").hide().off('scroll touchmove mousewheel');//allPopupWrap 팝업js용도로 쓰이는 class
	//console.log('닫기');
}

function faq(login) {
	var wrap = $("#faqWrap"),
		wrapBack = $("#faqWrap-back"),
		faqBtn = $("#faq-a"),
		qnaPopBack = $("#qna-pop-bg");
	faqBtn.on('click', function() {
		$('body').css({
			"position": "fixed",
			"width": "100%"
		});
		wrapBack.fadeIn();
		$(this).addClass('on');
	});
	wrap.find(".d1").click(function() {
		$(this).next().slideToggle('fast');
		 $(this).toggleClass('on');
	});
	wrap.find(".faq-tab li").click(function() {
		var idx = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		wrap.find(".contents-tab > .faq-main").eq(idx).show().siblings().hide();
		console.log(idx);
		switch(idx) {
			case 0:	$("#subject").val("오션투유리조트 무료숙박권 관련 문의드려요.");	break;
			case 1:	$("#subject").val("도고BS콘도 무료숙박권 관련 문의드려요.");		break;
			case 2:	$("#subject").val("메이힐스리조트 무료숙박권 관련 문의드려요.");	break;
			case 3:	$("#subject").val("연호리조트 무료숙박권 관련 문의드려요.");		break;
		}
	});
	wrap.find(".a-pop").click(function() {
		if($("input[name='faq_login_chk']").val() == "N") {
			var rurl = $("input[name='faq_rurl']").val();
			location.href='/home/member/?dd=RREnSjA=&rurl='+rurl;
		} else {
			qnaPopBack.show();
			wrapBack.hide();
		}
	});
	$("#faqWrap .i-x, #qna-pop-bg .i-x").on('click', function() {
		$('body').css({
			"position": "relative",
			"width": "100%"
		});
		wrapBack.hide();
		qnaPopBack.hide();
		faqBtn.removeClass('on');
	});
}

function toggleOn(itm, type) {
	if (type == "sib") {
		$(itm).on('click', function () {
			/*var idx = $(this).parent().index();
			//$(this).parent().addClass('on').siblings().removeClass('on');	//복수개 선택되게 주석
			if($(this).parent().hasClass("on")) {
				$(this).parent().removeClass("on");
			} else {
				$(this).parent().addClass('on').siblings();
				if($(".ttype_hotel_head").hasClass("on") && $(".ttype_resort_head").hasClass("on") && $(".ttype_motel_head").hasClass("on") && $(".ttype_guest_head").hasClass("on") && $(".ttype_pension_head").hasClass("on") && $(".ttype_single_head").hasClass("on")) {
					$(".ttype_head").removeClass("on");
					$(".ttype_all_head").addClass("on");
				}
				if($(".ttype_hotel").hasClass("on") && $(".ttype_resort").hasClass("on") && $(".ttype_motel").hasClass("on") && $(".ttype_guest").hasClass("on") && $(".ttype_pension").hasClass("on") && $(".ttype_single").hasClass("on")) {
					alert("testing");
					$(".ttype_head").removeClass("on");
					$(".ttype_all_head").addClass("on");
				}
			}*/
		});
	} else {
		$(itm).on('click', function () {
			var idx = $(this).parent().index();
			$(this).parent().toggleClass('on');
		});
	}
}
