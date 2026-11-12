// Home page, rebuilt for the NMC Guidelines on Ethical Advertising and Public Communication (6 Oct 2026).
// It informs rather than persuades: who the doctor is (with his register number), what each procedure involves,
// what can go wrong, and how a consultation works. No testimonials, reviews, before-and-afters or patient media.
import { REELS } from './reels.mjs';

const ORDER = ['hair-transplant-goa', 'liposuction-goa', 'breast-augmentation-goa', 'rhinoplasty-goa', 'gynecomastia-surgery-goa', 'facelift-goa', 'botox-fillers-goa', 'tummy-tuck-goa', 'laser-hair-removal-goa', 'acne-scar-treatment-goa', 'skin-rejuvenation-pigmentation-goa'];

// Only reels that are purely educational (Dr. Patel speaking, stock illustration, no patient results) may appear.
// Frame-checked: r-acne. The other clinic reels splice in before-and-after shots and stay off the site.
const EDU_REELS = ['acne'];

export function homePage(h) {
  const { SITE, SERVICES, FAQS, RISKS, PROCESS, SVC_IMG, img, I, esc, ico, cta, faqBlock, locationsBlock, regNo } = h;
  const svcs = ORDER.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);
  const V = (id) => `/assets/video/${id}.mp4`;
  const play = (o) => esc(JSON.stringify(o));
  const reels = EDU_REELS.map((s) => REELS.find((r) => r.slug === s)).filter(Boolean);
  const reelData = (r) => play({ src: V('r-' + r.slug), poster: I('r-' + r.slug), who: 'Dr. Manish Patel · @drmanishp', title: r.q, text: r.text, ig: r.ig });

  const facts = ['MBBS · MS (General Surgery) · MCh (Plastic Surgery)', `Registered with the ${SITE.reg.council}`, 'Clinics in Margao &amp; Panaji', 'English · Hindi · Konkani', 'Consultation before any procedure', 'Written estimate before you decide'];

  const handles = [
    ['@drmanishp', 'Dr. Patel explains', 'https://www.instagram.com/drmanishp/', ico.ig],
    ['@patelcosmeticsurgerycenter', 'Clinic updates', SITE.social.instagram, ico.ig],
    ['YouTube', 'Longer explainers', SITE.social.youtube, ico.yt],
    ['Facebook', 'Clinic notices', SITE.social.facebook, ico.fb],
  ];

  const body = `
<section class="np" id="top" aria-labelledby="np-h">
  <div class="wrap np__in">
    <div class="np__txt">
      <h1 class="np__h" id="np-h"><span class="np__name">Dr. Manish Patel</span><span class="np__role">Plastic &amp; cosmetic surgeon in <em>Goa</em></span></h1>
      <p class="np__lead">What each procedure involves, how recovery goes and what can go wrong, explained plainly, so you can decide in your own time.</p>
      <div class="np__btns"><a class="btn btn--line-d" href="/services/"><span>Read about treatments</span>${ico.arrow}</a>${cta('Request an appointment', 'btn--leaf')}</div>
    </div>
    <figure class="plate" aria-label="Registration details">
      <div class="plate__top"><span class="plate__ph">${img('dr-portrait', 'Dr. Manish Patel', { w: 744, h: 801, lazy: false, sizes: '96px' })}</span><span><b>${SITE.doctor}</b><small>Plastic surgeon</small></span></div>
      <dl class="plate__dl">
        <div><dt>Qualifications</dt><dd>MBBS, MS (General Surgery), MCh (Plastic Surgery)</dd></div>
        <div><dt>Registration</dt><dd>${SITE.reg.council}<br>${regNo(SITE.reg.no)}</dd></div>
        <div><dt>In practice</dt><dd>More than 30 years</dd></div>
        <div><dt>Clinics</dt><dd><a href="/locations/margao/">Margao</a> · <a href="/locations/panaji/">Panaji</a></dd></div>
      </dl>
      <figcaption>Check any doctor’s registration on the <a href="https://www.nmc.org.in/information-desk/indian-medical-register/" target="_blank" rel="noopener">NMC Indian Medical Register</a>.</figcaption>
    </figure>
  </div>
</section>

<div class="tick" aria-label="Practice information"><div class="tick__row">${[...facts, ...facts].map((f, k) => `<span${k >= facts.length ? ' aria-hidden="true"' : ''}>${f}</span>`).join('')}</div></div>

<section class="procs" aria-labelledby="procs-h">
  <div class="wrap hd-row"><h2 id="procs-h" class="hd" data-reveal>What would you like <em>to understand?</em></h2><a class="link" href="/services/" data-reveal>All ${SERVICES.length} ${ico.arrow}</a></div>
  <div class="procs__vp" data-autoscroll><div class="procs__row" data-marquee="-1">${[...svcs, ...svcs].map((s, k) => `<a class="proc" href="/services/${s.slug}/"${k >= svcs.length ? ' aria-hidden="true" tabindex="-1"' : ''}><span class="proc__img">${img(SVC_IMG[s.slug], k >= svcs.length ? '' : `Illustration for ${s.name}`, { w: 600, h: 750, sizes: '(max-width: 760px) 58vw, 280px' })}</span><span class="proc__n">${s.name.replace(/ \(.*\)/, '')}</span></a>`).join('')}</div></div>
</section>

<section class="decide" aria-labelledby="decide-h"><div class="wrap">
  <h2 id="decide-h" class="hd hd--l" data-reveal>Every procedure has a downside. <em>Read it first.</em></h2>
  <div class="decide__tabs" role="tablist" aria-label="Choose a procedure">${svcs.map((s, k) => `<button type="button" role="tab" id="dt-${k}" aria-controls="dp-${k}" aria-selected="${!k}" class="${k ? '' : 'is-on'}" tabindex="${k ? -1 : 0}">${s.name.replace(/ \(.*\)/, '')}</button>`).join('')}</div>
  <div class="decide__stage">${svcs.map((s, k) => {
    const r = RISKS[s.slug];
    return `<article class="sheet${k ? '' : ' is-on'}" role="tabpanel" id="dp-${k}" aria-labelledby="dt-${k}">
      <header class="sheet__hd"><span>Patient information</span><b>${s.name}</b></header>
      <div class="sheet__grid">
        <div class="sheet__c"><h3>Recovery</h3><p>${r.recovery}</p></div>
        <div class="sheet__c sheet__c--risk"><h3>Possible risks</h3><ul>${r.risks.map((x) => `<li>${x}</li>`).join('')}</ul></div>
        <div class="sheet__c"><h3>May not suit you if</h3><ul>${r.notFor.map((x) => `<li>${x}</li>`).join('')}</ul></div>
      </div>
      <footer class="sheet__ft"><span>General information. Your own risks are assessed at consultation.</span><a class="link" href="/services/${s.slug}/">Full guide ${ico.arrow}</a></footer>
    </article>`;
  }).join('')}</div>
</div></section>

${reels.length ? `<section class="explain" aria-labelledby="explain-h"><div class="wrap explain__in">
  <div class="explain__vid">${reels.map((r) => `<button type="button" class="reel reel--big" data-play="${reelData(r)}" aria-label="Play video: ${esc(r.q)}">
    ${img('r-' + r.slug, '', { w: 540, h: 960, sizes: '(max-width: 760px) 70vw, 320px' })}
    <span class="reel__p">${ico.play}</span>
    <span class="reel__q">${esc(r.q)}</span>
  </button>`).join('')}</div>
  <div class="explain__txt">
    <h2 id="explain-h" class="hd hd--l" data-reveal>Questions patients ask. <em>Answered by the surgeon.</em></h2>
    <p class="explain__p" data-reveal>Dr. Patel records short explainers on skin, hair and surgery. They are general education, not advice for your situation.</p>
    <div class="ask__handles" data-reveal>${handles.map(([hd, sub, u, ic]) => `<a class="hdl" href="${u}" target="_blank" rel="noopener">${ic}<span><b>${hd}</b><small>${sub}</small></span></a>`).join('')}</div>
  </div>
</div></section>` : ''}

<section class="walk" aria-labelledby="walk-h"><div class="wrap">
  <h2 id="walk-h" class="hd hd--l" data-reveal>What happens when you <em>walk in.</em></h2>
  <ol class="walk__list" data-stagger>${PROCESS.map(([n, t, d]) => `<li><span class="walk__n">${n}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>

<section class="dr" aria-labelledby="dr-h"><div class="wrap dr__in">
  <div class="dr__fig" data-reveal-img>${img('dr-portrait', 'Dr. Manish Patel, plastic surgeon in Goa', { w: 744, h: 801 })}</div>
  <div class="dr__txt">
    <h2 id="dr-h" class="hd hd--l" data-reveal>The surgeon, <em>on the record.</em></h2>
    <dl class="dr__cv" data-stagger>
      <div><dt>Degrees</dt><dd>MBBS · MS (General Surgery) · MCh (Plastic Surgery)</dd></div>
      <div><dt>Registration</dt><dd>${SITE.reg.council} · ${regNo(SITE.reg.no)}</dd></div>
      <div><dt>Positions</dt><dd>Head, Department of Cosmetic Surgery, Wockhardt Institute of Aesthetics (2011)</dd></div>
      <div><dt>Teaching</dt><dd>Faculty, IAAPS AESURG 2022 · Faculty and trainer, Botox and fillers, 7th FADS World Congress 2023</dd></div>
      <div><dt>Practice</dt><dd>Cosmetic, reconstructive and hair restoration surgery</dd></div>
    </dl>
    <div class="dr__links" data-reveal><a class="link" href="/about/">Full profile ${ico.arrow}</a><a class="link" href="/about/#team">Doctors and staff ${ico.arrow}</a></div>
  </div>
</div></section>

${faqBlock([FAQS[1], FAQS[5], FAQS[7], FAQS[4]])}
${locationsBlock()}`;

  const videos = reels.map((r) => ({ '@type': 'VideoObject', name: r.q, description: r.text.slice(0, 300), thumbnailUrl: SITE.domain + I('r-' + r.slug), contentUrl: SITE.domain + V('r-' + r.slug), uploadDate: r.date, embedUrl: r.ig, creator: { '@id': `${SITE.domain}/#doctor` } }));
  return { body, schema: videos.length ? { '@context': 'https://schema.org', '@graph': videos } : null };
}
