$(function() {
	
	// 배경 클릭 시
	$('#backDrop').click(function() {
		$('#rn-schBox [class*=rnSlt]').hide();
		$('#rn-schBox .rnSltReg').hide();
		$(this).hide();
	});
	
	
	// 지역선택 등장
	$('#rn-schBox .d1').click(function() {
		if ($('#rn-schBox .rnSltReg').css('display') == 'block') {
			$('#rn-schBox .rnSltReg').hide();
		} else {
			$('#backDrop').show();
			$('#rn-schBox [class*=rnSlt]').hide();
			$('#rn-schBox .rnSltReg').fadeIn();
			
		}
	});
	// 지역 모달
	$('#rn-schBox .rnSltReg .slt-dep1 > ul > li').on('click',function() {
		$(this).addClass('on').siblings().removeClass('on');
		$(this).closest('div').next().show();
		var thTxt = $(this).find('a').text();
		
		$('#rn-schBox .rnSltReg .slt-dep2 > ul > li').on('click', function() {
			var thTxt2 = $(this).find('a').text();
			$('#rn-schBox .d1 .p1 .regName').text(thTxt);
			$('#rn-schBox .d1 .p1 .regDetail').text(thTxt2);
			
			$('#rn-schBox .rnSltReg').hide();
		});
		
	});
	
	
	// 달력 등장
	$('#rn-schBox .d2').click(function() {
		if ($('#rn-schBox .rnSltCal').css('display') == 'block') {
			$('#rn-schBox .rnSltCal').hide();
		} else {
			$('#backDrop').show();
			$('#rn-schBox .rnSltReg, #rn-schBox .rnSltCtg').hide();
			$('#rn-schBox .rnSltCal').fadeIn();
		}
	});
	
	// 선택완료 클릭 시 
	$("#rn-schBox .rnSltCal .a2").on('click', function() {
		$(".rnSltCal").hide();
		$('#backDrop').hide();
	});
	
	// 유형선택 등장
	$('#rn-schBox .d3').click(function() {
		if ($('#rn-schBox .rnSltCtg').css('display') == 'block') {
			$('#rn-schBox .rnSltCtg').hide();
		} else {
			$('#backDrop').show();
			$('#rn-schBox [class*=rnSlt]').hide();
			$('#rn-schBox .rnSltCtg').fadeIn();
		}
	});
	$('#rn-schBox .rnSltCtg > ul > li > a').click(function() {
		var thTxt = $(this).text();
		$('#rn-schBox .d3 .p1').text(thTxt);
		$('#rn-schBox .rnSltCtg').hide();
	});
	
	// 객실/인원 선택 등장
	$('#rn-schBox .d4').click(function() {
		if ($('#rn-schBox .rnSltNum').css('display') == 'block') {
			$('#rn-schBox .rnSltNum').hide();
		} else {
			$('#backDrop').show();
			$('#rn-schBox [class*=rnSlt]').hide();
			$('#rn-schBox .rnSltNum').fadeIn();
		}
		
	});
	
	
	// 지역선택, 달력, 유형선택, 객실/인원 선택 등장
	/*$('#rn-schBox .rn-schInner > div').click(function() {
		var idx = $(this).index();
		$('#backDrop').show();
		
		if (idx >= 2) {
			idx --;
		}
		$('#rn-schBox .rnModal-sec > div').eq(idx).fadeIn().siblings().hide();
		
	});*/
	
	
	// 배너 슬라이더
	$('#bnSlider-1').bxSlider({
		auto: true,
		speed: 500,
		duration: 6000,
		prevText: '',
		nextText: ''
	});
	
	
});