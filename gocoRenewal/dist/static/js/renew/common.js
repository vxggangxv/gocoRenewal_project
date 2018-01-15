$(function() {
	// 카테고리 클릭 이벤트
	$("#rnL-ctgr .ul1 > li > a").on('click', function () {
		var idx = $(this).parent().index();
		$(this).parent().addClass('on').siblings().removeClass('on');
	});
	
	// 배경 클릭 시
	$('#backDrop').click(function() {
		$('#rnL-ts .rnSltCal').hide();
		$('#rnL-ts .rnSltReg').hide();
		$(this).hide();
	});
	
	// 달력 등장
	$('#rnL-ts .d1 .i-gCal, #rnL-ts .d1 span[class*=Date]').click(function() {
		if ($('#rnL-ts .rnSltCal').css('display') == 'block') {
			$('#rnL-ts .rnSltCal').hide();
		} else {
			$('#backDrop').show();
			$('#rnL-ts .rnSltReg').hide();
			$('#rnL-ts .rnSltCal').fadeIn();
		}
	});
	// 선택완료 클릭시
	$("#rnL-ts .rnSltCal .d-area .a2").on('click', function() {
		$("#rnL-ts .rnSltCal").hide();
		$("#backDrop").hide();
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

	


	$('#schBor input').click(function() {
		if ($(this).closest('div.schBox').find('.schEx').css('display') == 'block') {
			$(this).closest('div.schBox').find('.schEx').hide();
		} else {
			$(this).closest('div.schBox').find('.schEx').fadeIn();
		}
	});
	$('#schBor input').focusout(function() {
		$(this).closest('div.schBox').find('.schEx').fadeOut('fast');
	});




});

