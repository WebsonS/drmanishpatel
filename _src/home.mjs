// Home page. Built to turn visitors into enquiries while staying inside the NMC Guidelines on Ethical Advertising
// (6 Oct 2026): factual captions only (event, body, year), no testimonials, reviews, before-and-afters, patient media,
// superlatives, success rates or offers. Risks and recovery live on each treatment page.
import { REELS, EDU } from './reels.mjs';

const ORDER = ['hair-transplant-goa', 'liposuction-goa', 'breast-augmentation-goa', 'rhinoplasty-goa', 'gynecomastia-surgery-goa', 'facelift-goa', 'botox-fillers-goa', 'tummy-tuck-goa', 'laser-hair-removal-goa', 'acne-scar-treatment-goa', 'skin-rejuvenation-pigmentation-goa'];

// Only reels that are purely educational (Dr. Patel speaking, no patient results) may appear: see EDU in reels.mjs.
const EDU_REELS = Object.keys(EDU);


// Stock photos (Unsplash licence, free for commercial use; alt text describes the photo, not the clinic) and one practical tip for each step of "Your first visit" (same order as PROCESS in data.mjs).
const STEPS = [
  ['step-consultation', 'A doctor listening and taking notes as a patient talks across the desk', 1600, 900, 'Bring any past reports and a list of the medicines you take.'],
  ['step-plan', 'A doctor writing out a plan on a clipboard with a patient at the desk', 1600, 900, 'There is no pressure to decide on the day. Take the plan home and think it over.'],
  ['step-procedure', 'A surgeon in a gown and mask under operating theatre lights', 1600, 1200, 'You will be told beforehand what to eat, wear and avoid on the day.'],
  ['step-aftercare', 'A doctor reassuringly holding the hand of a patient across a desk', 1600, 900, 'Call or WhatsApp the clinic if anything worries you between review visits.'],
];

export function homePage(h) {
  const { SITE, SERVICES, FAQS, PROCESS, SVC_IMG, img, I, esc, ico, cta, faqBlock, locationsBlock, REG, bookForm } = h;
  const svcs = ORDER.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);
  const surg = svcs.filter((s) => s.cat === 'Surgical'), non = svcs.filter((s) => s.cat !== 'Surgical');
  const V = (id) => `/assets/video/${id}.mp4`;
  const play = (o) => esc(JSON.stringify(o));
  const reels = EDU_REELS.map((s) => REELS.find((r) => r.slug === s)).filter(Boolean);
  
  const facts = ['MBBS · MS (General Surgery) · MCh (Plastic Surgery)', 'More than 30 years in practice', `Registered with the ${SITE.reg.council}`, 'Clinics in Margao &amp; Panaji', 'English · Hindi · Konkani', 'Written estimate after consultation'];


  const body = `
<section class="hx2" id="top" aria-labelledby="hs-h">
  <figure class="hx2__bg">${img('dr-hero', 'Dr. Manish Patel at his clinic in Goa', { w: 1402, h: 1122, lazy: false, sizes: '100vw' })}</figure>
  <div class="wrap hx2__in"><div class="hx2__txt">
    <h1 id="hs-h" class="hx2__h"><span class="hx2__name">Cosmetic &amp; Plastic Surgeon in Goa</span><span class="hx2__role">Dr. Manish Patel</span></h1>
    <ul class="hx2__facts"><li><span class="hx2__ic"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5 12 5l10 4.5-10 4.5z"/><path d="M6 11.3v4.2c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4.2"/><path d="M22 9.5v5"/></svg></span>MCh (Plastic Surgery)</li><li><span class="hx2__ic"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg></span>30+ years in practice</li><li><span class="hx2__ic">${ico.pin}</span>Clinics in Margao and Panaji</li></ul>
    <div class="hx2__btns">${cta('Book a consultation', 'btn--hx')}<a class="hx2__link" href="/about/">About Dr. Patel ${ico.arrow}</a></div>
  </div></div>
</section>

<section class="fsec" aria-labelledby="fcta-h"><div class="wrap"><div class="fcta">
  <figure class="fcta__img">${img('dr-arms', 'Dr. Manish Patel in a suit and red tie, arms folded, in a hospital ward', { w: 1132, h: 1390, sizes: '(max-width: 860px) 92vw, 460px' })}</figure>
  <div class="fcta__txt">
    <p class="fcta__kick">About Dr. Manish Patel</p>
    <h2 id="fcta-h" class="fcta__h">Cosmetic &amp; plastic surgery&nbsp;<em>in&nbsp;Goa.</em></h2>
    <p class="fcta__p">Dr. Manish Patel is an established cosmetic and plastic surgeon in Margao, Goa, with more than 30 years of experience in aesthetic and plastic surgery. Treatments include rhinoplasty, facelift, breast augmentation, liposuction and hair transplant, along with laser hair removal, acne scar treatment, anti-ageing skin care, and non-surgical options such as Botox and fillers.</p>
    <ul class="fcta__pts">
      <li>M.B.B.S, MS (General Surgery), MCh (Plastic Surgery)</li>
      <li>30+ years of experience</li>
      <li>Clinics in Margao and Panaji</li>
    </ul>
    <p class="fcta__or">Reach the clinic directly</p>
    <div class="fcta__alt">
      <a class="pill pill--wa" href="${SITE.social.whatsapp}" target="_blank" rel="noopener">${ico.waC}<span>Message on WhatsApp</span></a>
      ${SITE.locations.map((l) => `<a class="pill" href="tel:${l.phone}">${ico.phone}<span>Call ${l.city}</span></a>`).join('')}
    </div>
  </div>
</div></div></section>

<section class="tx" aria-labelledby="procs-h"><div class="wrap">
  <div class="tx__hd"><div><h2 id="procs-h" class="hd hd--l">Treatments</h2><p>Surgical and non-surgical care, planned and performed by Dr.&nbsp;Patel.</p></div></div>
  <div class="tx__bar">
    <div class="seg" role="group" aria-label="Show treatments">${[['all', 'All', svcs.length], ['surg', 'Surgical', surg.length], ['non', 'Non-surgical', non.length]].map(([k, t, n], i) => `<button type="button" class="seg__b" data-filter="${k}" aria-pressed="${i ? 'false' : 'true'}">${t}<span class="seg__n">${n}</span></button>`).join('')}</div>
    <a class="link" href="/services/">All treatment pages ${ico.arrow}</a>
  </div>
  <div class="tx__grid" data-tx>${[...surg, ...non].map((s) => `<a class="txc" data-cat="${s.cat === 'Surgical' ? 'surg' : 'non'}" href="/services/${s.slug}/"><span class="txc__img">${img(SVC_IMG[s.slug], '', { w: 600, h: 750, sizes: '(max-width: 640px) 46vw, (max-width: 1100px) 30vw, 320px' })}</span><span class="txc__cat">${s.cat === 'Surgical' ? 'Surgical' : 'Non-surgical'}</span><h3>${s.name}</h3><span class="txc__tag">${s.tag}</span></a>`).join('')}<div class="txc txc--help" data-cat="help">
    <span class="help__ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><circle cx="12" cy="17.2" r=".6" fill="currentColor"/></svg></span>
    <div class="help__b">
      <p class="help__k">Not sure where to start?</p>
      <h3>Tell us what is bothering you.</h3>
      <p>Dr. Patel will explain which options suit you at your consultation.</p>
    </div>
    <div class="help__acts">
      <a class="pill pill--wa help__wa" href="${SITE.social.whatsapp}" target="_blank" rel="noopener">${ico.waC}<span>Ask on WhatsApp</span></a>
      <a class="help__call" href="tel:${SITE.locations[0].phone}">${ico.phone}<span>or call ${SITE.locations[0].phoneShow}</span></a>
    </div>
  </div></div>
</div></section>

<section class="walk" aria-labelledby="walk-h"><div class="wrap">
  <div class="walk__hd"><h2 id="walk-h" class="hd hd--l">Your first visit, <em>step by step.</em></h2></div>
  <ol class="vsteps">${PROCESS.map(([n, t, d], k) => { const [im, alt, w, h, tip] = STEPS[k]; return `<li class="step${k % 2 ? ' step--r' : ''}">
    <figure class="step__img">${img(im, alt, { w, h, sizes: '(max-width: 800px) 92vw, 560px' })}<span class="step__n" aria-hidden="true">${n}</span></figure>
    <div class="step__txt"><h3>${t}</h3><p>${d}</p></div>
  </li>`; }).join('')}</ol>
</div></section>

<section class="soc" aria-labelledby="soc-h"><div class="wrap">
  <div class="soc__hd">
    <p class="soc__kick">Follow along</p>
    <h2 id="soc-h" class="hd">Dr. Patel on social media</h2>
    <p>Short videos, clinic news and updates from medical conferences. Follow the accounts below on your phone.</p>
  </div>
  <div class="soc__grid">
    <div class="igp">
      <div class="igp__top">
        <span class="igp__ava">${img('dr-arms', 'Dr. Manish Patel', { w: 1132, h: 1390, sizes: '110px' })}</span>
        <div class="igp__who"><span class="igp__plat">${ico.ig} Instagram</span><b>@drmanishp</b><span>Dr. Manish Patel, MCh (Plastic Surgery)</span></div>
      </div>
      <p class="igp__bio">Dr. Patel explains treatments in his own words: what they involve, how recovery goes and what to ask at your consultation.</p>
      <a class="igp__btn" href="https://www.instagram.com/drmanishp/" target="_blank" rel="noopener">${ico.ig}<span>Follow @drmanishp</span></a>
      <h3 class="igp__sub">Recent posts</h3>
      <ul class="igp__posts">${[
        ...reels.map((r) => [r.ig, 'r-' + r.slug, r.q, true]),
      ].map(([u, im, t, reel]) => `<li><a href="${u}" target="_blank" rel="noopener" aria-label="${esc(t)} (opens Instagram)">${img(im, '', { w: 540, h: 540, sizes: '(max-width: 760px) 30vw, 180px' })}${reel ? `<span class="igp__reel">${ico.play}</span>` : ''}</a></li>`).join('')}</ul>
    </div>
    <ul class="socl">${[
      ['ig', ico.ig, 'Instagram', '@patelcosmeticsurgerycenter', 'Clinic news, timings and notices from Margao and Panaji.', SITE.social.instagram, 'Follow the clinic'],
      ['yt', ico.yt, 'YouTube', 'Patel Cosmetic Surgery Center', 'Longer videos where Dr. Patel explains treatments in detail.', SITE.social.youtube, 'Watch on YouTube'],
      ['fb', ico.fb, 'Facebook', 'Patel Cosmetics', 'Clinic updates and announcements.', SITE.social.facebook, 'Like the page'],
    ].map(([k, ic, plat, h, d, u, act]) => `<li><a class="socc socc--${k}" href="${u}" target="_blank" rel="noopener"><span class="socc__ico">${ic}</span><span class="socc__txt"><small>${plat}</small><b>${h}</b><span>${d}</span><em>${act} ${ico.arrow}</em></span></a></li>`).join('')}</ul>
  </div>
</div></section>

<section class="gband" aria-label="Clinics in Goa">
  <figure class="gband__bg">${img('goa-2', 'Palm trees along a beach in Goa', { w: 1600, h: 854, sizes: '100vw' })}</figure>
  <div class="wrap gband__in"><p class="gband__t">Care close to home,<br><em>in South and North Goa.</em></p></div>
</section>

<section class="visit" id="enquire" aria-labelledby="talk-h"><div class="wrap">
  <div class="visit__hd">
    <p class="soc__kick">Two clinics in Goa</p>
    <h2 id="talk-h" class="hd">Have a question? Call, message or visit.</h2>
    <p>Ask the clinic anything, or find a consultation time. Call either clinic or send a WhatsApp message.</p>
  </div>
  <div class="visit__grid">
    <div class="visit__side">
      <div class="clin">${SITE.locations.map((l, i) => `<article class="clin__c clin__c--${l.slug}">
        <div class="clin__img">${img(i ? 'goa-2' : 'goa-1', '', { w: 1200, h: 800, sizes: '(max-width: 760px) 92vw, 380px' })}<span class="clin__tag">${i ? 'North Goa' : 'South Goa'}</span></div>
        <div class="clin__b">
          <h3>${l.city} clinic</h3>
          <address>${ico.pin}<span>${l.street}, ${l.locality}, ${l.region} ${l.postal}</span></address>
          <a class="clin__call" href="tel:${l.phone}">${ico.phone}<span><small>Call ${l.city}</small><b>${l.phoneShow}</b></span></a>
          <div class="clin__links"><a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(`${SITE.name} ${l.street} ${l.locality} ${l.postal}`)}" target="_blank" rel="noopener">Get directions ${ico.arrow}</a><a href="/locations/${l.slug}/">Clinic page ${ico.arrow}</a></div>
        </div>
      </article>`).join('')}</div>
      <a class="visit__wa" href="${SITE.social.whatsapp}" target="_blank" rel="noopener">${ico.waC}<span><b>Message the clinic on WhatsApp</b><small>Quickest way to ask a question or change an appointment</small></span>${ico.arrow}</a>
    </div>
  </div>
</div></section>

${faqBlock([FAQS[1], FAQS[3], FAQS[4], FAQS[6]])}`;

  return { body, schema: null };
}
