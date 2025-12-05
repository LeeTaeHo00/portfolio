document.addEventListener('DOMContentLoaded', () => {
    // 1. 부드러운 스크롤
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 외부 링크가 아닌 경우에만 스크롤 기능 활성화
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                
                // 해당 섹션으로 부드럽게 스크롤
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. 스크롤 애니메이션 (예시)
    // 화면에 보일 때 요소들을 페이드 인 시키는 기능
    const animateElements = document.querySelectorAll('[data-animate="fade-in"]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10%가 보이면 실행
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1; // opacity: 0으로 시작하는 CSS 필요
                entry.target.style.transition = 'opacity 1s ease-out';
                observer.unobserve(entry.target); // 한 번 실행 후 관찰 중단
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        element.style.opacity = 0; // 초기 상태를 투명하게 설정
        observer.observe(element);
    });
});
