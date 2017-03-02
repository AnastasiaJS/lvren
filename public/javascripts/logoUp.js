
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {1

        url = window.webkitURL.createObjectURL(file)
    }
    return url
};
$(document).ready(function () {

    $("#input-upload").change(function () {

        for(var i=0;i<this.files.length;i++){
            var filepath = this.files[i];
            var ext = filepath.type.toUpperCase();
            if (ext != "IMAGE/BMP" && ext != "IMAGE/PNG" && ext != "IMAGE/GIF" && ext != "IMAGE/JPG" && ext != "IMAGE/JPEG") {
                $("#showPhoto").html('ext='+ext+"图片限于bmp,png,gif,jpeg,jpg格式！");
                return;
            } else {
                var srcs = getObjectURL(this.files[i]);   //获取路径

                $('#showPhoto').append('<img width="100px" height="100px"  style="margin-right: 1em;padding: 4px;border: solid 1px #aaaaaa;background: #fff" src="'+srcs+'">');
            }

        }
    });

});

function uploadFile() {
    var formData = new FormData($("#upload")[0]);
    console.log(formData)
    $.ajax({
        url: 'upload',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            if(data.code==200){
                console.log("ok................");
                console.log(data.url)
            }else{
                console.log("sorry...................")
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
}

