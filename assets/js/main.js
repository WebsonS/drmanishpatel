/* Dr. Manish Patel: motion layer. GSAP + ScrollTrigger + Lenis (vendored). Every page stays readable without JS. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) {} }

  /* ---------- behaviour that never depends on GSAP ---------- */
  var hdr = document.getElementById('hdr');
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var lenis = null;
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', !open);
    if (lenis) open ? lenis.stop() : lenis.start();
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    if (hdr) {
      hdr.classList.toggle('is-solid', y > 40);
      hdr.classList.toggle('is-hidden', y > lastY && y > 500 && !drawer.classList.contains('is-open'));
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('[data-ba]').forEach(function (fig) {
    var stage = fig.querySelector('.ba__stage');
    var input = fig.querySelector('input');
    input.addEventListener('input', function () { stage.style.setProperty('--pos', input.value + '%'); fig.dataset.touched = '1'; });
  });

  // booking forms (popup + contact page) -> WhatsApp of the chosen clinic
  document.querySelectorAll('[data-book-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form), ok = true;
      ['name', 'phone'].forEach(function (n) {
        var el = form.elements[n], v = String(f.get(n) || '').trim();
        var bad = !v || (n === 'phone' && v.replace(/\D/g, '').length < 10);
        el.classList.toggle('err', bad);
        if (bad) ok = false;
      });
      var okBox = form.elements.ok;
      if (okBox && !okBox.checked) { okBox.closest('label').classList.add('err'); ok = false; }
      if (!ok) { form.querySelector('.err').focus(); return; }
      var num = f.get('clinic') === 'Panaji' ? '919730856787' : '919284562451';
      var text = 'Hello Dr. Patel’s team, I would like to arrange an appointment.\nName: ' + f.get('name') + '\nPhone: ' + f.get('phone') + '\nClinic: ' + f.get('clinic') +
        (f.get('treatment') ? '\nTreatment: ' + f.get('treatment') : '') + (f.get('msg') ? '\nMessage: ' + f.get('msg') : '');
      window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
    form.addEventListener('input', function (e) { e.target.classList.remove('err'); var l = e.target.closest('.bform__ok'); if (l) l.classList.remove('err'); });
  });

  // booking popup: every [data-book] opens it instead of leaving the page
  var modal = document.getElementById('book-modal');
  var mbar = document.querySelector('.mbar');
  var lastFocus = null;
  function openBook(treatment) {
    if (!modal) return;
    lastFocus = document.activeElement;
    if (drawer.classList.contains('is-open')) setMenu(false);
    if (treatment) { var sel = modal.querySelector('select[name=treatment]'); if (sel) sel.value = treatment; }
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; if (lenis) lenis.stop();
    if (mbar) mbar.classList.add('is-away');
    setTimeout(function () { var i = modal.querySelector('input[name=name]'); if (i && fine) i.focus(); }, 350);
  }
  function closeBook() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; if (lenis) lenis.start();
    if (mbar) mbar.classList.remove('is-away');
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-book]');
    if (b) {
      e.preventDefault();
      openBook(b.dataset.book || document.body.dataset.service || '');
      return;
    }
    if (e.target.closest('[data-close]')) closeBook();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeBook();
    if (e.key === 'Tab' && modal && modal.classList.contains('is-open')) {
      var f = modal.querySelectorAll('button, input, select, textarea, a[href]'), a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  // testimonials carousel (CSS handles the fade; JS rotates)
  document.querySelectorAll('[data-quotes]').forEach(function (q) {
    var items = q.querySelectorAll('.quote'), dots = q.querySelectorAll('.quotes__nav button'), i = 0, t;
    function go(n) {
      items[i].classList.remove('is-on'); dots[i].classList.remove('is-on');
      i = (n + items.length) % items.length;
      items[i].classList.add('is-on'); void dots[i].offsetWidth; dots[i].classList.add('is-on');
      clearTimeout(t); t = setTimeout(function () { go(i + 1); }, 6000);
    }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    t = setTimeout(function () { go(1); }, 6000);
  });

  /* ---------- hero photo carousel ---------- */
  document.querySelectorAll('[data-hx]').forEach(function (hx) {
    var sl = hx.querySelectorAll('.hx__s'), cap = hx.querySelectorAll('.hx__c'), bars = hx.querySelectorAll('.hx__bars b');
    var i = 0, T = 6000, t0 = performance.now(), raf = 0, vis = true;
    function go(n) {
      sl[i].classList.remove('is-on'); cap[i].classList.remove('is-on');
      i = (n + sl.length) % sl.length;
      sl[i].classList.add('is-on'); cap[i].classList.add('is-on');
      var im = sl[i].querySelector('img'); if (im.loading === 'lazy') im.loading = 'eager';
      bars.forEach(function (b, k) { b.style.transform = 'scaleX(' + (k < i ? 1 : 0) + ')'; });
      t0 = performance.now();
    }
    function tick(now) {
      var p = Math.min((now - t0) / T, 1);
      if (bars[i]) bars[i].style.transform = 'scaleX(' + p + ')';
      if (p >= 1) go(i + 1);
      raf = requestAnimationFrame(tick);
    }
    hx.querySelector('.hx__nx').addEventListener('click', function () { go(i + 1); });
    hx.querySelector('.hx__pv').addEventListener('click', function () { go(i - 1); });
    var sx = null;
    hx.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    hx.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); sx = null; }, { passive: true });
    // warm the next photo so the crossfade never shows a blank frame
    setTimeout(function () { sl.forEach(function (s) { var im = s.querySelector('img'); if (im.loading === 'lazy') im.loading = 'eager'; }); }, 2500);
    if (reduce) { T = 9000; }
    new IntersectionObserver(function (es) {
      vis = es[0].isIntersecting; cancelAnimationFrame(raf);
      if (vis) { t0 = performance.now() - (parseFloat((bars[i].style.transform.match(/[d.]+/) || [0])[0]) * T); raf = requestAnimationFrame(tick); }
    }).observe(hx);
  });

  /* ---------- patient information sheets: tabs (arrow keys move between them) ---------- */
  document.querySelectorAll('.decide').forEach(function (d) {
    var tabs = [].slice.call(d.querySelectorAll('[role=tab]')), sheets = d.querySelectorAll('.sheet');
    function pick(k, focus) {
      tabs.forEach(function (t, j) { var on = j === k; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; sheets[j].classList.toggle('is-on', on); });
      if (focus) tabs[k].focus();
      var bar = tabs[k].parentNode; if (bar.scrollTo) bar.scrollTo({ left: tabs[k].offsetLeft - 16, behavior: 'smooth' });
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { pick(k); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? k + 1 : e.key === 'ArrowLeft' ? k - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -2;
        if (n === -2) return; e.preventDefault(); pick((n + tabs.length) % tabs.length, true);
      });
    });
  });

  /* ---------- video player sheet (patient films + reels) ---------- */
  var pl = document.getElementById('player');
  var plList = [], plIdx = 0, plFocus = null;
  function plRender() {
    var d = plList[plIdx], v = pl.querySelector('video');
    v.pause(); v.innerHTML = '';
    v.poster = d.poster || ''; v.src = d.src;
    if (d.vtt) { var t = document.createElement('track'); t.kind = 'captions'; t.srclang = 'en'; t.label = 'English'; t.src = d.vtt; t.default = true; v.appendChild(t); }
    pl.querySelector('.pl__who').textContent = d.who || '';
    pl.querySelector('.pl__n').textContent = plList.length > 1 ? (plIdx + 1) + ' / ' + plList.length : '';
    pl.querySelector('.pl__t').textContent = d.title || '';
    pl.querySelector('.pl__txt').textContent = d.text || '';
    var ig = pl.querySelector('.pl__ig'); ig.hidden = !d.ig; if (d.ig) ig.href = d.ig;
    var pb = pl.querySelector('[data-book]'); if (pb) pb.dataset.book = d.book || '';
    pl.classList.toggle('is-single', plList.length < 2);
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }
  function openPlayer(btn) {
    var group = btn.dataset.group;
    var src = group ? document.querySelectorAll('[data-play][data-group="' + group + '"]') : [btn];
    plList = []; src.forEach(function (b, k) { plList.push(JSON.parse(b.dataset.play)); if (b === btn) plIdx = k; });
    if (!group) plIdx = 0;
    plFocus = document.activeElement;
    pl.classList.add('is-open'); pl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; if (lenis) lenis.stop();
    if (mbar) mbar.classList.add('is-away');
    document.dispatchEvent(new CustomEvent('player', { detail: true }));
    plRender();
    setTimeout(function () { pl.querySelector('.pl__x').focus({ preventScroll: true }); }, 50);
  }
  function closePlayer() {
    if (!pl || !pl.classList.contains('is-open')) return;
    var v = pl.querySelector('video'); v.pause(); v.removeAttribute('src'); v.load();
    pl.classList.remove('is-open'); pl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; if (lenis) lenis.start();
    if (mbar) mbar.classList.remove('is-away');
    document.dispatchEvent(new CustomEvent('player', { detail: false }));
    if (plFocus) plFocus.focus({ preventScroll: true });
  }
  if (pl) {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-play]');
      if (b) { e.preventDefault(); openPlayer(b); return; }
      if (e.target.closest('[data-pl-close]')) closePlayer();
      if (e.target.closest('[data-book]') && pl.classList.contains('is-open')) closePlayer();
    }, true);
    pl.querySelector('.pl__nav--p').addEventListener('click', function () { plIdx = (plIdx - 1 + plList.length) % plList.length; plRender(); });
    pl.querySelector('.pl__nav--n').addEventListener('click', function () { plIdx = (plIdx + 1) % plList.length; plRender(); });
    document.addEventListener('keydown', function (e) {
      if (!pl.classList.contains('is-open')) return;
      if (e.key === 'Escape') closePlayer();
      if (e.key === 'ArrowRight' && plList.length > 1) pl.querySelector('.pl__nav--n').click();
      if (e.key === 'ArrowLeft' && plList.length > 1) pl.querySelector('.pl__nav--p').click();
    });
    // swipe down to close on phones
    var sy = null;
    pl.querySelector('.pl__box').addEventListener('touchstart', function (e) { sy = e.touches[0].clientY; }, { passive: true });
    pl.querySelector('.pl__box').addEventListener('touchend', function (e) { if (sy !== null && e.changedTouches[0].clientY - sy > 110 && !e.target.closest('video')) closePlayer(); sy = null; }, { passive: true });
  }

  /* ---------- stories hero: tap through real patient clips ---------- */
  // On Save-Data or 2G, the hero shows still posters instead of streaming clips.
  var cn = navigator.connection || {};
  var slowNet = !!cn.saveData || /(^|-)2g$/.test(cn.effectiveType || '');
  document.querySelectorAll('[data-stories]').forEach(function (st) {
    var slides = st.querySelectorAll('.sh__s'), bars = st.querySelectorAll('.sh__bars b');
    var i = 0, t0 = 0, paused = false, held = false, inView = true, raf = 0, IMG = 5000, VID = 6000;
    function dur() { return slides[i].dataset.vid ? VID : IMG; }
    function vid(s) { return s.querySelector('video'); }
    function show(n) {
      var old = slides[i], ov = vid(old); if (ov) ov.pause();
      old.classList.remove('is-on');
      bars.forEach(function (b, k) { b.style.transform = 'scaleX(' + (k < n ? 1 : 0) + ')'; });
      i = (n + slides.length) % slides.length;
      if (n >= slides.length) bars.forEach(function (b) { b.style.transform = 'scaleX(0)'; });
      var s = slides[i];
      s.classList.add('is-on');
      if (s.dataset.vid && !reduce && !slowNet) {
        var v = vid(s);
        if (!v) {
          v = document.createElement('video');
          v.muted = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.preload = 'auto';
          v.poster = s.querySelector('img').currentSrc; v.src = s.dataset.vid; v.setAttribute('aria-hidden', 'true');
          s.insertBefore(v, s.querySelector('figcaption'));
        }
        v.currentTime = 0; var p = v.play(); if (p && p.catch) p.catch(function () {});
      }
      t0 = performance.now();
    }
    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (paused || held || !inView || document.hidden) { t0 = now - (bars[i]._p || 0) * dur(); return; }
      var p = Math.min(1, (now - t0) / dur()); bars[i]._p = p;
      bars[i].style.transform = 'scaleX(' + p + ')';
      if (p >= 1) { bars[i]._p = 0; show(i + 1); }
    }
    st.querySelector('.sh__tap--l').addEventListener('click', function () { bars[i]._p = 0; show(i - 1); });
    st.querySelector('.sh__tap--r').addEventListener('click', function () { bars[i]._p = 0; show(i + 1); });
    // press and hold to pause, like Instagram
    var hold;
    st.addEventListener('pointerdown', function (e) { if (e.target.closest('button.sh__snd')) return; hold = setTimeout(function () { held = true; var v = vid(slides[i]); if (v) v.pause(); }, 220); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) { st.addEventListener(ev, function () { clearTimeout(hold); if (held) { held = false; var v = vid(slides[i]); if (v) v.play().catch(function () {}); } }); });
    st.addEventListener('click', function (e) { if (held) e.stopPropagation(); }, true);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) {
      inView = en[0].isIntersecting; var v = vid(slides[i]); if (v) inView && !paused ? v.play().catch(function () {}) : v.pause();
    }, { threshold: .25 }).observe(st);
    document.addEventListener('player', function (e) { paused = e.detail; var v = vid(slides[i]); if (v) paused ? v.pause() : v.play().catch(function () {}); });
    if (reduce) { paused = true; bars[0].style.transform = 'scaleX(1)'; }
    show(0); raf = requestAnimationFrame(tick);
  });

  /* ---------- results: case switcher + drag compare ---------- */
  document.querySelectorAll('[data-cmp]').forEach(function (fig) {
    var stage = fig.querySelector('.cmp__stage'), input = fig.querySelector('input');
    var set = function (v) { stage.style.setProperty('--pos', v + '%'); };
    input.addEventListener('input', function () { set(input.value); fig.dataset.touched = '1'; });
    var list = fig.parentNode.querySelector('.cases__list');
    if (!list) return;
    list.addEventListener('click', function (e) {
      var b = e.target.closest('.case'); if (!b || b.classList.contains('is-on')) return;
      list.querySelectorAll('.case').forEach(function (c) { c.classList.toggle('is-on', c === b); c.setAttribute('aria-selected', c === b); });
      var id = b.dataset.case, name = b.dataset.name, base = (document.documentElement.dataset.base || '') + '/assets/img/p/ba-' + id;
      fig.classList.add('is-swap');
      setTimeout(function () {
        fig.style.setProperty('--ar', b.dataset.ar);
        var a = fig.querySelector('.cmp__a'), bf = fig.querySelector('.cmp__b');
        a.src = base + '-after.webp'; a.alt = name + ', after'; bf.src = base + '-before.webp'; bf.alt = name + ', before';
        fig.querySelector('.cmp__name').textContent = name;
        input.value = 50; set(50); delete fig.dataset.touched;
        fig.classList.remove('is-swap');
        fig.dispatchEvent(new CustomEvent('sweep'));
      }, 220);
      if (window.innerWidth <= 760) { var r = fig.getBoundingClientRect(); if (r.top < 60) window.scrollBy({ top: r.top - 80, behavior: 'smooth' }); }
    });
  });

  /* ---------- procedure rail drifts on phones too (pauses while touched) ---------- */
  if (window.innerWidth <= 760 && !reduce) document.querySelectorAll('[data-autoscroll]').forEach(function (vp) {
    var touching = false, idle = 0, pos = vp.scrollLeft;
    var half = function () { return vp.scrollWidth / 2; };
    vp.addEventListener('touchstart', function () { touching = true; }, { passive: true });
    vp.addEventListener('touchend', function () { touching = false; idle = performance.now(); pos = vp.scrollLeft; }, { passive: true });
    vp.addEventListener('scroll', function () { if (touching) pos = vp.scrollLeft; }, { passive: true });
    (function step(now) {
      requestAnimationFrame(step);
      if (touching || now - idle < 2500 || document.hidden) return;
      var r = vp.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      pos += .45; if (pos >= half()) pos -= half();
      vp.scrollLeft = pos;
    })(0);
  });

  /* ---------- GSAP layer ---------- */
  function boot() {
    if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('js', 'first', 'arriving'); return; }
    gsap.registerPlugin(ScrollTrigger);
    if (reduce) { root.classList.remove('first', 'arriving'); ss('pt', null); return; }

    // smooth scroll
    if (window.Lenis) {
      lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    // split headlines into masked lines
    document.querySelectorAll('[data-split]').forEach(function (h) {
      h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map(function (l) { return '<span class="ln"><span>' + l + '</span></span>'; }).join('');
      h.style.visibility = 'visible';
    });

    var first = root.classList.contains('first');
    var arriving = root.classList.contains('arriving');
    ss('seen', '1'); ss('pt', null);

    // ---- intro: loader (first visit) or wipe (internal navigation) ----
    var intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
    var heroH = document.querySelector('.hero [data-split], .pghero [data-split]');
    if (heroH) intro.from(heroH.querySelectorAll('.ln>span'), { yPercent: 115, rotate: 3, duration: 1.4, stagger: .1 }, 0);
    var heroImg = document.querySelector('[data-hero-img]');
    if (heroImg) {
      intro.to(heroImg, { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'expo.inOut' }, 0);
      intro.from(heroImg.querySelector('img'), { scale: 1.35, duration: 2, ease: 'expo.out' }, .2);
    }
    if (document.querySelector('.hero__f1')) intro.from('.hero__f1, .hero__f2', { scale: 0, rotate: -20, duration: 1.2, stagger: .12, ease: 'back.out(1.6)' }, .6);
    if (document.querySelector('[data-hero]')) intro.fromTo('[data-hero]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: .08 }, .35);
    if (document.querySelector('.sh')) {
      intro.from('.sh__stage', { clipPath: 'inset(12% 8% 12% 8% round 40px)', duration: 1.6, ease: 'expo.inOut' }, 0)
        .from('.sh__name, .sh__role, .sh__cred, .sh__btns', { y: 50, opacity: 0, duration: 1.2, stagger: .09 }, .5);
    }
    var pgImg = document.querySelector('.pghero [data-reveal-img]');
    if (pgImg) { intro.to(pgImg, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' }, .1); intro.from(pgImg.querySelector('img'), { scale: 1.3, duration: 2 }, .2); pgImg.dataset.done = '1'; }

    var wipe = document.querySelectorAll('.wipe span');
    if (first) {
      var lt = gsap.timeline({ onComplete: function () { root.classList.remove('first'); } });
      var k = fine ? 1 : .6; // phones get a shorter intro
      lt.to('.loader__in img', { opacity: 1, duration: .5 * k })
        .to('.loader__sig', { clipPath: 'inset(0 0% 0 0)', duration: 1.3 * k, ease: 'power2.inOut' }, '-=.2')
        .to('.loader__bar i', { scaleX: 1, duration: 1.3 * k, ease: 'power2.inOut' }, '<')
        .to('.loader', { yPercent: -100, duration: 1 * k, ease: 'expo.inOut' }, '+=.1')
        .add(function () { intro.play(); }, '-=.6');
    } else if (arriving) {
      gsap.to(wipe, { scaleY: 0, transformOrigin: 'top', duration: .9, stagger: .08, ease: 'expo.inOut', onComplete: function () { root.classList.remove('arriving'); } });
      intro.delay(.35).play();
    } else {
      intro.play();
    }

    // ---- leaving: wipe up then navigate ----
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return;
      var href = a.getAttribute('href');
      if (/^(tel|mailto|#)/.test(href)) return;
      var u = new URL(a.href, location.href);
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
      e.preventDefault();
      if (drawer.classList.contains('is-open')) setMenu(false);
      ss('pt', '1');
      gsap.fromTo(wipe, { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: .7, stagger: .07, ease: 'expo.inOut', onComplete: function () { location.href = a.href; } });
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) gsap.set(wipe, { scaleY: 0 }); });

    // ---- rotating word ----
    var rot = document.querySelector('[data-rot]');
    if (rot) {
      var words = rot.dataset.rot.split(','), wi = 0;
      setInterval(function () {
        wi = (wi + 1) % words.length;
        gsap.to(rot, { yPercent: -60, opacity: 0, duration: .45, ease: 'power3.in', onComplete: function () {
          rot.textContent = words[wi];
          gsap.fromTo(rot, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .7, ease: 'expo.out' });
        } });
      }, 2800);
    }

    // ---- scroll reveals ----
    document.querySelectorAll('[data-split]').forEach(function (h) {
      if (h === heroH) return;
      gsap.from(h.querySelectorAll('.ln>span'), { yPercent: 115, rotate: 2, duration: 1.3, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } });
    });
    ScrollTrigger.batch('[data-reveal]', { start: 'top 90%', once: true, onEnter: function (els) {
      gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: .1, ease: 'expo.out' });
    } });
    document.querySelectorAll('[data-stagger]').forEach(function (g) {
      gsap.fromTo(g.children, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: g, start: 'top 88%', once: true } });
    });
    document.querySelectorAll('[data-reveal-img]').forEach(function (el) {
      if (el.dataset.done) return;
      var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' }).from(el.querySelector('img'), { scale: 1.35, duration: 2, ease: 'expo.out' }, .1);
    });

    // ---- parallax ----
    gsap.utils.toArray('[data-speed]').forEach(function (el) {
      gsap.to(el, { y: function () { return parseFloat(el.dataset.speed) * 90; }, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });
    if (heroImg) gsap.to(heroImg, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.utils.toArray('[data-parallax-img]').forEach(function (el) {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.utils.toArray('.tcard__img img, .post__img img, .stories__img img, .journey__img img').forEach(function (im) {
      gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: im.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    var spin = document.querySelector('[data-spin] svg');
    if (spin) gsap.to(spin, { rotate: 360, ease: 'none', scrollTrigger: { trigger: spin, start: 'top bottom', end: 'bottom top', scrub: 1 } });

    // ---- marquees (speed up with scroll velocity) ----
    var loops = [];
    var ghost = document.querySelector('.hero__ghost');
    if (ghost) loops.push(gsap.to(ghost, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 }));
    if (window.innerWidth > 760) document.querySelectorAll('[data-marquee]').forEach(function (row) {
      var dir = parseFloat(row.dataset.marquee);
      // constant, calm speed (~28px/s) however many cards the row holds
      var tw = gsap.fromTo(row, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: Math.max(60, row.scrollWidth / 2 / 28), ease: 'none', repeat: -1 });
      loops.push(tw);
      row.addEventListener('mouseenter', function () { gsap.to(tw, { timeScale: .15, duration: .6, overwrite: true }); });
      row.addEventListener('mouseleave', function () { gsap.to(tw, { timeScale: 1, duration: .6, overwrite: true }); });
    });
    if (loops.length) ScrollTrigger.create({ onUpdate: function (s) {
      var v = 1 + Math.min(Math.abs(s.getVelocity()) / 1200, 1);
      loops.forEach(function (l) { gsap.to(l, { timeScale: v * (s.direction < 0 ? -1 : 1), duration: .25, overwrite: true }); gsap.to(l, { timeScale: 1, duration: 1.2, delay: .25 }); });
    } });

    // ---- pinned horizontal treatments carousel ----
    var mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', function () {
      var sec = document.querySelector('.hz');
      var track = document.querySelector('.hz__track');
      if (!sec || !track) return;
      var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: function () { return '+=' + dist(); }, pin: '.hz__pin', scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: function (s) { gsap.set('.hz__prog i', { scaleX: s.progress }); } } });
    });

    // ---- draggable recognition carousel with momentum ----
    document.querySelectorAll('[data-drag]').forEach(function (wrap) {
      var track = wrap.querySelector('.drag__track'), x = 0, start = 0, sx = 0, down = false, vx = 0, last = 0, lt = 0;
      var min = function () { return Math.min(0, wrap.clientWidth - track.scrollWidth); };
      var setX = gsap.quickTo(track, 'x', { duration: .6, ease: 'power3' });
      gsap.from(track.children, { x: 200, opacity: 0, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: wrap, start: 'top 85%', once: true } });
      wrap.addEventListener('pointerdown', function (e) { down = true; sx = e.clientX; start = x; last = e.clientX; lt = performance.now(); vx = 0; wrap.setPointerCapture(e.pointerId); });
      wrap.addEventListener('pointermove', function (e) {
        if (!down) return;
        var now = performance.now(); vx = (e.clientX - last) / Math.max(1, now - lt); last = e.clientX; lt = now;
        x = Math.max(min() - 120, Math.min(120, start + e.clientX - sx)); setX(x);
      });
      function up() { if (!down) return; down = false; x = Math.max(min(), Math.min(0, x + vx * 400)); setX(x); }
      wrap.addEventListener('pointerup', up); wrap.addEventListener('pointercancel', up);
      wrap.addEventListener('wheel', function (e) { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); x = Math.max(min(), Math.min(0, x - e.deltaX)); setX(x); } }, { passive: false });
    });

    // ---- before/after: a gentle sweep when it first appears ----
    document.querySelectorAll('[data-ba]').forEach(function (fig) {
      var stage = fig.querySelector('.ba__stage'), input = fig.querySelector('input'), o = { p: 50 };
      ScrollTrigger.create({ trigger: fig, start: 'top 70%', once: true, onEnter: function () {
        gsap.timeline().to(o, { p: 18, duration: 1, ease: 'power3.inOut' }).to(o, { p: 82, duration: 1.4, ease: 'power3.inOut' }).to(o, { p: 50, duration: 1, ease: 'power3.inOut' })
          .eventCallback('onUpdate', function () { if (fig.dataset.touched) return; stage.style.setProperty('--pos', o.p + '%'); input.value = o.p; });
      } });
    });

    document.querySelectorAll('[data-cmp]').forEach(function (fig) {
      var stage = fig.querySelector('.cmp__stage'), input = fig.querySelector('input'), o = { p: 50 };
      function sweep() {
        o.p = 50;
        gsap.timeline().to(o, { p: 85, duration: .9, ease: 'power3.inOut' }).to(o, { p: 15, duration: 1.2, ease: 'power3.inOut' }).to(o, { p: 50, duration: .9, ease: 'power3.inOut' })
          .eventCallback('onUpdate', function () { if (fig.dataset.touched) return; stage.style.setProperty('--pos', o.p + '%'); input.value = o.p; });
      }
      ScrollTrigger.create({ trigger: fig, start: 'top 70%', once: true, onEnter: sweep });
      fig.addEventListener('sweep', sweep);
    });

    // ---- footer signature draws itself ----
    var fsig = document.querySelector('.ftr__sig .sig');
    if (fsig) gsap.fromTo(fsig, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: fsig, start: 'top 92%', once: true } });

    // ---- faq ----
    document.querySelectorAll('.qa').forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) gsap.from(d.querySelector('.qa__a'), { height: 0, opacity: 0, duration: .6, ease: 'expo.out', clearProps: 'all', onComplete: function () { ScrollTrigger.refresh(); } }); });
    });

    // ---- magnetic buttons + label cursor ----
    if (fine) {
      document.querySelectorAll('[data-magnetic]').forEach(function (b) {
        var xt = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' }), yt = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' });
        b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * .3); yt((e.clientY - r.top - r.height / 2) * .4); });
        b.addEventListener('mouseleave', function () { xt(0); yt(0); });
      });
      var c = document.createElement('div'); c.className = 'cursor'; c.innerHTML = '<span></span>'; document.body.appendChild(c);
      var lab = c.firstChild;
      var cx = gsap.quickTo(c, 'x', { duration: .45, ease: 'power3' }), cy = gsap.quickTo(c, 'y', { duration: .45, ease: 'power3' });
      window.addEventListener('mousemove', function (e) { c.style.opacity = 1; cx(e.clientX); cy(e.clientY); });
      document.addEventListener('mouseover', function (e) {
        var l = e.target.closest('[data-cursor]');
        c.classList.toggle('is-label', !!l);
        lab.textContent = l ? l.dataset.cursor : '';
        c.classList.toggle('is-link', !l && !!e.target.closest('a,button,summary,input,select,textarea'));
      });
      document.addEventListener('mouseleave', function () { c.style.opacity = 0; });
    }

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
