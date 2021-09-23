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
        $('#header .pcmobcover').show()
    } else {
        $('html').addClass('mobile').removeClass('pc')
        $('.depth2').css({
            display:'none'
        })
        $('#header .pcmobcover').hide()
    }
}

init()

$(window).on('resize', function(){
    winWidth = $(this).width()
    init()
})
// 여기까지 화면사이즈별 액션을 구분하기 위한 프로그램


// 로딩 이미지 설정하기
$(window).on('load', function(){
    var i = 0;
    var timer = setInterval(add, 25)

    function add(){
        i++
        if (i>=100) {
            clearInterval(timer)
            // $('.introAni').fadeOut()
            $('.introAni').animate({
                left:'-100%'
            },500, function(){
                $(this).hide()
            })
        }
        $('.introAni div').eq(1).text(i+'%')
    }


    // "popupYN=Y", "popupYN=N"
    // 레이어팝업(오늘하루 그만보기)
     // null은 처음 사이트 방문할때 값
    // var cookie = document.cookie
    // console.log(cookie)
    // if (cookie != "" && cookie === "popupYN=Y") {
    //     $('.popup').hide()
    // } else {
    //     $('.popup').show()
    // }


    // 윈도우 팝업 (오늘하루 그만보기)
    var cookie = document.cookie
    if (cookie === "" || cookie === "popupYN=N") {
        //   window.open('문서경로','창이름','옵션(창크기, 창위치')
        window.open('./popup.html','','width=500, height=680, top=100, left=100, scropllbars=no, resizable=no')
        } 
})


// 레이어팝업 오늘하루 그만보기(닫기)
// $('.popup a').on('click', function(){
//     if ($(this).prev().prop('checked')) {
//         var d = new Date()
//         d.setTime(d.getTime()+(24*60*60*1000)) // 시간만 +24시간으로 수정함
//         var expires = "expires="+d.toUTCString() // 쿠키는 문자만 되기 때문에 d를 문자값으로 바꿈
//         document.cookie = "popupYN=Y;"+expires
//     } else {
//         document.cookie = "popupYN=N"
//     }

//     $('.popup').hide()
    
// })



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
    $('#header .pcmobcover').fadeIn(300)
    $('#header .pcmob').addClass('on')
})

$('#header .pcmob .closet:last').on('click', function(){
    $('#header .pcmobcover').fadeOut(300)
    $('#header .pcmob').removeClass('on')
    $('html,body').css({
        overflowY:'auto'
    })
    $('.depth1 > li > a').removeClass('on')
    $('.depth2').slideUp()
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




