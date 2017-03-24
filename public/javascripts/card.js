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
function save(tid) {
    let _this=$("#save-img");
    console.log(_this.attr('src'));
    if(_this.attr('src')=="/icon/save.png"){
        /*收藏============*/
        $.get(`/card/save?tid=${tid}`,function (data) {
            if(data.code==200){
                layer.msg('收藏成功',{icon:1,time:500});
                _this.attr('src','/icon/saved.png');
            }else if(data.code==300){
                layer.msg('您尚未登录',{icon:0,time:500})
            }else{
                layer.msg('服务器连接出错，请稍后',{
                    icon:2,time:1000
                })
            }
        })
    }else{
        /*取消收藏========*/
        $.get(`/card/cancelsave?tid=${tid}`,function (data) {
            if(data.code==200){
                _this.attr('src','/icon/save.png');
                layer.msg('取消收藏',{icon:1,time:500});
            }else if(data.code==300){
                layer.msg('您尚未登录',{icon:0,time:500})
            }else{
                layer.msg('服务器连接出错，请稍后',{
                    icon:2,time:1000
                })
            }
        })
    }

}
/*提交order*/

function order(tid,price) {
    if($("#appointment").val()==''){
        layer.msg('请输入预约时间');
        return false;
    }
    let formdata=new FormData($("#frm-order")[0]);
    formdata.append("tid",tid)
    formdata.append("price",price)
    $.ajax({
        url: '/users/order',
        type: 'POST',
        data: formdata,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            // $('#add-tip').text('上传中...');
            layer.msg('上传中', {
                icon: 16
                ,shade: 0.01
            });
            // 禁用按钮防止重复提交，发送前响应
            $("#bbtn-sendOrder").attr({ disabled: "disabled" });

        },
        success: function (data) {

            if (200 === data.code) {
                layer.alert('订单已提交，可前往个人订单列表与Ta联系', {
                    skin: 'layui-layer-molv' //样式类名
                    ,closeBtn: 0
                    ,icon:1
                });
            } else {
                layer.alert('服务器连接失败，请稍后~', {
                    skin: 'layui-layer-molv' //样式类名
                    ,closeBtn: 0
                    ,icon:0
                });
            }
        },
        complete: function () {//完成响应
            $("#frm-order .md-close").click();/*关闭模态框*/
            $("#btn-sendOrder").removeAttr("disabled");
        },
        error: function () {
            layer.alert('与服务器通信发生错误!', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 0
                ,icon:2
            });
        }
    });
}