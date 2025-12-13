// main.js: Hero slider, mobile toggle, cart, newsletter, product slider

window.addEventListener('load', () => {

  /* ---------------------------
     HERO SLIDER
  --------------------------- */
  const slides = document.querySelectorAll('.hero .slide');
  let currentSlide = 0;
  const nextBtn = document.getElementById('heroNext');
  const prevBtn = document.getElementById('heroPrev');

  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Auto-slide every 6 seconds
  let heroAuto = setInterval(() => showSlide(currentSlide + 1), 6000);

  // Next / Prev buttons
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetHeroAuto();
  });

  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetHeroAuto();
  });

  function resetHeroAuto() {
    clearInterval(heroAuto);
    heroAuto = setInterval(() => showSlide(currentSlide + 1), 6000);
  }

  /* ---------------------------
     MOBILE NAV TOGGLE
  --------------------------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  mobileToggle.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'block' ? '' : 'block';
  });

  /* ---------------------------
     ADD TO CART COUNTER
  --------------------------- */
  const addBtns = document.querySelectorAll('.add-cart');
  const cartCountEl = document.querySelector('.cart-count');
  let cartCount = 0;

  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
      btn.textContent = 'Added';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Add';
        btn.disabled = false;
      }, 1500);
    });
  });

  /* ---------------------------
     NEWSLETTER FORM
  --------------------------- */
  const subForm = document.getElementById('subscribeForm');
  if(subForm){
    subForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks for subscribing!');
      subForm.reset();
    });
  }

  /* ---------------------------
     SET COPYRIGHT YEAR
  --------------------------- */
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------
     NEW PRODUCTS AUTOMATIC SLIDER
  --------------------------- */
  const productSlider = document.querySelector('.product-slider');
  const productGrid = document.querySelector('.product-grid');
  const productCards = document.querySelectorAll('.product-card');

  if (productSlider && productGrid && productCards.length > 0) {
    let offset = 0;
    const gap = 22; // match CSS gap

    function visibleCards() {
      const cardWidth = productCards[0].offsetWidth + gap;
      return Math.max(1, Math.floor(productSlider.offsetWidth / cardWidth));
    }

    function slideProducts() {
      const cardWidth = productCards[0].offsetWidth + gap;
      const visible = visibleCards();

      offset += cardWidth;

      // Reset when end is reached
      if (offset > (productCards.length - visible) * cardWidth) {
        offset = 0;
      }

      productGrid.style.transform = `translateX(-${offset}px)`;
      productGrid.style.transition = 'transform 0.5s ease-in-out';
    }

    // Auto-slide every 3 seconds
    let productAuto = setInterval(slideProducts, 3000);

    // Reset slider on window resize
    window.addEventListener('resize', () => {
      offset = 0;
      productGrid.style.transform = 'translateX(0px)';
    });
  }

});
