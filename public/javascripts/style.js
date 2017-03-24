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

function openLogin() {
    let login = `<div class="md-content">
        <h3 id="frm-logo">旅人</h3>
        <p id="log-tip"></p>
        <div>
            <form action="javascript:;" id="frm-login">
                <input type="text" placeholder="邮箱" name="uid"><br>
                <input type="password" name="password" placeholder="密码">
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
            let data=$('#frm-login').get(0);
            if(!data.uid.value){
                // $('#log-tip').addClass('err-tip');
                $('#log-tip').html('<i></i>账号不能为空');
                return false;
            }if(!data.password.value){
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
                        location.href = '/'
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
            let data=$('#frm-register').get(0);
            let pattPsw=/^[a-z0-9_-]{6,18}$/;
            let pattEm=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if(!data.uid.value){
                $('#reg-tip').html('<i></i>账号不能为空');
                return false;
            }
            if(!pattEm.test(data.uid.value)){
                $('#reg-tip').html('<i></i>邮箱格式错误');
                return false;
            }
            if(!data.password.value){
                $('#reg-tip').html('<i></i>密码不能为空');
                return false;
            }
            if(!pattPsw.test(data.password.value)){
                $('#reg-tip').html('<i></i>密码为6-18位字符');
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
                        $("#btn-register").attr({disabled: "disabled"});

                    },
                    success: function (data) {
                        console.log('success>>', data);

                        if (data.code == 200) {
                            $("#reg-tip").text(data.msg);
                            /*todo:去填写信息，必须填写*/
                            location.href = '/users/setting'
                        }
                        else {
                            $("#reg-tip").text(data.msg);
                            return false;
                        }
                    },
                    complete: function () {//完成响应
                        $("#btn-register").removeAttr("disabled");
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
}