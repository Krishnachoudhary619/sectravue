document.getElementById('waContact')?.addEventListener('click', () => {
  const msg = encodeURIComponent('I want to know more about the products');
  window.open('https://wa.me/919321618509?text=' + msg, '_blank');
});

document.querySelectorAll('.wa-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = `Hi,
I'm interested in spectravue products.
Please share the details?`;
    window.open('https://wa.me/919321618509?text=' + encodeURIComponent(msg), '_blank');
  });
});

/* Cursor */
if (window.matchMedia('(hover:hover)').matches) {
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if (cur && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * .1;
      ry += (my - ry) * .1;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.prod-card,.feat-item,.uc-card,.testi-card,.meet-pt').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.width = '16px';
        cur.style.height = '16px';
        cur.style.background = 'var(--blue)';
        ring.style.width = '50px';
        ring.style.height = '50px';
        ring.style.borderColor = 'rgba(26,86,255,.3)';
      });
      el.addEventListener('mouseleave', () => {
        cur.style.width = '8px';
        cur.style.height = '8px';
        cur.style.background = 'var(--ink)';
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(0,0,0,.22)';
      });
    });
  }
}

/* Header */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) header.classList.toggle('scrolled', scrollY > 50);
}, { passive: true });

/* Mobile menu */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobMenu');
if (ham && mob) {
  ham.addEventListener('click', () => {
    const o = mob.classList.toggle('open');
    const icon = ham.querySelector('i');
    if (icon) icon.className = o ? 'fas fa-times' : 'fas fa-bars';
  });
}

window.closeMob = function closeMob() {
  if (!mob || !ham) return;
  mob.classList.remove('open');
  const icon = ham.querySelector('i');
  if (icon) icon.className = 'fas fa-bars';
};

/* Scroll reveal */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      obs.unobserve(e.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));

/* Product filter */
window.filterProd = function filterProd(cat, btn) {
  document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#prodGrid .prod-card').forEach(c => {
    const categories = c.dataset.cat ? c.dataset.cat.split(' ') : [];
    const show = cat === 'all' || categories.includes(cat);
    c.style.display = show ? 'flex' : 'none';
  });
};

/* Smooth scroll for in-page hashes */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

/* Contact form */
const form = document.getElementById('contactForm');
if (form) {
  const preset = document.body.dataset.product;
  if (preset) {
    const select = form.querySelector('[name="product"]');
    if (select) select.value = preset;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/xdapgejn', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
        btn.style.background = '#2d6a4f';
        const name = form.querySelector('[name="name"]').value;
        const product = form.querySelector('[name="product"]').value;
        const waMsg = `Hi SpectraVue 👋
I just submitted a form on your website.

Name: ${name}
Product: ${product}

Please connect with me.`;
        window.open('https://wa.me/919321618509?text=' + encodeURIComponent(waMsg), '_blank');
        form.reset();
        if (preset && form.querySelector('[name="product"]')) {
          form.querySelector('[name="product"]').value = preset;
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      btn.innerHTML = '<i class="fas fa-times-circle"></i> Failed!';
      btn.style.background = '#e63946';
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

/* Product image gallery */
const mainPhoto = document.querySelector('.pd-hero-photo');
if (mainPhoto) {
  document.querySelectorAll('.pd-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.src;
      if (!src) return;
      mainPhoto.src = src;
      document.querySelectorAll('.pd-thumb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* Subtle parallax on hero orbs */
window.addEventListener('scroll', () => {
  const s = scrollY;
  document.querySelectorAll('.orb').forEach((o, i) => {
    o.style.transform = `translate(${i % 2 === 0 ? s * .022 : -s * .016}px,${s * (.012 + i * .009)}px)`;
  });
}, { passive: true });
