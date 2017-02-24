/**
 * Created by SWSD on 2017-02-23.
 */
/*轮播动画*/
var galleryTop = new Swiper('.gallery-top', {
    loop: true,
    speed: 1000,
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    },

});
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 16,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;



/*整体网页滚动，细节动画*/
var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
});
wow.init();

/*===header====begin=====*/
// 滚动条滚动header透明度渐变
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;


    if (scrollTop > 2 * 14) {
        $("header").css("background", "rgba(255,255,255,1)");
        scrollTop=null;
        return ;
    } else {
        $("header").css("background", "rgba(255,255,255,0.2)")
    }
};

//==========header====end=======================