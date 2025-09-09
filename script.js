// 🚀 2025 JS — LIGHTWEIGHT, ASYNC, GEO-INTELLIGENT

// 1. GEO DETECTION + PERSONALIZATION
async function initGeoPersonalization() {
  try {
    const response = await fetch('https://ipapi.co/json/', { method: 'GET' });
    if (!response.ok) throw new Error('GEO fetch failed');

    const geo = await response.json();
    const region = geo.city ? `${geo.city}, ${geo.country_name}` : geo.country_name || 'your region';

    document.getElementById('user-region').textContent = region;
    document.getElementById('geo-banner').style.display = 'block';

    // Optional: Load country-specific tool recommendations
    // if (geo.country_code === 'US') { showUSTools(); }
    // if (geo.country_code === 'DE') { showDETools(); }

  } catch (error) {
    console.warn('GEO personalization failed:', error);
    // Graceful degradation — hide banner or show generic message
  }
}

// 2. LAZY LOAD IMAGES BELOW THE FOLD
function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// 3. EMAIL FORM HANDLER (REPLACE WITH YOUR ESP)
document.getElementById('subscribe-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = this.querySelector('[name="email"]').value;

  // In production: send to ConvertKit/Mailchimp via fetch()
  // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

  alert(`✅ Check your inbox! Sending the “AI Tool Stack” checklist to ${email}...`);
  this.reset();
});

// 4. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// INIT ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  initGeoPersonalization();
  initLazyLoad();
});

// OPTIONAL: ADD TO HOMESCREEN PROMPT (PWA)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  // Store event for later use — e.g., on a “Install App” button click
});
