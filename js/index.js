// js에서 디바이스 화면 사이즈를 판단하는 프로그램
// 화면사이즈에 따라서 800 이상이면 html에 pc 클래스를 추가하고
// 800 미만이면 html에 mobile 클래스를 추가하여 판단함
var deviceSize1 = 800;
function scrollOX(status) {
    $('html').css({
        overflowY:status
    })
    var htmlWidth = $('html').width()
    return htmlWidth
}
var swh = scrollOX('hidden')
var sws = scrollOX('scroll')
var swd = swh - sws

if (swd>0) {
    deviceSize1 = deviceSize1 - swd
}

var winWidth = $(window).width()

function init() {
    if (winWidth >= 800) {
        $('html').addClass('pc').removeClass('mobile')
        $('.depth2').css({
            display:'block'
        })
    } else {
        $('html').addClass('mobile').removeClass('pc')
        $('.depth2').css({
            display:'none'
        })
    }
}

init()

$(window).on('resize', function(){
    winWidth = $(this).width()
    init()
})
// 여기까지 화면사이즈별 액션을 구분하기 위한 프로그램


var $subLi = $('.subwaymenu .title li')
var linum = 0;

$subLi.on('click', function(){
    linum = $(this).index()
    if ( !$(this).hasClass('active') ) {
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        // p.469
        $('.content > div').each(function(){
            let dataNum = $(this).attr('data-num')
            if (linum == dataNum ) {
                $(this).insertAfter('.content > div:first')
            }
        })
        $('.content > div:first').animate({
            opacity:'0'
        }, 300, function(){
            $(this).appendTo('.content').css({ opacity:'1'})
        })

        $('.content > div:nth-child(2)').animate({
            marginLeft:'-1320px'
        }, 800, function(){
            $(this).css({ marginLeft:'0px' })
        })

    }
})


$('.slideInner').slick({
    autoplay : true,
    arrows : false,
    dots : true,
})


$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if (sct > 100 && !$('#header  .pcmob').hasClass('on')) {
        $('#header').addClass('on')
        $('#header div.topmenu').removeClass('inner')
        var scrollSize = $(document).height() - $(window).height();
        $('.scrolling-bar').css({
            width : ((sct / scrollSize) * 100) + '%'
        });
    } else {
        $('#header').removeClass('on')
        $('#header div.topmenu').addClass('inner')
    }

})


$('.mobtop .ham').on('click',function(){
    $('html,body').css({
        overflowY:'hidden'
    })
    $('body').append('<div class="pcmobcover"></div>')
    $('.pcmobcover').css({
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.0)',
        zIndex:'9999'
    }).animate({
        backgroundColor:'rgba(0,0,0,0.7)'
    },500)
    $('#header .pcmob').addClass('on')
})

$('#header .pcmob .closet a:last').on('click', function(){
    $('#header .pcmob').removeClass('on')
    $('.pcmobcover').remove()
    $('html,body').css({
        overflowY:'auto'
    })
})


// 1단계 메뉴 클릭시 아래쪽에 2단계 메뉴 슬라이드다운 시키기
$('.depth1 > li > a').on('click', function(){

    if ($('html').hasClass('mobile')) {
        $(this).next().slideToggle()
        $(this).toggleClass('on')
        $(this).parent().siblings().find('.depth2').slideUp()
        $(this).parent().siblings().children('a').removeClass('on')
        return false
    }
   
})

