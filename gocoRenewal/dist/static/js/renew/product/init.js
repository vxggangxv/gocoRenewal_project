$(function() {
	$("#bxS-1").bxSlider({
		pagerCustom: "#bxP-1",
		captions: true,
		auto: true,
		duration: 3000
	});
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		autoplay_slideshow: true,
		animation_speed: 'fast',
		slideshow: 3000,
		social_tools:'',
		opacity: 0.30, 
		allow_resize: true
		//show_title: true, 
		//default_width: 500
	});
	
	// 상품정보창 달력 등장
	$("#prd-infBox .d-date .d-date-1, #prd-infBox .d-date .d-date-3").on('click', function() {
		var backDrop = $("<div class='backDrop'></div>");
		if ($("#prd-sltCal").css('display') == 'block') {
			$("#prd-infBox .d-date .d-date-1, #prd-infBox .d-date .d-date-3").removeClass('on');
			
			$("#prd-sltCal").hide();
			$('#prd-infBox .backDrop').remove();
		} else {
			$("#prd-infBox .d-date .d-date-1, #prd-infBox .d-date .d-date-3").addClass('on');
			
			backDrop.insertBefore($('#prd-infBox .d-date'));
			$("#prd-sltCal").fadeIn();
		}
	});
	// 선택완료 클릭 시 
	$("#prd-sltCal .d-area .a2").on('click', function() {
		$("#prd-infBox .d-date .d-date-1, #prd-infBox .d-date .d-date-3").removeClass('on');
		$("#prd-sltCal").hide();
		$('#prd-infBox .backDrop').remove();
	});
	// 배경 클릭 시
	$('#prd-infBox').on('click', '.backDrop', function() {
		$("#prd-infBox .d-date .d-date-1, #prd-infBox .d-date .d-date-3").removeClass('on');
		$("#prd-sltCal").hide();
		$(this).remove();
	});
	
	// 날짜확인, 객실확인 클릭시 스크롤 이동
	$("#prd-buy .btn-chk").on('click', function() {
		var scrTop = $("#prd-buy").offset().top;
		$("html, body").stop().animate({scrollTop: 699},200);
	});
	
	// 스크롤 이동시 날짜확인, 하단 픽스
	$(window).scroll(function() {
		var scr = $(window).scrollTop();
		
		//console.log(scr);
		if (scr == 700) {
			$("#sec-prd-buy").hide();
		}
		if (scr >= 700) {
			$("#sec-prd-buy").fadeIn('fast');
			$("#sec-prd-buy").addClass('affix');
			$("#sec-prd-list").css("margin-top", "90px");
		} else {
			$("#sec-prd-buy").removeClass('affix');
			$("#sec-prd-list").css("margin-top", "0px");
		}
		
		
	});
	
	// APP 예약 클릭 시
	$("#prd-tb .app-bk").on("click", function() {
		$("#app_download_pop").show();
	});
	
	// STEP2 패키지 선택 높이 조절
	$.each($("#prd-tb .trd-comp-1"), function() {
		var c1_ht = $("#prd-tb .trd-comp-1").height();
			$("#prd-tb .trd-comp-1").siblings().css({
			"min-height": c1_ht
		});
	});
	
	// STEP3 패키지 이용안내 설명 높이 조절
	$.each($("div[id^=part-con] .pkg-con .con-1"), function() {
		var c2_ht = $(this).height() + 1;
		$(this).next().height(c2_ht);
	});
	
	// 상품 클릭시 줄 선택
	$("#prd-tb .d-item .tr li.nth-1 .s-name").on("click", function() {
		var target = $(this).closest('.d-item');
		target.toggleClass('on').siblings().removeClass('on');
		
		// 상세 선택 등장
		target.siblings().find('.tr-detail').removeClass('on');
		target.find('.tr-detail').toggleClass('on');
		var c1_ht = $(this).closest('.d-item').find('.tr-detail').find('.trd-comp-1').height();
		target.find('.tr-detail').find('.trd-comp-1').siblings().css({
			"min-height": c1_ht
		});
		
		// 클릭 시 스크롤 이동
		var scrTg = $(this).closest('.d-item').find('.tr').offset().top - 64;
		//console.log(scrTg);
		$(window).scrollTop(scrTg);
		
	});
	
	// 패키지 선택 시 기능
	$("#prd-tb .trd-comp-2 span.lbl").on("click", function() {
		$(this).closest("li").toggleClass("on");
		$(this).closest("ul").toggleClass("on");
		var isChecked = $(this).prev().prop("checked");
		isChecked = !isChecked;
		$(this).prev().prop("checked", isChecked);
		/*if( isChecked ){
			$(this).closest("li").find(".slt-drop").addClass("on");
		} else {
			$(this).closest("li").find(".slt-drop").removeClass("on");
		}*/
		var c2_ht = $(this).closest('li').find('.pkg-con .con-1').height() + 1;
		$(this).closest('li').find('.pkg-con .con-1').next().height(c2_ht);
	});
	$("#prd-tb .trd-comp-2 input[type=checkbox]").on("click", function() {
		$(this).closest("li").toggleClass("on");
		$(this).closest("ul").toggleClass("on");
		$("#pdtSlt-pb").toggleClass("on");
		var isChecked = $(this).prop("checked");
		/*if( isChecked ){
			$(this).closest("li").find(".slt-drop").addClass("on");
		} else {
			$(this).closest("li").find(".slt-drop").removeClass("on");
		}*/
		var c2_ht = $(this).closest('li').find('.pkg-con .con-1').height() + 1;
		$(this).closest('li').find('.pkg-con .con-1').next().height(c2_ht);
	});
	
	// 상품소개 탭
	$("#area-prd-detail .ul-tab > li").on("click", function() {
		var idx = $(this).index();
		
		$(this).addClass('on').siblings().removeClass('on');
		$("#area-prd-detail .ul-contents > li").eq(idx).addClass('on').siblings().removeClass('on');
	});
	
	// 이용후기
	$("#t-review .tr-tit").on("click", function() {
		
		$(this).toggleClass('on').siblings().removeClass('on');
		$("#t-review .tr-cont").hide();
		if ( $(this).hasClass('on') ) {
			$(this).next().show();
		} else {
			$(this).next().hide();
		}
	});
	
	// 페이지네이션
	$("div[id^=pagenation] a").on('click', function() {
		$(this).addClass('on').siblings().removeClass('on');
	});
	
	// 문의등록
	$("#area-prd-detail .li-contact .d-box-2 .inp-box").click(function() {
		$(this).find(".s-ph").hide();
		$(this).find(".write-area").focus();
	});
	
	// 자주묻는질문
	$("#faq table tr:odd").click(function() {
		var scr = $(this).offset().top;
		$(window).scrollTop(scr);
		
		$(this).toggleClass('on').siblings().removeClass('on');
		
		$("#faq table tr:even").hide();
		if ( $(this).hasClass('on') ) {
			$(this).next().show();
		} else {
			$(this).next().hide();
		}
	});
	$("#faq .faq_more .btn-q").click(function() {
		$('#qna-pop-bg').show();
		return false;
	});
	$("#faq .faq_more .btn-x").click(function() {
		$(this).closest('tr').hide();
		return false;
	});
})

