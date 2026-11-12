// Single source of truth for all site content. Edit here, then run: node _src/build.mjs
export const SITE = {
  name: 'Patel Cosmetic & Plastic Surgery Center',
  short: 'Patel Cosmetic Surgery Center',
  domain: 'https://patelcosmeticsurgeryclinic.com',
  doctor: 'Dr. Manish Patel',
  creds: 'MBBS · MS (General Surgery) · MCh (Plastic Surgery)',
  experience: '30+ years',
  // NMC Guidelines on Ethical Advertising (6 Oct 2026), cl. 3.2 Expl. III: every doctor's page must show the
  // State/National Medical Register number. Fill in from the registration certificate; until then the site shows "awaiting".
  reg: { council: 'Goa Medical Council', no: '' },
  tagline: 'Cosmetic & plastic surgery in Goa',
  social: {
    instagram: 'https://www.instagram.com/patelcosmeticsurgerycenter/',
    facebook: 'https://www.facebook.com/patelcosmetics/',
    youtube: 'https://www.youtube.com/channel/UCtR5g2NzDEiz4brCLceq9BQ',
    whatsapp: 'https://wa.link/6nrqyg',
  },
  locations: [
    {
      slug: 'margao',
      city: 'Margao',
      name: 'Margao Clinic',
      street: 'Near B101, CD Signature, Bolshe Cir, Borda',
      locality: 'Margao',
      region: 'Goa',
      postal: '403602',
      phone: '+919284562451',
      phoneShow: '+91 92845 62451',
    },
    {
      slug: 'panaji',
      city: 'Panaji',
      name: 'Panaji Clinic',
      street: '1st Floor, 112-A, Gerra Imperium Star, Patto, next to State Central Library',
      locality: 'Panaji',
      region: 'Goa',
      postal: '403001',
      phone: '+919730856787',
      phoneShow: '+91 97308 56787',
    },
  ],
};

// ------------------------------------------------------------------ SERVICES
export const SERVICES = [
  {
    slug: 'hair-transplant-goa',
    name: 'Hair Transplant',
    cat: 'Surgical',
    tag: 'FUE & FUT hair restoration',
    answer:
      'A hair transplant moves healthy hair follicles from a donor area, usually the back of the scalp, to thinning or bald areas. Dr. Patel performs both FUE (individual follicle extraction) and FUT (strip method) and recommends the technique after assessing your hair loss pattern, donor supply and goals.',
    who: [
      'Pattern hair loss that has stabilised and has not responded well to medication',
      'Receding hairline or thinning crown with a healthy donor area',
      'Scarring or patchy loss from injury, burns or previous surgery',
    ],
    details: [
      ['FUE', 'Follicles are extracted one by one, leaving tiny dot-like marks that are easy to hide in short hair.'],
      ['FUT', 'A thin strip is taken from the donor area and divided into grafts, which can yield a larger number of grafts in a single session.'],
      ['Planning', 'Hairline design, graft count and density are agreed with you before surgery, so the plan suits your age, hair pattern and donor supply.'],
    ],
    faqs: [
      ['What is the difference between FUE and FUT?', 'FUE extracts follicles individually with a small punch and leaves no linear scar. FUT removes a thin strip of scalp, which leaves a fine linear scar but can allow more grafts in one sitting. The right choice depends on your donor hair, hairstyle preference and the extent of loss.'],
      ['When do transplanted hairs start to grow?', 'Transplanted hairs usually shed in the first weeks and new growth begins over the following months, with gradual improvement continuing through the first year. Timelines vary from person to person.'],
    ],
  },
  {
    slug: 'rhinoplasty-goa',
    name: 'Rhinoplasty',
    cat: 'Surgical',
    tag: 'Nose reshaping, functional & aesthetic',
    answer:
      'Rhinoplasty reshapes the nose to improve its appearance, its breathing function, or both. It is planned around facial balance, so the nose suits your face rather than looking over-corrected.',
    who: [
      'A bump, wide bridge, drooping tip or asymmetry that bothers you',
      'Nasal injury, or a deviated septum that affects breathing',
      'Adults whose facial growth is complete',
    ],
    details: [
      ['Assessment', 'Facial proportions, skin thickness, nasal structure and breathing are examined together.'],
      ['Surgery', 'Performed under anaesthesia; the technique (open or closed) is chosen for your anatomy and goals.'],
      ['Healing', 'Swelling settles gradually. Final refinement can take many months, and Dr. Patel reviews you through the process.'],
    ],
    faqs: [
      ['Can rhinoplasty also improve breathing?', 'Yes. When a deviated septum or internal narrowing is present, the airway can be corrected in the same operation as the cosmetic changes. This is assessed at consultation.'],
      ['How long until I see the final shape?', 'Most visible swelling settles in the first few weeks, but fine swelling, especially at the nasal tip, can take many months to resolve fully.'],
    ],
  },
  {
    slug: 'liposuction-goa',
    name: 'Liposuction',
    cat: 'Surgical',
    tag: 'Body contouring of stubborn fat',
    answer:
      'Liposuction removes localised pockets of fat that persist despite diet and exercise, refining body contour. It is a contouring procedure, not a weight-loss treatment, and works best when your weight is stable and skin has reasonable elasticity.',
    who: [
      'Localised fat on abdomen, flanks, thighs, arms, chin or back',
      'Stable weight close to your ideal',
      'Good skin tone and realistic expectations',
    ],
    details: [
      ['Mapping', 'Treatment areas are marked and discussed with you in detail before surgery.'],
      ['Procedure', 'Fat is gently removed through small incisions using cannulas, with attention to a smooth, even contour.'],
      ['Aftercare', 'Compression garments and a graded return to activity are part of recovery.'],
    ],
    faqs: [
      ['Is liposuction a weight-loss method?', 'No. It reshapes specific areas by removing fat cells there. Maintaining a stable weight afterwards helps keep the result.'],
      ['Can liposuction be combined with other procedures?', 'Often it can, for example with a tummy tuck, when it is safe to do so. Dr. Patel will advise at your consultation.'],
    ],
  },
  {
    slug: 'breast-augmentation-goa',
    name: 'Breast Augmentation',
    cat: 'Surgical',
    tag: 'Natural-looking enhancement',
    answer:
      'Breast augmentation increases breast size and improves shape using implants. Implant size, profile and placement are selected to match your frame and your goal, aiming for a proportionate, natural look.',
    who: [
      'Small or underdeveloped breasts',
      'Volume loss after pregnancy or weight change',
      'Asymmetry between the two breasts',
    ],
    details: [
      ['Sizing', 'Chest measurements and your own preferences guide implant volume and profile.'],
      ['Surgery', 'Implants are placed through a discreet incision, in a position chosen for your anatomy.'],
      ['Follow-up', 'Regular review visits monitor healing and implant position.'],
    ],
    faqs: [
      ['How do I choose implant size?', 'Size is chosen using your chest dimensions, tissue coverage and the look you want. Trying sizers at the consultation helps you visualise the options.'],
      ['Will I need follow-up care?', 'Yes. Post-operative visits are scheduled, and ongoing check-ups are advised over the long term.'],
    ],
  },
  {
    slug: 'gynecomastia-surgery-goa',
    name: 'Gynecomastia Surgery',
    cat: 'Surgical',
    tag: 'Male breast reduction',
    answer:
      'Gynecomastia is enlargement of male breast tissue. Surgery removes excess glandular tissue and, where needed, fat, to create a flatter and firmer male chest contour.',
    who: [
      'Persistent breast enlargement in men and teenage boys past puberty',
      'Cases not resolving with weight management or after medical review',
      'Those self-conscious in clothing or at the beach',
    ],
    details: [
      ['Evaluation', 'We check whether the enlargement is glandular, fatty or both, and rule out other causes where needed.'],
      ['Technique', 'Liposuction, direct excision, or a combination, depending on the tissue involved.'],
      ['Recovery', 'A compression garment supports healing; activity is resumed in stages.'],
    ],
    faqs: [
      ['Does gynecomastia go away on its own?', 'In some adolescents it settles over time. When it persists, surgery is the dependable option to remove the tissue.'],
      ['Will there be visible scars?', 'Incisions are small and placed discreetly, and usually fade well with time and good care.'],
    ],
  },
  {
    slug: 'facelift-goa',
    name: 'Facelift',
    cat: 'Surgical',
    tag: 'Lifting & refreshing the face and neck',
    answer:
      'A facelift tightens deeper facial tissues and removes excess skin to soften jowls, deep folds and loose neck skin. The aim is a rested, natural look, not a pulled or “operated” one.',
    who: [
      'Sagging cheeks, jowls or a loose neck',
      'Deep folds that fillers no longer address',
      'Good overall health and realistic expectations',
    ],
    details: [
      ['Consultation', 'Skin quality, bone structure and the ageing pattern of your face are assessed.'],
      ['Procedure', 'Underlying tissues are repositioned and excess skin removed, with incisions concealed along natural lines.'],
      ['Combination', 'Can be paired with eyelid surgery or skin resurfacing for a harmonious result.'],
    ],
    faqs: [
      ['How long do facelift results last?', 'A facelift lifts tissues that have descended, but the face keeps ageing afterwards. How long the change lasts varies with age, skin quality, sun exposure and smoking.'],
      ['Facelift or non-surgical treatments?', 'Mild laxity can often be helped with injectables or lasers. Significant sagging usually needs surgery. We will tell you honestly which suits you.'],
    ],
  },
  {
    slug: 'tummy-tuck-goa',
    name: 'Tummy Tuck (Abdominoplasty)',
    cat: 'Surgical',
    tag: 'Flatter, firmer abdomen',
    answer:
      'Abdominoplasty removes excess abdominal skin and fat and tightens separated abdominal muscles to restore a flatter, firmer midsection, commonly after pregnancy or major weight loss.',
    who: [
      'Loose abdominal skin after weight loss or pregnancy',
      'Separated abdominal muscles (diastasis recti)',
      'Stable weight and no plans for future pregnancies',
    ],
    details: [
      ['Planning', 'Skin laxity, muscle separation and scar placement are assessed and explained.'],
      ['Surgery', 'Muscles are tightened, excess skin removed and the contour refined, often with limited liposuction.'],
      ['Recovery', 'Support garments and a gradual return to normal activity.'],
    ],
    faqs: [
      ['Is a tummy tuck the same as liposuction?', 'No. Liposuction removes fat only. A tummy tuck also removes loose skin and repairs muscles, so it addresses problems liposuction cannot.'],
      ['Where will the scar be?', 'Typically low on the abdomen, designed to sit below most underwear and swimwear lines.'],
    ],
  },
  {
    slug: 'botox-fillers-goa',
    name: 'Botox & Fillers',
    cat: 'Non-surgical',
    tag: 'Wrinkle softening & facial volume',
    answer:
      'Botox relaxes the muscles that cause frown lines, forehead lines and crow’s feet, while dermal fillers restore lost volume and smooth folds. Both are quick, non-surgical treatments performed in-clinic.',
    who: [
      'Early expression lines on the forehead, between brows and around the eyes',
      'Volume loss in cheeks, lips or nasolabial folds',
      'Anyone wanting subtle refreshment without surgery',
    ],
    details: [
      ['Botox', 'Targeted injections reduce muscle movement; effects appear over days and last for a few months.'],
      ['Fillers', 'Hyaluronic acid based gels restore contour and hydration where you need it.'],
      ['Approach', 'Conservative dosing to keep expression natural; treatments are tailored to your face.'],
    ],
    faqs: [
      ['Will I look “frozen”?', 'The aim is to soften lines while keeping expression. How you respond varies from person to person, and the effect wears off over a few months.'],
      ['How often are treatments repeated?', 'Effects are temporary, so maintenance treatments are scheduled at intervals suited to the product and your response.'],
    ],
  },
  {
    slug: 'laser-hair-removal-goa',
    name: 'Laser Hair Removal',
    cat: 'Non-surgical',
    tag: 'Long-term hair reduction',
    answer:
      'Laser hair removal uses light energy to damage hair follicles and reduce hair growth over a course of sessions, leaving skin smoother. Most areas need multiple sessions spaced several weeks apart.',
    who: [
      'Unwanted facial or body hair',
      'Frequent shaving, waxing, ingrown hairs or razor irritation',
      'Those wanting a lower-maintenance routine',
    ],
    details: [
      ['Suitability', 'Skin and hair type are assessed so the right laser settings are used.'],
      ['Course', 'A series of sessions treats follicles in their active growth phase.'],
      ['Care', 'Sun protection and a simple aftercare routine support results and skin comfort.'],
    ],
    faqs: [
      ['How many sessions will I need?', 'It depends on the area, hair thickness and hormones. A course of several sessions is typical, and your plan is set at the first visit.'],
      ['Is it painful?', 'Most people describe a snapping or warm sensation. Cooling is used for comfort.'],
    ],
  },
  {
    slug: 'acne-scar-treatment-goa',
    name: 'Acne Scar Treatment',
    cat: 'Skin',
    tag: 'Fractional CO2 laser & resurfacing',
    answer:
      'Fractional CO2 laser creates controlled micro-channels in the skin to stimulate collagen and smooth acne scars. A course of treatments gradually improves the texture and visibility of scars.',
    who: [
      'Pitted or rolling acne scars',
      'Uneven skin texture after active acne has settled',
      'Those who want improvement without major surgery',
    ],
    details: [
      ['Assessment', 'Scar type, skin tone and downtime preference guide the plan.'],
      ['Treatment', 'Fractional laser sessions, sometimes combined with other scar-revision methods.'],
      ['Healing', 'Redness and flaking are expected for a short period; strict sun protection is advised.'],
    ],
    faqs: [
      ['Will laser remove my acne scars completely?', 'Laser can significantly improve scars, though complete removal is not realistic. Improvement is gradual across a course of sessions.'],
      ['Is there downtime?', 'There is typically some redness and peeling for a few days. We explain what to expect for your skin type before you begin.'],
    ],
  },
  {
    slug: 'skin-rejuvenation-pigmentation-goa',
    name: 'Skin Rejuvenation & Pigmentation',
    cat: 'Skin',
    tag: 'Anti-aging, brightening & scar revision',
    answer:
      'Skin rejuvenation combines lasers, peels and medical-grade skincare to treat uneven tone, pigmentation, dullness, fine lines and scars, helping the skin look clearer and more even.',
    who: [
      'Pigmentation, dark patches or dull, uneven skin tone',
      'Early signs of ageing such as fine lines and loss of glow',
      'Marks left by injuries, surgery or acne',
    ],
    details: [
      ['Diagnosis', 'The cause of pigmentation is identified first, since the right treatment depends on it.'],
      ['Plan', 'A tailored programme of in-clinic treatments and home care.'],
      ['Protection', 'Daily sunscreen is essential to maintain results.'],
    ],
    faqs: [
      ['How is a skin brightening treatment chosen?', 'It depends on the type of pigmentation and your skin. We examine your skin before suggesting any treatment.'],
      ['How soon will I see a change?', 'Some improvement can be noticed after the first sessions, with fuller results over a course. Timelines differ by concern.'],
    ],
  },
];

// ------------------------------------------------------------------ NO TESTIMONIALS
// NMC Guidelines on Ethical Advertising (6 Oct 2026), cl. 3.2 Expl. V and 8.1(xi): a doctor may not request or share
// patient testimonials, reviews or endorsements, and cl. 8.1(v) bars before-and-after results used for promotion.
// Patient consent does not change this. Do not add reviews, star ratings, patient videos or result photos to this site.

// ------------------------------------------------------------------ HOME / GLOBAL FAQ (answer-first for AEO)
export const FAQS = [
  ['How can I check a plastic surgeon’s qualifications in India?', 'Ask for the surgeon’s degrees and medical council registration number, then look the registration up on the National Medical Commission’s Indian Medical Register or the State Medical Council’s register. In India the specialist degree in plastic surgery is MCh (Plastic Surgery) or DNB (Plastic Surgery).'],
  ['What qualifications does Dr. Manish Patel have?', 'Dr. Manish Patel holds MBBS, MS (General Surgery) and MCh (Plastic Surgery). He is registered with the Goa Medical Council and has practised for more than 30 years.'],
  ['Where are the clinics located?', 'There are two clinics in Goa: Margao (near B101, CD Signature, Bolshe Cir, Borda, 403602) and Panaji (1st Floor, 112-A, Gerra Imperium Star, Patto, next to State Central Library, 403001).'],
  ['Which procedures do you offer?', 'Surgical procedures include hair transplant (FUE and FUT), rhinoplasty, liposuction, breast augmentation, gynecomastia surgery, facelift and tummy tuck. Non-surgical and skin treatments include Botox, fillers, laser hair removal, acne scar treatment and skin rejuvenation.'],
  ['How much do treatments cost?', 'Cost depends on the procedure, its extent and your individual plan, so a fair figure is only possible after an examination. You receive a written estimate after your consultation, with no obligation to go ahead.'],
  ['Why are there no patient reviews or before-and-after photos on this website?', 'The National Medical Commission’s guidelines on ethical advertising do not allow doctors to publish patient testimonials, reviews or before-and-after results to promote their practice. At your consultation Dr. Patel explains what a procedure can and cannot change for you, including its risks.'],
  ['How do I make an appointment?', 'Call the Margao clinic on +91 92845 62451 or the Panaji clinic on +91 97308 56787, message the clinic on WhatsApp, or send the enquiry form on the contact page.'],
  ['Is plastic surgery safe?', 'Every surgical procedure carries risk, including bleeding, infection, scarring, anaesthetic complications and a result that differs from what you hoped for. Risk is reduced, not removed, by a full assessment, an equipped facility and careful aftercare. Each procedure’s specific risks are discussed with you before you decide.'],
];

// ------------------------------------------------------------------ RISKS, RECOVERY, SUITABILITY (shown on every treatment page)
// General patient information. Dr. Patel should review this list before launch.
export const RISKS = {
  'hair-transplant-goa': {
    recovery: 'Most people return to desk work within a few days. Scabs settle in about two weeks; transplanted hairs usually shed first, and new growth shows over several months.',
    risks: ['Swelling of the forehead and temporary numbness of the scalp', 'Infection or folliculitis (inflamed follicles)', 'Visible donor scarring: fine dots with FUE, a linear scar with FUT', 'Temporary shedding of existing hair near the grafts', 'Lower graft growth or density than expected'],
    notFor: ['Hair loss that is still progressing rapidly', 'A donor area too thin to supply grafts', 'Some causes of hair loss, such as untreated alopecia areata'],
  },
  'rhinoplasty-goa': {
    recovery: 'A splint is usually worn for about a week. Bruising settles over two to three weeks, while swelling, especially at the tip, takes many months to resolve fully.',
    risks: ['Bleeding and infection', 'Breathing difficulty or a blocked feeling', 'Asymmetry or an unsatisfactory shape', 'Altered sensation of the nose', 'A second (revision) operation in some cases'],
    notFor: ['Faces that are still growing', 'Expectations of copying someone else’s nose', 'Some medical conditions that raise surgical risk'],
  },
  'liposuction-goa': {
    recovery: 'A compression garment is worn for several weeks. Light activity resumes within days; bruising and swelling settle over weeks to months.',
    risks: ['Contour irregularities, dents or asymmetry', 'Fluid collection (seroma) or bleeding', 'Changes in skin sensation', 'Infection', 'Rare but serious: blood clots, fat embolism, injury to deeper structures'],
    notFor: ['Weight loss: it is not a substitute for it', 'Loose skin with poor elasticity', 'Unstable weight or significant medical conditions'],
  },
  'breast-augmentation-goa': {
    recovery: 'Most people need about a week away from work and several weeks before heavy lifting or exercise. A supportive bra is worn as advised.',
    risks: ['Capsular contracture (hardening around the implant)', 'Implant rupture, rippling or displacement', 'Changes in nipple or breast sensation', 'Infection and bleeding', 'Further surgery over a lifetime; implants are not permanent devices'],
    notFor: ['Pregnancy or breastfeeding', 'Active infection or untreated breast disease', 'Unrealistic expectations of size or shape'],
  },
  'gynecomastia-surgery-goa': {
    recovery: 'A compression vest is worn for several weeks. Desk work is usually possible within a week; exercise resumes gradually.',
    risks: ['Contour irregularity or residual tissue', 'Fluid collection (seroma) or bleeding', 'Changes in nipple sensation', 'Visible scars', 'Infection'],
    notFor: ['Breast enlargement from a medicine or condition that has not been assessed', 'Teenagers whose tissue may still settle on its own', 'Ongoing anabolic steroid use'],
  },
  'facelift-goa': {
    recovery: 'Bruising and swelling are greatest in the first two weeks. Most people prefer about two weeks away from social commitments; final settling takes months.',
    risks: ['Bleeding under the skin (haematoma)', 'Temporary or, rarely, lasting weakness of facial nerve branches', 'Scarring around the ears', 'Numbness of the cheeks and ears', 'Hair loss near the incisions'],
    notFor: ['Smokers who cannot stop before and after surgery', 'Uncontrolled blood pressure or bleeding disorders', 'Concerns that skin treatments alone can address'],
  },
  'tummy-tuck-goa': {
    recovery: 'Expect one to two weeks off work and about six weeks before strenuous activity. A compression garment is worn and you may walk slightly bent at first.',
    risks: ['A long scar across the lower abdomen', 'Fluid collection (seroma) and wound-healing problems', 'Numbness of the lower abdomen', 'Infection and bleeding', 'Rare but serious: blood clots in the legs or lungs'],
    notFor: ['Plans for future pregnancy', 'Weight that is still changing', 'Smoking that cannot be stopped'],
  },
  'botox-fillers-goa': {
    recovery: 'Most people return to normal activities the same day. Small bruises or swelling at injection sites settle within days.',
    risks: ['Bruising, swelling or tenderness', 'Temporary drooping of an eyelid or brow (Botox)', 'Lumps or asymmetry (fillers)', 'Rare but serious with fillers: a blocked blood vessel, which can damage skin or vision', 'Effects are temporary and wear off over months'],
    notFor: ['Pregnancy or breastfeeding', 'Infection at the treatment site', 'Certain neuromuscular conditions (Botox)'],
  },
  'laser-hair-removal-goa': {
    recovery: 'No downtime is usually needed. Mild redness may last a few hours. Sun protection is needed between sessions.',
    risks: ['Redness, swelling or discomfort', 'Lighter or darker patches of skin, usually temporary', 'Burns or blisters, uncommon', 'Hair reduction, not complete removal; some regrowth is common'],
    notFor: ['A recent tan', 'Grey, white or very fine light hair, which responds poorly', 'Some skin conditions and medicines that make skin light-sensitive'],
  },
  'acne-scar-treatment-goa': {
    recovery: 'Redness, a sunburn-like feeling and peeling last several days. Strict sun protection is needed while the skin heals.',
    risks: ['Prolonged redness', 'Darkening of the skin (post-inflammatory hyperpigmentation), more likely in darker skin', 'Infection or a flare of cold sores', 'Scars are improved, not erased'],
    notFor: ['Active acne', 'Recent isotretinoin use', 'A tendency to keloid scars'],
  },
  'skin-rejuvenation-pigmentation-goa': {
    recovery: 'Depends on the treatment: from no downtime for gentle peels to several days of redness and peeling after stronger peels or lasers.',
    risks: ['Irritation, redness or peeling', 'Pigmentation that worsens or returns, especially melasma', 'Sensitivity to sun', 'Results depend on continued sun protection and skincare'],
    notFor: ['Undiagnosed pigmented spots, which need examination first', 'Active skin infection', 'Pregnancy, for some treatments'],
  },
};


// ------------------------------------------------------------------ BLOG
export const POSTS = [
  {
    slug: 'fue-vs-fut-hair-transplant-goa',
    title: 'FUE vs FUT Hair Transplant: Which Is Right for You?',
    date: '2026-10-08',
    read: '5 min',
    cat: 'Hair',
    desc: 'FUE and FUT are the two main hair transplant techniques. Here is how they differ in scarring, graft numbers and recovery, and how to choose.',
    answer: 'FUE extracts follicles one at a time and leaves tiny, scattered marks. FUT removes a thin strip of scalp and leaves a fine linear scar. Neither is universally better; the right choice depends on your donor hair, hairstyle and goals.',
    body: [
      ['h2', 'How the two techniques work'],
      ['p', 'Both methods move hair that is genetically resistant to balding, usually from the back and sides of the scalp, to thinning areas. The difference lies in how the grafts are harvested.'],
      ['p', 'With FUE (Follicular Unit Extraction), follicles are removed individually using a very small punch. With FUT (Follicular Unit Transplantation), a narrow strip is removed from the donor area and dissected into grafts under magnification.'],
      ['h2', 'Scarring and hairstyle'],
      ['p', 'FUE leaves small dot-like marks that are barely visible even in short hair. FUT leaves a thin linear scar, which is covered by surrounding hair unless it is cut very short. If you like a closely cropped style, discuss this openly at your consultation.'],
      ['h2', 'Number of grafts'],
      ['p', 'FUT can often provide a larger number of grafts in a single session, which may suit extensive hair loss. FUE is flexible and can be repeated, and is valued for body-hair or limited donor situations when appropriate.'],
      ['h2', 'Recovery'],
      ['p', 'Healing differs between techniques and from person to person. Dr. Patel explains aftercare, washing instructions and activity restrictions in detail so you know exactly what to expect.'],
      ['h2', 'Choosing between them'],
      ['p', 'A good plan starts with a diagnosis of why you are losing hair, a look at your donor density and a conversation about expectations. The technique is chosen to suit your donor hair and goals, and we will tell you if a transplant is not the right step yet.'],
    ],
    service: 'hair-transplant-goa',
  },
  {
    slug: 'rhinoplasty-recovery-what-to-expect',
    title: 'Rhinoplasty Recovery: What to Expect Week by Week',
    date: '2026-10-22',
    read: '4 min',
    cat: 'Face',
    desc: 'A practical guide to swelling, bruising, splints and when you can return to normal life after rhinoplasty.',
    answer: 'After rhinoplasty, most bruising and swelling improve over the first few weeks, while subtle swelling, especially at the tip of the nose, can take many months to fully settle. Your surgeon will give you personalised guidance.',
    body: [
      ['h2', 'The first days'],
      ['p', 'Expect a splint on the nose, swelling around the eyes and a blocked feeling in the nose. Resting with your head elevated and following your surgeon’s instructions helps healing.'],
      ['h2', 'The first few weeks'],
      ['p', 'Bruising fades and the splint is removed at your review visit. Many people return to desk work in that time, but avoid strenuous activity and anything that risks a knock to the nose until cleared.'],
      ['h2', 'Months of refinement'],
      ['p', 'The nose continues to refine as fine swelling resolves. This is normal, and it is why the final result is judged months after surgery, not weeks.'],
      ['h2', 'Helping your recovery'],
      ['p', 'Attend every follow-up, avoid smoking, protect the nose from sun and impact, and call the clinic if anything worries you. Good communication with your surgeon makes recovery easier.'],
    ],
    service: 'rhinoplasty-goa',
  },
  {
    slug: 'how-to-choose-a-plastic-surgeon-in-goa',
    title: 'How to Choose a Plastic Surgeon in Goa: 6 Things to Check',
    date: '2026-11-03',
    read: '5 min',
    cat: 'Guidance',
    desc: 'Qualifications, experience, facilities and honesty: a simple checklist for choosing a plastic surgeon you can trust.',
    answer: 'Check that your surgeon holds a recognised plastic surgery qualification such as MCh (Plastic Surgery), operates in an accredited facility, shows realistic expectations and encourages questions. Be cautious of guarantees and pressure.',
    body: [
      ['h2', '1. Verify qualifications'],
      ['p', 'In India, look for MCh (Plastic Surgery) or an equivalent recognised qualification, and confirm registration with the medical council. Dr. Manish Patel holds MBBS, MS (General Surgery) and MCh (Plastic Surgery).'],
      ['h2', '2. Ask about experience in your procedure'],
      ['p', 'Ask how often the surgeon performs the specific operation you want and what the common risks and outcomes are.'],
      ['h2', '3. Look at the facility'],
      ['p', 'Surgery should be performed in a properly equipped, hygienic setting with appropriate anaesthesia support.'],
      ['h2', '4. Expect honest advice'],
      ['p', 'A good surgeon tells you what is realistic, suggests alternatives, and will sometimes advise not operating at all.'],
      ['h2', '5. Beware of guarantees and pressure'],
      ['p', 'No ethical surgeon can promise a specific result. Be wary of heavy discounts, time-limited offers or pressure to decide.'],
      ['h2', '6. Plan follow-up'],
      ['p', 'Ask what aftercare and review visits are included, and how to reach the clinic if you have concerns.'],
    ],
    service: null,
  },
  {
    slug: 'acne-scars-fractional-co2-laser',
    title: 'Fractional CO2 Laser for Acne Scars: How It Works',
    date: '2026-11-10',
    read: '4 min',
    cat: 'Skin',
    desc: 'What fractional CO2 laser does, who it suits, and what to expect during a course of acne scar treatment.',
    answer: 'Fractional CO2 laser treats acne scars by creating tiny controlled injuries in the skin that trigger collagen renewal. A course of sessions gradually smooths texture, though scars are improved rather than erased.',
    body: [
      ['h2', 'How it works'],
      ['p', 'The laser delivers light in a grid of microscopic columns, leaving surrounding skin intact. The skin heals quickly and rebuilds collagen, which lifts and smooths depressed scars.'],
      ['h2', 'Who it suits'],
      ['p', 'It is commonly used for pitted and rolling scars once active acne has settled. Skin type matters, so an assessment comes first.'],
      ['h2', 'What to expect'],
      ['p', 'Redness, a warm sensation and some peeling are normal for a few days. Sunscreen and gentle skincare are important during healing.'],
      ['h2', 'How many sessions?'],
      ['p', 'Most people need a course of sessions spaced weeks apart. Your plan depends on scar depth and how your skin responds.'],
    ],
    service: 'acne-scar-treatment-goa',
  },
];

// ------------------------------------------------------------------ PROCESS (home)
export const PROCESS = [
  ['01', 'Consultation', 'An unhurried conversation about your goals, medical history and expectations. You leave knowing your options, risks and alternatives.'],
  ['02', 'Personal plan', 'A written plan covering technique, recovery, risks and cost, so you can decide in your own time.'],
  ['03', 'Procedure', 'Performed by Dr. Patel with a trained team, in an equipped operating theatre or procedure room.'],
  ['04', 'Aftercare', 'Scheduled reviews and direct access to the clinic, so you are supported through every stage of healing.'],
];
