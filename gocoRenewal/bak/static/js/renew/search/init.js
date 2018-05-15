$(function () {

	var moHeight = $(window).height() - 205;
	//console.log(moHeight);
	var mHeight = $("#rnL-mOuter #map, #rnL-fOuter").height(moHeight);
	$("#rnL-mOuter, #rnL-fOuter").css({
		"position": "fixed",
		"right": 0,
		"top": "205px",
		// "top": "245px",
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
		if($(this).hasClass("on")) {//열렸다 닫혔다하게
			$(this).removeClass("on");
			$("#rnL-fOuter").hide();
			$("body").addClass("ft-none");
		} else {
			$(this).toggleClass('on');
			$("#rnL-fOuter").show();
			$("body").removeClass("ft-none");
		}
	});

	// 필터창 닫기 및 상품 가운대 정렬 효과
	$("#rnL-fOuter .ft-clsBtn").on("click", function() {
		$("#rnL-fOuter").hide();
		$("body").addClass("ft-none");
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
		max: 1000000,
		from: 0,
		to: 1000000,
		prefix: "￦ ",
		decorate_both: true,
		step: 10000,
		prettify_enabled: true,
    	prettify_separator: ",",
		values_separator: " ~ ",
		onStart : price_change,
		onChange : price_change
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

var $inputFrom = $(".js-input-from"),
$inputTo = $(".js-input-to")

function price_change(data){
	from = data.from;
	to = data.to;
	//alert(from+"||"+to+"||"+data);

	/*$inputFrom.prop("value", from);
	$inputTo.prop("value", to);	*/
	$("input[name='min_price']").val(from);
	$("input[name='max_price']").val(to);
	//main_list_renew();//너무느림

}
