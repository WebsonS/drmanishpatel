import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, SERVICES, FAQS, POSTS, PROCESS, RISKS } from './data.mjs';
import { homePage } from './home.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const M = SITE.locations[0];
const P = SITE.locations[1];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonld = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
const urls = [];
// Medical register number, required on every doctor's page (NMC advertising guidelines, cl. 3.2 Expl. III).
const regNo = (n) => (n ? `Reg. No. ${esc(n)}` : 'Reg. No. awaiting confirmation');
const REG_LINE = `${SITE.doctor}, ${SITE.creds}. ${SITE.reg.council}, ${regNo(SITE.reg.no)}.`;

// ---------- real imagery (from the clinic's own site, optimised to WebP) ----------
const I = (n) => `/assets/img/p/${n}.webp`;
const SVC_IMG = {
  'hair-transplant-goa': 't-hair',
  'rhinoplasty-goa': 't-nose',
  'liposuction-goa': 't-lipo',
  'breast-augmentation-goa': 't-breast',
  'gynecomastia-surgery-goa': 't-gyno',
  'facelift-goa': 't-facelift',
  'tummy-tuck-goa': 't-tummy',
  'botox-fillers-goa': 't-botox',
  'laser-hair-removal-goa': 't-laser-hair',
  'acne-scar-treatment-goa': 't-co2',
  'skin-rejuvenation-pigmentation-goa': 't-facial',
};
// Search-result descriptions, written to fit ~155 characters.
const SVC_META = {
  'hair-transplant-goa': 'FUE and FUT hair transplant in Goa by Dr. Manish Patel, MCh plastic surgeon. Technique chosen after assessing your donor hair. Margao and Panaji.',
  'rhinoplasty-goa': 'Rhinoplasty in Goa to refine the shape of the nose, improve breathing, or both. Planned and performed by Dr. Manish Patel in Margao and Panaji.',
  'liposuction-goa': 'Liposuction in Goa removes stubborn fat that resists diet and exercise, to refine your body contour. Dr. Manish Patel, Margao and Panaji clinics.',
  'breast-augmentation-goa': 'Breast augmentation in Goa with implants, for size and shape that suit your frame. Consult Dr. Manish Patel, MCh plastic surgeon, Margao or Panaji.',
  'gynecomastia-surgery-goa': 'Gynecomastia surgery in Goa to remove enlarged male breast tissue for a flatter, firmer chest. Dr. Manish Patel, plastic surgeon, Margao and Panaji.',
  'facelift-goa': 'Facelift and mini facelift in Goa to lift jowls, deep folds and loose neck skin. Recovery and risks explained. Dr. Manish Patel, Margao and Panaji.',
  'tummy-tuck-goa': 'Tummy tuck (abdominoplasty) in Goa removes loose skin and fat and repairs separated muscles after pregnancy or weight loss. Dr. Manish Patel.',
  'botox-fillers-goa': 'Botox and dermal fillers in Goa for frown lines, crow’s feet, lips and lost volume, with risks explained first. Dr. Manish Patel, Margao and Panaji.',
  'laser-hair-removal-goa': 'Laser hair removal in Goa for long-term reduction of unwanted hair on face and body, planned for your skin type. Patel Cosmetic Center, Margao and Panaji.',
  'acne-scar-treatment-goa': 'Acne scar treatment in Goa with fractional CO2 laser, which stimulates collagen to smooth pitted scars. Dr. Manish Patel’s clinics in Margao and Panaji.',
  'skin-rejuvenation-pigmentation-goa': 'Pigmentation and skin rejuvenation in Goa: lasers, peels and medical skincare for melasma, dark spots and dull skin. Margao and Panaji clinics.',
};
const POST_IMG = {
  'fue-vs-fut-hair-transplant-goa': 't-hair',
  'rhinoplasty-recovery-what-to-expect': 't-profile',
  'how-to-choose-a-plastic-surgeon-in-goa': 'dr-laser',
  'acne-scars-fractional-co2-laser': 't-co2',
};
const AWARDS = [
  // captions as given in the gallery on the clinic's current About page
  ['dr-world-congress', 'FADS World Congress 2023', 'On stage, Holiday Inn Resort, South Goa'],
  ['team-fads-2023', '7th FADS World Congress', 'Faculty and trainer for Botox and fillers'],
  ['dr-award-aesurg', 'AESURG 2022', 'Invited faculty · Certificate of Significant Appreciation, IAAPS'],
  ['dr-aesurg-chair', 'AESURG 2022', 'Chairing the session on hair transplant'],
  ['team-ot', 'Hair transplant workshop', 'Operative workshop with international faculty'],
  ['dr-wockhardt-2011', 'Wockhardt Institute of Aesthetics, 2011', 'Inauguration, as Head of the Department of Cosmetic Surgery'],
  ['dr-gimacon', 'IMA GIMACON 2023', 'Indian Medical Association conference'],
  ['event-1', 'CosDermIndia Convention', 'Cosmetic dermatology convention'],
];
// Every image ships a 720px "-sm" variant so phones never download the 1600px file.
const hasSm = (n) => fs.existsSync(path.join(ROOT, 'assets/img/p', `${n}-sm.webp`));
// Real pixel width of a WebP (VP8, VP8L or VP8X header), so srcset descriptors tell the browser the truth.
const webpW = (n) => {
  try {
    const b = fs.readFileSync(path.join(ROOT, 'assets/img/p', `${n}.webp`)).subarray(0, 30);
    const t = b.toString('ascii', 12, 16);
    if (t === 'VP8 ') return b.readUInt16LE(26) & 0x3fff;
    if (t === 'VP8L') return 1 + (((b[22] & 0x3f) << 8) | b[21]);
    if (t === 'VP8X') return 1 + b.readUIntLE(24, 3);
  } catch {}
  return 1600;
};
const srcset = (n) => {
  const big = webpW(n), sm = webpW(n + '-sm');
  return big > sm ? `${I(n + '-sm')} ${sm}w, ${I(n)} ${big}w` : `${I(n + '-sm')} ${sm}w`;
};
const img = (n, alt, { cls = '', w = 1200, h = 1500, lazy = true, sizes = '(max-width: 760px) 92vw, 50vw' } = {}) =>
  `<img${cls ? ` class="${cls}"` : ''} src="${I(n)}"${hasSm(n) ? ` srcset="${srcset(n)}" sizes="${sizes}"` : ''} alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;

// ---------- shared schema ----------
const orgId = `${SITE.domain}/#clinic`;
const docId = `${SITE.domain}/#doctor`;
const locSchema = (l) => ({
  '@type': 'MedicalClinic',
  '@id': `${SITE.domain}/locations/${l.slug}/#clinic`,
  name: `${SITE.name}, ${l.city}`,
  url: `${SITE.domain}/locations/${l.slug}/`,
  telephone: l.phone,
  image: SITE.domain + I('dr-laser'),
  medicalSpecialty: 'PlasticSurgery',
  parentOrganization: { '@id': orgId },
  address: { '@type': 'PostalAddress', streetAddress: l.street, addressLocality: l.locality, addressRegion: l.region, postalCode: l.postal, addressCountry: 'IN' },
});
const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['MedicalBusiness', 'Organization'],
      '@id': orgId,
      name: SITE.name,
      alternateName: SITE.short,
      url: SITE.domain,
      logo: `${SITE.domain}/assets/img/logo.png`,
      image: SITE.domain + I('dr-laser'),
      description: 'Cosmetic and plastic surgery clinic in Goa led by Dr. Manish Patel (MBBS, MS, MCh Plastic Surgery), with clinics in Margao and Panaji.',
      medicalSpecialty: 'PlasticSurgery',
      areaServed: { '@type': 'AdministrativeArea', name: 'Goa' },
      sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube],
      founder: { '@id': docId },
      department: SITE.locations.map(locSchema),
      contactPoint: SITE.locations.map((l) => ({ '@type': 'ContactPoint', telephone: l.phone, contactType: 'appointments', areaServed: 'IN', availableLanguage: ['English', 'Hindi', 'Konkani'] })),
    },
    {
      '@type': ['Physician', 'Person'],
      '@id': docId,
      name: SITE.doctor,
      image: SITE.domain + I('dr-portrait'),
      jobTitle: 'Plastic and Cosmetic Surgeon',
      medicalSpecialty: 'PlasticSurgery',
      url: `${SITE.domain}/about/`,
      worksFor: { '@id': orgId },
      hasCredential: ['MBBS', 'MS (General Surgery)', 'MCh (Plastic Surgery)'].map((n) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: n })),
      knowsAbout: SERVICES.map((s) => s.name),
      sameAs: ['https://www.instagram.com/drmanishp/', SITE.social.instagram],
    },
    { '@type': 'WebSite', '@id': `${SITE.domain}/#website`, url: SITE.domain, name: SITE.name, publisher: { '@id': orgId }, inLanguage: 'en-IN' },
  ],
};
const faqSchema = (faqs) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.domain + u })) });

// ---------- icons ----------
const ico = {
  arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  ig: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.300 1.200-1.800 1.200-.5.1-1 .2-3.300-.7-2.800-1.100-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.900s.7-2.100 1-2.400c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.100c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.1.5.1.7-.1l.9-1.100c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.6-.1 1.200z"/></svg>',
  play: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5z"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 2l3 7 7 .6-5.3 4.7L18.4 22 12 18l-6.4 4 1.7-7.7L2 9.6 9 9z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  leaf: '<svg viewBox="0 0 40 40" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M6 34C6 16 18 6 34 6c0 16-10 28-28 28z"/><path d="M6 34L24 16"/></svg>',
};

const NAV = [
  ['/services/', 'Treatments'],
  ['/about/', 'Dr. Patel'],
  ['/faq/', 'FAQ'],
  ['/blog/', 'Journal'],
  ['/contact/', 'Contact'],
];

// Booking form: used in the popup (every "Book" button) and on /contact/. Sends to the chosen clinic on WhatsApp.
function bookForm(id, withMsg = false) {
  return `<form class="bform" data-book-form novalidate>
    <label class="bform__f"><span>Your name</span><input name="name" required autocomplete="name" placeholder="Full name" id="${id}-name"></label>
    <label class="bform__f"><span>Phone / WhatsApp</span><input name="phone" type="tel" inputmode="tel" required autocomplete="tel" placeholder="+91" id="${id}-phone"></label>
    <fieldset class="bform__clinic"><legend>Clinic</legend>${SITE.locations.map((l, i) => `<label><input type="radio" name="clinic" value="${l.city}"${i ? '' : ' checked'}><span>${l.city}</span></label>`).join('')}</fieldset>
    <label class="bform__f"><span>Treatment</span><select name="treatment" id="${id}-t"><option value="">Not sure yet</option>${SERVICES.map((s) => `<option>${s.name}</option>`).join('')}</select></label>
    ${withMsg ? `<label class="bform__f"><span>Message (optional)</span><textarea name="msg" rows="3" id="${id}-msg"></textarea></label>` : ''}
    <label class="bform__ok"><input type="checkbox" name="ok" required id="${id}-ok"><span>I agree to send these details to the clinic on WhatsApp so the team can arrange an appointment. <a href="/privacy/">Privacy notice</a></span></label>
    <button class="btn btn--leaf bform__go" type="submit"><span>Continue on WhatsApp</span>${ico.arrow}</button>
    <p class="bform__note">Opens WhatsApp with your details filled in. Prefer to talk? <a href="tel:${SITE.locations[0].phone}">Call ${SITE.locations[0].phoneShow}</a></p>
  </form>`;
}

// ================================================================== LAYOUT
function layout({ path: p, title, desc, body, schema = [], ogType = 'website', ogImg = 'dr-laser', cls = '', noindex = false, service = '' }) {
  const url = SITE.domain + p;
  if (!noindex) urls.push(p);
  const nav = NAV.map(([h, t]) => `<a href="${h}"${p.startsWith(h) ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  return `<!doctype html>
<html lang="en-IN" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">'}
<meta name="theme-color" content="#0F2A47">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.domain}${I(ogImg)}">
<meta property="og:image:alt" content="${esc(title)}">
<link rel="alternate" type="text/markdown" href="/llms.txt" title="Site summary for AI assistants">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="IN-GA">
<meta name="geo.placename" content="Margao, Panaji, Goa">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/plus-jakarta-sans-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/fonts.css">
<link rel="stylesheet" href="/assets/css/style.css">
<script>document.documentElement.className='js';try{if(sessionStorage.getItem('pt')==='1')document.documentElement.classList.add('arriving');if(!sessionStorage.getItem('seen'))document.documentElement.classList.add('first')}catch(e){}</script>
${jsonld(orgSchema)}
${schema.map(jsonld).join('\n')}
</head>
<body class="${cls}"${service ? ` data-service="${esc(service)}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
<div class="loader" aria-hidden="true"><div class="loader__in"><img src="/assets/img/logo.webp" alt="" width="240" height="78"><span class="sig loader__sig">Manish Patel</span><span class="loader__bar"><i></i></span></div></div>
<div class="wipe" aria-hidden="true"><span></span><span></span><span></span></div>
<header class="hdr" id="hdr">
  <a class="hdr__logo" href="/" aria-label="${esc(SITE.name)} home"><img src="/assets/img/logo.webp" alt="${esc(SITE.name)} logo" width="160" height="52"></a>
  <nav class="hdr__nav" aria-label="Primary">${nav}</nav>
  <div class="hdr__cta">
    <a class="hdr__tel" href="tel:${M.phone}">${M.phoneShow}</a>
    <a class="btn btn--sm" href="/contact/" data-book data-magnetic><span>Appointments</span></a>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><i></i><i></i></button>
  </div>
</header>
<aside class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer__in">
    <div class="drawer__doc"><img src="${I('dr-portrait-sm')}" alt="" width="56" height="56" loading="lazy"><div><strong>${SITE.doctor}</strong><span>MCh Plastic Surgery · 30+ yrs</span></div></div>
    <nav class="drawer__nav" aria-label="Mobile">${[['/', 'Home'], ...NAV].map(([h, t]) => `<a href="${h}"${p.startsWith(h) && (h !== '/' || p === '/') ? ' aria-current="page"' : ''}><span>${t}</span>${ico.arrow}</a>`).join('')}</nav>
    <div class="drawer__svc"><p>Popular</p><div>${SERVICES.slice(0, 6).map((s) => `<a href="/services/${s.slug}/">${s.name.replace(/ \(.*\)/, '')}</a>`).join('')}</div></div>
    <div class="drawer__foot">
      <a class="btn btn--leaf" href="/contact/" data-book><span>Request an appointment</span>${ico.arrow}</a>
      <div class="drawer__calls">${SITE.locations.map((l) => `<a href="tel:${l.phone}"><small>${l.city}</small>${l.phoneShow}</a>`).join('')}</div>
      <div class="social"><a href="${SITE.social.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ico.wa}</a><a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ico.ig}</a><a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ico.fb}</a><a href="${SITE.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ico.yt}</a></div>
    </div>
  </div>
</aside>
<main id="main">
${body}
</main>
${footer()}
<a class="wa-float" href="${SITE.social.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ico.wa}</a>
<nav class="mbar" aria-label="Quick actions">
  <a href="tel:${M.phone}" class="mbar__i">${ico.phone}<span>Call</span></a>
  <a href="${SITE.social.whatsapp}" target="_blank" rel="noopener" class="mbar__i">${ico.wa}<span>WhatsApp</span></a>
  <a href="/contact/" class="mbar__book" data-book><span>Appointment</span>${ico.arrow}</a>
</nav>
<div class="book" id="book-modal" role="dialog" aria-modal="true" aria-labelledby="book-h" aria-hidden="true">
  <div class="book__scrim" data-close></div>
  <div class="book__panel">
    <button class="book__x" type="button" aria-label="Close" data-close><i></i><i></i></button>
    <div class="book__head"><img src="${I('dr-portrait-sm')}" alt="" width="64" height="64" loading="lazy"><div><h2 id="book-h">Request an appointment</h2><p class="book__sub">${SITE.doctor} · ${SITE.reg.council}, ${regNo(SITE.reg.no)}</p></div></div>
    ${bookForm('m')}
  </div>
</div>
<div class="pl" id="player" role="dialog" aria-modal="true" aria-label="Video" aria-hidden="true">
  <div class="pl__scrim" data-pl-close></div>
  <div class="pl__box">
    <div class="pl__media"><video playsinline controls preload="none"></video></div>
    <div class="pl__side">
      <div class="pl__top"><span class="pl__who"></span><span class="pl__n"></span></div>
      <h2 class="pl__t"></h2>
      <div class="pl__txt"></div>
      <p class="pl__note">General education from ${SITE.doctor}. It is not advice for your own situation.</p>
      <div class="pl__act"><a class="pl__ig" target="_blank" rel="noopener">${ico.ig}<span>Watch on Instagram</span></a></div>
    </div>
    <button class="pl__nav pl__nav--p" type="button" aria-label="Previous video">${ico.arrow}</button>
    <button class="pl__nav pl__nav--n" type="button" aria-label="Next video">${ico.arrow}</button>
    <button class="pl__x" type="button" aria-label="Close video" data-pl-close><i></i><i></i></button>
  </div>
</div>
<script src="/assets/js/vendor/gsap.min.js" defer></script>
<script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/vendor/lenis.min.js" defer></script>
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

function footer() {
  return `<footer class="ftr">
  <div class="ftr__cta wrap">
    <div class="ftr__img" data-reveal-img>${img('goa-1', 'Goa coastline', { w: 1200, h: 800 })}</div>
    <div>
      <h2 class="display display--l" data-split>Questions first.<br><em>Decisions later.</em></h2>
      <p class="ftr__p" data-reveal>Call either clinic to ask a question or arrange a consultation.</p>
      <div class="ftr__btns" data-reveal>${SITE.locations.map((l) => `<a class="btn btn--line" href="tel:${l.phone}"><span>${l.city} · ${l.phoneShow}</span></a>`).join('')}</div>
    </div>
  </div>
  <div class="ftr__grid wrap">
    <div><img class="ftr__logo" src="/assets/img/logo.webp" alt="${esc(SITE.name)}" width="180" height="58" loading="lazy">
      <p class="ftr__about">Cosmetic and plastic surgery in Goa, led by ${SITE.doctor}, ${SITE.creds}.</p>
      <div class="social"><a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ico.ig}</a><a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ico.fb}</a><a href="${SITE.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ico.yt}</a></div></div>
    <div><h2>Treatments</h2><ul>${SERVICES.slice(0, 7).map((s) => `<li><a href="/services/${s.slug}/">${s.name}</a></li>`).join('')}<li><a href="/services/">All treatments</a></li></ul></div>
    <div><h2>Clinic</h2><ul><li><a href="/about/">About Dr. Patel</a></li><li><a href="/about/#team">Doctors and staff</a></li><li><a href="/blog/">Journal</a></li><li><a href="/faq/">FAQ</a></li><li><a href="/contact/">Contact</a></li><li><a href="/privacy/">Privacy</a></li></ul></div>
    <div><h2>Visit</h2>${SITE.locations.map((l) => `<address><a href="/locations/${l.slug}/"><strong>${l.name}</strong></a><br>${l.street}, ${l.locality}, ${l.region} ${l.postal}<br><a href="tel:${l.phone}">${l.phoneShow}</a></address>`).join('')}</div>
  </div>
  <div class="ftr__sig wrap" aria-hidden="true"><span class="sig">Manish Patel</span></div>
  <div class="ftr__legal wrap">
    <p class="ftr__reg">${REG_LINE}</p>
    <p>Information on this website is for general education and is not a substitute for a consultation. No outcome is guaranteed. Every procedure carries risks, which are explained before you decide. In line with the National Medical Commission’s guidelines on ethical advertising, this website does not publish patient testimonials, reviews or before-and-after images.</p>
    <p>© ${new Date().getFullYear()} ${SITE.name}.</p>
  </div>
</footer>`;
}

// ================================================================== COMPONENTS
const pgHero = ({ eyebrow, title, lead, crumbs, image, alt }) => `<section class="pghero${image ? ' pghero--img' : ''}">
  <div class="wrap pghero__in">
    <div class="pghero__txt">
      ${crumbs ? `<nav class="crumbs" aria-label="Breadcrumb">${crumbs.map(([n, u], i) => (i < crumbs.length - 1 ? `<a href="${u}">${n}</a><span>/</span>` : `<span aria-current="page">${n}</span>`)).join('')}</nav>` : ''}
      <p class="eyebrow" data-hero>${eyebrow}</p>
      <h1 class="display display--xl" data-split>${title}</h1>
      ${lead ? `<p class="lead" data-hero>${lead}</p>` : ''}
    </div>
    ${image ? `<div class="pghero__fig"><div class="leaf leaf--hero" data-reveal-img>${img(image, alt || '', { lazy: false })}</div></div>` : ''}
  </div>
</section>`;

const faqBlock = (faqs, title = 'Questions, <em>answered</em>.') => `<section class="sec"><div class="wrap faq">
  <div class="faq__head"><p class="eyebrow" data-reveal>Answers</p><h2 class="display display--l" data-split>${title}</h2><p class="lead" data-reveal>Still unsure? <a class="link" href="/contact/">Ask Dr. Patel’s team</a></p></div>
  <div class="faq__list">${faqs.map(([q, a]) => `<details class="qa" data-reveal><summary><span>${esc(q)}</span><i aria-hidden="true"></i></summary><div class="qa__a"><p>${esc(a)}</p></div></details>`).join('')}</div>
</div></section>`;

const cta = (t = 'Request an appointment', cls = '') => `<a class="btn ${cls}" href="/contact/" data-book data-magnetic><span>${t}</span>${ico.arrow}</a>`;

const tcard = (s, i) => `<a class="tcard" href="/services/${s.slug}/" data-cursor="View">
  <div class="tcard__img">${img(SVC_IMG[s.slug], `${s.name} at Patel Cosmetic Surgery Center`, { w: 1000, h: 1000 })}</div>
  <div class="tcard__m"><span>${String(i + 1).padStart(2, '0')}</span><span>${s.cat}</span></div>
  <h3>${s.name}</h3><p>${s.tag}</p>
</a>`;

const postCard = (p) => `<a class="post" href="/blog/${p.slug}/" data-reveal data-cursor="Read"><div class="post__img">${img(POST_IMG[p.slug], p.title, { w: 1000, h: 667 })}</div><div class="post__m"><span>${p.cat}</span><span>${p.read} read</span></div><h3>${p.title}</h3><p>${p.desc}</p></a>`;

const locationsBlock = () => `<section class="sec sec--sand"><div class="wrap">
  <div class="sec__head"><p class="eyebrow" data-reveal>Two clinics in Goa</p><h2 class="display display--l" data-split>Visit us in <em>Margao</em><br>or <em>Panaji</em>.</h2></div>
  <div class="locs" data-stagger>${SITE.locations.map((l, i) => `<article class="loc"><div class="loc__img">${img(i ? 'goa-2' : 'goa-1', `Goa, near our ${l.city} clinic`, { w: 1200, h: 800 })}<span class="loc__city">${l.city}</span></div><div class="loc__b"><address>${l.street}<br>${l.locality}, ${l.region} ${l.postal}</address><div class="loc__a"><a class="btn btn--sm" href="tel:${l.phone}"><span>${l.phoneShow}</span></a><a class="link" href="/locations/${l.slug}/">Directions ${ico.arrow}</a></div></div></article>`).join('')}</div>
</div></section>`;

// Team: one consistent frame for every portrait so mixed-quality photos read as a set.
// Names, roles and qualifications as listed on the clinic's current About page.
const TEAM = [
  ['team-1', 'Dr. Levita Cardozo', 'Dermatologist', 'MBBS (Goa Medical College), DVD · Dermatosurgery, St. John’s Medical College', 'doc'],
  ['team-2', 'Dr. Carla', 'Dermatologist', 'MD Dermatology · Fellowship in Dermatosurgery, Cutis Hospital', 'doc'],
  ['team-3', 'Dr. Amruta', 'Dermatologist', 'MBBS, DVD', 'doc'],
  ['team-doc-1', 'Reena Patel', 'Counsellor & Clinic Coordinator', '', 'staff'],
  ['team-4', 'Pooja Rao', 'Senior Sister', '', 'staff'],
  ['team-5', 'Suchi', 'Front Desk Manager', 'Margao clinic', 'staff'],
  ['team-6', 'Deepika', 'Front Desk Manager', 'Panaji clinic', 'staff'],
];
const memCard = ([n, name, role, cred, grp]) => `<figure class="mem"><div class="mem__img">${img(n, `${name}, ${role} at Patel Cosmetic & Plastic Surgery Center`, { w: 549, h: 549, sizes: '(max-width: 760px) 44vw, 200px' })}</div><figcaption><strong>${esc(name)}</strong><span class="mem__role">${esc(role)}</span>${cred ? `<small>${esc(cred)}</small>` : ''}${grp === 'doc' ? `<small class="mem__reg">${regNo('')}</small>` : ''}</figcaption></figure>`;
const teamBlock = () => `<section class="sec team-s" id="team" aria-labelledby="team-h"><div class="wrap">
  <div class="team-s__top">
    <h2 class="hd hd--l" id="team-h" data-reveal>The people <em>behind your care.</em></h2>
    <figure class="team-s__ot" data-reveal-img>${img('team-ot', 'Operative workshop for hair transplant with international faculty', { w: 1600, h: 1200 })}<figcaption>Hair transplant operative workshop with international faculty</figcaption></figure>
  </div>
  <h3 class="team-s__g" data-reveal>Doctors</h3>
  <div class="team-s__row team-s__row--doc" data-stagger>${TEAM.filter((t) => t[4] === 'doc').map(memCard).join('')}</div>
  <h3 class="team-s__g" data-reveal>Clinic staff</h3>
  <div class="team-s__row" data-stagger>${TEAM.filter((t) => t[4] === 'staff').map(memCard).join('')}</div>
</div></section>`;

function write(p, html) {
  const f = path.join(ROOT, p === '/' ? 'index.html' : path.join(p, 'index.html'));
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

// ================================================================== HOME
{
  const { body, schema } = homePage({ SITE, SERVICES, FAQS, RISKS, PROCESS, SVC_IMG, img, I, esc, ico, cta, faqBlock, locationsBlock, regNo });
  write('/', layout({
    path: '/',
    title: 'Dr. Manish Patel | Plastic & Cosmetic Surgeon in Goa',
    desc: 'Dr. Manish Patel, MCh plastic surgeon in Goa. What each procedure involves, recovery and risks, explained plainly. Clinics in Margao and Panaji.',
    body, schema: [faqSchema([FAQS[1], FAQS[5], FAQS[7], FAQS[4]]), schema].filter(Boolean), cls: 'home',
  }));
}

// ================================================================== ABOUT
{
  const body = `${pgHero({ eyebrow: 'About the surgeon', title: 'Dr. Manish<br><em>Patel</em>', lead: 'Plastic and cosmetic surgeon with more than three decades of experience, practising in Margao and Panaji, Goa.', crumbs: [['Home', '/'], ['About', '/about/']], image: 'dr-portrait', alt: 'Dr. Manish Patel' })}
<section class="sec"><div class="wrap about">
  <div class="about__fig"><div class="leaf leaf--tall" data-reveal-img>${img('dr-laser', 'Dr. Manish Patel in his clinic', { w: 568, h: 568 })}</div></div>
  <div class="about__txt">
    <p class="big" data-reveal>A surgeon’s job is as much about what he advises against as what he performs.</p>
    <p data-reveal>Dr. Manish Patel holds MBBS, MS (General Surgery) and MCh (Plastic Surgery) qualifications and has over 30 years of experience. His practice covers cosmetic and reconstructive surgery, hair restoration and skin treatments.</p>
    <p class="about__reg" data-reveal>${SITE.reg.council} · ${regNo(SITE.reg.no)}</p>
    <p data-reveal>His approach is simple: understand what you want, be honest about what is and is not achievable, and explain the risks before anything is decided. He plans and performs your treatment personally, and remains reachable throughout recovery.</p>
    <div class="about__sign" data-reveal><span class="sig">Manish Patel</span></div>
    <h2 class="h3" data-reveal>Qualifications</h2>
    <ul class="ticks" data-reveal><li>MBBS</li><li>MS, General Surgery</li><li>MCh, Plastic Surgery</li></ul>
    <h2 class="h3" data-reveal>Areas of practice</h2>
    <ul class="ticks ticks--2" data-reveal>${SERVICES.map((s) => `<li><a href="/services/${s.slug}/">${s.name}</a></li>`).join('')}</ul>
    <!-- TODO (Dr. Patel): fill SITE.reg.no in data.mjs; add society memberships and hospital affiliations with body and year. -->
    <div class="about__cta" data-reveal>${cta()}</div>
  </div>
</div></section>
<section class="sec sec--forest rec">
  <div class="wrap sec__head sec__head--row"><div><h2 class="display display--l" data-split>Teaching and<br><em>conferences</em>.</h2></div><p class="rec__hint" data-reveal>Drag to explore ${ico.arrow}</p></div>
  <div class="drag" data-drag data-cursor="Drag"><div class="drag__track">${AWARDS.map(([n, t, d]) => `<figure class="award">${img(n, t, { w: 1024, h: 768 })}<figcaption><strong>${t}</strong><span>${d}</span></figcaption></figure>`).join('')}</div></div>
</section>
${teamBlock()}
<section class="sec sec--sand"><div class="wrap values">
  ${[['Honest advice', 'You will hear what is realistic, including when surgery is not the right answer.'], ['Realistic expectations', 'A clear account of what a procedure can and cannot change for you.'], ['Assessment first', 'A full medical assessment before any procedure, with its risks explained.'], ['Personal care', 'Dr. Patel is involved from consultation through recovery.']].map(([t, d], i) => `<div class="val" data-reveal><span>0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div></section>
${locationsBlock()}`;
  write('/about/', layout({ path: '/about/', title: 'About Dr. Manish Patel | MCh Plastic Surgeon in Goa', desc: 'Dr. Manish Patel: MBBS, MS (General Surgery), MCh (Plastic Surgery), Goa Medical Council registered, in practice for more than 30 years in Goa.', body, ogImg: 'dr-portrait', schema: [crumbSchema([['Home', '/'], ['About', '/about/']]), { '@context': 'https://schema.org', '@type': 'AboutPage', mainEntity: { '@id': docId } }] }));
}

// ================================================================== SERVICES HUB
{
  const body = `${pgHero({ eyebrow: 'Treatments', title: 'Eleven treatments,<br><em>explained plainly</em>.', lead: 'What each procedure involves, how recovery goes, what can go wrong and who it may not suit.', crumbs: [['Home', '/'], ['Treatments', '/services/']], image: 't-profile', alt: 'Facial profile' })}
<section class="sec"><div class="wrap">
${['Surgical', 'Non-surgical', 'Skin'].map((c) => `<div class="cat"><h2 class="eyebrow" data-reveal>${c}</h2></div><div class="tgrid" data-stagger>${SERVICES.filter((s) => s.cat === c).map((s) => tcard(s, SERVICES.indexOf(s))).join('')}</div>`).join('')}
</div></section>
${faqBlock(FAQS.slice(3, 6))}`;
  write('/services/', layout({ path: '/services/', title: 'Cosmetic & Plastic Surgery Treatments in Goa | Dr. Manish Patel', desc: 'Hair transplant, rhinoplasty, liposuction, breast and body surgery, facelift, Botox, fillers, laser and skin treatments in Margao and Panaji, Goa.', body, ogImg: 't-profile', schema: [crumbSchema([['Home', '/'], ['Treatments', '/services/']]), { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.domain}/services/${s.slug}/`, name: s.name })) }] }));
}

// ================================================================== SERVICE DETAIL
for (const s of SERVICES) {
  const p = `/services/${s.slug}/`;
  const i = SERVICES.indexOf(s);
  const others = [1, 2, 3].map((k) => SERVICES[(i + k) % SERVICES.length]);
  const body = `${pgHero({ eyebrow: `${s.cat} · ${s.tag}`, title: `${s.name}<br><em>in Goa</em>`, lead: s.answer, crumbs: [['Home', '/'], ['Treatments', '/services/'], [s.name, p]], image: SVC_IMG[s.slug], alt: `${s.name} at Patel Cosmetic Surgery Center` })}
<section class="sec"><div class="wrap svc-d">
  <div class="svc-d__aside">
    <div class="svc-d__card" data-reveal><span class="sig">Dr. Patel</span><p>“Every ${s.name.toLowerCase()} plan starts with an honest conversation about what will suit you, and what may not.”</p><small class="svc-d__reg">${SITE.doctor} · ${SITE.reg.council}, ${regNo(SITE.reg.no)}</small><a class="link" href="/contact/" data-book>Ask the clinic ${ico.arrow}</a></div>
  </div>
  <div class="svc-d__txt">
    <div data-reveal><p class="eyebrow">Who it is for</p><ul class="ticks ticks--lg">${s.who.map((w) => `<li>${w}</li>`).join('')}</ul></div>
    <div><h2 class="eyebrow" data-reveal>What to expect</h2><ol class="steps">${s.details.map(([k, v], j) => `<li data-reveal><span>0${j + 1}</span><div><h3>${k}</h3><p>${v}</p></div></li>`).join('')}</ol></div>
    <div class="riskbox" data-reveal>
      <h2 class="riskbox__h">Recovery, risks and suitability</h2>
      <div class="riskbox__g"><div><h3>Recovery</h3><p>${RISKS[s.slug].recovery}</p></div><div><h3>Possible risks</h3><ul>${RISKS[s.slug].risks.map((x) => `<li>${x}</li>`).join('')}</ul></div><div><h3>May not suit you if</h3><ul>${RISKS[s.slug].notFor.map((x) => `<li>${x}</li>`).join('')}</ul></div></div>
    </div>
    <div class="note" data-reveal><strong>Consultation first.</strong> Suitability, risks, alternatives and cost are discussed with Dr. Patel in person. No result can be guaranteed and outcomes differ between individuals.</div>
  </div>
</div></section>
${faqBlock(s.faqs, `${s.name}: <em>your questions</em>.`)}
<section class="sec sec--sand"><div class="wrap"><div class="sec__head"><p class="eyebrow" data-reveal>Also at the clinic</p><h2 class="display display--l" data-split>Related <em>treatments</em>.</h2></div><div class="tgrid" data-stagger>${others.map((o) => tcard(o, SERVICES.indexOf(o))).join('')}</div></div></section>`;
  write(p, layout({ path: p, title: `${s.name} in Goa | Dr. Manish Patel`, desc: SVC_META[s.slug], body, service: s.name, ogImg: SVC_IMG[s.slug], schema: [crumbSchema([['Home', '/'], ['Treatments', '/services/'], [s.name, p]]), faqSchema(s.faqs), { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: `${s.name} in Goa`, url: SITE.domain + p, image: SITE.domain + I(SVC_IMG[s.slug]), about: { '@type': 'MedicalProcedure', name: s.name, procedureType: s.cat === 'Surgical' ? 'SurgicalProcedure' : 'NoninvasiveProcedure', description: s.answer, followup: RISKS[s.slug].recovery }, lastReviewed: new Date().toISOString().slice(0, 10), reviewedBy: { '@id': docId }, specialty: 'PlasticSurgery' }] }));
}

// ================================================================== BLOG
{
  const [lead, ...rest] = POSTS;
  const body = `${pgHero({ eyebrow: 'The journal', title: 'Honest answers,<br><em>from the surgeon</em>.', lead: 'Clear, careful guidance on the questions patients ask most.', crumbs: [['Home', '/'], ['Journal', '/blog/']] })}
<section class="sec sec--tight"><div class="wrap">
  <a class="feat" href="/blog/${lead.slug}/" data-reveal data-cursor="Read"><div class="feat__img">${img(POST_IMG[lead.slug], lead.title, { w: 1000, h: 1000 })}</div><div class="feat__txt"><div class="post__m"><span>${lead.cat}</span><span>${fmtDate(lead.date)}</span></div><h2 class="display">${lead.title}</h2><p>${lead.desc}</p><span class="link">Read article ${ico.arrow}</span></div></a>
  <div class="posts" style="margin-top:4rem">${rest.map(postCard).join('')}</div>
</div></section>`;
  write('/blog/', layout({ path: '/blog/', title: 'Plastic Surgery & Skin Journal | Dr. Manish Patel, Goa', desc: 'Guides on hair transplant, rhinoplasty recovery, acne scar treatment and choosing a plastic surgeon in Goa, from the practice of Dr. Manish Patel.', body, schema: [crumbSchema([['Home', '/'], ['Journal', '/blog/']]), { '@context': 'https://schema.org', '@type': 'Blog', name: 'Dr. Manish Patel Journal', url: `${SITE.domain}/blog/`, blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE.domain}/blog/${p.slug}/`, datePublished: p.date })) }] }));
  for (const p of POSTS) {
    const u = `/blog/${p.slug}/`;
    const svc = p.service ? SERVICES.find((s) => s.slug === p.service) : null;
    const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
    const b = `${pgHero({ eyebrow: `${p.cat} · ${fmtDate(p.date)} · ${p.read} read`, title: p.title, crumbs: [['Home', '/'], ['Journal', '/blog/'], [p.cat, u]], image: POST_IMG[p.slug], alt: p.title })}
<article class="sec sec--tight"><div class="wrap prose">
  <p class="answer" data-reveal><strong>Short answer</strong>${p.answer}</p>
  ${p.body.map(([t, x]) => (t === 'h2' ? `<h2 class="h2" data-reveal>${x}</h2>` : `<p data-reveal>${x}</p>`)).join('\n  ')}
  <div class="byline" data-reveal><img src="${I('dr-portrait')}" alt="${SITE.doctor}" width="64" height="64" loading="lazy"><div><strong>${SITE.doctor}</strong><span>${SITE.creds}</span></div><span class="sig">Manish Patel</span></div>
  ${svc ? `<div class="note" data-reveal>Related treatment: <a href="/services/${svc.slug}/">${svc.name} in Goa</a></div>` : ''}
  <p class="note" data-reveal>This article is general education, not medical advice. Please consult a qualified doctor about your situation.</p>
</div></article>
<section class="sec sec--sand"><div class="wrap"><div class="sec__head"><h2 class="display display--l" data-split>Keep <em>reading</em>.</h2></div><div class="posts">${more.map(postCard).join('')}</div></div></section>`;
    write(u, layout({ path: u, title: p.title.length > 46 ? p.title : `${p.title} | Dr. Manish Patel`, desc: p.desc.length < 120 ? `${p.desc} By Dr. Manish Patel, plastic surgeon in Goa.` : p.desc, body: b, ogType: 'article', ogImg: POST_IMG[p.slug], schema: [crumbSchema([['Home', '/'], ['Journal', '/blog/'], [p.title, u]]), { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.desc, datePublished: p.date, dateModified: p.date, mainEntityOfPage: SITE.domain + u, author: { '@id': docId }, publisher: { '@id': orgId }, image: SITE.domain + I(POST_IMG[p.slug]), inLanguage: 'en-IN', reviewedBy: { '@id': docId } }] }));
  }
}

// ================================================================== FAQ
{
  const body = `${pgHero({ eyebrow: 'FAQ', title: 'Frequently asked<br><em>questions</em>.', lead: 'Quick answers about Dr. Patel, our clinics and treatments.', crumbs: [['Home', '/'], ['FAQ', '/faq/']] })}${faqBlock(FAQS, 'Everything you may <em>want to know</em>.')}`;
  write('/faq/', layout({ path: '/faq/', title: 'FAQ | Plastic Surgery in Goa, Dr. Manish Patel', desc: 'Answers about Dr. Manish Patel’s qualifications, clinic locations in Margao and Panaji, procedures offered, safety, costs and booking.', body, schema: [faqSchema(FAQS), crumbSchema([['Home', '/'], ['FAQ', '/faq/']])] }));
}

// ================================================================== CONTACT
{
  const body = `${pgHero({ eyebrow: 'Contact', title: 'Contact and<br><em>appointments</em>.', lead: 'Tell the clinic what you would like to discuss. The team replies by phone or WhatsApp to arrange a time.', crumbs: [['Home', '/'], ['Contact', '/contact/']], image: 'dr-portrait', alt: 'Dr. Manish Patel' })}
<section class="sec"><div class="wrap contact">
  <div class="form" data-reveal>${bookForm('c', true)}</div>
  <div class="contact__side" data-stagger>${SITE.locations.map((l, i) => `<article class="loc"><div class="loc__img">${img(i ? 'goa-2' : 'goa-1', `Goa, near our ${l.city} clinic`, { w: 1200, h: 800 })}<span class="loc__city">${l.city}</span></div><div class="loc__b"><address>${l.street}<br>${l.locality}, ${l.region} ${l.postal}</address><div class="loc__a"><a class="btn btn--sm" href="tel:${l.phone}"><span>Call ${l.phoneShow}</span></a><a class="link" href="/locations/${l.slug}/">Directions ${ico.arrow}</a></div></div></article>`).join('')}</div>
</div></section>`;
  write('/contact/', layout({ path: '/contact/', title: 'Contact & Appointments | Dr. Manish Patel, Margao & Panaji', desc: 'Addresses, phone numbers and an enquiry form for Dr. Manish Patel’s clinics in Margao and Panaji, Goa. Call, WhatsApp or send the form.', body, ogImg: 'dr-portrait', schema: [crumbSchema([['Home', '/'], ['Contact', '/contact/']]), { '@context': 'https://schema.org', '@type': 'ContactPage', url: `${SITE.domain}/contact/` }] }));
}

// ================================================================== LOCATIONS
for (const [k, l] of SITE.locations.entries()) {
  const u = `/locations/${l.slug}/`;
  const q = encodeURIComponent(`${SITE.name} ${l.street} ${l.locality} ${l.postal}`);
  const body = `${pgHero({ eyebrow: `Clinic · ${l.city}, Goa`, title: `Plastic surgeon<br>in <em>${l.city}</em>`, lead: `${SITE.doctor} consults at the ${l.city} clinic. Please call ahead for an appointment.`, crumbs: [['Home', '/'], [l.city, u]], image: k ? 'goa-2' : 'goa-1', alt: `Goa near ${l.city}` })}
<section class="sec"><div class="wrap contact">
  <div data-reveal><article class="loc loc--big"><div class="loc__b"><span class="loc__ic">${ico.pin}</span><h2 class="h2">${l.name}</h2><address>${l.street}<br>${l.locality}, ${l.region} ${l.postal}</address><div class="loc__a"><a class="btn" href="tel:${l.phone}"><span>Call ${l.phoneShow}</span></a><a class="btn btn--line-d" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener"><span>Google Maps</span></a></div></div></article>
  <h3 class="h3">Treatments available</h3><ul class="ticks ticks--2">${SERVICES.map((s) => `<li><a href="/services/${s.slug}/">${s.name}</a></li>`).join('')}</ul></div>
  <div class="map" data-reveal><iframe title="Map of ${l.name}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${q}&output=embed"></iframe></div>
</div></section>`;
  write(u, layout({ path: u, title: `Plastic Surgeon in ${l.city}, Goa | Dr. Manish Patel`, desc: `Visit Dr. Manish Patel’s ${l.city} clinic in Goa for cosmetic and plastic surgery, hair transplant, laser and skin treatments. Address, phone and directions.`, body, schema: [{ '@context': 'https://schema.org', ...locSchema(l) }, crumbSchema([['Home', '/'], [l.city, u]])] }));
}

// ================================================================== PRIVACY
{
  const body = `${pgHero({ eyebrow: 'Privacy', title: 'Privacy<br><em>notice</em>.', lead: 'How the clinic handles the details you send through this website.', crumbs: [['Home', '/'], ['Privacy', '/privacy/']] })}
<section class="sec sec--tight"><div class="wrap prose">
  <h2 class="h2">What this website collects</h2>
  <p>The enquiry form asks for your name, phone number, preferred clinic, treatment of interest and an optional message. The website itself does not store these details. When you press “Continue on WhatsApp”, they are placed in a WhatsApp message to the clinic you chose, which you can review before sending.</p>
  <h2 class="h2">Why the clinic uses them</h2>
  <p>Only to reply to your enquiry and arrange an appointment. They are not sold or shared for marketing.</p>
  <h2 class="h2">Your choices</h2>
  <p>You can ask the clinic to see, correct or delete the details you sent, or withdraw your consent, by calling ${SITE.locations.map((l) => `${l.city} on <a href="tel:${l.phone}">${l.phoneShow}</a>`).join(' or ')}.</p>
  <h2 class="h2">Patient images</h2>
  <p>This website does not publish patient photographs, videos, testimonials or medical details.</p>
  <h2 class="h2">This website</h2>
  <p>The site sets no advertising or tracking cookies. Embedded maps and videos are loaded from Google and the clinic’s own server when you open them.</p>
  <p class="note">This notice follows the Digital Personal Data Protection Act, 2023. Last updated ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
</div></section>`;
  write('/privacy/', layout({ path: '/privacy/', title: 'Privacy Notice | Patel Cosmetic & Plastic Surgery Center', desc: 'How Patel Cosmetic & Plastic Surgery Center handles the details you send through this website’s enquiry form, and how to ask for them to be corrected or deleted.', body, schema: [crumbSchema([['Home', '/'], ['Privacy', '/privacy/']])] }));
}

// ================================================================== 404
fs.writeFileSync(path.join(ROOT, '404.html'), layout({ path: '/404', title: 'Page not found | Dr. Manish Patel', desc: 'Page not found.', noindex: true, body: `${pgHero({ eyebrow: '404', title: 'This page has<br><em>moved on</em>.', lead: 'Try the treatments list, or contact the clinic.' })}<section class="sec sec--tight"><div class="wrap">${cta()}</div></section>` }));

// ================================================================== sitemap / robots / llms
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE.domain}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : u.startsWith('/services/') ? '0.9' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /_src/\n\n# AI / answer-engine crawlers are welcome\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\nUser-agent: Applebot-Extended\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`);
fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# ${SITE.name}\n\n> Cosmetic and plastic surgery clinic in Goa, India, led by ${SITE.doctor} (${SITE.creds}), with ${SITE.experience} of experience. Clinics in Margao and Panaji.\n\n## Key facts\n- Surgeon: ${SITE.doctor}, plastic surgeon. Qualifications: MBBS, MS (General Surgery), MCh (Plastic Surgery).\n- Registration: ${SITE.reg.council}, ${regNo(SITE.reg.no)}.\n- Positions and teaching: Head, Department of Cosmetic Surgery, Wockhardt Institute of Aesthetics (2011); faculty at IAAPS AESURG 2022; faculty and trainer for Botox and fillers at the 7th FADS World Congress 2023, South Goa.\n- Content policy: following the National Medical Commission's Guidelines on Ethical Advertising and Public Communication (6 October 2026), the site publishes no patient testimonials, reviews or before-and-after images. Each treatment page lists recovery, possible risks and who the procedure may not suit.\n${SITE.locations.map((l) => `- ${l.name}: ${l.street}, ${l.locality}, ${l.region} ${l.postal}. Phone ${l.phoneShow}.`).join('\n')}\n- Treatments: ${SERVICES.map((s) => s.name).join(', ')}.\n\n## Pages\n- [Home](${SITE.domain}/)\n- [About Dr. Patel](${SITE.domain}/about/)\n- [Treatments](${SITE.domain}/services/)\n${SERVICES.map((s) => `- [${s.name}](${SITE.domain}/services/${s.slug}/): ${s.tag}`).join('\n')}\n- [Journal](${SITE.domain}/blog/)\n- [FAQ](${SITE.domain}/faq/)\n- [Contact](${SITE.domain}/contact/)\n- [Privacy](${SITE.domain}/privacy/)\n\n## Quick answers\n${FAQS.map(([q, ans]) => `### ${q}\n${ans}`).join('\n\n')}\n\n## Social\n- Instagram (Dr. Manish Patel): https://www.instagram.com/drmanishp/\n- Instagram (clinic): ${SITE.social.instagram}\n- Facebook: ${SITE.social.facebook}\n- YouTube: ${SITE.social.youtube}\n`);
fs.writeFileSync(path.join(ROOT, 'assets/img/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0F2A47"/><path d="M14 50C14 28 28 14 50 14c0 22-14 36-36 36z" fill="#6FBF7A"/><path d="M14 50L36 28" stroke="#F7F4EE" stroke-width="3"/></svg>`);
console.log('Built', urls.length, 'pages');
