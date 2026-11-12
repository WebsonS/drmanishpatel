// Home page: built around proof. Every section answers a patient's question with Dr. Patel's own material.
import { REELS } from './reels.mjs';

export const VOICES = [
  { id: 'vt-eyelid', proc: 'Upper eyelid surgery', quote: 'Absolutely over the moon. Thrilled to bits with everything.', vtt: true, date: '2024-01-30', dur: 'PT17S', book: '' },
  { id: 'vt-facelift', proc: 'Facelift', quote: 'From beginning to end, it’s seamless. A very caring doctor.', vtt: true, date: '2024-01-30', dur: 'PT27S', book: 'Facelift' },
  { id: 'vt-mini-facelift', proc: 'Mini facelift', quote: 'I felt very comfortable, very at ease. No problems whatsoever.', vtt: true, date: '2023-12-19', dur: 'PT36S', book: 'Facelift' },
  { id: 'vt-hair', proc: 'Hair transplant', quote: 'Before, day 3, month 3, month 9. Watch the hairline fill in.', vtt: false, date: '2023-12-19', dur: 'PT33S', book: 'Hair Transplant' },
];

export const CASES = [
  { id: 'eyelid', name: 'Upper eyelid surgery', ar: '800/750', svc: '' },
  { id: 'cleft-2', name: 'Cleft lip correction', ar: '755/405', svc: '' },
  { id: 'tattoo', name: 'Laser tattoo removal', ar: '755/405', svc: '' },
  { id: 'mole', name: 'Facial mole removal', ar: '755/350', svc: '' },
  { id: 'cleft', name: 'Cleft lip, child', ar: '755/405', svc: '' },
  { id: 'tattoo-2', name: 'Tattoo removal, neck', ar: '755/405', svc: '' },
  { id: 'lip', name: 'Lip revision', ar: '755/405', svc: '' },
];

const ORDER = ['hair-transplant-goa', 'liposuction-goa', 'breast-augmentation-goa', 'rhinoplasty-goa', 'gynecomastia-surgery-goa', 'facelift-goa', 'botox-fillers-goa', 'tummy-tuck-goa', 'laser-hair-removal-goa', 'acne-scar-treatment-goa', 'skin-rejuvenation-pigmentation-goa'];

export function homePage(h) {
  const { SITE, SERVICES, FAQS, AWARDS, SVC_IMG, img, I, esc, ico, cta, faqBlock, locationsBlock } = h;
  const svcs = ORDER.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);
  const V = (id) => `/assets/video/${id}.mp4`;
  const play = (o) => esc(JSON.stringify(o));

  // payloads for the shared video player
  const voiceData = (v) => play({ src: V(v.id), poster: I(v.id), vtt: v.vtt ? `/assets/video/${v.id}.vtt` : '', who: 'Patient', title: v.proc, text: v.quote, book: v.book });
  const reelData = (r) => play({ src: V('r-' + r.slug), poster: I('r-' + r.slug), who: '@drmanishp', title: r.q, text: r.text, ig: r.ig, book: r.book });

  const stories = [
    { img: 'hs-0', vid: 'hs-0', who: 'Dr. Manish Patel', sub: 'MCh Plastic Surgery · @drmanishp', alt: 'Dr. Manish Patel in his clinic in Goa, beside a laser' },
    { img: 'hs-2', vid: 'hs-2', who: 'Upper eyelid surgery', sub: 'Patient, in her own words', voice: VOICES[0] },
    { img: 'hs-3', vid: 'hs-3', who: 'Hair transplant', sub: 'Nine months later', voice: VOICES[3], o: '50% 55%' },
    { img: 'hs-4', vid: 'hs-4', who: 'Facelift', sub: 'Patient, second procedure', voice: VOICES[1] },
    { img: 'hs-1', vid: 'hs-1', who: 'Mini facelift', sub: 'Patient, in her own words', voice: VOICES[2] },
  ];

  const facts = ['MCh, Plastic Surgery', '30+ years operating', 'Board-certified plastic surgeon', 'Clinics in Margao &amp; Panaji', 'FADS World Congress 2023', 'IAAPS AESURG', '@drmanishp'];

  const handles = [
    ['@drmanishp', 'Dr. Patel', 'https://www.instagram.com/drmanishp/', ico.ig],
    ['@patelcosmeticsurgerycenter', 'The clinic', SITE.social.instagram, ico.ig],
    ['YouTube', 'Longer explainers', SITE.social.youtube, ico.yt],
    ['Facebook', 'Clinic news', SITE.social.facebook, ico.fb],
  ];

  const body = `
<section class="sh" id="top" aria-label="Dr. Manish Patel">
  <div class="sh__stage" data-stories>
    <div class="sh__bars" aria-hidden="true">${stories.map(() => '<i><b></b></i>').join('')}</div>
    ${stories.map((s, k) => `<figure class="sh__s${k ? '' : ' is-on'}"${s.o ? ` style="--o:${s.o}"` : ''}${s.vid ? ` data-vid="${V(s.vid)}"` : ''}>
      ${img(s.img, s.alt || `${s.who}: patient testimonial at Patel Cosmetic Surgery Center`, { w: 540, h: 960, lazy: k > 0, sizes: '(max-width: 760px) 100vw, 420px' })}
      <figcaption class="sh__who"><span class="sh__av"><img src="/assets/img/logo-mark.webp" alt="" width="40" height="40"></span><span><b>${s.who}</b><small>${s.sub}</small></span></figcaption>
      ${s.voice ? `<button class="sh__snd" type="button" data-play="${voiceData(s.voice)}">${ico.play}<span>Watch with sound</span></button>` : ''}
    </figure>`).join('')}
    <button class="sh__tap sh__tap--l" type="button" aria-label="Previous story"></button>
    <button class="sh__tap sh__tap--r" type="button" aria-label="Next story"></button>
  </div>
  <div class="sh__copy">
    <h1 class="sh__h"><span class="sh__name">Dr. Manish Patel</span><span class="sh__role">Plastic &amp; cosmetic surgeon in <em>Goa</em></span></h1>
    <p class="sh__cred">MBBS · MS · MCh Plastic Surgery · 30+ years</p>
    <div class="sh__btns">${cta('Book a consultation', 'btn--leaf')}<a class="btn btn--glass" href="#voices"><span>Hear his patients</span></a></div>
    <a class="sh__proof" href="#voices"><span class="hd__faces" aria-hidden="true">${['vt-eyelid', 'vt-facelift', 'vt-mini-facelift', 'hair-3'].map((n) => `<img src="${I(n)}" alt="" width="48" height="48">`).join('')}</span><span><b>Real patients, on camera</b><small>${VOICES.length} patient films · ${CASES.length} before &amp; afters · ${REELS.length} answers from Dr. Patel</small></span></a>
  </div>
</section>

<div class="tick" aria-label="Credentials"><div class="tick__row">${[...facts, ...facts].map((f, k) => `<span${k >= facts.length ? ' aria-hidden="true"' : ''}>${f}</span>`).join('')}</div></div>

<section class="procs" aria-labelledby="procs-h">
  <div class="wrap hd-row"><h2 id="procs-h" class="hd" data-reveal>What would you like <em>to change?</em></h2><a class="link" href="/services/" data-reveal>All ${SERVICES.length} ${ico.arrow}</a></div>
  <div class="procs__vp" data-autoscroll><div class="procs__row" data-marquee="-1">${[...svcs, ...svcs].map((s, k) => `<a class="proc" href="/services/${s.slug}/"${k >= svcs.length ? ' aria-hidden="true" tabindex="-1"' : ''}><span class="proc__img">${img(SVC_IMG[s.slug], k >= svcs.length ? '' : s.name, { w: 600, h: 750, sizes: '(max-width: 760px) 58vw, 280px' })}</span><span class="proc__n">${s.name.replace(/ \(.*\)/, '')}</span></a>`).join('')}</div></div>
</section>

<section class="cases" aria-labelledby="cases-h"><div class="wrap">
  <h2 id="cases-h" class="hd" data-reveal>Drag the line. <em>See the work.</em></h2>
  <div class="cases__grid">
    <figure class="cmp" data-cmp style="--ar:${CASES[0].ar}">
      <div class="cmp__stage">
        <img class="cmp__a" src="${I('ba-' + CASES[0].id + '-after')}" alt="${esc(CASES[0].name)}, after" width="800" height="750">
        <img class="cmp__b" src="${I('ba-' + CASES[0].id + '-before')}" alt="${esc(CASES[0].name)}, before" width="800" height="750">
        <span class="cmp__tag cmp__tag--b">Before</span><span class="cmp__tag cmp__tag--a">After</span>
        <span class="cmp__line" aria-hidden="true"><i>${ico.arrow}</i></span>
        <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after">
      </div>
      <figcaption><strong class="cmp__name">${CASES[0].name}</strong><span>Dr. Patel’s patient · as published on the clinic’s Instagram</span></figcaption>
    </figure>
    <div class="cases__list" role="tablist" aria-label="Choose a result">${CASES.map((c, k) => `<button type="button" role="tab" class="case${k ? '' : ' is-on'}" aria-selected="${!k}" data-case="${c.id}" data-name="${esc(c.name)}" data-ar="${c.ar}"><span class="case__img"><img src="${I('ba-' + c.id + '-after')}" alt="" width="120" height="80" loading="lazy"></span><span>${c.name}</span></button>`).join('')}</div>
  </div>

  <div class="hairline">
    <div class="hairline__frames" data-stagger>${['Before', 'Day 3', 'Month 3', 'Month 9'].map((t, k) => `<figure>${img('hair-' + k, `Hair transplant patient, ${t.toLowerCase()}`, { w: 540, h: 720, sizes: '(max-width: 760px) 44vw, 240px' })}<figcaption><b>${t}</b></figcaption></figure>`).join('')}</div>
    <div class="hairline__txt" data-reveal><p class="hairline__q">One hairline, <em>nine months</em>.</p><button class="btn btn--line-d" type="button" data-play="${voiceData(VOICES[3])}">${ico.play}<span>Play the journey</span></button><a class="link" href="/services/hair-transplant-goa/">Hair transplant in Goa ${ico.arrow}</a></div>
  </div>
</div></section>

<section class="voices" id="voices" aria-labelledby="voices-h"><div class="wrap">
  <h2 id="voices-h" class="hd hd--l" data-reveal>Don’t take our word. <span class="hd__faces" aria-hidden="true">${['vt-eyelid', 'vt-facelift', 'vt-mini-facelift'].map((n) => `<img src="${I(n)}" alt="" width="48" height="48">`).join('')}</span> <em>Take theirs.</em></h2>
  <div class="voices__row">${VOICES.map((v) => `<button type="button" class="vcard" data-play="${voiceData(v)}" aria-label="Play ${esc(v.proc)} patient video">
    ${img(v.id, `${v.proc} patient testimonial video`, { w: 540, h: 960, sizes: '(max-width: 760px) 70vw, 280px' })}
    <span class="vcard__q">“${esc(v.quote)}”</span>
    <span class="vcard__f"><span class="vcard__p">${ico.play}</span><span><b>${v.proc}</b><small>Patient video</small></span></span>
  </button>`).join('')}</div>
  <div class="reviews">${h.TESTIMONIALS.map((t) => `<figure class="rv"><div class="stars" aria-label="5 out of 5">${ico.star.repeat(5)}</div><blockquote>“${esc(t.quote)}”</blockquote><figcaption><b>${esc(t.name)}</b> · ${esc(t.treatment)}</figcaption></figure>`).join('')}<a class="rv rv--more" href="/testimonials/"><span>Read every review</span>${ico.arrow}</a></div>
</div></section>

<section class="ask" aria-labelledby="ask-h"><div class="wrap">
  <h2 id="ask-h" class="hd hd--l" data-reveal>Questions you’d ask him. <em>Answered on camera.</em></h2>
  <div class="ask__handles">${handles.map(([hd, sub, u, ic]) => `<a class="hdl" href="${u}" target="_blank" rel="noopener">${ic}<span><b>${hd}</b><small>${sub}</small></span><span class="hdl__f">Follow</span></a>`).join('')}</div>
</div>
  <div class="ask__rail">${REELS.map((r) => `<button type="button" class="reel" data-play="${reelData(r)}" data-group="reels" aria-label="Play: ${esc(r.q)}">
    ${img('r-' + r.slug, '', { w: 540, h: 960, sizes: '(max-width: 760px) 46vw, 220px' })}
    <span class="reel__p">${ico.play}</span>
    <span class="reel__q">${esc(r.q)}</span>
  </button>`).join('')}</div>
</section>

<section class="dr" aria-labelledby="dr-h"><div class="wrap dr__in">
  <div class="dr__fig" data-reveal-img>${img('dr-portrait', 'Portrait of Dr. Manish Patel, plastic surgeon in Goa', { w: 744, h: 801 })}</div>
  <div class="dr__txt">
    <h2 id="dr-h" class="hd hd--l" data-reveal>Thirty years. <em>One pair of hands.</em></h2>
    <dl class="dr__cv" data-stagger><div><dt>Trained</dt><dd>MBBS · MS General Surgery · MCh Plastic Surgery</dd></div><div><dt>Practice</dt><dd>Cosmetic, reconstructive and hair restoration surgery</dd></div><div><dt>Personally</dt><dd>Consults, operates and follows up on every patient</dd></div></dl>
    <div class="dr__links" data-reveal><a class="link" href="/about/">His story ${ico.arrow}</a></div>
  </div>
</div>
  <div class="drag dr__awards" data-drag data-cursor="Drag"><div class="drag__track">${AWARDS.map(([n, t, d]) => `<figure class="award">${img(n, t, { w: 1024, h: 768, sizes: '(max-width: 760px) 78vw, 420px' })}<figcaption><strong>${t}</strong><span>${d}</span></figcaption></figure>`).join('')}
    <a class="award award--team" href="/about/#team">${img('team-group-1', 'Dr. Patel with his clinic team', { w: 1024, h: 768, sizes: '(max-width: 760px) 78vw, 420px' })}<figcaption><strong>Meet the team</strong><span>The people with you on the day ${ico.arrow}</span></figcaption></a></div></div>
</section>

${faqBlock(FAQS.slice(0, 4))}
${locationsBlock()}`;

  const videoSchema = [
    ...VOICES.map((v) => ({ '@type': 'VideoObject', name: `${v.proc}: patient testimonial for Dr. Manish Patel`, description: v.quote, thumbnailUrl: SITE.domain + I(v.id), contentUrl: SITE.domain + V(v.id), uploadDate: v.date, duration: v.dur })),
    ...REELS.map((r) => ({ '@type': 'VideoObject', name: r.q, description: r.text.slice(0, 300), thumbnailUrl: SITE.domain + I('r-' + r.slug), contentUrl: SITE.domain + V('r-' + r.slug), uploadDate: r.date, embedUrl: r.ig })),
  ];
  return { body, schema: { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Videos from Dr. Manish Patel and his patients', itemListElement: videoSchema.map((v, i) => ({ '@type': 'ListItem', position: i + 1, item: v })) } };
}
