/**
 * Created by SWSD on 2017-03-03.
 */

function save() {
    let _this=$("#save-img");
    if(_this.attr('src')=="/icon/saved.png"){
        _this.attr('src','/icon/save.png')
    }else{
        _this.attr('src',"/icon/saved.png")
    }

}