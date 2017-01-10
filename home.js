/**
 * Created by mengxiaojia on 2016/12/28.
 */
$(function () {

    var $header = $('.header');
    var $nav = $header.find('li');
    var $subNav = $('.subNav');//触摸导航条显示的模块
    var subNavHeights = [];

    initUI();
    function initUI() {
        $subNav.each(function (i, e) {
            $(this).css('top', -1000);
            subNavHeights.push(e.offsetHeight);
        });
    }
    $nav.each(function (i, e) {
        $(e).on('mouseover', function () {
            var leftValue = $(e).offset().left;
            $subNav.eq(i).show().css({height:0, left:leftValue, top:90}).animate({height:subNavHeights[i]}, 300);
        });
        $(e).on('mouseout', function () {
            $subNav.eq(i).css('top', -1000).hide();
        });
    });
    $subNav.on('mouseover', function () {
        $(this).show().css('top', 90);
    });
    $subNav.on('mouseout', function () {
        $subNav.css('top', -1000).hide();
    });


    var $s = $('#s');
    var $searchBtn = $header.find('.search');
    $searchBtn.on('click', function () {
        if ($s.is(':hidden')){
            $s.show(500);
        }else {
            if ($s.val()){

            }else {
                $s.hide(500);
            }
        }

    });

    /***************************banner部分***********************************/
    var $banner = $('.banner');//获取banner
    var $arrow = $('.arrow');//前后箭头
    var $imgs = $banner.find('ul').find('li');//图片集合
    var $dots = $banner.find('.dot').find('li');//圆点集合
    var $progress = $banner.find('.progress');//进度条
    var progressNum = 0;//记录进度条的进度
    var bannerNum = 0;
    var bannerTimer = null;
    $banner.on('mouseover', function () {
        clearInterval(bannerTimer);
        $arrow.css ({opacity:0.8});
        $dots.css ({opacity:1});
    });
    $banner.on('mouseout', function () {

        $arrow.css ({opacity:0});
        bannerTimer = setInterval(progressMove, 10);
        $dots.css({opacity:0}, 500);
    });
    initImgs();
    function initImgs() {
        $imgs.each(function (i, e) {
            if (i > 0){
                $(e).fadeOut();
            }

            var $ban_caption = $(this).find('.ban_caption');
            var $ban_intro = $(this).find('.ban_intro');
            var $ban_learn = $(this).find('.ban_learn');
            var $ban_person = $(this).find('.ban_person').find('img');
            var h = $(this).height();

            $ban_caption.css({top:97/430*h});
            $ban_learn.css({top:302/430*h});
            $ban_intro.css({top:174/430*h});
            $ban_person.css({width:h/430 * 420});

        });
    }

    $arrow.css('top', ($imgs.eq(0).innerHeight() - $arrow.eq(0).innerHeight())/2);
    beginAnimation();
   bannerTimer = setInterval(progressMove, 10);//开定时器

    $arrow.eq(0).on('click', function () {//前一页
        initProgress();
        endAnimation();
        setTimeout(prevBanner, 500);
    });
    $arrow.eq(1).on('click', function () {//后一页
        initProgress();
        endAnimation();
        setTimeout(nextBanner, 500);
    });
    $arrow.mouseover(function () {
        $arrow.css ({opacity:1});
        return false;
    });
    $arrow.mouseout(function () {
        $arrow.css ({opacity:0});
        return false;
    });

    function initProgress() {
        progressNum = 0;
        $progress.css('width',0);
    }

    function progressMove() {//定时器函数

        progressNum++;
        if(progressNum >= 700){
            progressNum = 0;
            endAnimation();
            setTimeout(nextBanner, 500);
        }
        $progress.css('width',progressNum * $banner.innerWidth()/700);
    }
    function nextBanner() {
        bannerNum++;
        if (bannerNum == $imgs.length){
            bannerNum = 0;
        }
        move();
    }
    function prevBanner() {
        bannerNum--;
        if (bannerNum < 0){
            bannerNum = $imgs.length - 1;
        }
        move();
    }
    function move() {
        $imgs.eq(bannerNum).fadeIn(300).siblings().fadeOut(0);
        $dots.eq(bannerNum).addClass('selected').siblings().removeClass("selected");
        beginAnimation();
    }
    function beginAnimation() {
        setTimeout(function () {

            var $ban_caption = $imgs.eq(bannerNum).find('.ban_caption');
            var $ban_intro = $imgs.eq(bannerNum).find('.ban_intro');
            var $ban_learn = $imgs.eq(bannerNum).find('.ban_learn');
            var $ban_person = $imgs.eq(bannerNum).find('.ban_person');
            var h = $imgs.eq(bannerNum).height();

            $ban_caption.animate({opacity:1, top:127/430*h}, 300);
            $ban_intro.delay(200).animate({opacity:1, left:40}, 300);
            $ban_learn.delay(600).animate({opacity:1, top:222/430*h}, 500);
            $ban_person.delay(600).animate({opacity:1, left:478/430*h}, 500);
        }, 500);
    }
    function endAnimation() {
        var $ban_caption = $imgs.eq(bannerNum).find('.ban_caption');
        var $ban_intro = $imgs.eq(bannerNum).find('.ban_intro');
        var $ban_learn = $imgs.eq(bannerNum).find('.ban_learn');
        var $ban_person = $imgs.eq(bannerNum).find('.ban_person');
        var h = $imgs.height();

        $ban_caption.animate({opacity:0, top:97/430*h}, 300);
        $ban_intro.delay(200).animate({opacity:0, left:-10}, 300);
        $ban_learn.delay(500).animate({opacity:0, top:302/430*h}, 500);
        $ban_person.delay(500).animate({opacity:0, left:528/430*h}, 500);

    }

    $dots.on('click', function () {
        endAnimation();
        bannerNum = $dots.index($(this));
        move();

    })
    $dots.mouseover(function () {
        $dots.css ({opacity:1});
        return false;
    });
    $dots.mouseout(function () {
        $dots.css ({opacity:0});
        return false;
    });

    /*****************************About Us***************************************/

    var $about = $('.about').find('.con');
    var $usImgList = $about.find('ul');
    var $usImgs = $usImgList.find('li');
    var $aboutArrow = $about.find('div');
    var $aboutDots = $about.find('ol').find('li');
    var $imgLi = $usImgs.eq(0).clone();
    $usImgList.append($imgLi);
    var num = 0;
    $aboutArrow.eq(0).on('click', function () {
        var w = $usImgs.eq(0).innerWidth();
        if(num <= 0){
            num = $usImgs.length;
            $usImgList.css('left', -num *w);
        }
        num--;
        $usImgList.animate({left:-num *w}, 500);
        $aboutDots.eq(num%$aboutDots.length).addClass('selected').siblings().removeClass("selected");
    });
    $aboutArrow.eq(1).on('click', function () {
        var w = $usImgs.eq(0).innerWidth();
        if (num >= 2){
            $usImgList.css('left', 0);
            num = 0;
        }
        num++;
        $usImgList.animate({left:-num *w}, 500);
        $aboutDots.eq(num%$aboutDots.length).addClass('selected').siblings().removeClass("selected");
    });

    /*****************************Latest Projects***************************************/

    var $laImgs = $('.latest').find('.laImg');
    var $laIMG5 = $('.latest'). find('.laIMG5');
    $laImgs.on('mouseover', function () {
        $laIMG5.eq($laImgs.index($(this))).show();
    });
    $laIMG5.on('mouseout', function () {
       $(this).hide();

    });

    /*****************************Back Top***************************************/

    var $backTop = $('.backTop');
    $(document).scroll(function () {
        if($(document).scrollTop() >= 200){
            $backTop.css('opacity', 1);
        }else {
            $backTop.css('opacity', 0);
        }

    })
    $backTop.on('click', function () {
        $('body,html').animate({scrollTop:0},500);
    })

    /*****************************窗口大小改变***************************************/
    //窗口大小改变时,需要调整,轮播图的left值,因为图片大小发生了改变
    $(window).resize(function () {

        // $('.shield').css({width:$imgs.width(), height:$imgs.innerHeight()});

        //关于我们轮播图,调整位置
        var w = $usImgs.eq(0).innerWidth();
        $usImgList.css('left', -num *w);

        //banner调整
        $arrow.css('top', ($imgs.eq(0).innerHeight() - $arrow.eq(0).innerHeight())/2);
        $imgs.each(function (i, e) {
            var h = $imgs.height();
            var $ban_personImg = $(this).find('.ban_person').find('img');
            $ban_personImg.css('width', $(this).innerHeight()/430 * 420);
            var $ban_intro = $(this).find('.ban_intro');
            $ban_intro.css('top', 174/430 * h);
        });
        initProgress();
        endAnimation();
    })

});

