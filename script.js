// ----------------------
// PRODUCT CATALOG + SLIDER SETUP
// ----------------------

const productCatalog = [
  { img: 'machine_01.png', title: 'Automatic Pouch Packing Machine' },
  { img: 'machine_02.png', title: 'Form Fill Seal Machine' },
  { img: 'machine_03.png', title: 'Candy Pillow Wrapping Machine' },
  { img: 'machine_04.png', title: 'Automatic Liquid Filling Machine' },
  { img: 'machine_05.png', title: 'Volumetric Cup Filler Machine' },
  { img: 'machine_06.png', title: 'Auger Base Form Fill Seal Machine' },
  { img: 'machine_07.png', title: 'Piston Filler Machine' },
  { img: 'machine_08.png', title: 'Automatic Flow Wrap Machine' },
  { img: 'machine_09.png', title: 'Spices / Powder Packing Machine' }
];

// // Full category list
// const categories = [
//   {
//     name: 'Pouch Packing Machine',
//     items: [
//       { title: 'Automatic Pouch Packing Machine', img: 'machine_01.png' },
//       { title: 'Pouch Packaging Machine', img: 'machine_10.jpeg' },
//       { title: 'Plastic Pouch Packing Machine', img: 'machine_11.jpg' },
//       { title: 'Pneumatic Pouch Packing Machine', img: 'machine_12.jpg' }
//     ]
//   },
//   {
//     name: 'Form Fill Seal Machine',
//     items: [
//       { title: 'Form Fill Seal Machine', img: 'machine_02.png' },
//       { title: 'Automatic Form Fill Seal Machine', img: 'machine_13.webp' },
//       { title: 'Auger Base Form Fill Seal Machine', img: 'machine_06.png' },
//       { title: 'Auger Base FFS Machine', img: 'machine_14.jpeg' }
//     ]
//   },
//   {
//     name: 'Filler Machine',
//     items: [
//       { title: 'Volumetric Cup Filler Machine', img: 'machine_05.png' },
//       { title: 'Collar Type Cup Filler Machine', img: 'machine_15.jpeg' },
//       { title: 'Piston Filler Machine', img: 'machine_07.png' },
//       { title: 'Servo Auger Filler Machine', img: 'machine_16.png' }
//     ]
//   },
//   {
//     name: 'Powder / Spices Packing Machine',
//     items: [
//       { title: 'Spices Packing Machine', img: 'machine_17.webp' },
//       { title: 'Powder Packing Machine', img: 'machine_18.jpeg' }
//     ]
//   },
//   {
//     name: 'Candy Wrapping Machine',
//     items: [
//       { title: 'Candy Pillow Wrapping Machine', img: 'machine_03.png' },
//       { title: 'Candy Wrapping Machine', img: 'machine_19.jpg' }
//     ]
//   },
//   {
//     name: 'Liquid Filling',
//     items: [
//       { title: 'Automatic Liquid Filling Machines', img: 'machine_04.png' },
//       { title: 'Semi Automatic Liquid filling machines', img: 'machine_20.webp' }
//     ]
//   },
//   {
//     name: 'Flow Wrap',
//     items: [
//       { title: 'Automatic Flow Wrap Machine', img: 'machine_08.png' },
//       { title: 'Horizontal Flow Wrap Machine', img: 'machine_21.jpg' }
//     ]
//   },
//   {
//     name: 'Granule & Snacks',
//     items: [
//       { title: 'Granule Packaging Machine', img: 'machine_22.webp' },
//       { title: 'Namkeen Packing Machine', img: 'machine_23.jpg' },
//       { title: 'Biscuit Packing Machine', img: 'machine_24.jpg' }
//     ]
//   },
//   {
//     name: 'Other Machines',
//     items: [
//       { title: 'Shampoo Packaging Machine', img: 'machine_25.webp' },
//       { title: 'Sugar Packing Machine', img: 'machine_26.jpg' },
//       { title: 'Oil Filling Machines', img: 'machine_27.jpeg' },
//       { title: 'Collar Type Form Fill and Seal Machine', img: 'machine_28.webp' }
//     ]
//   }
// ];



// ----------------------
// CAROUSEL
// ----------------------
const carouselEl = document.getElementById('carousel');
let carouselIndex = 0, carouselSlides = [], carouselTimer;

function buildCarousel() {
  if (!carouselEl) return;
  const container = document.createElement('div');
  container.className = 'carousel-container';

  // Slides
  productCatalog.forEach((p, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
      <img src="images/${p.img}" alt="${p.title}" loading="lazy">
      <div class="carousel-caption">${p.title}</div>
    `;
    container.appendChild(slide);
  });

  // Indicators
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';
  productCatalog.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showSlide(i));
    indicators.appendChild(dot);
  });

  carouselEl.appendChild(container);
  carouselEl.appendChild(indicators);

  // Controls
  const prev = carouselEl.querySelector('.carousel-prev');
  const next = carouselEl.querySelector('.carousel-next');
  prev && prev.addEventListener('click', () => stepCarousel(-1));
  next && next.addEventListener('click', () => stepCarousel(1));

  // Auto rotation
  carouselSlides = container.querySelectorAll('.carousel-slide');
  startCarousel();
  carouselEl.addEventListener('mouseenter', stopCarousel);
  carouselEl.addEventListener('mouseleave', startCarousel);
}

function stepCarousel(dir = 1) {
  showSlide((carouselIndex + dir + carouselSlides.length) % carouselSlides.length);
}

function showSlide(i) {
  carouselSlides[carouselIndex].classList.remove('active');
  document.querySelectorAll('.dot')[carouselIndex].classList.remove('active');
  carouselIndex = i;
  carouselSlides[carouselIndex].classList.add('active');
  document.querySelectorAll('.dot')[carouselIndex].classList.add('active');
}

function startCarousel() {
  stopCarousel();
  carouselTimer = setInterval(() => stepCarousel(1), 5000);
}
function stopCarousel() {
  clearInterval(carouselTimer);
}


// ----------------------
// PRODUCT CARDS + GRID
// ----------------------
const categoriesEl = document.getElementById('product-categories');
const allProductsEl = document.getElementById('all-products');
const quoteSelect = document.getElementById('qProduct');

function populateProducts() {
  if (!categoriesEl || !allProductsEl || !quoteSelect) return;

  categories.forEach(cat => {
    const block = document.createElement('div');
    block.className = 'product-category card';
    block.innerHTML = `<h3>${cat.name}</h3>`;
    const grid = document.createElement('div');
    grid.className = 'product-grid';

    cat.items.forEach(it => {
      // Product card
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="images/${it.img}" alt="${it.title}" loading="lazy">
        <div class="card-body">
          <h4>${it.title}</h4>
          <p class="muted">${cat.name}</p>
          <div class="card-actions">
            <button class="btn outline">Get Best Quote</button>
            <button class="btn ghost">View Details</button>
          </div>
        </div>
      `;
      const [btnQuote, btnDetail] = card.querySelectorAll('button');
      btnQuote.addEventListener('click', () => openQuoteModal(it.title));
      btnDetail.addEventListener('click', () => openDetailModal(it));
      grid.appendChild(card);

      // All products list
      const p = document.createElement('div');
      p.className = 'product';
      p.innerHTML = `
        <img src="images/${it.img}" alt="${it.title}" loading="lazy">
        <h3>${it.title}</h3><p class="muted">${cat.name}</p>
      `;
      allProductsEl.appendChild(p);

      // Add option to enquiry select
      const opt = new Option(`${it.title} — ${cat.name}`, it.title);
      quoteSelect.appendChild(opt);
    });
    block.appendChild(grid);
    categoriesEl.appendChild(block);
  });
}


// ----------------------
// MODAL HANDLING
// ----------------------
const modal = document.getElementById('quoteModal');
const detailModal = document.createElement('div'); // for product details
detailModal.id = "detailModal";
detailModal.className = "modal";
detailModal.innerHTML = `
  <div class="modal-panel card">
    <button class="modal-close">&times;</button>
    <div id="detailContent"></div>
  </div>
`;
document.body.appendChild(detailModal);

function openQuoteModal(product) {
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('modalProduct').textContent = `Product: ${product}`;
  document.getElementById('mProduct').value = product;
  ['mName','mPhone','mMsg'].forEach(id=>document.getElementById(id).value='');
}
function openDetailModal(it) {
  detailModal.setAttribute('aria-hidden','false');
  document.getElementById('detailContent').innerHTML = `
    <h3>${it.title}</h3>
    <img src="images/${it.img}" alt="${it.title}">
    <p>For detailed specs, please contact us for a brochure or quotation.</p>
  `;
}
function closeAllModals() {
  modal.setAttribute('aria-hidden','true');
  detailModal.setAttribute('aria-hidden','true');
}

// Close modal by Esc or overlay
document.addEventListener('keydown', e => e.key === 'Escape' && closeAllModals());
[modal, detailModal].forEach(m => {
  m.addEventListener('click', e => { if(e.target === m) closeAllModals(); });
  m.querySelector('.modal-close').addEventListener('click', closeAllModals);
});


// ----------------------
// FORM HANDLING
// ----------------------
function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone); // Indian 10-digit numbers
}

document.getElementById('modalForm')?.addEventListener('submit', ev => {
  ev.preventDefault();
  const data = {
    product: document.getElementById('mProduct').value,
    name: document.getElementById('mName').value.trim(),
    phone: document.getElementById('mPhone').value.trim(),
    message: document.getElementById('mMsg').value.trim(),
    time: new Date().toISOString()
  };
  if (!data.name || !validatePhone(data.phone)) { alert('Enter valid name and mobile.'); return; }
  saveEnquiryLocal(data);
  alert('Enquiry saved locally. You can also email/call for faster reply.');
  closeAllModals();
});

document.getElementById('contactForm')?.addEventListener('submit', ev => {
  ev.preventDefault();
  const payload = {
    product: document.getElementById('qProduct').value,
    name: document.getElementById('qName').value.trim(),
    mobile: document.getElementById('qMobile').value.trim(),
    message: document.getElementById('qMessage').value.trim(),
    time: new Date().toISOString()
  };
  if (!payload.product || !payload.name || !validatePhone(payload.mobile)) {
    alert('Please select product and enter a valid mobile.'); return;
  }
  saveEnquiryLocal(payload);

  // mailto fallback
  const subject = encodeURIComponent(`Enquiry: ${payload.product} — ${payload.name}`);
  const body = encodeURIComponent(
    `Product: ${payload.product}\nName: ${payload.name}\nMobile: ${payload.mobile}\n\nMessage:\n${payload.message}`
  );
  window.location.href = `mailto:babluthakur2012@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById('btnSaveLocal')?.addEventListener('click', () => {
  const payload = {
    product: document.getElementById('qProduct').value,
    name: document.getElementById('qName').value.trim(),
    mobile: document.getElementById('qMobile').value.trim(),
    message: document.getElementById('qMessage').value.trim(),
    time: new Date().toISOString()
  };
  if (!payload.product || !payload.name || !validatePhone(payload.mobile)) {
    alert('Please select product and enter a valid mobile.'); return;
  }
  saveEnquiryLocal(payload);
  alert('Enquiry saved locally.');
});


// ----------------------
// SAVE TO LOCALSTORAGE
// ----------------------
function saveEnquiryLocal(obj) {
  const KEY = 'rajpouch_enquiries_v1';
  const all = JSON.parse(localStorage.getItem(KEY) || '[]');
  all.push(obj);
  localStorage.setItem(KEY, JSON.stringify(all));
  console.log('Saved enquiry:', obj);
}


// ----------------------
// NAVIGATION + CTA
// ----------------------
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const el = document.getElementById(targetId);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  });
});

const navToggle = document.getElementById('navToggle');
navToggle && navToggle.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  nav.style.display = expanded ? 'none' : 'flex';
});

document.getElementById('btn-quote-hero')?.addEventListener('click', () => openQuoteModal('General Enquiry'));


// ----------------------
// INIT
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  buildCarousel();
  populateProducts();
});
