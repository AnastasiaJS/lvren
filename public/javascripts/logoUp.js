
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
let firstTime = true;
function throttle ( fn, interval ) {
    var __self = fn, // 保存需要被延迟执行的函数引用
        timer ;// 定时器
        // firstTime = true; // 是否是第一次调用
    // alert(firstTime)
    return function () {
        var args = arguments,
            __me = this;
        if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成

            return false;
        }
        else if ( firstTime ) { // 如果是第一次调用，不需延迟执行
            console.log('.firstTime...................................');
            __self.apply(__me,args);

              firstTime = false;
            // alert(firstTime)
        }
        timer = setTimeout(function () { // 延迟一段时间执行
            console.log('.not-firstTime...................................');
            clearTimeout(timer);
            timer = null;
            __self.apply(__me,args);
            firstTime=true
        }, interval || 5000 );
    }();
};
function doing() {
    console.log( 1 );
}
