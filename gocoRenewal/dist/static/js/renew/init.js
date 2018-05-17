$(function() {
	
	//함수 실행
	randomBanner(); //배경 랜덤
    
    if( $('div').hasClass('rnM-mainDoor') ){
    //기존 디자인 js
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
                $(this).closest('div').next().show();
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
                $('#rn-schBox .rnSltReg, #rn-schBox [class^=rnSltCtg]').hide();
                $('#rn-schBox .rnSltCal').fadeIn(300);
                cal_ajax();
            }
        });
        
        // 유형선택 등장
        $('#rn-schBox .d3').click(function() {
            if ($('#rn-schBox [class^=rnSltCtg]').css('display') == 'block') {
                $('#rn-schBox [class^=rnSltCtg]').hide();
            } else {
                $('#backDrop').show();
                $('#rn-schBox [class*=rnSlt]').hide();
                $('#rn-schBox [class^=rnSltCtg]').fadeIn(300);
            }
        });
        // 유형선택 토글 온 기능
        toggleOn("#rn-schBox [class^=rnSltCtg] .ul1 > li > a");

        $('#rn-schBox .rnSltCtg > ul > li > a').click(function() {
            var thTxt = $(this).text();
            $('#rn-schBox .d3 .p1').text(thTxt);
            $('#rn-schBox .rnSltCtg').hide();
        });
        
    }else{
    //180515 변경된 디자인 js
        
        //배경 클릭 시
        $('#backDrop').click(function() {
            $('.rnSltCal, .slt-dep2').hide(); //배경 클릭시 달력과, 지역선택 세부메뉴 닫음
            $(this).hide();
        });
        
        //탭+내용
        var rnMenuList = new Array(
            ['숙소명, 시설명 등을 입력해주세요.'],
            ['레저유형, 시설명 등을 입력해주세요.'],
            ['공연/전시, 시설명 등을 입력해주세요.']
        );

        $('#rn-schBox .rn-menu li').click(function(){
            var liIdx = $(this).index()+1;

            $(this).addClass('on').siblings().removeClass('on');
            
            $(this).siblings().css({'border-top' : '2px solid #c5bac1'});
            $(this).css({'border-top' : '2px solid #9f7d91'}).next().css({'border-top' : '2px solid #9f7d91'});
            $('#rn-schBox .rn-menu li:first-child').css({'border-top' : '0'});

            $('.rnSltCal, .slt-dep2').hide();
            $('#rn-schBox .cal-box > div[class*=cal-], #rn-schBox .type-box div[class*=type-], #rn-schBox .reg-box div[class*=reg-]').hide();

            $('#rn-schBox .type-box div[class*=type-'+liIdx+']').show();//유형

            //숙박 유형
            if( liIdx == 1 || liIdx == 4 ){
                $('#rn-schBox .kw-box .kw-input input').attr('placeholder', rnMenuList[0]);

                $('#rn-schBox .cal-box > div.cal-1').show();//달력

                if( liIdx == 1 ){
                    $('#rn-schBox .reg-box div.reg-1').show();//지역
                }else{
                    $('#rn-schBox .reg-box div.reg-2').show();
                }
            }else{
                //그 외
                $('#rn-schBox .cal-box > div.cal-2').show();
                $('#rn-schBox .reg-box div.reg-1').show();
                
                if( liIdx == 3 ){
                    $('#rn-schBox .kw-box .kw-input input').attr('placeholder', rnMenuList[2]);
                }else{
                    $('#rn-schBox .kw-box .kw-input input').attr('placeholder', rnMenuList[1]);
                }
            }

        });
        
        // 지역 모달 /기존 js 숨김처리
        $('#rn-schBox .rnSltReg .slt-dep1 > ul > li').on('click',function() {
            $(this).addClass('on').siblings().removeClass('on');
            
            var dep2 = $(this).parents('.rnSltReg').find('.slt-dep2');
            var maxLiWid = 0;
            
            dep2.show();
            $('#backDrop').show();
            $('.rnSltCal').hide();
            
            for( var i = 0 ; i < dep2.find('li').length-1 ; i++ ){
                if( maxLiWid <=  dep2.find('li:eq('+ i +') a').outerWidth() ){
                    maxLiWid = dep2.find('li:eq('+ i +') a').outerWidth()
                    console.log(i, maxLiWid);
                }
            }
            dep2.find('li a').css({'width' : maxLiWid+'px'});
            
            $('#rn-schBox .rnSltReg .slt-dep2 > ul > li').on('click', function() {
                $(this).addClass('on').siblings().removeClass('on');
            });

        });
        
        // 달력 등장
        $('#rn-schBox .d2').click(function() {
            if ($('#rn-schBox .rnSltCal').css('display') == 'block') {
                $('#rn-schBox .rnSltCal').hide();
            } else {
                $('#backDrop').show();
                $('#rn-schBox [class^=rnSltCtg]').hide();
                $('#rn-schBox .rnSltReg .slt-dep2').hide();
                $('#rn-schBox .rnSltCal').fadeIn(300);
                cal_ajax();
            }
        });
        
        //유형선택 토글 온
        toggleOn("#rn-schBox .type-box li > a");
    }

    
    // 선택완료 클릭 시
    $("#rn-schBox .rnSltCal .a2").on('click', function() {
        chk_date();
        $(".rnSltCal").hide();
        $('#backDrop').hide();
    });

	// 객실/인원 선택 등장
	$('#rn-schBox .d4').click(function() {
		if ($('#rn-schBox .rnSltNum').css('display') == 'block') {
			$('#rn-schBox .rnSltNum').hide();
		} else {
			$('#backDrop').show();
			$('#rn-schBox [class*=rnSlt]').hide();
			$('#rn-schBox .rnSltNum').fadeIn(300);
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
		duration: 6000,
		prevText: '<img src="http://img.go.co.kr/renew/common/btn_prev2.png" alt="이전">',
		nextText: '<img src="http://img.go.co.kr/renew/common/btn_next2.png" alt="다음">'
	});


});

// 페이지 로드마다 메인 배경 및 텍스트 랜덤하게 등장
function randomBanner(){
	var mainList = new Array(
		['지금 예약한다면 슈퍼 그뤠잇!', '여행 가라고 등 떠미는 고코투어 특가!'],
		['이렇게 아름답고 새로운 봄!', '고코투어 할인쿠폰으로 어디든 떠나세요!'],
		['제주만의 아름다운 바다와 꽃 !', '제주 유채꽃 축제로 떠나보는 건 어떨까요?'],
		['봄바람 살랑 살랑~ 어디든 나서야겠죠?', '고코투어의 초특급 할인으로 즐거운 여행'],
		['두근 두근 가슴설레는 봄바다 !', '고코가 엄선한 테마별 투어를 만나보세요!'],
		['나의 봄날에 떠나는 여행', '당신의 봄여행에 특별함을 도와드릴게요!'],
		['봄여행을 특별하게 만드는 방법', '테마 별 다양한 투어 지금 떠나세요!']
	);
	var randomTxt = Math.floor(Math.random()*mainList.length);
	var randomNum = Math.floor(randomTxt)+1;

	$('.main-text').find('.s1').text(mainList[randomTxt][0]).end().find('.s2').text(mainList[randomTxt][1]);
    $('div[class^=rnM-mainDoor]').css({'background-image': 'url(http://img.go.co.kr/renew/mainDoor_0'+randomNum+'.jpg)', "background-size":"cover"});
}

function cal_ajax() {
	$.ajax({
		type	:	"POST",
		url		:	"/state.php",
		data	:	$("form[name='date_form']").serialize(),
		success	:	function(e) {
			$("#rnSltCal").html(e);
			if($("input[name='month']").val() == 0) {
				$("#rnSltCal2").html(e);
				$("#rnSltCal").html("");
			}
		}
	})
}

function area_ajax(val, first) {
	$.ajax({
		type	:	"POST",
		url		:	"/state.php",
		data	:	{"mode":"area_div", "area":val, "first_chk":first},
		success	:	function(e) {
			$(".slt-dep2").html(e);
		}
	})
}

