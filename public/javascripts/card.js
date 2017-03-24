/**
 * Created by SWSD on 2017-03-03.
 */

// layer.tips('点我', '.btn-order', {
//     tips: [4, '#78BA32'],
//     time:3000
// });



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
    if(_this.attr('src')=="/icon/save.png"){
        /*收藏============*/
        $.get(`/card/save?tid=${tid}`,function (data) {
            if(data.code==200){
                layer.msg('收藏成功',{icon:1,time:500});
                _this.attr('src','/icon/saved.png');
                $("#save-num").text(data.savenum)
            }else if(data.code==300){
                layer.alert('请先登录')
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
                $("#save-num").text(data.savenum)
            }else if(data.code==300){
                layer.alert('请先登录')
            }else{
                layer.msg('服务器连接出错，请稍后',{
                    icon:2,time:1000
                })
            }
        })
    }

}

/*打开下单窗口*/
function orderDiolog(face,title,addr,price,tid) {

    $.get('/isLogin',function (data) {
        if(data.code==200){
            let content=`<div class="md-content">
        <h3>租 Ta</h3>
        <div>
            <div class="order-content">
                <dl class="pic">
                    <dt>
                        <a href="#"><img src="${face}"></a>
                    </dt>
                    <dd>
                        <h2><a href="#">${title}</a></h2>
                        <span class="address"><i></i>${addr}</span>
                        <span class="price" style="margin-left: 2rem"><strong>￥</strong>${price}元/次</span>
                    </dd>
                </dl>
            </div>
            <form action="javascript:;" id="frm-order">
                <ul>
                    <li>
                        <label for="appointment">预约时间：</label>
                        <input id="appointment" onclick="laydate({
                                    elem: '#appointment',
                                    istime:true,
                                    format: 'YYYY-MM-DD hh:mm', // 分隔符可以任意定义，该例子表示只显示年月
                                    festival: true, //显示节日
                                    min: laydate.now()
                                })" 
                                name="appointment" placeholder="选择准确时间"/></li>
                    <li>
                        <small>温馨提示：下单成功，双方沟通达成一致后，方可见面</small>
                    </li>
                    <li>
                </ul>
            </form>
        </div>
    </div> `;
            layer.open({
                type: 1
                ,title: false //不显示标题栏
                // ,closeBtn: true
                ,area:'500px'
                ,shade: 0.8
                ,id: 'modal-order' //设定一个id，防止重复弹出
                ,resize: false
                ,btn: ['租Ta', '不租了']
                ,btnAlign: 'c'
                ,moveType: 1 //拖拽模式，0或者1
                ,content: content
                ,yes: function(){
                    order(tid,price)
                }
            });
        }else{
            layer.alert('请先登录')
        }
    })


}
/*提交order*/

function order(tid,price) {
    if($("#appointment").val()==''){
        layer.msg('请输入预约时间',{time:1000});
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
            layer.load();
            // 禁用按钮防止重复提交，发送前响应
            $("#btn-sendOrder").attr({ disabled: "disabled" });

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
            layer.closeAll('loading');
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