/* header footer 공통 */
async function loadHTML(id, file) {
    const response = await fetch(file);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;
}

loadHTML('header', '../common/header.html');
loadHTML('footer', '../common/footer.html');

/* 모바일 아코디언 활성화 */
$(function () {
    function activateAccordion() {
        if (window.matchMedia("(max-width: 992px)").matches) {
            // 모바일 환경: 아코디언 활성화
            $(".nav-btn-more").off("click").on("click", function (e) {
                e.preventDefault(); // 기본 동작 방지
                var $submenu = $(this).closest(".nav-item").find(".sub-mn-bx");
                var $parentItem = $(this).closest(".nav-item");

                // 다른 서브 메뉴 닫기 및 active 클래스 제거
                $(".sub-mn-bx").not($submenu).slideUp();
                $(".nav-item").not($parentItem).removeClass("active");

                // 클릭된 서브 메뉴 토글 및 active 클래스 토글
                $submenu.stop(true, true).slideToggle();
                $parentItem.toggleClass("active");
            });
        } else {
            // 데스크톱 환경: hover 동작
            $(".nav-btn-more").off("click"); // 모바일용 클릭 이벤트 제거
            $(".sub-mn-bx").removeAttr("style"); // 모든 서브 메뉴 열기
        }
    }

    // 초기 실행
    activateAccordion();

    // 화면 크기 변경 시 다시 실행
    $(window).resize(function () {
        activateAccordion();
    });
});


//메뉴 스크롤
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navb-wrap').outerHeight();
var scrollCount = 0; // 스크롤 내린 횟수 추적 변수

$(window).scroll(function () {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(window).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta) return;

    // 스크롤이 아래로 내려갔을 때
    if (st > lastScrollTop) {
        scrollCount++;
        if (scrollCount >= 1) {
            $('.navb-wrap').removeClass('nav-down').addClass('nav-up');
        }
    }
    // 스크롤이 위로 올라갔을 때
    else {
        if (st + $(window).height() < $(document).height()) {
            $('.navb-wrap').removeClass('nav-up').addClass('nav-down ');
            scrollCount = 0;
        }
    }

    // 스크롤이 상단에 도달하면 클래스 초기화
    if (st === 0) {
        $('.navb-wrap').removeClass('nav-down nav-up');
    }

    lastScrollTop = st;
}

