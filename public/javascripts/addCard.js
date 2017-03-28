/**
 * Created by SWSD on 2017-03-07.
 */

let flag = false;
//获取图片路径
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


$("#facePic").change(function () {
    var filepath = this.files[0];
    var ext = filepath.type.toUpperCase();
    if (ext != "IMAGE/BMP" && ext != "IMAGE/PNG" && ext != "IMAGE/GIF" && ext != "IMAGE/JPG" && ext != "IMAGE/JPEG") {
        toClick("#face-tip", function () {
            $("#modal-tip").text("提示");
            $("#face-tip-msg").text("图片限于bmp,png,gif,jpeg,jpg格式！");
        });
        return false;
    }
    var srcs = getObjectURL(this.files[0]);   //获取路径
    $('#add-carousel').append('<img src="' + srcs + '" id="face">');
    $('#add-carousel label').css('background','none');
    $("#face").click(function () {
        $("#facePic").click()
    });

});
$("#photos").change(function () {
    if (this.files.length < 4 || this.files.length > 6) {
        toClick("#face-tip", function () {
            $("#modal-tip").text("提示");
            $("#face-tip-msg").text("请上传4~6张图片!");
        })
        return flag = false;
    }
    else {
        //先清空所有photos
        for(let i=0;i<6;i++){
            $(`#li${i}`).html('')
        }
        for (var i = 0; i < this.files.length; i++) {
            var filepath = this.files[i];
            var ext = filepath.type.toUpperCase();
            if (ext != "IMAGE/BMP" && ext != "IMAGE/PNG" && ext != "IMAGE/GIF" && ext != "IMAGE/JPG" && ext != "IMAGE/JPEG") {
                toClick("#face-tip", function () {
                    $("#modal-tip").text("提示");
                    $("#face-tip-msg").text("图片限于bmp,png,gif,jpeg,jpg格式!");
                })
                return flag = false;
            }
            var srcs = getObjectURL(this.files[i]);   //获取路径
            // $(`#li${i} img`).attr('src',srcs);
            $(`#li${i}`).html(`<img src="${srcs}">`);
        }
    }
});

$("#btn-updateCard").click(function (e) {
    e.preventDefault();
    var formData = new FormData($("#update-frm")[0]);
    $.ajax({
        url: '/users/updateCard',
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            // $('#update-tip').text('上传中...');
            layer.msg('上传中', {
                icon: 16
                ,shade: 0.01
            });
            // 禁用按钮防止重复提交，发送前响应
            $("#btn-updateCard").attr({ disabled: "disabled" });

        },
        success: function (data) {
            if (200 === data.code) {
                layer.alert('发布成功!', {icon: 6});
            } else {
                layer.alert(data.msg, {icon: 5});
            }
        },
        complete: function () {//完成响应
            $("#btn-updateCard").removeAttr("disabled");
            layer.closeAll('loading');
        },
        error: function () {
            layer.alert('与服务器通信发生错误!', {icon: 2});
        }
    });
});
$("#add-frm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData($("#add-frm")[0]);
    $.ajax({
        url: '/users/addCard',
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            layer.msg('上传中', {
                icon: 16
                ,shade: 0.01,
                time: 10000
            });
            // 禁用按钮防止重复提交，发送前响应
            $("#btn-addCard").attr({ disabled: "disabled" });

        },
        success: function (data) {
            layer.closeAll();
            if (200 === data.code) {
                layer.confirm('发布成功!',{
                    btn:['去看看','留在个人主页']
                },function () {
                    location.href=data.url;
                },function () {
                    layer.closeAll();
                });
            } else {
                layer.alert("发布失败,网络速度不佳!")
            }
        },
        complete: function () {//完成响应
            $("#btn-addCard").removeAttr("disabled");
        },
        error: function () { 
            layer.alert("与服务器通信发生错误!")
        }
    });
});