// DOM 요소 선택 함수
const getElements = () => ({
  slideList: document.querySelector(".slide_list"),
  slideContents: document.querySelectorAll(".slide_content"),
  btnNext: document.querySelector(".slide_btn_next"),
  btnPrev: document.querySelector(".slide_btn_prev"),
  pagination: document.querySelector(".slide_pagination"),
});

// 슬라이더 상태 관리
const createSliderState = (options = {}) => ({
  slideWidth: options.slideWidth || 400,
  slideSpeed: options.slideSpeed || 400,
  currentIndex: options.startIndex || 0,
  slideLength: document.querySelectorAll(".slide_content").length,
});

// 슬라이더 초기 설정
const setupSlider = (elements, state) => {
  const { slideList } = elements;
  const { slideWidth, slideLength } = state;

  // 전체 슬라이더 너비 설정
  const totalWidth = slideWidth * (slideLength + 2);
  slideList.style.width = `${totalWidth}px`;

  // 무한 슬라이드를 위한 처음과 마지막 슬라이드 복제
  const firstClone = slideList.firstElementChild.cloneNode(true);
  const lastClone = slideList.lastElementChild.cloneNode(true);

  slideList.appendChild(firstClone);
  slideList.insertBefore(lastClone, slideList.firstElementChild);

  // 초기 위치 설정
  moveSlide(elements, state, 1, false);
};

// 페이지네이션 생성
const createPagination = (elements, state) => {
  const { pagination } = elements;
  const { slideLength, currentIndex } = state;

  const dots = Array.from(
    { length: slideLength },
    (_, i) => `
  <li class="dot${i === currentIndex ? " dot_active" : ""}" 
          data-index="${i}">
  <a href="#"></a>
  </li>
    `
  ).join("");

  pagination.innerHTML = dots;
  return document.querySelectorAll(".dot");
};

// 슬라이드 이동
const moveSlide = (elements, state, index, useTransition = true) => {
  const { slideList } = elements;
  const { slideWidth, slideSpeed } = state;

  slideList.style.transition = useTransition ? `${slideSpeed}ms` : "0ms";
  slideList.style.transform = `translate3d(-${slideWidth * index}px, 0px, 0px)`;
};

// 활성 상태 업데이트
const updateActiveState = (elements, state, index) => {
  const { slideContents } = elements;
  const { slideLength } = state;
  const dots = document.querySelectorAll(".dot");

  // 현재 활성 상태 제거
  const currentSlide = slideContents[state.currentIndex];
  currentSlide?.classList.remove("slide_active");
  dots[state.currentIndex]?.classList.remove("dot_active");

  // 새로운 활성 상태 설정
  const newSlide = slideContents[index];
  newSlide?.classList.add("slide_active");
  dots[index]?.classList.add("dot_active");

  // 상태 업데이트
  state.currentIndex = index;
};

// 다음 슬라이드로 이동
const nextSlide = (elements, state) => {
  const { slideLength, currentIndex } = state;

  if (currentIndex <= slideLength - 1) {
    moveSlide(elements, state, currentIndex + 2);
  }

  if (currentIndex === slideLength - 1) {
    setTimeout(() => {
      moveSlide(elements, state, 1, false);
    }, state.slideSpeed);
    updateActiveState(elements, state, 0);
    return;
  }

  updateActiveState(elements, state, currentIndex + 1);
};

// 이전 슬라이드로 이동
const prevSlide = (elements, state) => {
  const { slideLength, currentIndex } = state;

  if (currentIndex >= 0) {
    moveSlide(elements, state, currentIndex);
  }

  if (currentIndex === 0) {
    setTimeout(() => {
      moveSlide(elements, state, slideLength, false);
    }, state.slideSpeed);
    updateActiveState(elements, state, slideLength - 1);
    return;
  }

  updateActiveState(elements, state, currentIndex - 1);
};

// 특정 슬라이드로 이동
const goToSlide = (elements, state, index) => {
  moveSlide(elements, state, index + 1);
  updateActiveState(elements, state, index);
};

// 이벤트 리스너 설정
const setupEventListeners = (elements, state) => {
  const { btnNext, btnPrev } = elements;
  const dots = document.querySelectorAll(".dot");

  btnNext.addEventListener("click", () => nextSlide(elements, state));
  btnPrev.addEventListener("click", () => prevSlide(elements, state));

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(dot.dataset.index);
      goToSlide(elements, state, index);
    });
  });
};

// 햄버거 메뉴 설정
const setupMobileMenu = () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav_links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }
};

// 슬라이더 초기화
const initializeSlider = (options = {}) => {
  const elements = getElements();
  const state = createSliderState(options);

  setupSlider(elements, state);
  createPagination(elements, state);
  setupEventListeners(elements, state);
  // 초기 활성 상태 설정
  updateActiveState(elements, state, state.currentIndex);
};

// 전체 앱 초기화
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider({
    slideWidth: 400,
    slideSpeed: 400,
    startIndex: 0,
  });
  setupMobileMenu();
});
