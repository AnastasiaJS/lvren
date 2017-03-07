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

function toClick(id, callback) {
    //js触发点击事件
    callback();
    $(id).click();
}

$("#facePic").change(function () {
    var filepath = this.files[0];
    var ext = filepath.type.toUpperCase();
    if (ext != "IMAGE/BMP" && ext != "IMAGE/PNG" && ext != "IMAGE/GIF" && ext != "IMAGE/JPG" && ext != "IMAGE/JPEG") {
        toClick("#face-tip", function () {
            $("#modal-tip").text("提示");
            $("#face-tip-msg").text("图片限于bmp,png,gif,jpeg,jpg格式！");
        })
        return flag = false;
    }
    var srcs = getObjectURL(this.files[0]);   //获取路径
    $('#add-carousel').append('<img src="' + srcs + '" id="face">');
    $("#face").click(function () {
        $("#facePic").click()
    });
    return flag = true;

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
            $('#show-photos').after('<img  width="100px" height="100px"  style="margin-right: 1em;padding: 4px;border: solid 1px #aaaaaa;background: #fff" src="' + srcs + '">');
            flag = true;
        }
    }
});


function uploadFile() {
    //判断文件是否符合
    if (flag) {
        var formData = new FormData($("#add-frm")[0]);
        $.ajax({
            url: '/addCard',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (200 === data.code) {
                    toClick("#face-tip",  function () {
                            $("#modal-tip").text("信息");
                            $("#face-tip-msg").text("发布成功!");
                        })
                    
                } else {
                    toClick("#face-tip", function () {
                        $("#face-tip-msg").text("发布失败,请重新输入!");
                    })
                }
            },
            error: function () {
                toClick("#face-tip",function () {
                    $("#face-tip-msg").text("与服务器通信发生错误!");
                })
            }
        });
    }
}