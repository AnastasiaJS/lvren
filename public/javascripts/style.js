/*===header====begin=====*/
// 滚动条滚动header透明度渐变
// window.onscroll = function () {
//     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//
//
//     if (scrollTop > 2 * 14) {
//         $("header").css("background", "rgba(255,255,255,1)");
//         scrollTop=null;
//         return ;
//     } else {
//         $("header").css("background", "rgba(255,255,255,0)")
//     }
// };

//==========header====end=======================
//==========music-control====start=======================

function aud_play() {
    document.getElementById("aud").play();
    $("#play").css("display", "none");
    $("#pause").css("display", "block");
    $("[id^='ani']").css("animation-iteration-count", "infinite");
}
function aud_pause() {
    document.getElementById("aud").pause();
    $("#play").css("display", "block");
    $("#pause").css("display", "none");
    $("[id^='ani']").css("animation-iteration-count", "0");

}

function openCard(uid) {
    location.href = '/card?card=' + uid;
}
/*打开登录窗口*/
function openLogin() {
    let login = `<div class="md-content">
        <h3 id="frm-logo">旅人</h3>
        <p id="log-tip"></p>
        <div>
            <form action="javascript:;" id="frm-login">
                <input type="text" placeholder="邮箱" name="uid"><br>
                <input type="password" name="password" placeholder="密码"><br>
                <i id="forgetPsw" onclick="openForget()">忘记密码？</i>
            </form>
        </div>
    </div>`;
    let index = layer.open({
        type: 1
        , title: false //不显示标题栏
        , area: '500px'
        , shade: 0.8
        , id: 'md-login' //设定一个id，防止重复弹出
        , resize: false
        , btn: ['登录', '去注册']
        , btnAlign: 'c'
        , moveType: 1 //拖拽模式，0或者1
        , content: login
        , yes: function () {
            let data = $('#frm-login').get(0);
            if (!data.uid.value) {
                // $('#log-tip').addClass('err-tip');
                $('#log-tip').html('<i></i>账号不能为空');
                return false;
            }
            if (!data.password.value) {
                // $('#log-tip').addClass('err-tip');
                $('#log-tip').html('<i></i>密码不能为空');
                return false;
            }
            $.ajax({
                url: '/login',
                type: 'POST',
                data: $("#frm-login").serialize(),
                dataType: 'json',
                beforeSend: function () {
                    $('#log-tip').text('正在登录...');
                    // 禁用按钮防止重复提交，发送前响应
                    $("#btn-login").attr({disabled: "disabled"});

                },
                success: function (data) {
                    if (data.code == 200) {
                        $("#log-tip").text(data.msg);
                        console.log(data.url);
                        /*若登录前在某个card详情页则前往该页，否则到首页*/
                        if (data.url) {
                            location.href = data.url;
                            return;
                        }
                        location.href = '/';
                    }
                    else {
                        $("#log-tip").text(data.msg);
                        return false;
                    }
                },
                complete: function () {//完成响应
                    $("#btn-login").removeAttr("disabled");
                },
                error: function () {
                    $("#frm-tip").text(data.msg);
                    return false;
                }
            });
        }
        , btn2: function () {
            layer.close(index);
            openRegister()
        }
    });
}
/*打开注册窗口*/
function openRegister() {

    let register = `<div class="md-content">
        <h3 id="frm-logo">旅人</h3>
        <p id="reg-tip"></p>
        <div>
            <form action="javascript:;" id="frm-register">
                <input type="text" placeholder="邮箱" name="uid"><br>
                <input type="password" name="password" placeholder="密码(6-18位)"
                       required><br>
                <input type="password" name="password2" placeholder="确认密码" ><br>
                <input type="text"  name="code" placeholder="验证码" style="width: 6rem;" >
                <a class="btn delete_order" id="btn-code">获取验证码</a><br>
            </form>
        </div>
    </div>`;

    layer.open({
        type: 1
        , title: false //不显示标题栏
        , area: '500px'
        , shade: 0.8
        , id: 'md-register' //设定一个id，防止重复弹出
        , resize: false
        , btn: ['注册', '去登录']
        , btnAlign: 'c'
        , moveType: 1 //拖拽模式，0或者1
        , content: register
        , yes: function () {

            let data = $('#frm-register').get(0);
            let pattPsw = /^[a-z0-9_-]{6,18}$/;
            let pattEm = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if (!data.uid.value) {
                $('#reg-tip').html('<i></i>账号不能为空');
                return false;
            }
            if (!pattEm.test(data.uid.value)) {
                $('#reg-tip').html('<i></i>邮箱格式错误');
                return false;
            }
            if (!data.password.value) {
                $('#reg-tip').html('<i></i>密码不能为空');
                return false;
            }
            if (!pattPsw.test(data.password.value)) {
                $('#reg-tip').html('<i></i>密码为6-18位字符');
                return false;
            }
            if (!data.code.value) {
                $('#reg-tip').html('<i></i>请输入验证码');
                return false;
            }
            // return false;
            let _this = document.getElementById('frm-register');
            if (_this.elements['password'].value != _this.elements['password2'].value) {
                $('#frm-tip').html('<i></i>两次密码输入不一致！');
            } else {
                $('#frm-tip').text('');
                $.ajax({
                    url: '/register',
                    type: 'POST',
                    data: $("#frm-register").serialize(),
                    dataType: 'json',
                    beforeSend: function () {
                        $('#frm-tip').text('正在注册...');
                        // 禁用按钮防止重复提交，发送前响应
                        // $("#btn-register").attr({disabled: "disabled"});

                    },
                    success: function (data) {
                        if (data.code == 200) {
                            $("#reg-tip").text(data.msg);
                            /*done:去填写信息，必须填写*/
                            location.href = '/users/setting'
                        }
                        else {
                            $("#reg-tip").text(data.msg);
                            return false;
                        }
                    },
                    complete: function () {//完成响应
                        // $("#btn-register").removeAttr("disabled");
//                $('#frm-tip').text('');
                    },
                    error: function (data) {
                        console.log('error>>', data)
                        $("#reg-tip").text(data.msg);
                        return false;
                    }
                });
            }
        }
        , btn2: function (index) {
            layer.close(index);
            openLogin();
        }
    });
    // document.getElementById("btn-code").addEventListener('click',getCode($('#frm-register').get(0).uid.value))
    // function getCode(uid) {


    // }

    $('#btn-code').click(function () {
        let data=$('#frm-register').get(0)
        $.ajax({
            url: '/getcode',
            type: 'POST',
            data: {uid:data.uid.value},
            dataType: 'json',
            beforeSend: function () {

                // 禁用按钮防止重复提交，发送前响应
                // document.getElementById("btn-code").removeEventListener('click',getCode);
                $("#btn-code").text('发送中');

            },
            success: function (data) {
                if (data.code == 200) {
                    layer.alert('验证码已发送至邮箱')
                }
                else {
                    layer.alert('验证码获取失败，稍后重试');
                    return false;
                }
            },
            complete: function () {//完成响应

                // document.getElementById("btn-code").addEventListener('click',getCode)
                $("#btn-code").text('获取验证码');
            },
            error: function (data) {
                console.log('error>>', data)
                layer.alert('验证码获取失败，稍后重试');
                return false;
            }
        });
    })
}

/*打开发送邮件窗口*/


function openForget() {
    layer.closeAll();
    let register = `<div class="md-content">
        <h3 id="frm-logo">旅人</h3>
        <p id="forget-tip"></p>
        <div>
            <form action="javascript:;" id="frm-forget">
                <input type="text" placeholder="注册邮箱" name="uid"><br>
                <button class="btn submit" id="btn-forget" style="margin-bottom: 2rem">立即找回</button>
            </form>
        </div>
    </div>`;
    layer.open({
        type: 1
        , title: false //不显示标题栏
        , area: '500px'
        , shade: 0.8
        , id: 'md-forget' //设定一个id，防止重复弹出
        , resize: false
        // , btn: ['立即找回']
        , btnAlign: 'c'
        , moveType: 1 //拖拽模式，0或者1
        , content: register
        , yes: function () {

        }
    });
    $("#btn-forget").click(function () {
        let data = $('#frm-forget').get(0);
        if (!data.uid.value) {
            $('#forget-tip').html('<i></i>账号不能为空');
            return false;
        }
        $('#forget-tip').text('');
        $.ajax({
            url: '/forget',
            type: 'POST',
            data: $("#frm-forget").serialize(),
            dataType: 'json',
            beforeSend: function () {
                $('#forget-tip').text('发送中...');
                // 禁用按钮防止重复提交，发送前响应
                // $("#btn-forget").attr({disabled: "disabled"});

            },
            success: function (data) {
                $('#forget-tip').text('');
                if (data.code == 200) {
                    layer.confirm('验证码已发送，前往邮箱查看',{
                        btn:'确认'
                    },function (index) {
                        layer.close(index);
                        openReset();
                    });
                    
                }else if(data.code==300){
                    $("#forget-tip").text('该邮箱尚未注册！');
                }
                else {
                    $("#forget-tip").text("服务器连接出错");
                    return false;
                }
            },
            complete: function () {//完成响应
                // $("#btn-forget").removeAttr({disabled: "disabled"});
            },
            error: function (data) {
                console.log('error>>', data)
                $("#forget-tip").text(data.msg);
                return false;
            }
        });
    })
}
function openReset() {
    layer.closeAll();
    let register = `<div class="md-content">
        <h3 id="frm-logo">旅人</h3>
        <p id="reset-tip"></p>
        <div>
            <form action="javascript:;" id="frm-reset">
                <input type="password" placeholder="密码" name="psw"><br>
                <input type="password" placeholder="确认密码" name="psw2"><br>
                <input type="text" placeholder="验证码" name="code"><br>
                <button class="btn submit" id="btn-reset" style="margin-bottom: 2rem">完成</button>
            </form>
        </div>
    </div>`;
    layer.open({
        type: 1
        , title: false //不显示标题栏
        , area: '500px'
        , shade: 0.8
        , id: 'md-reset' //设定一个id，防止重复弹出
        , resize: false
        // , btn: ['立即找回']
        , btnAlign: 'c'
        , moveType: 1 //拖拽模式，0或者1
        , content: register
        , yes: function () {

        }
    });
    $("#btn-reset").click(function () {
        let data = $('#frm-reset').get(0);
        if (!data.psw.value) {
            $('#reset-tip').html('<i></i>密码不能为空');
            return false;
        }
        let pattPsw = /^[a-z0-9_-]{6,18}$/;
        if (!pattPsw.test(data.psw.value)) {
            $('#reset-tip').html('<i></i>密码为6-18位字符');
            return false;
        }
        if(data.psw.value!=data.psw2.value){
            $('#reset-tip').html('<i></i>两次密码输入不一致');
            return false;
        }
        if(!data.code.value){
            $('#reset-tip').html('<i></i>请输入验证码');
            return false;
        }
        $('#reset-tip').text('');
        $.ajax({
            url: '/reset',
            type: 'POST',
            data: $("#frm-reset").serialize(),
            dataType: 'json',
            beforeSend: function () {
                $('#reset-tip').text('发送中...');
                // 禁用按钮防止重复提交，发送前响应
                // $("#btn-reset").attr({disabled: "disabled"});

            },
            success: function (data) {
                if (data.code == 200) {
                    layer.confirm('密码修改成功',{
                        btn: ['去首页','重新修改']
                    },function () {
                        location.href='/'
                    })
                }else if(data.code==300){
                    $("#reset-tip").text(data.msg);
                }
                else {
                    $("#reset-tip").text('修改未成功，请稍后重试');
                    return false;
                }
            },
            complete: function () {//完成响应
                // $("#btn-reset").removeAttr({disabled: "disabled"});
            },
            error: function (data) {
                console.log('error>>', data)
                $("#reset-tip").text(data.msg);
                return false;
            }
        });
    })
}