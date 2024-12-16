class InfiniteSlider {
  constructor(options) {
    // DOM Elements
    this.slideList = document.querySelector(".slide_list");
    this.slideContents = document.querySelectorAll(".slide_content");
    this.btnNext = document.querySelector(".slide_btn_next");
    this.btnPrev = document.querySelector(".slide_btn_prev");
    this.pagination = document.querySelector(".slide_pagination");

    // Configuration
    this.config = {
      slideWidth: options?.slideWidth || 400,
      slideSpeed: options?.slideSpeed || 400,
      startIndex: options?.startIndex || 0,
    };

    // State
    this.slideLength = this.slideContents.length;
    this.currentIndex = this.config.startIndex;
    this.currentSlide = this.slideContents[this.currentIndex];

    this.init();
  }

  init() {
    this.setupSlider();
    this.createPagination();
    this.setupEventListeners();
    this.setActiveSlide();
  }

  setupSlider() {
    // Set slider width
    const totalWidth = this.config.slideWidth * (this.slideLength + 2);
    this.slideList.style.width = `${totalWidth}px`;

    // Clone slides for infinite effect
    const firstClone = this.slideList.firstElementChild.cloneNode(true);
    const lastClone = this.slideList.lastElementChild.cloneNode(true);

    this.slideList.appendChild(firstClone);
    this.slideList.insertBefore(lastClone, this.slideList.firstElementChild);

    // Set initial position
    this.moveSlide(this.currentIndex + 1, false);
  }

  createPagination() {
    const dots = Array.from(
      { length: this.slideLength },
      (_, i) => `
  <li class="dot${i === this.currentIndex ? " dot_active" : ""}" 
            data-index="${i}">
  <a href="#"></a>
  </li>
      `
    ).join("");

    this.pagination.innerHTML = dots;
    this.paginationDots = document.querySelectorAll(".dot");
  }

  setupEventListeners() {
    // Navigation buttons
    this.btnNext.addEventListener("click", () => this.next());
    this.btnPrev.addEventListener("click", () => this.prev());

    // Pagination dots
    this.paginationDots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        const index = parseInt(dot.dataset.index);
        this.goToSlide(index);
      });
    });
  }

  next() {
    if (this.currentIndex <= this.slideLength - 1) {
      this.moveSlide(this.currentIndex + 2);
    }

    if (this.currentIndex === this.slideLength - 1) {
      setTimeout(() => {
        this.moveSlide(1, false);
      }, this.config.slideSpeed);
      this.currentIndex = -1;
    }

    this.updateActiveState(++this.currentIndex);
  }

  prev() {
    if (this.currentIndex >= 0) {
      this.moveSlide(this.currentIndex);
    }

    if (this.currentIndex === 0) {
      setTimeout(() => {
        this.moveSlide(this.slideLength, false);
      }, this.config.slideSpeed);
      this.currentIndex = this.slideLength;
    }

    this.updateActiveState(--this.currentIndex);
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.moveSlide(index + 1);
    this.updateActiveState(index);
  }

  moveSlide(index, useTransition = true) {
    this.slideList.style.transition = useTransition
      ? `${this.config.slideSpeed}ms`
      : "0ms";
    this.slideList.style.transform = `translate3d(-${
      this.config.slideWidth * index
    }px, 0px, 0px)`;
  }

  updateActiveState(index) {
    // Remove current active states
    this.currentSlide.classList.remove("slide_active");
    this.paginationDots[
      index === -1 ? this.slideLength - 1 : index
    ].classList.remove("dot_active");

    // Set new active states
    this.currentSlide = this.slideContents[index];
    this.currentSlide.classList.add("slide_active");
    this.paginationDots[index].classList.add("dot_active");
  }

  setActiveSlide() {
    this.currentSlide.classList.add("slide_active");
    this.paginationDots[this.currentIndex].classList.add("dot_active");
  }
}

// 햄버거 메뉴 관련 코드
class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.navLinks = document.querySelector(".nav_links");
    this.init();
  }

  init() {
    this.hamburger.addEventListener("click", () => {
      this.hamburger.classList.toggle("active");
      this.navLinks.classList.toggle("active");
    });
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new InfiniteSlider({
    slideWidth: 400,
    slideSpeed: 400,
    startIndex: 0,
  });
  new MobileMenu();
});
