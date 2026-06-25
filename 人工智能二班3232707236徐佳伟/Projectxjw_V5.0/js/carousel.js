/**
 * 轮播图模块
 * 功能：自动轮播、手动切换、指示点、触摸滑动
 */

// ========== 轮播图状态变量 ==========
var currentSlide = 0;      // 当前幻灯片索引
var totalSlides = 0;       // 幻灯片总数
var autoPlayTimer = null;  // 自动播放定时器
var autoPlayInterval = 4000; // 自动播放间隔(毫秒)
var isAnimating = false;   // 是否正在动画中

/**
 * 初始化轮播图
 */
function initCarousel() {
    var track = document.getElementById('carouselTrack');
    var dotsContainer = document.getElementById('carouselDots');

    if (!track) return;

    var slides = track.querySelectorAll('.carousel-slide');
    totalSlides = slides.length;

    // 生成指示点
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (var i = 0; i < totalSlides; i++) {
            var dot = document.createElement('span');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.onclick = (function(index) {
                return function() {
                    goToSlide(index);
                };
            })(i);
            dotsContainer.appendChild(dot);
        }
    }

    // 开始自动播放
    startAutoPlay();

    // 鼠标悬停暂停自动播放
    var carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // 触摸滑动支持
        var touchStartX = 0;
        var touchEndX = 0;

        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            stopAutoPlay();
        }, { passive: true });

        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoPlay();
        }, { passive: true });
    }

    /**
     * 处理触摸滑动
     */
    function handleSwipe() {
        var diff = touchStartX - touchEndX;
        var threshold = 50; // 最小滑动距离

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide(); // 向左滑动，下一张
            } else {
                prevSlide(); // 向右滑动，上一张
            }
        }
    }
}

/**
 * 切换到指定幻灯片
 * @param {number} index - 目标幻灯片索引
 */
function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;

    isAnimating = true;

    var track = document.getElementById('carouselTrack');
    var slides = track.querySelectorAll('.carousel-slide');
    var dots = document.querySelectorAll('.carousel-dot');

    // 移除当前活动状态
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
    }

    // 更新索引
    currentSlide = index;

    // 添加新的活动状态
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }

    // 移动轮播轨道
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

    // 动画完成后解锁
    setTimeout(function() {
        isAnimating = false;
    }, 500);
}

/**
 * 下一张幻灯片
 */
function nextSlide() {
    var next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
}

/**
 * 上一张幻灯片
 */
function prevSlide() {
    var prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
}

/**
 * 开始自动播放
 */
function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(function() {
        nextSlide();
    }, autoPlayInterval);
}

/**
 * 停止自动播放
 */
function stopAutoPlay() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}
