$(function () {

	var moHeight = $(window).height() - 205;
	//console.log(moHeight);
	var mHeight = $("#rnL-mOuter #map, #rnL-fOuter").height(moHeight);
	$("#rnL-mOuter, #rnL-fOuter").css({
		"position": "fixed",
		"right": 0,
		"top": "205px",
		"width": "40.5%"
	});

	
	// 검색결과 예약현황 퍼센트 애니메이션
    activeInfo();
    
	/*함수 정의*/
	function activeInfo () {

		var $charts     = $( '#reserChart' );

		/*원형 차트 처리*/
		$charts.each( function () {

			var $chart  = $( this ),
			$circleTop= $chart.find( '.top .circle-inner')
			.css( { transform: 'rotate(0)' } ),

			/*백분율 값 가져오기*/
			$percentNumber  = $chart.find( '.percent-number' ),
			percentData     = $percentNumber.text();

			/*백분율 값의 초기값 지정*/
			$percentNumber.text( 0 );


			/*각도 애니메이션*/
			$( { percent: 0 } ).delay( 500 ).animate( {
				percent: percentData
			}, {
				duration: 1500,
				progress: function () {
					var now      = this.percent,
					deg      = now * 180 / 100,
					degBottom = Math.min( Math.max( deg, 0 ), 180 );

					$circleTop.css( {
						transform: 'rotate(' + degBottom + 'deg)'
					} );
					
					$percentNumber.text( Math.floor( now ) );
				}
			} );
		} );        
	}
	
	

	// 필터보기/ 지도보기 클릭이벤트
	$("#rnL-ctgr .slt-mf").on('click', function () {
		$(this).toggleClass('on');
	});

	// 정렬박스 텍스트 조절
	$("#drop-box").on('click', function () {
		$(this).toggleClass('on');
	});
	$("#drop-box .drop-menu a").click(function () {
		var txt = $(this).text();
		console.log(txt);
		var sTxt = "정렬: " + txt;
		$("#drop-box .drop-btn .s-txt").text(sTxt);
	});

	// 즉시예약 가능한 체크박스 커스터마이즈
	$(".ipCst label").on('click', function () {
		if (!$(this).closest('.ipCst').find('input').prop('checked')) {
			$(this).closest('.ipCst').find('input + label').addClass('on');
		} else {
			$(this).closest('.ipCst').find('input + label').removeClass('on');
		}
	});
	
	// 호텔 등급 선택 시
	$("#htGrdBox > .ht-grd").on("click", function() {
		$(this).addClass('on').siblings().removeClass('on');
	});
	
	// 필터링 range slider
	$("#prc-range").ionRangeSlider({
		type: "double",
		min: 0,
		max: 1026697,
		from: 159290,
		to: 723611,
		prefix: "￦ ",
		decorate_both: true,
		step: 1000,
		prettify_enabled: true,
    	prettify_separator: ",",
		values_separator: " ~ "
	});
	
	$("#score-range").ionRangeSlider({
		type: "double",
		min: 0,
		max: 10,
		from: 7.5,
		to: 10,
		postfix: "점",
		decorate_both: true,
		step: 0.1,
		prettify_enabled: true,
    	prettify_separator: ".",
		values_separator: " ~ "
	});
	

	

	// 이미지 로딩 최적화
	$("#rnL-listOuter img.itm-img").lazyload({
		effect: "fadeIn"
	});
	
	

});
