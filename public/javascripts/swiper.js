/**
 * Created by SWSD on 2017-02-23.
 */
/*轮播动画*/
var galleryTop = new Swiper('.gallery-top', {
    loop: true,
    speed: 1000,
    autoplay: 5000,
    lazyLoading : true,
    lazyLoadingInPrevNext : true,
    // mousewheelControl : true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    effect: 'fade',
    onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    },

});

/*整体网页滚动，细节动画*/
var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
});
wow.init();