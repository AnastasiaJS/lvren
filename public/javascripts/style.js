
/*===header====begin=====*/
// 滚动条滚动header透明度渐变
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;


    if (scrollTop > 2 * 14) {
        $("header").css("background", "rgba(255,255,255,1)");
        scrollTop=null;
        return ;
    } else {
        $("header").css("background", "rgba(255,255,255,0)")
    }
};

//==========header====end=======================
//==========music-control====start=======================

function aud_play() {
    document.getElementById("aud").play();
    $("#play").css("display","none");
    $("#pause").css("display","block");
    $("[id^='ani']").css("animation-iteration-count","infinite");
}
function aud_pause() {
    document.getElementById("aud").pause();
    $("#play").css("display","block");
    $("#pause").css("display","none");
    $("[id^='ani']").css("animation-iteration-count","0");

}

function openCard() {
    location.href='/card'
}