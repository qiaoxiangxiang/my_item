/*$(function () {
    //token 9999  9998

});*/
$(function() {
    $("head").append("<link rel='shortcut icon' href='/logo.ico' type='image/x-icon'>");
})

setTimeout(function () {
    $('.banner_fixe_right_lifour').on('click', function () {
        var data = 0;
        $('html, body').animate({
            scrollTop: data
        }, 1000);
    });
}, 1000);

$(document).ready(function () {
    $(window).scroll(function () {

        if ($(document).scrollTop() <= 0) {
            $('.banner_fixe_right_lifour').css('display', 'none');
        } else {
            $('.banner_fixe_right_lifour').css('display', 'block');
        }
    });
});

function getCookie(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    } else {
        return null;
    }
};

//判断用户是否登录
function checkUserState(flag) {
    flag = 1;
    if (flag && getToken() == "") {
        alert("请先登录");
        window.location.href = '/login/land.html';
	return;
    }
}

function check_user_state() {
    if (getToken() == null || getToken() == "" || getCookie('TOKEN_TIME')==null) {
        return false;
    } else {
        return true;
    }
}

//返回上一页
function union_back() {
    history.go(-1);
}
//判断是否为空
function isNull(data) {
    return data == undefined || data == 0 || data == "" || data == "null";
}

/*临时变量*/
function tokenName() {
    return "TOKEN_NAME";
}
function tempDataName() {
    return "TEMP_DATA_NAME";
}
function telName() {
    return "USER_TEL";
}

//获取首页地址
function getIndexUrl() {
    alert("返回首页");
    return "../index.html";
}

//返回首页
function backToIndex() {
    window.location.href = getIndexUrl();
}

function backPage() {}

//Token set get
function getToken() {
    return localStorage.getItem(tokenName());
}
function setToken(token) {
    localStorage.setItem(tokenName(), token);
}
function cleanToken() {
    localStorage.clean();
}

//用户手机号 set get
function getTel() {
    return localStorage.getItem(telName());
}
function setTel(tel) {
    localStorage.setItem(telName(), tel);
}

function setTempData(data) {
    localStorage.setItem(tempDataName(), data);
}
function getTempData() {
    return localStorage.getItem(tempDataName());
}

function getUrl() {

    // return "http://daishu.daishumed.com/index.php/";
    var domain = window.location.host;
    if (domain=='www.daishumed.com') {
        return "https://kangaroo.daishumed.com/index.php/"
    } else {
        return "http://daishu.daishumed.com/index.php/";
    }
}

/*网络请求*/
function yaqooNetGet(url, param, callbacks, is_async) {
    yaqooNet(url, "GET", param, callbacks, is_async);
}

function yaqooNetPost(url, param, callbacks, is_async) {
    yaqooNet(url, "POST", param, callbacks, is_async);
}

function yaqooNetFile(url, param, callbacks) {
    if (typeof String.prototype.startsWith != 'function') {  
     String.prototype.startsWith = function (prefix){  
      return this.slice(0, prefix.length) === prefix;  
     }  
    }
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: param,
        processData: false,
        contentType: false,
        //headers: url.startsWith("User/") ? "" : { 'Authorization': getToken() },
        headers: { 'Authorization': getToken() },
        crossDomain: true,
        success: function success(data) {
            callbacks(data);
        }
    });
}

function yaqooNet(url, type, param, callbacks, is_async) {
    if (typeof String.prototype.startsWith != 'function') {  
        String.prototype.startsWith = function (prefix){  
          return this.slice(0, prefix.length) === prefix;  
        }  
    }
    //默认异步
    is_async = is_async == undefined ? true : is_async;

    $.ajax({
        url: url.startsWith("http") ? url : getUrl() + url,
        data: param,
        type: type,
        async: is_async,
        // headers: url.startsWith("User/") ? "" : { 'Authorization': getToken() },
        headers: { 'Authorization': getToken() },
        crossDomain: true,
        dataType: 'json',
        success: function success(data) {
            callbacks(data);

            if (data['code'] == 9999) {
                //如果token过期或者没有token
                setToken("");
            } else if (data['code'] == 9998) {
                // alert("请登录");
            }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
            // alert(XMLHttpRequest);
            // alert(XMLHttpRequest.readyState);
            // alert(errorThrown);
            // alert('出错')
        },
        complete: function complete(XMLHttpRequest, textStatus) {
            //调用本次AJAX请求时传递的options参数
            // alert('出错2')
        }
    });
}

/*
 倒计时控件：小时、分钟、秒
 需要传入结束时间s,和回调事件
 */
function countDown_H_M_S(endtime, callBack) {
    //设置小时、分钟、秒
    var h = 0;
    var m = 0;
    var s = 0;
    //获取时间差
    var nowTime = new Date();

    var t = endtime - nowTime.getTime() / 1000;

    //每秒执行一次的函数
    function GetRTime() {
        --t;
        if (t >= 0) {
            s = Math.floor(t % 60);
        } else {
            clearInterval(timer);
        }
        h = Math.floor(t / 60 / 60 % 24);
        m = Math.floor(t / 60 % 60);

        callBack(h + ":" + m + ":" + s);
    }
    var timer = window.setInterval(GetRTime, 1000);
}

//时间戳转为年月日 时分秒
function formatTime_Y_M_D_H_M_S(php_time) {
    var timestamp3 = php_time;
    var newDate = new Date();
    newDate.setTime(timestamp3 * 1000);

    return newDate.toLocaleString();
}
/*
 *跳转详情
 * flag  1执业医师  2执业药师 3国医经典 4卫生管理
 * course_type 课程类型
 * course_id   课程id
 * is_free     是否是免费课程(0收费 1免费 6已购买）
 * is_video 是否是试卷 false和undefined是 视频 ，true是试题
 */
function jump2detail(flag, course_type, course_id, is_free, is_question) {

    console.log(course_type + "  " + " " + course_id + "  " + is_free);
    var tempInfo = {
        flag: flag,
        course_type: course_type,
        course_id: course_id,
        is_question: is_question == undefined ? false : is_question
    };
    //console.log(tempInfo);
    localStorage.setItem("jump_detail_info", JSON.stringify(tempInfo));

    if (is_free == 1) {
        // alert("跳转免费课程"+tempInfo.course_id)
        window.location.href = "../learn/course_study.html";
    } else if (is_free == 6) {
        // alert("立即学习"+tempInfo.course_id)

        if (is_question) {
            //是试题
            window.location.href = "../learn/exercises.html";
        } else {
            window.location.href = "../learn/course_study.html";
        }
    } else if (is_free == 9) {
        //去排行
        window.location.href = "../learn/rankinglist.html";
    } else {
        //去课程详情
        var type = course_type ? course_type : 0;
        var id = course_id ? course_id : '';
        window.location.href = "../course/detail.html?flag="+flag+'&course_id='+id+'&course_type='+type+'&is_question='+is_question;
    }
}

function formatSeconds(value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    // alert(theTime);
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
}
