/**
 * Created by SWSD on 2017-03-14.
 */

//个人中心顶部tab切换=======
function changeMy(e) {
    let target=e.target;
    for(let i=1;i<=4;i++){
        $("#tab"+i).removeClass('active');
    }
    switch (target.id){
        case 'tab1':
            $("#tab1").addClass('active');
            break;
        case 'tab2':
            $("#tab2").addClass('active');
            break;

        case 'tab3':
            $("#tab3").addClass('active');
            break;

        case 'tab4':
            $("#tab4").addClass('active');
            break;
        default:
            $("#tab1").addClass('active');
            break;
    }
}

function changeOrder(n) {
    for(let i=0;i<2;i++){
        $("#order-menu li").removeClass('active');
    }
    $(`#order-menu li`).eq(n).addClass('active')
}
function fliterOrder(n) {
    for(let i=0;i<=4;i++){
        $("#filter-order"+i).removeClass('on');
    }
    $("#filter-order"+n).addClass('on')
}