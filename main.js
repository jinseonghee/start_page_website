const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const heroSection = document.querySelector('.hero');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    // hero 섹션의 높이를 가져와서 메뉴의 최대 높이로 설정
    if (navLinks.classList.contains('active')) {
        const heroHeight = heroSection.offsetHeight;
        navLinks.style.maxHeight = `${heroHeight}px`;
    } else {
        navLinks.style.maxHeight = '0';
    }
});

// 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.style.maxHeight = '0';
    });
});