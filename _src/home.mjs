// Home page. Built to turn visitors into enquiries while staying inside the NMC Guidelines on Ethical Advertising
// (6 Oct 2026): factual captions only (event, body, year), no testimonials, reviews, before-and-afters, patient media,
// superlatives, success rates or offers. Risks and recovery live on each treatment page.
import { REELS } from './reels.mjs';

const ORDER = ['hair-transplant-goa', 'liposuction-goa', 'breast-augmentation-goa', 'rhinoplasty-goa', 'gynecomastia-surgery-goa', 'facelift-goa', 'botox-fillers-goa', 'tummy-tuck-goa', 'laser-hair-removal-goa', 'acne-scar-treatment-goa', 'skin-rejuvenation-pigmentation-goa'];

// Only reels that are purely educational (Dr. Patel speaking, no patient results) may appear. Frame-checked: r-acne.
const EDU_REELS = ['acne'];

// Hero carousel: Dr. Patel at conferences, teaching and in theatre. Captions state what, who and when; nothing else.
const SLIDES = [
  { img: 'dr-aesurg-chair', t: 'Chairing the hair transplant session', s: 'IAAPS AESURG national conference, 2022', o: '50% 40%' },
  { img: 'dr-world-congress', t: 'Faculty, 7th FADS World Congress', s: 'Holiday Inn Resort, South Goa, 2023', o: '45% 35%' },
  { img: 'team-ot', t: 'Hair transplant operative workshop', s: 'With visiting international faculty', o: '50% 35%' },
  { img: 'dr-gimacon', t: 'IMA GIMACON', s: 'Indian Medical Association conference, 2023', o: '30% 30%' },
  { img: 'event-1', t: 'CosDermIndia convention', s: 'Taj Resort & Convention Centre, Goa, 2023', o: '50% 30%' },
  { img: 't-device-1', t: 'Our operating theatre', s: 'Margao clinic', o: '50% 50%' },
];

export function homePage(h) {
  const { SITE, SERVICES, FAQS, PROCESS, AWARDS, SVC_IMG, img, I, esc, ico, cta, faqBlock, locationsBlock, REG, bookForm } = h;
  const svcs = ORDER.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);
  const V = (id) => `/assets/video/${id}.mp4`;
  const play = (o) => esc(JSON.stringify(o));
  const reels = EDU_REELS.map((s) => REELS.find((r) => r.slug === s)).filter(Boolean);
  const reelData = (r) => play({ src: V('r-' + r.slug), poster: I('r-' + r.slug), who: 'Dr. Manish Patel · @drmanishp', title: r.q, text: r.text, ig: r.ig });

  const facts = ['MBBS · MS (General Surgery) · MCh (Plastic Surgery)', 'More than 30 years in practice', `Registered with the ${SITE.reg.council}`, 'Clinics in Margao &amp; Panaji', 'English · Hindi · Konkani', 'Written estimate after consultation'];

  const handles = [
    ['@drmanishp', 'Dr. Patel explains', 'https://www.instagram.com/drmanishp/', ico.ig],
    ['@patelcosmeticsurgerycenter', 'Clinic updates', SITE.social.instagram, ico.ig],
    ['YouTube', 'Longer explainers', SITE.social.youtube, ico.yt],
    ['Facebook', 'Clinic notices', SITE.social.facebook, ico.fb],
  ];

  const body = `
<section class="hx" id="top" aria-label="Dr. Manish Patel" data-hx>
  <div class="hx__slides">${SLIDES.map((s, k) => `<figure class="hx__s${k ? '' : ' is-on'}" style="--o:${s.o}">${img(s.img, `${SITE.doctor}: ${s.t}, ${s.s}`, { w: 1600, h: 1200, lazy: k > 0, sizes: '100vw' })}</figure>`).join('')}</div>
  <div class="hx__shade" aria-hidden="true"></div>
  <div class="wrap hx__in">
    <div class="hx__txt">
      <p class="hx__kick">${SITE.creds.replace(/ · /g, ' &nbsp;·&nbsp; ')}</p>
      <h1 class="hx__h"><span class="hx__name">Dr. Manish Patel</span><span class="hx__role">Plastic &amp; cosmetic surgeon in <em>Goa</em></span></h1>
      <p class="hx__lead">More than 30 years in plastic, cosmetic and reconstructive surgery. Consultations in Margao and Panaji.</p>
      <div class="hx__btns">${cta('Request an appointment', 'btn--leaf')}<a class="btn btn--glass" href="tel:${SITE.locations[0].phone}"><span>Call ${SITE.locations[0].phoneShow}</span></a></div>
    </div>
    <div class="hx__cap" aria-live="polite">
      <div class="hx__bars" aria-hidden="true">${SLIDES.map(() => '<i><b></b></i>').join('')}</div>
      ${SLIDES.map((s, k) => `<p class="hx__c${k ? '' : ' is-on'}"><b>${s.t}</b><span>${s.s}</span></p>`).join('')}
      <div class="hx__nav"><button type="button" class="hx__pv" aria-label="Previous photo">${ico.arrow}</button><button type="button" class="hx__nx" aria-label="Next photo">${ico.arrow}</button></div>
    </div>
  </div>
</section>

<div class="tick" aria-label="Practice information"><div class="tick__row">${[...facts, ...facts].map((f, k) => `<span${k >= facts.length ? ' aria-hidden="true"' : ''}>${f}</span>`).join('')}</div></div>

<section class="procs" aria-labelledby="procs-h">
  <div class="wrap hd-row"><h2 id="procs-h" class="hd" data-reveal>What would you like <em>to discuss?</em></h2><a class="link" href="/services/" data-reveal>All ${SERVICES.length} ${ico.arrow}</a></div>
  <div class="procs__vp" data-autoscroll><div class="procs__row" data-marquee="-1">${[...svcs, ...svcs].map((s, k) => `<a class="proc" href="/services/${s.slug}/"${k >= svcs.length ? ' aria-hidden="true" tabindex="-1"' : ''}><span class="proc__img">${img(SVC_IMG[s.slug], k >= svcs.length ? '' : `Illustration for ${s.name}`, { w: 600, h: 750, sizes: '(max-width: 760px) 58vw, 280px' })}</span><span class="proc__n">${s.name.replace(/ \(.*\)/, '')}</span></a>`).join('')}</div></div>
</section>

<section class="dr" aria-labelledby="dr-h"><div class="wrap dr__in">
  <div class="dr__fig" data-reveal-img>${img('dr-portrait', 'Dr. Manish Patel, plastic surgeon in Goa', { w: 744, h: 801 })}</div>
  <div class="dr__txt">
    <h2 id="dr-h" class="hd hd--l" data-reveal>Meet <em>Dr. Manish Patel.</em></h2>
    <p class="dr__p" data-reveal>He consults, plans and operates himself, and sees you again through recovery. If a procedure is not right for you, he will say so.</p>
    <dl class="dr__cv" data-stagger>
      <div><dt>Degrees</dt><dd>MBBS · MS (General Surgery) · MCh (Plastic Surgery)</dd></div>
      <div><dt>Registration</dt><dd>${REG}</dd></div>
      <div><dt>Positions</dt><dd>Head, Department of Cosmetic Surgery, Wockhardt Institute of Aesthetics (2011)</dd></div>
      <div><dt>Teaching</dt><dd>Faculty, IAAPS AESURG 2022 · Faculty and trainer, Botox and fillers, 7th FADS World Congress 2023</dd></div>
    </dl>
    <div class="dr__links" data-reveal>${cta('Request an appointment', 'btn--leaf')}<a class="link" href="/about/">Full profile ${ico.arrow}</a></div>
  </div>
</div>
  <div class="drag dr__awards" data-drag data-cursor="Drag"><div class="drag__track">${AWARDS.map(([n, t, d]) => `<figure class="award">${img(n, t, { w: 1024, h: 768, sizes: '(max-width: 760px) 78vw, 420px' })}<figcaption><strong>${t}</strong><span>${d}</span></figcaption></figure>`).join('')}
    <a class="award award--team" href="/about/#team">${img('team-group-1', 'Dr. Patel with his clinic team', { w: 1024, h: 768, sizes: '(max-width: 760px) 78vw, 420px' })}<figcaption><strong>Meet the team</strong><span>Doctors and staff at both clinics ${ico.arrow}</span></figcaption></a></div></div>
</section>

<section class="walk" aria-labelledby="walk-h"><div class="wrap">
  <h2 id="walk-h" class="hd hd--l" data-reveal>Your first visit, <em>step by step.</em></h2>
  <ol class="walk__list" data-stagger>${PROCESS.map(([n, t, d]) => `<li><span class="walk__n">${n}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>

${reels.length ? `<section class="explain" aria-labelledby="explain-h"><div class="wrap explain__in">
  <div class="explain__vid">${reels.map((r) => `<button type="button" class="reel reel--big" data-play="${reelData(r)}" aria-label="Play video: ${esc(r.q)}">
    ${img('r-' + r.slug, '', { w: 540, h: 960, sizes: '(max-width: 760px) 70vw, 320px' })}
    <span class="reel__p">${ico.play}</span>
    <span class="reel__q">${esc(r.q)}</span>
  </button>`).join('')}</div>
  <div class="explain__txt">
    <h2 id="explain-h" class="hd hd--l" data-reveal>Questions patients ask. <em>Answered by the surgeon.</em></h2>
    <p class="explain__p" data-reveal>Dr. Patel records short explainers on skin, hair and surgery. Follow along, or bring your own question to the clinic.</p>
    <div class="ask__handles" data-reveal>${handles.map(([hd, sub, u, ic]) => `<a class="hdl" href="${u}" target="_blank" rel="noopener">${ic}<span><b>${hd}</b><small>${sub}</small></span></a>`).join('')}</div>
  </div>
</div></section>` : ''}

<section class="talk" id="enquire" aria-labelledby="talk-h"><div class="wrap talk__in">
  <div class="talk__txt">
    <h2 id="talk-h" class="hd hd--l" data-reveal>Have a question? <em>Ask the clinic.</em></h2>
    <p class="talk__p" data-reveal>Send your details and the team will reply on WhatsApp or by phone to answer questions or find a consultation time.</p>
    <ul class="talk__calls" data-stagger>${SITE.locations.map((l) => `<li><a href="tel:${l.phone}">${ico.phone}<span><small>${l.city} clinic</small><b>${l.phoneShow}</b></span></a></li>`).join('')}<li><a href="${SITE.social.whatsapp}" target="_blank" rel="noopener">${ico.wa}<span><small>WhatsApp</small><b>Message the clinic</b></span></a></li></ul>
  </div>
  <div class="talk__form" data-reveal>${bookForm('h')}</div>
</div></section>

${faqBlock([FAQS[1], FAQS[3], FAQS[4], FAQS[6]])}
${locationsBlock()}`;

  const videos = reels.map((r) => ({ '@type': 'VideoObject', name: r.q, description: r.text.slice(0, 300), thumbnailUrl: SITE.domain + I('r-' + r.slug), contentUrl: SITE.domain + V('r-' + r.slug), uploadDate: r.date, embedUrl: r.ig, creator: { '@id': `${SITE.domain}/#doctor` } }));
  return { body, schema: videos.length ? { '@context': 'https://schema.org', '@graph': videos } : null };
}
