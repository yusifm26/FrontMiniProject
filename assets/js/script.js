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

function initProductSlider(trackId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (!track || !prevBtn || !nextBtn) return;

    const slider = track.parentElement;
    const slides = Array.from(track.children);
    const gap = 16;
    let visibleCount = 5;
    let current = 0;
    let step = 0;
    let maxIndex = 0;

    function getVisibleCount() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1024) return 2;
        if (window.innerWidth <= 1280) return 4;
        return 5;
    }

    function updateButtons() {
        const atStart = current <= 0;
        const atEnd = current >= maxIndex;

        prevBtn.disabled = atStart;
        nextBtn.disabled = atEnd;
        prevBtn.style.opacity = atStart ? '0.35' : '1';
        nextBtn.style.opacity = atEnd ? '0.35' : '1';
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${current * step}px)`;
        updateButtons();
    }

    function measure() {
        const sliderWidth = slider.clientWidth;
        if (!sliderWidth) return;

        visibleCount = getVisibleCount();
        const cardWidth = (sliderWidth - gap * (visibleCount - 1)) / visibleCount;

        slides.forEach((slide) => {
            slide.style.flex = `0 0 ${cardWidth}px`;
            slide.style.width = `${cardWidth}px`;
            slide.style.minWidth = `${cardWidth}px`;
        });

        step = cardWidth + gap;
        maxIndex = Math.max(0, slides.length - visibleCount);
        goTo(current);
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    measure();
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();

    initProductSlider('product-track-1', 'box10', 'box11');
    initProductSlider('product-track-2', 'box13', 'box14');
    initProductSlider('product-track-3', 'box15', 'box16');
});

document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    if (e.target.closest('.fav-box')) return;
    if (e.target.closest('.add-to-cart-btn')) return;

    window.location.href = 'product.html';
});

(function () {
    const viewport = document.getElementById('brandViewport');
    const track = document.getElementById('brandTrack');
    if (!track || !viewport) return;

    const originals = Array.from(track.children);
    if (!originals.length) return;

    originals.forEach((el) => track.appendChild(el.cloneNode(true)));

    let pos = 0;
    let speed = 0.4;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let isPaused = false;
    let loopWidth = 0;

    function updateLoopWidth() {
        loopWidth = track.scrollWidth / 2;
    }

    function clampPos() {
        if (!loopWidth) return;
        if (pos >= loopWidth) pos -= loopWidth;
        if (pos < 0) pos += loopWidth;
    }

    function animate() {
        if (!isDragging && !isPaused) {
            pos += speed;
        }
        clampPos();
        track.style.transform = `translateX(-${pos}px)`;
        requestAnimationFrame(animate);
    }

    viewport.addEventListener('mousedown', e => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartPos = pos;
        viewport.style.cursor = 'grabbing';
        e.preventDefault();
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        pos = dragStartPos + (dragStartX - e.clientX);
        clampPos();
        track.style.transform = `translateX(-${pos}px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        viewport.style.cursor = 'grab';
    });

    viewport.addEventListener('touchstart', e => {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartPos = pos;
    }, { passive: true });

    viewport.addEventListener('touchmove', e => {
        if (!isDragging) return;
        pos = dragStartPos + (dragStartX - e.touches[0].clientX);
        clampPos();
        track.style.transform = `translateX(-${pos}px)`;
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
        isDragging = false;
    });

    viewport.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    viewport.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    window.addEventListener('resize', () => {
        updateLoopWidth();
        clampPos();
    });

    viewport.style.cursor = 'grab';
    updateLoopWidth();
    animate();
})();

document.querySelectorAll('.fav-box').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const path = btn.querySelector('svg path');
        if (path) {
            path.setAttribute('fill', btn.classList.contains('active') ? '#EE3323' : 'none');
        }
    });
});


document.getElementById('box3')?.addEventListener('click', () => {
    const input = document.querySelector('.search-wrap input');
    if (input?.value.trim()) alert('Axtarış: ' + input.value);
});