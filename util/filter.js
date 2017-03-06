

function filt(req,res,view,callback) {
    // req.session.url='/';
    // req.session.user_id=req.session.user_id;
    console.log("This is filt.............")
    if(req.session.userId==null){
        req.session.url='/'+view;
        res.render("login.ejs");
        console.log('未登录......................');
        return;
    }else {
        // req.session.isLogin=req.session.isLogin;
        callback();
    }

}
exports.filt=filt;
