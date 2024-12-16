const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav_links");
// const heroSection = document.querySelector(".hero");
const header = document.querySelector(".portfolio_header");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// 슬라이드 관련 변수 선언
const slideList = document.querySelector(".slide_list");
const slideContents = document.querySelectorAll(".slide_content");
const slideBtnNext = document.querySelector(".slide_btn_next");
const slideBtnPrev = document.querySelector(".slide_btn_prev");
const slidePagination = document.querySelector(".slide_pagination");
const slideLen = slideContents.length;
const slideWidthExp = 400;
const slideSpeed = 400;
const startNum = 0;

// 슬라이드 초기화
//슬라이더의 초기 설정(너비 설정, 복제, 위치 설정 등)을 페이지 로드와 동시에 실행하기 위해 사용됩니다.
(() => {
    slideList.style.width = slideWidthExp * (slideLen + 2) + "px";

    let firstChild = slideList.firstElementChild;
    let lastChild = slideList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    slideList.appendChild(clonedFirst);
    slideList.insertBefore(clonedLast, slideList.firstElementChild);

    slideList.style.transform = `translate3d(-${slideWidthExp}px, 0px, 0px)`; //왼쪽으로 슬라이드 너비 만큼 이동(수직이동 없음, z축 이동 없음)

    // 페이지네이션 생성
    let pageChild = "";
    for (let i = 0; i < slideLen; i++) {
        pageChild += `<li class="dot${i === startNum ? ' dot_active' : ''}" data-index="${i}"><a href="#"></a></li>`;
    }
    slidePagination.innerHTML = pageChild;

    slideContents[0].classList.add('slide_active');
})();

const pageDots = document.querySelectorAll(".dot");
let currIndex = startNum;
let currentSlide = slideContents[currIndex];


// Next 버튼 이벤트
slideBtnNext.addEventListener("click", () => {
        slideList.style.transition = slideSpeed + "ms"; // 애니메이션 시간 설정
        slideList.style.transform = `translate3d(-${slideWidthExp * (currIndex + 2)}px, 0px, 0px)`; // 다음 슬라이드로 이동

    // 마지막 슬라이드 처리
    if (currIndex === slideLen - 1) {
        setTimeout(() => {
            slideList.style.transition = "0ms";// 애니메이션 없이
            slideList.style.transform = `translate3d(-${slideWidthExp}px, 0px, 0px)`; //첫 슬라이드로 이동
        }, slideSpeed);
        currIndex = -1; //인덱스 초기화(currIndex를 -1로 초기화하는 이유는, 바로 다음 줄에서 ++currIndex가 실행되어 0이 되기 때문입니다. 이렇게 해서 다시 첫 번째 슬라이드(인덱스 0)부터 시작할 수 있습니다.)
    }

    currentSlide.classList.remove("slide_active"); // 현재 슬라이드 비활성화
    pageDots[currIndex === -1 ? slideLen - 1 : currIndex].classList.remove("dot_active"); // 현재 도트 비활성화
    currentSlide = slideContents[++currIndex]; // 다음 슬라이드로 변경
    currentSlide.classList.add("slide_active"); // 새 슬라이드 활성화
    pageDots[currIndex].classList.add("dot_active"); // 새 도트 활성화
});

// Prev 버튼 이벤트
slideBtnPrev.addEventListener("click", () => {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = `translate3d(-${slideWidthExp * currIndex}px, 0px, 0px)`;

    if (currIndex === 0) {
        setTimeout(() => {
            slideList.style.transition = "0ms";
            slideList.style.transform = `translate3d(-${slideWidthExp * slideLen}px, 0px, 0px)`;
        }, slideSpeed);
        currIndex = slideLen; //마지막 슬라이드로 인덱스 설정
    }

    currentSlide.classList.remove("slide_active");
    pageDots[currIndex === slideLen ? 0 : currIndex].classList.remove("dot_active");
    currentSlide = slideContents[--currIndex]; //이전 슬라이드로
    currentSlide.classList.add("slide_active");
    pageDots[currIndex].classList.add("dot_active");
});

// 페이지네이션 클릭 이벤트
pageDots.forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
        e.preventDefault();
        let curDot = document.querySelector(".dot_active");
        curDot.classList.remove("dot_active"); // 현재 dot 비활성화
        dot.classList.add("dot_active");// 클릭한 dot 활성화

        currentSlide.classList.remove("slide_active"); // 현재 슬라이드 비활성화
        currIndex = Number(dot.getAttribute("data-index"));  // data-index 속성값으로 인덱스 설정
        currentSlide = slideContents[currIndex]; // 새 슬라이드 설정
        currentSlide.classList.add("slide_active");// 새 슬라이드 활성화

        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = `translate3d(-${slideWidthExp * (currIndex + 1)}px, 0px, 0px)`;  // 해당 슬라이드로 이동
    });
});