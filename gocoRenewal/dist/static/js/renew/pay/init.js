$(function() {
    wayChk();
});

// 결제수단 라디오 박스 클릭시 아래 텍스트 변 노출 변경
function wayChk() {
    var ac = $(".area-chk"),
        at = $(".area-txt");

        ac.find("li label").click(function() {
            var idx = $(this).closest("li").index();

            at.find("li").eq(idx).addClass("on").siblings().removeClass("on");
        });
}
