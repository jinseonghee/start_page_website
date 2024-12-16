
//banner example
const slideList = document.querySelector(".slide_list"); //slide parent dom
const slideContents = document.querySelectorAll(".slide_content"); //each slide dom
const slideBtnNext = document.querySelector(".slide_btn_next"); //next button
const slideBtnPrev = document.querySelector(".slide_btn_prev"); //prev button
const slidePagination = document.querySelector(".slide_list_pagination");
const slideLen = slideContents.length; //slide length
const slideWidthExp = 400;
const slideSpeed = 400;
const startNum = 0; //initial slide index

slideList.style.width = slideWidthExp * (slideLen + 2) + "px"; //slide 전체의 list width값을 정의

//슬라이드 복제하기
let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true); //처음을 복제
let clonedLast = lastChild.cloneNode(true); // 마지막을 복제

//복제된 슬라이드 추가하기
slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

slideList.style.transform =
  "translate3d(-" + slideWidthExp * (startNum + 1) + "px, 0px 0px)";

let currIndex = startNum; // 복사본을 제외한 현재 슬라이드 index
let currentSlide = slideContents[currIndex]; //현재 슬라이드 dom
currentSlide.classList.add("slide_active");

/*pagination */
let pageChild = "";
for (let i = 0; i < slideLen; i++) {
  pageChild += '<li class="dot';
  pageChild += i === startNum ? " dot_active" : "";
  pageChild += '" data-index"' + i + '"<a href="#"></a></li>';
}

slidePagination.innerHTML = pageChild;
const pageDots = document.querySelectorAll(".dot");

//next button event
slideBtnNext.addEventListener("click", () => {
  if (currIndex <= slideLen - 1) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidthExp * (currIndex + 2) + "px, 0px, 0px)"; //div.slideList가 왼쪽으로 500px씩 계속 이동
    // currIndex 라는 변수를 0으로 잡아놓고 slideWidthExp * (currIndex + 1))px 만큼 x축(500px)만큼 움직인 후 currIndex를 1 증가시킴
  }

  if (currIndex === slideLen - 1) {
    //마지막 슬라이드에서 처음으로 이동
    setTimeout(() => {
      slideList.style.transition = "0ms";
      slideList.style.transform =
        "translate3d(-" + slideWidthExp + "px, 0px, 0px)";
    }, slideSpeed);
    currIndex = -1;
  }
  currentSlide.classList.remove("slide_active");
  pageDots[currIndex === -1 ? slideLen - 1 : currIndex].classList.remove(
    "dot_active"
  );
  currentSlide = slideContents[++currIndex];
  currentSlide.classList.add("slide_active");
  pageDots[currIndex].classList.add("dot_active");
});

/*prev button event */
slideBtnPrev.addEventListener("click", () => {
  if (currIndex >= 0) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidthExp * currIndex + "px, 0px, 0px)"; //div.slideList가 왼쪽으로 500px씩 계속 이동
    // currIndex 라는 변수를 0으로 잡아놓고 slideWidthExp * (currIndex + 1))px 만큼 x축(500px)만큼 움직인 후 currIndex를 1 증가시킴
  }

  if (currIndex === 0) {
    setTimeout(() => {
      slideList.style.transition = "0ms";
      slideList.style.transform =
        "translate3d(-" + slideWidthExp * currIndex + "px, 0px, 0px)";
    }, slideSpeed);
    currIndex = slideLen;
  }

  currentSlide.classList.remove("slide_active");
  pageDots[currIndex === slideLen ? 0 : currIndex].classList.remove(
    "dot_actionve"
  );
  currentSlide = slideContents[--currIndex];
  currentSlide.classList.add("slide_active");
  pageDots[currIndex].classList.add("dot_active");
});

//add pagination

let curDot;
Array.prototype.forEach.call(pageDots, function (dot, i) {
  dot.addEventListener("click", function (e) {
    e.preventDefault();
    curDot = document.querySelector(".dot_active");
    curDot.classList.remove("dot_active");
    curDot = this;
    this.classList.add("dot_active");
    curSlide.classList.remove("slide_active");
    currIndex = Number(this.getAttribute("data-index"));
    curSlide = slideContents[currIndex];
    curSlide.classList.add("slide_active");
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidthExp * (currIndex + 1) + "px, 0px, 0px)";
  });
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav_links");
const heroSection = document.querySelector(".hero");
const header = document.querySelector(".portfolio_header");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

