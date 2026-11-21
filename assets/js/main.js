/* Dr. Manish Patel: plain behaviour only (menu, booking, tabs, filter, video play). No animation library. */
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

  /* ---------- journal topic filter ---------- */
  document.querySelectorAll('[data-filter]').forEach(function (bar) {
    var cards = bar.parentNode.querySelectorAll('.post');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      bar.querySelectorAll('.chip').forEach(function (c) { var on = c === b; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on); });
      var f = b.dataset.f;
      cards.forEach(function (c) { c.hidden = f !== 'All' && c.dataset.cat !== f; });
    });
  });

  /* ---------- explainer videos: tap to play in place ---------- */
  document.querySelectorAll('[data-vids]').forEach(function (box) {
    function stopAll(except) { box.querySelectorAll('video').forEach(function (v) { if (v !== except) v.pause(); }); }
    box.querySelectorAll('.vid__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = document.createElement('video');
        v.src = btn.dataset.src; v.controls = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'auto';
        var im = btn.querySelector('img'); v.poster = im.currentSrc || im.src;
        btn.parentNode.appendChild(v); btn.hidden = true; stopAll(v);
        v.addEventListener('play', function () { stopAll(v); });
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      });
    });
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

})();
