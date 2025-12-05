document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 부드러운 스크롤 기능: 모든 내부 앵커 링크(href="#...") 처리
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // 외부 링크가 아닌 경우에만 스크롤 기능 활성화
            if (this.hash !== "" && this.getAttribute('href') !== '#') {
                e.preventDefault();
                const hash = this.hash;
                
                // 해당 섹션으로 부드럽게 스크롤
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. 스크롤 애니메이션 (예시): 화면에 보일 때 요소들을 페이드 인 시키는 기능
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

    // 3. 포트폴리오 필터링 기능
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성화된 버튼 상태 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // 보이기 (CSS transition과 함께 부드럽게 나타남)
                    card.classList.remove('hidden');
                    card.style.opacity = 1;
                } else {
                    // 숨기기
                    card.style.opacity = 0;
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 500); // 0.5초 후에 display:none 적용
                }
            });
        });
    });
});
