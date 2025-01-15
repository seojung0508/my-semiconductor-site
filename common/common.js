
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



