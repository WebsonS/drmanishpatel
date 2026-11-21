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
  const V = (id) => `/assets/video/${id}.mp4`;
  const play = (o) => esc(JSON.stringify(o));
  const reels = EDU_REELS.map((s) => REELS.find((r) => r.slug === s)).filter(Boolean);
  
  const facts = ['MBBS · MS (General Surgery) · MCh (Plastic Surgery)', 'More than 30 years in practice', `Registered with the ${SITE.reg.council}`, 'Clinics in Margao &amp; Panaji', 'English · Hindi · Konkani', 'Written estimate after consultation'];


  const body = `
<section class="hs" id="top" aria-labelledby="hs-h">
  <figure class="hs__img">${img('dr-hero', 'Dr. Manish Patel at the clinic', { w: 1402, h: 1122, lazy: false, sizes: '(max-width: 900px) 100vw, 62vw' })}</figure>
  <div class="wrap hs__in">
  <div class="hs__txt">
    <h1 id="hs-h" class="hs__h">Cosmetic &amp; Plastic Surgery in Goa</h1>
    <p class="hs__p">Personal cosmetic and plastic surgery care in Margao and Panaji.</p>
    <div class="hs__btns">${cta('Book a consultation', 'btn--prem')}</div>
    <ul class="hs__trust"><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V5l-8-3z" fill="currentColor"/></svg>MBBS · MS · MCh (Plastic Surgery)</li><li><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 7v5l3 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>30+ years in practice</li></ul>
  </div>
</div></section>

<section class="procs" aria-labelledby="procs-h">
  <div class="wrap hd-row"><h2 id="procs-h" class="hd">Treatments</h2><a class="link" href="/services/">All ${SERVICES.length} treatments ${ico.arrow}</a></div>
  <div class="wrap tcols">${[
    ['Surgical treatments', 'Operations performed by Dr. Patel', svcs.filter((s) => s.cat === 'Surgical')],
    ['Non-surgical treatments', 'Injections, lasers and skin care', svcs.filter((s) => s.cat !== 'Surgical')],
  ].map(([t, sub, list], k) => `${k ? '<div class="tcol__side">' : ''}<div class="tcol"><div class="tcol__hd"><h3>${t}</h3><p>${sub}</p></div><ul class="tcol__list">${list.map((s) => `<li><a class="trow" href="/services/${s.slug}/"><span class="trow__img">${img(SVC_IMG[s.slug], '', { w: 600, h: 750, sizes: '120px' })}</span><span class="trow__t"><b>${s.name}</b><small>${s.tag}</small></span>${ico.arrow}</a></li>`).join('')}</ul></div>${k ? `<div class="tcol__help"><h3>Not sure which you need?</h3><p>Tell the clinic what is bothering you. Dr. Patel will explain the options at your consultation, surgical or not.</p>${cta('Book a consultation', 'btn--leaf')}</div></div>` : ''}`).join('')}</div>
</section>

<section class="walk" aria-labelledby="walk-h"><div class="wrap">
  <div class="walk__hd"><h2 id="walk-h" class="hd hd--l">Your first visit, <em>step by step.</em></h2>${cta('Book a consultation', 'btn--leaf')}</div>
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
        <span class="igp__ava">${img('dr-portrait', 'Dr. Manish Patel', { w: 648, h: 796, sizes: '110px' })}</span>
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

<section class="visit" id="enquire" aria-labelledby="talk-h"><div class="wrap">
  <div class="visit__hd">
    <p class="soc__kick">Two clinics in Goa</p>
    <h2 id="talk-h" class="hd">Have a question? Call, message or visit.</h2>
    <p>Ask the clinic anything, or find a consultation time. Call either clinic, send a WhatsApp message, or use the Appointment button to request a time.</p>
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
