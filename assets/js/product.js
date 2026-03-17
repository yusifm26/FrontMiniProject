
function initHeroSlider() {
    const track = document.getElementById('sliderTrack');
    const prev = document.getElementById('heroPrev');
    const next = document.getElementById('heroNext');
    const dotsWrap = document.getElementById('sliderDots');

    if (!track || !prev || !next || !dotsWrap) return;

    const slides = Array.from(track.children);
    if (!slides.length) return;

    let current = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goTo(index));
        dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === current);
        });
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    goTo(0);
}
