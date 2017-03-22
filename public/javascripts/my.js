/**
 * Created by SWSD on 2017-03-14.
 */
/*初始默认“我在租谁”，  “谁在租我” order==1*/
sessionStorage.order = 0;
sessionStorage.otype = -1;

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
};


//个人中心顶部tab切换=======
function changeMy(e) {
    let target = e.target;
    for (let i = 1; i <= 4; i++) {
        $("#tab" + i).removeClass('active');
        $("#order-list").css('display', 'none');
        $("#addCard").css('display', 'none');
        $("#updateCard").css('display', 'none');
        $("#collection").css('display', 'none');
        $("#msg").css('display', 'none');

    }
    switch (target.id) {
        case 'tab1':
            $("#tab1").addClass('active');
            $("#order-list").css('display', 'flex');
            break;
        case 'tab2':
            $("#tab2").addClass('active');
            $("#addCard").css('display', 'block');
            $("#updateCard").css('display', 'block');
            break;
        case 'tab3':
            $("#tab3").addClass('active');
            $("#collection").css('display', 'block');
            break;
        case 'tab4':
            $("#tab4").addClass('active');
            $("#msg").css('display', 'block');
            break;
        default:
            $("#tab1").addClass('active');
            break;
    }
}

function changeOrder(n) {
    sessionStorage.otype = -1;
    for (let i = 0; i < 2; i++) {
        $("#order-menu li").removeClass('active');
    }
    $(`#order-menu li`).eq(n).addClass('active');
    sessionStorage.order = n;
    if (n == 0) {

        $("#order-default").css("display", "block");
        $("#order-man").css("display", "none");
    } else {
        $("#order-filter").html('');
        $("#order-default").css("display", "none");
        $("#order-man").css("display", "block");
        // if (n == 0) {
        //     queren = `<span class="font_c" style="color:red">去联系Ta</span>>`
        // } else if (n == 1) {
        //     btn = ``;
        //     queren = '<span class="font_c" style="color:red">未付款</span>>'
        // } else if (n == 2) {
        //     queren = `<span class="font_c" style="color: green">已付款</span>>`
        // } else if (n == 3) {
        //     btn = ``
        //     queren = `<span class="font_c" style="color: green">已完成</span>>`
        // }
        // if (n == 4) {
        //     queren = `<span class="font_c">已取消</span>>`
        // }
        fliterOrder('-1')
    }
}
function fliterOrder(n) {
    sessionStorage.otype = n;
    let queren = '', btn = '',appointment='';
    for (let i = -1; i < 4; i++) {
        $("#filter-order" + i).removeClass('on');
    }
    $("#filter-order" + n).addClass('on');
    if (sessionStorage.order == 0) {

        $.get(`/users/getOrder?order=${sessionStorage.order}&otype=${n}`, function (data) {
            if (200 === data.code) {
                let order = data.order;
                $("#order-default").css("display", "none");
                $("#order-filter").html('');
                for (var i = 0; i < order.length; i++) {
                    let state = order[i].State;
                    if (state == -1) {
                        $("#order-filter").html('');
                        $("#order-default").css("display", "block");
                    } else if (state == 0) {
                        queren = `<span class="font_c" style="color:red">未付款</span>>`
                    } else if (state == 1) {
                        btn = `<a class="btn comment_order">付款</a>`;
                        queren = ''
                    } else if (state == 2) {
                        queren = `<span class="font_c" style="color: green">已付款</span>`
                    } else if (state == 3) {
                        btn = `<a class="btn comment_order">评价</a>`
                        queren = `<span class="font_c" style="color: green">已完成</span>`
                    } else if (n == state) {
                        queren = `<span class="font_c">已取消</span>`
                    }
                    $("#order-filter").append(`<div class="order">
            <div class="ord_top">
                <span class="time">${order[i].OrderTime}</span><span>订单号：${order[i].Oid}</span>
                <span class="name">当地人：<a href="/rent/detail-9.html">${order[i].Name}</a></span>
                <span class="contact" title="联系Ta" data-num="mazzysr"><i></i>联系Ta</span>
            </div>
            <div class="ord_bottom">
                <dl class="pic">
                    <dt>
                        <a href="/card?card=${order[i].Uid}"><img
                                src="${order[i].Face}"
                                alt="" width="100%"></a>
                    </dt>
                    <dd>
                        <h2><a href="/rent/detail-9.html">${order[i].Title}</a></h2>
                        <p class="address"><i></i>${order[i].Addr}</p>
                        <p class="time">预约时间：${order[i].Appointment}</p>
                        <p class="place">见面地点：待确认</p>
                    </dd>
                </dl>
                <div class="ord_c">
                      ${queren}      
                          
                </div>
                <div class="ord_r">
                    <div class="price">商议价格 <span class="money">￥ <b>${order[i].Price}</b></span></div>

                    ${btn}
                    <a class="btn delete_order">删除订单</a>
                </div>
            </div>
        </div>`)
                }

            } else {
                alert("服务器连接失败，请稍后~")
            }
        })
    }
    else {
        $("#order-filter").html('');
        $.get(`/users/getOrder?order=${sessionStorage.order}&otype=${sessionStorage.otype}`, function (data) {

            if (200 === data.code) {
                let order = data.order;
                $("#order-default").css("display", "none");
                $("#order-man").html('');
                for (var i = 0; i < order.length; i++) {
                    appointment=`<p class="orderTime">预约时间：${order[i].Appointment} </p>`
                    if (order[i].State == '0') {
                        btn = `<a class="btn comment_order" href="/users/changeState?oid=${order[i].Oid}&state=1">确认</a>`;
                        queren = "";
                        appointment=`<form action="javascript:;" id="frm-changeTime"> 预约时间：
                        <input id="changeTime" onclick="laydate({
                            istime:true,
                            format: 'YYYY-MM-DD hh:mm', // 分隔符可以任意定义，该例子表示只显示年月
                            festival: true, //显示节日
                            min: laydate.now(),
                            choose: function(datas){ //选择日期完毕的回调
//                            alert('得到：'+datas);
                } })"  
                name="appointment" value="${order[i].Appointment}"/>
                    </form>`
                    } else if (order[i].State == '1') {
                        btn = '';
                        queren = `<span class="font_c" style="color: green">等待对方付款</span>`
                    } else if (order[i].State == '2') {
                        btn = '';
                        queren = `<span class="font_c" style="color: green">在约定的时间地点和对方见面吧</span>>`
                    } else if (order[i].State == '3') {
                        btn = `<a class="btn comment_order">评价</a>`;
                        queren = `<span class="font_c" style="color: green">已完成</span>`
                    }
                    if (order[i].State == '4') {
                        btn = '';
                        queren = `<span class="font_c">已取消</span>`
                    }
                    $("#order-man").append(`<dl class="man" id="order${order[i].Oid}">
                <dt>
                    <a href="/"><img src="${order[i].HeadPic}" >
                    </a>
                </dt>
                <dd>
                    <h2><a href="/">Ta:${order[i].Name}</a></h2>
                    <p class="address"><i></i>旅游地点：${order[i].Addr}</p>
                    <p class="orderTime">下单时间：${order[i].OrderTime} </p>
                    ${appointment}
                    
                </dd>
                <div>
                    <div class="contact" title="联系Ta"onclick="alert('对方微信号：${order[i].Wechat};暗号：${order[i].Anhao}')"><i></i>联系Ta</div>
                
                ${queren}
                ${btn}
                <a class="btn delete_order">删除订单</a>
                </div>
            </dl>`)
                }
            } else {
                alert("服务器连接失败，请稍后~")
            }
        });
    }

}

function collect(i) {
    let _this = $(`#collect${i} img`);
    if (_this.attr('src') == "/icon/collection2.png") {
        _this.attr('src', '/icon/collection.png');
        $("#collect small").text('喜欢')
    } else {
        _this.attr('src', "/icon/collection2.png")
        $("#collect small").text('不喜欢')

    }
}

$("#msg .title a").click(function () {
    let siblings = $(this).siblings();
    $(siblings).removeClass('on');
    $(this).addClass('on')
});

/*账号设置=========begin*/
$("#show-hd").click(function () {
    $("#input-hd input").click()
});
$("#input-hd input").change(function () {
    var filepath = this.files[0];
    var ext = filepath.type.toUpperCase();
    if (ext != "IMAGE/BMP" && ext != "IMAGE/PNG" && ext != "IMAGE/GIF" && ext != "IMAGE/JPG" && ext != "IMAGE/JPEG") {
        $("#set-hd").append(`<span>图片限于bmp,png,gif,jpeg,jpg格式！</span>`)
        return false;
    } else {
        $("#set-hd").remove('span')
    }
    var srcs = getObjectURL(this.files[0]);   //获取路径
    // $('#input-hd').append('<img src="' + srcs + '" id="show-hd">');
    $("#show-hd").attr('src', srcs);

});
$("#setting-frm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData($("#setting-frm")[0]);
    $.ajax({
        url: '/users/setting',
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#tip-setting').html('保存中...');
            // 禁用按钮防止重复提交，发送前响应
            $("#btn-set").attr({disabled: "disabled"});

        },
        success: function (data) {
            if (200 === data.code) {
                $("#tip-setting").text("保存成功!");
            } else {
                toClick("#face-tip", function () {
                    $("#tip-setting").text("设置失败,网络速度不佳!");
                })
            }
        },
        complete: function () {//完成响应
            $("#btn-set").removeAttr("disabled");
            // $('#tip-setting').text('');
        },
        error: function () {
            $("#tip-setting").text("与服务器通信发生错误!");
        }
    });
});