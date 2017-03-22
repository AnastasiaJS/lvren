/**
 * Created by SWSD on 2017-03-03.
 */

/*下单时间控件*/
laydate({
    elem: '#appointment',
    istime:true,
    format: 'YYYY-MM-DD hh:mm', // 分隔符可以任意定义，该例子表示只显示年月
    festival: true, //显示节日
    min: laydate.now(),
    choose: function(datas){ //选择日期完毕的回调
//            alert('得到：'+datas);
    }

});

/*顶部轮播图片*/
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,
    autoplay: 5000,
    mousewheelControl : true,
    lazyLoading : true,
    lazyLoadingInPrevNext : true,
    // 如果需要滚动条
    scrollbar: '.swiper-scrollbar',
});

/*喜欢card===================*/
function save() {
    let _this=$("#save-img");
    if(_this.attr('src')=="/icon/saved.png"){
        _this.attr('src','/icon/save.png')
    }else{
        _this.attr('src',"/icon/saved.png")
    }

}
/*提交order*/

function order(tid) {
    if($("#appointment").val()==''){
        alert("请输入预约时间")
        return false;
    }
    let formdata=new FormData($("#frm-order")[0]);
    formdata.append("tid",tid)
    $.ajax({
        url: '/users/order',
        type: 'POST',
        data: formdata,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#add-tip').text('上传中...');
            // 禁用按钮防止重复提交，发送前响应
            $("#bbtn-sendOrder").attr({ disabled: "disabled" });

        },
        success: function (data) {

            if (200 === data.code) {
                alert('订单已提交，可前往个人订单列表与Ta联系')
            } else {
                alert("服务器连接失败，请稍后~")
            }
        },
        complete: function () {//完成响应
            $("#frm-order .md-close").click();/*关闭模态框*/
            $("#btn-sendOrder").removeAttr("disabled");
        },
        error: function () {
            alert("与服务器通信发生错误!");
        }
    });
}