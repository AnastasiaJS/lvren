/**
 * Created by Administrator on 2016/9/20.
 */
var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        use_authentication: true,
        service: 'QQ',
        auth: {
            user: '245915765@qq.com',
            pass: 'lxuuwlhrewjdbied'
        }
    });
// 为了邮件正文内容的安全性，我们通常都会加密发送，防止邮件在网络传输过程中，明文被路由的中间服务器所截获。
// 大部分的邮件服务商都支持SSL的加密通道。
//
// Gmail的SSL发邮件配置，我要新建一个Transport变量stransporter，配置端口为465，secureConnection属性设置为true
    function ssl(e,code){
        var mailOptions = {
            from: '245915765@qq.com', // sender address
            to: e, // list of receivers
            // to: '939783694@qq.com', // list of receivers
            // cc: '836470765@qq.com',
            // bcc: '23190784@qq.com',
            subject: '重置密码', // Subject line
            text: '重置密码', // plaintext body
            // html:'点击以下网址进入密码修改页 <br>http://'+host+'/user/editPwd?Uid='+e,
            html: `<p><h3>尊敬的旅人网用户：</h3>
                        您本次的验证码为：${code}
                    </p>`
            // attachments: [{
            //     filename: '1.jpg',
            //     path: './../public/images/card1.jpg',
            //     cid: '1'
            // }]
        };
        return mailOptions;
    }
function mail(e,code,callback) {
    transporter.sendMail(ssl(e,code), function(error, info){
        if(error){
            console.log(error);
            callback({state:false});
        }else{
            console.log('Message sent: ' + info.response);
            callback({state:true});
        }
    });
}
exports.mail=mail;
