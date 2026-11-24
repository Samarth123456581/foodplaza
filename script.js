/* =========================================================
   पुणेरी वडापाव — script.js
   Handles: navbar scroll state, mobile menu, menu tabs,
   scroll-reveal animation, shopping cart, order form, toast.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. NAVBAR — shrink + shadow on scroll, back-to-top
  --------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const toTopBtn = document.getElementById('toTopBtn');

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 500) {
      toTopBtn.classList.add('show');
    } else {
      toTopBtn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------
     2. MOBILE HAMBURGER MENU
  --------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------
     3. MENU TABS (वडापाव / मिसळ / Snacks / Drinks)
  --------------------------------------------------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });

  /* ---------------------------------------------------
     4. SCROLL-REVEAL ANIMATION (fade-in sections)
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------
     5. SHOPPING CART SYSTEM
  --------------------------------------------------- */
  let cart = []; // { id, name, price, img, qty }

  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyMsg = document.getElementById('cartEmptyMsg');
  const cartTotalQtyEl = document.getElementById('cartTotalQty');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  const navCartCountEl = document.getElementById('navCartCount');
  const cartBtn = document.getElementById('cartBtn');
  const selectedItemsField = document.getElementById('selectedItems');

  function formatRupee(n) {
    return '₹' + n.toLocaleString('en-IN');
  }

  function findItem(id) {
    return cart.find(i => i.id === id);
  }

  function addToCart({ id, name, price, img }) {
    price = Number(price);
    const existing = findItem(id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }
    renderCart();
    bumpCartIcon();
  }

  function changeQty(id, delta) {
    const item = findItem(id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    renderCart();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
  }

  function clearCart() {
    cart = [];
    renderCart();
  }

  function bumpCartIcon() {
    cartBtn.classList.remove('bump');
    // force reflow so the animation can restart
    void cartBtn.offsetWidth;
    cartBtn.classList.add('bump');
  }

  function renderCart() {
    // clear
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartItemsEl.appendChild(cartEmptyMsg);
      cartEmptyMsg.style.display = 'block';
    } else {
      cartEmptyMsg.style.display = 'none';

      cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <b>${item.name}</b>
            <span>${formatRupee(item.price)} × ${item.qty} = ${formatRupee(item.price * item.qty)}</span>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="remove-item" data-id="${item.id}" aria-label="Remove item">✕</button>
        `;
        cartItemsEl.appendChild(row);
      });
    }

    // totals
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

    cartTotalQtyEl.textContent = totalQty;
    cartSubtotalEl.textContent = formatRupee(subtotal);
    cartTotalEl.textContent = formatRupee(subtotal);
    navCartCountEl.textContent = totalQty;

    // reflect into the "Selected Items" field of the order form
    selectedItemsField.value = cart
      .map(i => `${i.name} x${i.qty}`)
      .join(', ');
  }

  // Add-to-cart buttons (menu grid + puneri special)
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        img: btn.dataset.img
      });
    });
  });

  // "Order Now" on a food card = add to cart + jump to order section
  document.querySelectorAll('.buy-now').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        img: btn.dataset.img
      });
      document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // qty +/-/remove via event delegation
  cartItemsEl.addEventListener('click', (e) => {
    const plus = e.target.closest('.qty-plus');
    const minus = e.target.closest('.qty-minus');
    const remove = e.target.closest('.remove-item');

    if (plus) changeQty(plus.dataset.id, 1);
    if (minus) changeQty(minus.dataset.id, -1);
    if (remove) removeItem(remove.dataset.id);
  });

  document.getElementById('clearCartBtn').addEventListener('click', clearCart);

  renderCart(); // initial render (empty state)

  /* ---------------------------------------------------
     6. PAYMENT OPTION SELECT STYLING
  --------------------------------------------------- */
  const payOpts = document.querySelectorAll('.pay-opt');
  payOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      payOpts.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  /* ---------------------------------------------------
     7. PLACE ORDER — validate + confirmation toast
  --------------------------------------------------- */
  const orderForm = document.getElementById('orderForm');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
  }

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('⚠️ कृपया आधी मेनूमधून पदार्थ कार्टमध्ये टाका!');
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();
      return;
    }

    const name = document.getElementById('custName').value.trim();

    // simple "confirmation message"
    showToast(`✅ धन्यवाद ${name}! तुमची ऑर्डर मिळाली — लवकरच डिलिव्हर होईल.`);

    // reset cart + form after placing the order
    clearCart();
    orderForm.reset();
    payOpts.forEach(o => o.classList.remove('selected'));
    payOpts[0].classList.add('selected');
  });

  /* ---------------------------------------------------
     8. "Get Directions" — friendly placeholder action
  --------------------------------------------------- */
  const directionsBtn = document.getElementById('directionsBtn');
  if (directionsBtn) {
    directionsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('🧭 दिशादर्शनासाठी कृपया तुमचा Google Maps लिंक इथे जोडा.');
    });
  }

});
