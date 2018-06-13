

$(".gong_top").append(`
<div class="content_top">
<img class="content_top_img" src="../img/home/content_01.png" alt="">
<div class="top_content">
    <div class="top_content_box">
        <img class="top_content_box_img" src="../img/home/logo_03.png" alt="">
        <div class="top_content_nav">
            <a href="index.html">
                <span class="top_nav_left">
                    网站首页
                    <span class="border_bottom"></span>
                </span>
            </a>
            <a href="classify.html">
                <span class="top_nav_left">
                    药材百科
                    <span class="border_bottom"></span>
                </span>
            </a>
            <a href="dynamic.html">
                <span class="top_nav_left">
                    药材动态
                    <span class="border_bottom"></span>
                </span>
            </a>
            <a href="press_hourse.html">
                <span class="top_nav_left">
                    出版社介绍
                    <span class="border_bottom"></span>
                </span>
            </a>
            <a href="contact_us.html">
                <span class="top_nav_left">
                    联系我们
                    <span class="border_bottom"></span>
                </span>
            </a>
        </div>
        <div class="denglu">
            <a href="land.html">
                <span class="top_nav_right">登陆</span>
            </a>
            <a href="login_account.html">
                <span class="top_nav_right">注册</span>
            </a>
        </div>
    </div>
</div>
</div>
`)

$(".gong_bottom").append(`
<div class="content_bottom">
    <div class="bottom_text">
        <p>中国中医药出版社 版权所有 京ICP备12043164号-6 Copyright 2017 CPTCM Co.,Ltd All Rights Reserved.</p>
        <div class="bottom_div">
            <img class="bottom_div_img" src="../img/home/home_45.jpg" alt="">
            <img class="bottom_div_img" src="../img/home/home_47.png" alt="">
        </div>
    </div>
</div>
`)


//公共部分
var height = window.innerHeight - $(".top_content").height() - $(".content_bottom").height();
$(".content").css({"min-height":height+"px"})