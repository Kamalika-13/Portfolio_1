// ═══════════════════════════════════
//   KAMALIKA B S — PORTFOLIO SCRIPT
// ═══════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ──
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (dot)  dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    if (ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateCursor);
  })();
  document.querySelectorAll('a,button,.proj-card,.info-card,.contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => { if (ring) { ring.style.width='48px'; ring.style.height='48px'; ring.style.borderColor='rgba(168,85,247,0.6)'; } });
    el.addEventListener('mouseleave', () => { if (ring) { ring.style.width='34px'; ring.style.height='34px'; ring.style.borderColor='rgba(168,85,247,0.45)'; } });
  });

  // ── Header scroll ──
  const header = document.getElementById('header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', () => { updateHeader(); updateActiveNav(); animateSkillBars(); });
  updateHeader();

  // ── Hamburger ──
  const hamburger = document.getElementById('hamburger');
  const navbar    = document.getElementById('navbar');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar?.classList.toggle('active');
    document.body.style.overflow = navbar?.classList.contains('active') ? 'hidden' : '';
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navbar?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('click', e => {
    if (!navbar?.contains(e.target) && !hamburger?.contains(e.target) && navbar?.classList.contains('active')) {
      hamburger?.classList.remove('active');
      navbar?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ── Active nav on scroll ──
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const y = window.scrollY + 130;
    sections.forEach(sec => {
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (!link) return;
      if (sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  // ── Typewriter ──
  const roles   = ['Software Developer 💻', 'Java Developer ☕', 'Data Analyst 📊', 'Web Developer 🌐', 'ML Enthusiast 🤖'];
  let ri = 0, ci = 0, del = false;
  const tw = document.getElementById('typewriter');
  function type() {
    if (!tw) return;
    const word = roles[ri];
    tw.textContent = del ? word.substring(0, ci--) : word.substring(0, ci++);
    let delay = del ? 55 : 95;
    if (!del && ci > word.length)    { delay = 1800; del = true; }
    if ( del && ci < 0)              { del = false; ri = (ri + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();

  // ── Reveal on scroll ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Skill Bars ──
  let barsAnimated = false;
  function animateSkillBars() {
    if (barsAnimated) return;
    const section = document.getElementById('skills1');
    if (!section) return;
    if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
      barsAnimated = true;
      document.querySelectorAll('.sb-fill').forEach(fill => {
        fill.style.width = fill.style.getPropertyValue('--pct');
      });
    }
  }
  animateSkillBars();

  // ── 3D Tilt on Project Cards ──
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = e.clientX - r.left;
      const y   = e.clientY - r.top;
      const cx  = r.width  / 2;
      const cy  = r.height / 2;
      const rX  = ((y - cy) / cy) * -8;
      const rY  = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(12px) scale(1.02)`;
      const glow = card.querySelector('.proj-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(168,85,247,0.35) 0%, transparent 70%)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    });
  });

  // ── Contact Form ──
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('fname')?.value    || '';
    const subject = document.getElementById('fsubject')?.value || 'Portfolio Contact';
    const msg     = document.getElementById('fmsg')?.value     || '';
    const mailto  = `mailto:kamalisundar1303@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Kamalika,\n\n${msg}\n\n— ${name}`)}`;
    window.location.href = mailto;
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Mail App...';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    btn.style.boxShadow  = '0 8px 24px rgba(34,197,94,0.3)';
    setTimeout(() => {
      btn.innerHTML    = orig;
      btn.style.background = '';
      btn.style.boxShadow  = '';
      e.target.reset();
    }, 3000);
  });

});
