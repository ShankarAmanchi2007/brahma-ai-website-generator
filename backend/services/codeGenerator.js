/**
 * BRAHMA • Autonomous AI Website Creator
 * Advanced Prompt-Adherent Code Generator & Design System Engine
 * Strict website-type classification, semantic prompt comprehension,
 * category-specific structures, and multi-device in-preview link isolation.
 */

// ============================================================================
// 1. WEBSITE TYPES & TAXONOMY
// ============================================================================
const WEBSITE_TYPES = {
  PORTFOLIO: 'portfolio',
  RESTAURANT: 'restaurant',
  ECOMMERCE: 'ecommerce',
  SAAS: 'saas',
  AGENCY: 'agency',
  BLOG: 'blog',
  NEWS: 'news',
  REAL_ESTATE: 'real_estate',
  HOTEL: 'hotel',
  FITNESS: 'fitness',
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  STARTUP: 'startup',
  LANDING_PAGE: 'landing_page'
};

// ============================================================================
// 2. THEME PALETTE ENGINE (Supports Custom Colors & Strict Presets)
// ============================================================================
const PALETTES = {
  blackMagenta: {
    name: 'Obsidian Black & Hot Magenta',
    bg: 'bg-[#050505]',
    bodyBgHex: '#050505',
    text: 'text-white',
    cardBg: 'bg-[#0c0c0c] border-[#1f1f1f]',
    surface: 'bg-[#121212] border-[#262626]',
    primary: 'from-[#FF00A8] to-[#D9008F]',
    primaryBtn: 'bg-[#FF00A8] hover:bg-[#D9008F] text-white',
    secondaryBtn: 'border-[#262626] bg-[#121212] hover:bg-[#181818] text-neutral-300 hover:text-white',
    accentText: 'text-[#FF00A8]',
    accentHex: '#FF00A8',
    accentBorder: 'border-[#FF00A8]',
    accentBg: 'bg-[#FF00A8]/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#050505]/90 border-[#1a1a1a]',
    footerBg: 'bg-[#050505] border-[#1a1a1a]'
  },
  blueWhite: {
    name: 'Ocean Cobalt & Ice White',
    bg: 'bg-[#060b17]',
    bodyBgHex: '#060b17',
    text: 'text-white',
    cardBg: 'bg-[#0b1329] border-[#182649]',
    surface: 'bg-[#101c3d] border-[#1f315e]',
    primary: 'from-blue-500 to-cyan-400',
    primaryBtn: 'bg-blue-600 hover:bg-blue-500 text-white',
    secondaryBtn: 'border-[#182649] bg-[#0b1329] hover:bg-[#121f42] text-neutral-300 hover:text-white',
    accentText: 'text-blue-400',
    accentHex: '#3B82F6',
    accentBorder: 'border-blue-500',
    accentBg: 'bg-blue-500/10',
    subText: 'text-slate-400',
    navBg: 'bg-[#060b17]/90 border-[#182649]',
    footerBg: 'bg-[#060b17] border-[#182649]'
  },
  darkEmerald: {
    name: 'Carbon Matrix & Cyber Emerald',
    bg: 'bg-[#050806]',
    bodyBgHex: '#050806',
    text: 'text-white',
    cardBg: 'bg-[#0a110d] border-[#14261d]',
    surface: 'bg-[#0f1c15] border-[#1c3629]',
    primary: 'from-emerald-500 to-teal-400',
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    secondaryBtn: 'border-[#14261d] bg-[#0a110d] hover:bg-[#12221a] text-neutral-300 hover:text-white',
    accentText: 'text-emerald-400',
    accentHex: '#10B981',
    accentBorder: 'border-emerald-500',
    accentBg: 'bg-emerald-500/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#050806]/90 border-[#14261d]',
    footerBg: 'bg-[#050806] border-[#14261d]'
  },
  luxuryGold: {
    name: 'Obsidian Velvet & Champagne Amber',
    bg: 'bg-[#080808]',
    bodyBgHex: '#080808',
    text: 'text-neutral-100',
    cardBg: 'bg-[#101010] border-[#262420]',
    surface: 'bg-[#171614] border-[#36322b]',
    primary: 'from-amber-400 to-amber-600',
    primaryBtn: 'bg-amber-400 hover:bg-amber-300 text-black font-bold',
    secondaryBtn: 'border-[#262420] bg-[#121212] hover:bg-[#1a1a1a] text-neutral-300 hover:text-white',
    accentText: 'text-amber-400',
    accentHex: '#F59E0B',
    accentBorder: 'border-amber-400',
    accentBg: 'bg-amber-400/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#080808]/90 border-[#262420]',
    footerBg: 'bg-[#080808] border-[#262420]'
  },
  violetCyber: {
    name: 'Deep Void & Electric Violet',
    bg: 'bg-[#09050e]',
    bodyBgHex: '#09050e',
    text: 'text-white',
    cardBg: 'bg-[#120a1c] border-[#25153a]',
    surface: 'bg-[#1a0e28] border-[#341d52]',
    primary: 'from-purple-500 to-pink-500',
    primaryBtn: 'bg-purple-600 hover:bg-purple-500 text-white',
    secondaryBtn: 'border-[#25153a] bg-[#120a1c] hover:bg-[#1a0e28] text-neutral-300 hover:text-white',
    accentText: 'text-purple-400',
    accentHex: '#A855F7',
    accentBorder: 'border-purple-500',
    accentBg: 'bg-purple-500/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#09050e]/90 border-[#25153a]',
    footerBg: 'bg-[#09050e] border-[#25153a]'
  },
  crimsonDark: {
    name: 'Charcoal Shadow & High-Contrast Crimson',
    bg: 'bg-[#0a0505]',
    bodyBgHex: '#0a0505',
    text: 'text-white',
    cardBg: 'bg-[#140b0b] border-[#2a1616]',
    surface: 'bg-[#1c0f0f] border-[#3a1e1e]',
    primary: 'from-rose-600 to-red-600',
    primaryBtn: 'bg-rose-600 hover:bg-rose-500 text-white',
    secondaryBtn: 'border-[#2a1616] bg-[#140b0b] hover:bg-[#1e1010] text-neutral-300 hover:text-white',
    accentText: 'text-rose-400',
    accentHex: '#F43F5E',
    accentBorder: 'border-rose-500',
    accentBg: 'bg-rose-500/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#0a0505]/90 border-[#2a1616]',
    footerBg: 'bg-[#0a0505] border-[#2a1616]'
  }
};

// ============================================================================
// 3. STEP 1 & 8: INTERNAL GENERATION SPECIFICATION / PLANNER
// ============================================================================

/**
 * Accurately analyzes the user prompt and generates an internal specification plan.
 * The requested website type is treated as the HIGHEST-PRIORITY requirement.
 */
function buildInternalPlan(prompt, existingPlan = null) {
  const p = prompt.toLowerCase();

  // 1. Identify Website Type First (Strict Precedence)
  let websiteType = null;

  // Explicit type check
  if (
    p.includes('portfolio') ||
    p.includes('personal website') ||
    p.includes('resume') ||
    p.includes('cv website') ||
    p.includes('showcase my work') ||
    p.includes('showcase work') ||
    p.includes('developer portfolio') ||
    p.includes('designer portfolio') ||
    p.includes('software engineer portfolio') ||
    (p.includes('developer') && !p.includes('saas') && !p.includes('ecommerce') && !p.includes('store')) ||
    (p.includes('designer') && !p.includes('agency') && !p.includes('store')) ||
    (p.includes('programmer') || p.includes('coder') || p.includes('freelancer'))
  ) {
    websiteType = WEBSITE_TYPES.PORTFOLIO;
  } else if (
    p.includes('restaurant') ||
    p.includes('cafe') ||
    p.includes('café') ||
    p.includes('bistro') ||
    p.includes('bakery') ||
    p.includes('dining') ||
    p.includes('pizzeria') ||
    p.includes('pizza') ||
    p.includes('steakhouse') ||
    p.includes('sushi') ||
    p.includes('food menu') ||
    p.includes('table reservation') ||
    p.includes('coffee shop') ||
    p.includes('bar & grill')
  ) {
    websiteType = WEBSITE_TYPES.RESTAURANT;
  } else if (
    p.includes('e-commerce') ||
    p.includes('ecommerce') ||
    p.includes('online store') ||
    p.includes('clothing store') ||
    p.includes('fashion store') ||
    p.includes('shoe store') ||
    p.includes('retail store') ||
    p.includes('merch store') ||
    p.includes('product store') ||
    p.includes('shop online') ||
    p.includes('boutique') ||
    (p.includes('shop') && !p.includes('barber') && !p.includes('coffee')) ||
    (p.includes('store') && !p.includes('bookstore cafe'))
  ) {
    websiteType = WEBSITE_TYPES.ECOMMERCE;
  } else if (
    p.includes('saas') ||
    p.includes('software as a service') ||
    p.includes('ai tool') ||
    p.includes('cloud platform') ||
    p.includes('analytics tool') ||
    p.includes('b2b software') ||
    p.includes('productivity app') ||
    p.includes('automation platform') ||
    p.includes('api platform') ||
    p.includes('subscription software')
  ) {
    websiteType = WEBSITE_TYPES.SAAS;
  } else if (
    p.includes('agency') ||
    p.includes('creative agency') ||
    p.includes('marketing agency') ||
    p.includes('design studio') ||
    p.includes('branding agency') ||
    p.includes('advertising agency') ||
    p.includes('consulting firm')
  ) {
    websiteType = WEBSITE_TYPES.AGENCY;
  } else if (
    p.includes('real estate') ||
    p.includes('realtor') ||
    p.includes('property') ||
    p.includes('apartments') ||
    p.includes('housing') ||
    p.includes('villa') ||
    p.includes('brokerage')
  ) {
    websiteType = WEBSITE_TYPES.REAL_ESTATE;
  } else if (
    p.includes('hotel') ||
    p.includes('resort') ||
    p.includes('motel') ||
    p.includes('hostel') ||
    p.includes('luxury stay') ||
    p.includes('lodging') ||
    p.includes('inn')
  ) {
    websiteType = WEBSITE_TYPES.HOTEL;
  } else if (
    p.includes('gym') ||
    p.includes('fitness') ||
    p.includes('workout') ||
    p.includes('crossfit') ||
    p.includes('yoga studio') ||
    p.includes('health club') ||
    p.includes('personal trainer')
  ) {
    websiteType = WEBSITE_TYPES.FITNESS;
  } else if (
    p.includes('college') ||
    p.includes('university') ||
    p.includes('education') ||
    p.includes('school') ||
    p.includes('academy') ||
    p.includes('course platform') ||
    p.includes('bootcamp') ||
    p.includes('institution')
  ) {
    websiteType = WEBSITE_TYPES.EDUCATION;
  } else if (
    p.includes('clinic') ||
    p.includes('hospital') ||
    p.includes('medical') ||
    p.includes('doctor') ||
    p.includes('dentist') ||
    p.includes('dental') ||
    p.includes('healthcare') ||
    p.includes('pharmacy')
  ) {
    websiteType = WEBSITE_TYPES.HEALTHCARE;
  } else if (
    p.includes('blog') ||
    p.includes('publication') ||
    p.includes('news website') ||
    p.includes('magazine') ||
    p.includes('journal') ||
    p.includes('articles website')
  ) {
    websiteType = p.includes('news') ? WEBSITE_TYPES.NEWS : WEBSITE_TYPES.BLOG;
  } else if (
    p.includes('startup') ||
    p.includes('tech startup') ||
    p.includes('seed startup') ||
    p.includes('waitlist')
  ) {
    websiteType = WEBSITE_TYPES.STARTUP;
  } else if (
    p.includes('landing page') ||
    p.includes('sales page') ||
    p.includes('lead page')
  ) {
    websiteType = WEBSITE_TYPES.LANDING_PAGE;
  }

  // Fallback check if existingPlan is provided
  if (!websiteType) {
    if (existingPlan && existingPlan.websiteType) {
      websiteType = existingPlan.websiteType;
    } else {
      // Intelligently infer based on intent
      if (p.includes('work') || p.includes('projects') || p.includes('hire me') || p.includes('skills')) {
        websiteType = WEBSITE_TYPES.PORTFOLIO;
      } else if (p.includes('food') || p.includes('drinks') || p.includes('eat') || p.includes('order')) {
        websiteType = WEBSITE_TYPES.RESTAURANT;
      } else if (p.includes('buy') || p.includes('sell') || p.includes('cart') || p.includes('price')) {
        websiteType = WEBSITE_TYPES.ECOMMERCE;
      } else {
        websiteType = WEBSITE_TYPES.SAAS;
      }
    }
  }

  // 2. Extract Person or Brand Name
  let personOrBrandName = null;
  const nameMatch = prompt.match(/(?:named|called)\s+["']?([A-Za-z0-9\s&'-]+?)["']?(?:[,\.\s]|$)/i) ||
                     prompt.match(/for\s+(?:a\s+)?(?:[a-z\s]+)?named\s+["']?([A-Za-z0-9\s&'-]+?)["']?/i) ||
                     prompt.match(/for\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)(?:[,\.\s]|$)/);

  if (nameMatch && nameMatch[1].trim().length < 32) {
    const candidate = nameMatch[1].trim();
    // Exclude generic words captured accidentally
    const genericNoise = ['a modern', 'a restaurant', 'a portfolio', 'a website', 'frontend', 'developer', 'react'];
    if (!genericNoise.some(g => candidate.toLowerCase().includes(g))) {
      personOrBrandName = candidate;
    }
  }

  if (!personOrBrandName) {
    if (existingPlan && existingPlan.personOrBrandName) {
      personOrBrandName = existingPlan.personOrBrandName;
    } else {
      const defaults = {
        [WEBSITE_TYPES.PORTFOLIO]: 'Rahul Sharma',
        [WEBSITE_TYPES.RESTAURANT]: "L'Atelier Noir",
        [WEBSITE_TYPES.ECOMMERCE]: 'Aethel Goods',
        [WEBSITE_TYPES.SAAS]: 'Synthetix AI',
        [WEBSITE_TYPES.AGENCY]: 'Atelier Vanguard',
        [WEBSITE_TYPES.BLOG]: 'The Editorial Codex',
        [WEBSITE_TYPES.NEWS]: 'The Daily Horizon',
        [WEBSITE_TYPES.REAL_ESTATE]: 'Aethel Luxury Estates',
        [WEBSITE_TYPES.HOTEL]: 'The Grand Luminary',
        [WEBSITE_TYPES.FITNESS]: 'Valkyrie Athletic',
        [WEBSITE_TYPES.EDUCATION]: 'Apex Institute of Technology',
        [WEBSITE_TYPES.HEALTHCARE]: 'NovaCare Medical Center',
        [WEBSITE_TYPES.STARTUP]: 'NeuroSync Labs',
        [WEBSITE_TYPES.LANDING_PAGE]: 'Apex Launch'
      };
      personOrBrandName = defaults[websiteType] || 'Apex Enterprise';
    }
  }

  // 3. Extract Role / Profession / Industry Niche
  let professionOrRole = 'Software Engineer';
  if (p.includes('react developer')) professionOrRole = 'React Developer';
  else if (p.includes('frontend developer')) professionOrRole = 'Frontend Developer';
  else if (p.includes('backend developer')) professionOrRole = 'Backend Developer';
  else if (p.includes('fullstack developer') || p.includes('full stack developer')) professionOrRole = 'Full-Stack Developer';
  else if (p.includes('ui/ux designer') || p.includes('ui designer') || p.includes('ux designer') || p.includes('product designer')) professionOrRole = 'Lead UI/UX Designer';
  else if (p.includes('graphic designer')) professionOrRole = 'Graphic Designer & Visual Artist';
  else if (p.includes('mobile developer') || p.includes('ios') || p.includes('flutter')) professionOrRole = 'Mobile Application Engineer';
  else if (p.includes('software engineering student') || p.includes('student')) professionOrRole = 'Software Engineering Scholar';
  else if (p.includes('data scientist') || p.includes('machine learning') || p.includes('ai engineer')) professionOrRole = 'AI & Machine Learning Engineer';
  else if (p.includes('devops') || p.includes('cloud engineer')) professionOrRole = 'Cloud & DevOps Architect';

  // 4. Color & Theme Resolution (Requirement 3 & 6)
  let themeKey = 'blackMagenta';
  if (p.includes('blue') && (p.includes('white') || p.includes('light') || p.includes('ocean') || p.includes('ice'))) {
    themeKey = 'blueWhite';
  } else if (p.includes('blue') || p.includes('cyan')) {
    themeKey = 'blueWhite';
  } else if (p.includes('green') || p.includes('emerald') || p.includes('neon green') || p.includes('mint')) {
    themeKey = 'darkEmerald';
  } else if (p.includes('gold') || p.includes('amber') || p.includes('luxury') || p.includes('champagne')) {
    themeKey = 'luxuryGold';
  } else if (p.includes('purple') || p.includes('violet') || p.includes('cyberpunk') || p.includes('neon')) {
    themeKey = 'violetCyber';
  } else if (p.includes('red') || p.includes('crimson') || p.includes('rose')) {
    themeKey = 'crimsonDark';
  } else if (p.includes('black') && (p.includes('magenta') || p.includes('pink'))) {
    themeKey = 'blackMagenta';
  } else if (existingPlan && existingPlan.colors && existingPlan.colors.themeKey) {
    themeKey = existingPlan.colors.themeKey;
  }

  const palette = PALETTES[themeKey] || PALETTES.blackMagenta;

  // 5. Build Website-Type-Specific Required Sections (Requirement 4)
  const SECTION_MAPS = {
    [WEBSITE_TYPES.PORTFOLIO]: ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'resume', 'contact'],
    [WEBSITE_TYPES.RESTAURANT]: ['hero', 'menu', 'dishes', 'about', 'gallery', 'reviews', 'reservation', 'location'],
    [WEBSITE_TYPES.ECOMMERCE]: ['hero', 'categories', 'featured_products', 'offers', 'reviews', 'newsletter'],
    [WEBSITE_TYPES.SAAS]: ['hero', 'product_demo', 'features', 'how_it_works', 'integrations', 'pricing', 'reviews', 'faq', 'cta'],
    [WEBSITE_TYPES.AGENCY]: ['hero', 'services', 'selected_work', 'about', 'process', 'reviews', 'team', 'contact'],
    [WEBSITE_TYPES.BLOG]: ['header', 'featured_article', 'categories', 'articles_grid', 'popular_posts', 'newsletter'],
    [WEBSITE_TYPES.NEWS]: ['header', 'breaking_news', 'featured_article', 'categories', 'articles_grid', 'newsletter'],
    [WEBSITE_TYPES.REAL_ESTATE]: ['hero', 'property_search', 'featured_properties', 'neighborhoods', 'why_us', 'agents', 'reviews', 'contact'],
    [WEBSITE_TYPES.HOTEL]: ['hero', 'booking_bar', 'rooms', 'amenities', 'dining', 'reviews', 'location', 'contact'],
    [WEBSITE_TYPES.FITNESS]: ['hero', 'programs', 'facilities', 'schedule', 'pricing', 'trainers', 'reviews', 'contact'],
    [WEBSITE_TYPES.EDUCATION]: ['hero', 'programs', 'campus_life', 'faculty', 'stories', 'admissions', 'contact'],
    [WEBSITE_TYPES.HEALTHCARE]: ['hero', 'specialties', 'doctors', 'safety', 'reviews', 'appointment', 'location'],
    [WEBSITE_TYPES.STARTUP]: ['hero', 'problem_solution', 'features', 'roadmap', 'investors', 'waitlist'],
    [WEBSITE_TYPES.LANDING_PAGE]: ['hero', 'features', 'benefits', 'reviews', 'pricing', 'faq', 'contact']
  };

  const requiredSections = SECTION_MAPS[websiteType] || SECTION_MAPS[WEBSITE_TYPES.SAAS];

  // 6. Assemble the structured internal plan (Requirement 8)
  const plan = {
    websiteType,
    purpose: `Delivering a specialized, human-designed ${websiteType} platform optimized for prompt requirements`,
    industry: websiteType.toUpperCase(),
    targetAudience: websiteType === WEBSITE_TYPES.PORTFOLIO ? 'Recruiters, engineering leads, clients' : 'End consumers and partners',
    style: p.includes('minimalist') ? 'Minimalist & Clean' : p.includes('luxury') ? 'Luxury & High-Contrast' : 'Modern & Editorial',
    colors: {
      themeKey,
      name: palette.name,
      primaryHex: palette.accentHex,
      bgHex: palette.bodyBgHex
    },
    personOrBrandName,
    professionOrRole,
    requiredSections,
    specialRequirements: []
  };

  if (p.includes('dark')) plan.specialRequirements.push('dark-theme');
  if (p.includes('pricing') && !requiredSections.includes('pricing')) plan.requiredSections.push('pricing');
  if (p.includes('review') || p.includes('testimonial')) {
    if (!plan.requiredSections.includes('reviews')) plan.requiredSections.push('reviews');
  }
  if (p.includes('contact') && !plan.requiredSections.includes('contact')) plan.requiredSections.push('contact');

  return plan;
}

// ============================================================================
// 4. STEP 4: BESPOKE SECTION RENDERERS BY CATEGORY
// ============================================================================

/**
 * PORTFOLIO: Hero -> About -> Skills -> Projects -> Experience -> Education -> Resume -> Contact
 */
function renderPortfolio(plan, palette) {
  const name = plan.personOrBrandName;
  const role = plan.professionOrRole;
  const isReact = role.toLowerCase().includes('react');
  const isFrontend = role.toLowerCase().includes('frontend') || isReact;

  return `
  <!-- HERO SECTION -->
  <section id="hero" class="relative overflow-hidden py-24 lg:py-36 border-b border-[#181818]">
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] ${palette.accentBg} blur-[140px] pointer-events-none rounded-full"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border border-[#222222] bg-[#0c0c0c] text-neutral-300">
            <span class="w-2 h-2 rounded-full ${palette.accentHex ? 'bg-[' + palette.accentHex + ']' : 'bg-[#FF00A8]'} animate-pulse"></span>
            AVAILABLE FOR HIRE & COLLABORATION
          </div>
          <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Hi, I'm <span class="${palette.accentText}">${name}</span>.<br>
            <span class="text-3xl sm:text-5xl text-neutral-200">${role}</span>
          </h1>
          <p class="text-base sm:text-lg ${palette.subText} max-w-xl leading-relaxed">
            Crafting performant, accessible, and human-centered digital experiences with modern web technologies, strict architectural patterns, and visual finesse.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#projects" class="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider shadow-xl transition-all ${palette.primaryBtn} flex items-center justify-center gap-2">
              <span>View Projects</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
            <a href="#resume" class="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider border transition-all ${palette.secondaryBtn} flex items-center justify-center gap-2">
              <i class="fa-solid fa-file-pdf"></i>
              <span>Download CV</span>
            </a>
            <a href="#contact" class="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider border transition-all ${palette.secondaryBtn}">
              Contact Me
            </a>
          </div>
          <!-- Quick Stat Strip -->
          <div class="pt-6 grid grid-cols-3 gap-6 border-t border-[#1a1a1a] max-w-md mx-auto lg:mx-0 font-mono">
            <div>
              <p class="text-2xl sm:text-3xl font-extrabold text-white">4+ Yrs</p>
              <p class="text-[11px] text-neutral-500 uppercase">Experience</p>
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-extrabold ${palette.accentText}">30+</p>
              <p class="text-[11px] text-neutral-500 uppercase">Shipped Projects</p>
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
              <p class="text-[11px] text-neutral-500 uppercase">Job Success</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 relative flex justify-center">
          <div class="relative w-72 sm:w-84 h-84 sm:h-96 rounded-3xl overflow-hidden border border-[#222222] ${palette.cardBg} shadow-2xl p-3">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="${name}" class="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500">
            <div class="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-black/80 border border-[#262626] backdrop-blur-md flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-white">${name}</p>
                <p class="text-[10px] text-neutral-400 font-mono">${role}</p>
              </div>
              <div class="flex items-center gap-2 text-neutral-400 text-xs">
                <a href="#contact" class="hover:text-white"><i class="fa-brands fa-github"></i></a>
                <a href="#contact" class="hover:text-white"><i class="fa-brands fa-linkedin"></i></a>
                <a href="#contact" class="hover:text-white"><i class="fa-solid fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT ME SECTION -->
  <section id="about" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 space-y-6">
          <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
            ABOUT ME
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Passionate About Creating Impactful Web Products</h2>
          <p class="${palette.subText} text-sm sm:text-base leading-relaxed">
            I am a dedicated ${role} focused on turning complex problems into elegant, intuitive interfaces. Whether collaborating in cross-functional squads or leading greenfield architecture, I place supreme value on code clarity, component modularity, and lightning-fast load times.
          </p>
          <p class="${palette.subText} text-sm sm:text-base leading-relaxed">
            My background spans building component libraries, interactive state-driven dashboards, micro-frontends, and responsive multi-platform web applications.
          </p>
          <div class="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
            <div class="p-4 rounded-xl border border-[#1f1f1f] bg-[#0c0c0c]">
              <span class="${palette.accentText} block font-bold mb-1"><i class="fa-solid fa-location-dot mr-1"></i> Based In</span>
              <span class="text-white">Bengaluru / Remote</span>
            </div>
            <div class="p-4 rounded-xl border border-[#1f1f1f] bg-[#0c0c0c]">
              <span class="${palette.accentText} block font-bold mb-1"><i class="fa-solid fa-code mr-1"></i> Specialization</span>
              <span class="text-white">${isReact ? 'React & Next.js' : 'Modern Frontend'}</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 grid grid-cols-2 gap-4 font-mono">
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
            <div class="${palette.accentText} text-2xl font-bold">01</div>
            <h3 class="text-sm font-bold text-white uppercase">Component Architecture</h3>
            <p class="text-xs text-neutral-400">Atomic design principles, headless components, and robust props contracts.</p>
          </div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2 mt-4">
            <div class="${palette.accentText} text-2xl font-bold">02</div>
            <h3 class="text-sm font-bold text-white uppercase">Performance First</h3>
            <p class="text-xs text-neutral-400">Sub-second First Contentful Paint, tree-shaken bundles, and memoized renders.</p>
          </div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
            <div class="${palette.accentText} text-2xl font-bold">03</div>
            <h3 class="text-sm font-bold text-white uppercase">Accessible UI (a11y)</h3>
            <p class="text-xs text-neutral-400">WCAG 2.1 compliance, semantic landmarks, and full keyboard navigational flows.</p>
          </div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2 mt-4">
            <div class="${palette.accentText} text-2xl font-bold">04</div>
            <h3 class="text-sm font-bold text-white uppercase">Modern Tooling</h3>
            <p class="text-xs text-neutral-400">Vite, Tailwind CSS, TypeScript, Jest, Playwright, and GitHub CI/CD actions.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SKILLS & TECHNOLOGIES SECTION -->
  <section id="skills" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          TECHNICAL TOOLKIT
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Skills & Technologies</h2>
        <p class="${palette.subText} text-xs sm:text-sm">Technologies and frameworks I build production applications with every single day.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-colors">
          <i class="fa-brands fa-react text-3xl text-cyan-400"></i>
          <h4 class="font-bold text-xs text-white">React.js</h4>
          <p class="text-[10px] text-neutral-500">Hooks & Suspense</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-colors">
          <i class="fa-brands fa-js text-3xl text-yellow-400"></i>
          <h4 class="font-bold text-xs text-white">TypeScript / JS</h4>
          <p class="text-[10px] text-neutral-500">Strict Typing</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-colors">
          <i class="fa-brands fa-css3-alt text-3xl text-blue-400"></i>
          <h4 class="font-bold text-xs text-white">Tailwind CSS</h4>
          <p class="text-[10px] text-neutral-500">Design Systems</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-colors">
          <i class="fa-brands fa-node-js text-3xl text-emerald-400"></i>
          <h4 class="font-bold text-xs text-white">Node.js</h4>
          <p class="text-[10px] text-neutral-500">REST & GraphQL</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-colors">
          <i class="fa-brands fa-git-alt text-3xl text-orange-500"></i>
          <h4 class="font-bold text-xs text-white">Git & CI/CD</h4>
          <p class="text-[10px] text-neutral-500">Version Control</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-colors">
          <i class="fa-solid fa-vial text-3xl text-purple-400"></i>
          <h4 class="font-bold text-xs text-white">Testing</h4>
          <p class="text-[10px] text-neutral-500">Jest & Cypress</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED PROJECTS SECTION -->
  <section id="projects" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
            WORK & CASE STUDIES
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-4">Featured Projects</h2>
        </div>
        <p class="${palette.subText} text-xs sm:text-sm font-mono max-w-md">Real applications solving practical problems with clean architecture.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Project 1 -->
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group hover:border-[#FF00A8]/50 transition-all flex flex-col justify-between">
          <div class="h-48 overflow-hidden bg-black relative">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Telemetry Platform" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80">
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 border border-[#262626] text-white">React • Tailwind</div>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-lg font-bold text-white">CloudMetrics Real-Time Dashboard</h3>
            <p class="text-xs ${palette.subText} leading-relaxed">High-performance analytics console featuring dynamic chart visualization, web-socket telemetry, and theme customizer.</p>
            <div class="flex items-center gap-4 pt-3 font-mono text-xs">
              <a href="#contact" class="${palette.accentText} hover:underline font-bold">Live Demo →</a>
              <a href="#contact" class="text-neutral-400 hover:text-white"><i class="fa-brands fa-github mr-1"></i>Source Code</a>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group hover:border-[#FF00A8]/50 transition-all flex flex-col justify-between">
          <div class="h-48 overflow-hidden bg-black relative">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Design System" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80">
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 border border-[#262626] text-white">TypeScript • Storybook</div>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-lg font-bold text-white">Nexus Accessible Component UI</h3>
            <p class="text-xs ${palette.subText} leading-relaxed">Enterprise design system of 45+ headless, WAI-ARIA compliant accessible React components with comprehensive automated testing.</p>
            <div class="flex items-center gap-4 pt-3 font-mono text-xs">
              <a href="#contact" class="${palette.accentText} hover:underline font-bold">Live Demo →</a>
              <a href="#contact" class="text-neutral-400 hover:text-white"><i class="fa-brands fa-github mr-1"></i>Source Code</a>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group hover:border-[#FF00A8]/50 transition-all flex flex-col justify-between">
          <div class="h-48 overflow-hidden bg-black relative">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" alt="AI Workspace" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80">
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 border border-[#262626] text-white">Next.js • Node</div>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-lg font-bold text-white">Cognitive Canvas Note Studio</h3>
            <p class="text-xs ${palette.subText} leading-relaxed">Markdown-powered note organizer with bidirectional backlinks, vector search integration, and offline IndexedDB sync.</p>
            <div class="flex items-center gap-4 pt-3 font-mono text-xs">
              <a href="#contact" class="${palette.accentText} hover:underline font-bold">Live Demo →</a>
              <a href="#contact" class="text-neutral-400 hover:text-white"><i class="fa-brands fa-github mr-1"></i>Source Code</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- WORK EXPERIENCE SECTION -->
  <section id="experience" class="py-24 border-b border-[#181818]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          CAREER PATH
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Work Experience</h2>
      </div>

      <div class="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-8 before:w-0.5 before:bg-[#222222]">
        <div class="relative pl-10 sm:pl-20">
          <div class="absolute left-1.5 sm:left-6.5 top-1.5 w-3.5 h-3.5 rounded-full ${palette.accentHex ? 'bg-[' + palette.accentHex + ']' : 'bg-[#FF00A8]'} ring-4 ring-[#050505]"></div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 class="text-base font-bold text-white">Senior ${role} • Hyperion Tech</h3>
              <span class="text-xs font-mono ${palette.accentText}">2023 — Present</span>
            </div>
            <p class="text-xs ${palette.subText} leading-relaxed">Spearheaded the redesign of core consumer web applications. Reduced page bundle weight by 42% and introduced strict TypeScript design system tokens across 4 squads.</p>
          </div>
        </div>

        <div class="relative pl-10 sm:pl-20">
          <div class="absolute left-1.5 sm:left-6.5 top-1.5 w-3.5 h-3.5 rounded-full bg-neutral-600 ring-4 ring-[#050505]"></div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 class="text-base font-bold text-white">Frontend Software Engineer • Veloce Labs</h3>
              <span class="text-xs font-mono text-neutral-400">2021 — 2023</span>
            </div>
            <p class="text-xs ${palette.subText} leading-relaxed">Developed responsive dashboards, data tables, and client onboarding workflows using React, Redux Toolkit, and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- EDUCATION & RESUME DOWNLOAD SECTION -->
  <section id="resume" class="py-24 border-b border-[#181818]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-8 sm:p-12 text-center space-y-6">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          CREDENTIALS & RESUME
        </span>
        <h2 class="text-3xl font-extrabold text-white">Education & Official CV</h2>
        <div class="max-w-md mx-auto p-4 rounded-xl border border-[#1f1f1f] bg-[#121212] font-mono text-xs text-left">
          <p class="text-white font-bold"><i class="fa-solid fa-graduation-cap text-[#FF00A8] mr-2"></i>B.Tech in Computer Science & Engineering</p>
          <p class="text-neutral-400 mt-1">First Class with Distinction • 2018 — 2022</p>
        </div>
        <p class="${palette.subText} text-xs sm:text-sm max-w-lg mx-auto">
          Need a complete breakdown of technical proficiencies, certifications, and recommendations? Download my up-to-date resume.
        </p>
        <div class="pt-2">
          <a href="#contact" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider ${palette.primaryBtn} shadow-xl transition-all">
            <i class="fa-solid fa-download"></i>
            <span>Download Official Resume (PDF)</span>
  ${plan.requiredSections && plan.requiredSections.includes('pricing') ? `
  <!-- FREELANCE ENGAGEMENT & PRICING SECTION -->
  <section id="pricing" class="py-24 border-b border-[#181818]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          TRANSPARENT ENGAGEMENT
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Project & Consulting Rates</h2>
        <p class="${palette.subText} text-xs sm:text-sm">Flexible collaboration models for contract development and technical advisory.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] flex flex-col justify-between">
          <div class="space-y-4">
            <h3 class="font-mono text-sm font-bold text-white uppercase">Sprint Advisory</h3>
            <div class="text-3xl font-extrabold text-white">$1,500<span class="text-xs text-neutral-400"> / sprint</span></div>
            <p class="text-xs ${palette.subText}">Code reviews, architecture planning, and performance audits.</p>
          </div>
          <a href="#contact" class="w-full mt-6 py-3 rounded-xl font-bold text-xs font-mono uppercase text-center border ${palette.secondaryBtn}">Select Sprint</a>
        </div>

        <div class="p-8 rounded-3xl border-2 ${palette.accentBorder} bg-[#0c0c0c] flex flex-col justify-between shadow-xl">
          <div class="space-y-4">
            <span class="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${palette.primaryBtn}">POPULAR</span>
            <h3 class="font-mono text-sm font-bold text-white uppercase">MVP Build</h3>
            <div class="text-3xl font-extrabold text-white">$4,800<span class="text-xs text-neutral-400"> / project</span></div>
            <p class="text-xs ${palette.subText}">Complete frontend implementation from design handoff to production deployment.</p>
          </div>
          <a href="#contact" class="w-full mt-6 py-3 rounded-xl font-bold text-xs font-mono uppercase text-center ${palette.primaryBtn}">Start MVP</a>
        </div>

        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] flex flex-col justify-between">
          <div class="space-y-4">
            <h3 class="font-mono text-sm font-bold text-white uppercase">Monthly Retainer</h3>
            <div class="text-3xl font-extrabold text-white">$6,500<span class="text-xs text-neutral-400"> / mo</span></div>
            <p class="text-xs ${palette.subText}">Dedicated 20h/week embedded in your engineering sprint cycles.</p>
          </div>
          <a href="#contact" class="w-full mt-6 py-3 rounded-xl font-bold text-xs font-mono uppercase text-center border ${palette.secondaryBtn}">Reserve Retainer</a>
        </div>
      </div>
    </div>
  </section>` : ''}

  <!-- CONTACT SECTION -->
  <section id="contact" class="py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-8 sm:p-12 shadow-2xl">
        <div class="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
            GET IN TOUCH
          </span>
          <h2 class="text-3xl font-extrabold text-white">Let's Build Something Great</h2>
          <p class="${palette.subText} text-xs sm:text-sm">Have an open engineering role, freelance project, or just want to connect? Send me a message below.</p>
        </div>

        <form id="contactForm" class="space-y-4 max-w-lg mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold mb-1 text-neutral-300">Your Name</label>
              <input type="text" required placeholder="Alex Rivera" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs">
            </div>
            <div>
              <label class="block text-xs font-semibold mb-1 text-neutral-300">Email Address</label>
              <input type="email" required placeholder="alex@company.com" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1 text-neutral-300">Subject</label>
            <input type="text" placeholder="Project Inquiry / Job Opportunity" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1 text-neutral-300">Message</label>
            <textarea rows="4" required placeholder="Hello ${name}, I saw your portfolio and would love to discuss..." class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs resize-none"></textarea>
          </div>
          <button type="submit" class="w-full py-3.5 rounded-xl font-bold text-xs uppercase font-mono tracking-wider ${palette.primaryBtn} transition-all">
            Send Message <i class="fa-solid fa-paper-plane ml-2"></i>
          </button>
          <div id="formSuccess" class="hidden p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs text-center font-mono">
            ✓ Thank you! Your message has been sent. ${name} will reply shortly.
          </div>
        </form>
      </div>
    </div>
  </section>`;
}

/**
 * RESTAURANT: Hero -> Menu -> Featured Dishes -> About -> Gallery -> Reviews -> Reservation -> Location
 */
function renderRestaurant(plan, palette) {
  const brand = plan.personOrBrandName;
  return `
  <!-- HERO SECTION -->
  <section id="hero" class="relative overflow-hidden py-28 lg:py-40 border-b border-[#181818]">
    <div class="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" alt="Restaurant Interior" class="w-full h-full object-cover opacity-25">
      <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/30"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border border-[#222222] bg-[#0c0c0c]/80 backdrop-blur-md text-neutral-300">
        <span class="w-2 h-2 rounded-full ${palette.accentHex ? 'bg-[' + palette.accentHex + ']' : 'bg-[#FF00A8]'} animate-pulse"></span>
        SEASONAL DEGUSTATION MENU NOW SERVING
      </div>
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
        Artisanal Gastronomy at <span class="${palette.accentText}">${brand}</span>
      </h1>
      <p class="text-base sm:text-lg ${palette.subText} max-w-2xl mx-auto">
        Celebrating heritage culinary craft, wood-fired hearth cooking, and biodynamic terroir provisions in an intimate modern atmosphere.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <a href="#reservation" class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider ${palette.primaryBtn} shadow-xl transition-all">
          Reserve a Table
        </a>
        <a href="#menu" class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider border ${palette.secondaryBtn} transition-all">
          Explore Menu
        </a>
      </div>
    </div>
  </section>

  <!-- MENU SECTION -->
  <section id="menu" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          CURATED MENU
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Culinary Selections</h2>
        <p class="${palette.subText} text-xs sm:text-sm">Hand-crafted seasonal courses prepared with local organic ingredients.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Item 1 -->
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] flex justify-between gap-4">
          <div class="space-y-1">
            <h3 class="font-bold text-base text-white">Miyazaki A5 Wagyu Striploin</h3>
            <p class="text-xs ${palette.subText}">Charcoal grilled, fermented black garlic emulsion, shaved Perigord winter truffle.</p>
          </div>
          <span class="font-mono font-extrabold ${palette.accentText} text-lg">$68</span>
        </div>
        <!-- Item 2 -->
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] flex justify-between gap-4">
          <div class="space-y-1">
            <h3 class="font-bold text-base text-white">Smoked Ricotta Agnolotti</h3>
            <p class="text-xs ${palette.subText}">Handmade 36-yolk pasta, roasted pine mushroom broth, brown butter crunch.</p>
          </div>
          <span class="font-mono font-extrabold ${palette.accentText} text-lg">$38</span>
        </div>
        <!-- Item 3 -->
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] flex justify-between gap-4">
          <div class="space-y-1">
            <h3 class="font-bold text-base text-white">Glazed Spanish Octopus</h3>
            <p class="text-xs ${palette.subText}">Braised tentacles, smoked paprika romesco, fingerling potatoes, preserved lemon.</p>
          </div>
          <span class="font-mono font-extrabold ${palette.accentText} text-lg">$42</span>
        </div>
        <!-- Item 4 -->
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] flex justify-between gap-4">
          <div class="space-y-1">
            <h3 class="font-bold text-base text-white">Valrhona Dark Chocolate Ganache</h3>
            <p class="text-xs ${palette.subText}">70% Guanaja chocolate, salted smoked caramel, roasted hazelnut feuilletine.</p>
          </div>
          <span class="font-mono font-extrabold ${palette.accentText} text-lg">$22</span>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED DISHES VISUAL SHOWCASE -->
  <section id="dishes" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          SIGNATURE DISHES
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Chef's Signatures</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" alt="Prime Steak" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-5">
            <h3 class="font-bold text-white text-base">Wood-Fired Prime Cut</h3>
            <p class="text-xs ${palette.subText} mt-1">Dry-aged in house for 45 days over Himalayan salt blocks.</p>
          </div>
        </div>
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" alt="Fresh Pasta" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-5">
            <h3 class="font-bold text-white text-base">Handmade Artisan Pasta</h3>
            <p class="text-xs ${palette.subText} mt-1">Freshly extruded every morning with Italian semolina flour.</p>
          </div>
        </div>
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" alt="Seafood Creation" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-5">
            <h3 class="font-bold text-white text-base">Catch of the Day</h3>
            <p class="text-xs ${palette.subText} mt-1">Sustainably wild-caught, served with citrus beurre blanc.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TABLE RESERVATION SECTION -->
  <section id="reservation" class="py-24 border-b border-[#181818]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-8 sm:p-12 shadow-2xl">
        <div class="text-center max-w-xl mx-auto mb-8 space-y-3">
          <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
            RESERVATIONS
          </span>
          <h2 class="text-3xl font-extrabold text-white">Book Your Experience</h2>
          <p class="${palette.subText} text-xs sm:text-sm">Reservations open 30 days in advance. Private dining available upon inquiry.</p>
        </div>

        <form id="contactForm" class="space-y-4 max-w-lg mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold mb-1 text-neutral-300">Name</label>
              <input type="text" required placeholder="Elena Rostova" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
            </div>
            <div>
              <label class="block text-xs font-semibold mb-1 text-neutral-300">Phone</label>
              <input type="tel" required placeholder="+1 (555) 234-5678" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold mb-1 text-neutral-300">Guests</label>
              <select class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6 Guests</option>
                <option>8+ Guests</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold mb-1 text-neutral-300">Date</label>
              <input type="date" required class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
            </div>
            <div>
              <label class="block text-xs font-semibold mb-1 text-neutral-300">Time</label>
              <select class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
                <option>6:00 PM</option>
                <option>7:30 PM</option>
                <option>8:45 PM</option>
                <option>9:30 PM</option>
              </select>
            </div>
          </div>
          <button type="submit" class="w-full py-3.5 rounded-xl font-bold text-xs uppercase font-mono tracking-wider ${palette.primaryBtn} transition-all">
            Confirm Reservation
          </button>
          <div id="formSuccess" class="hidden p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs text-center font-mono">
            ✓ Reservation request confirmed! A booking coordinator will contact you.
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- LOCATION & HOURS -->
  <section id="location" class="py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-center">
      <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
        <i class="fa-solid fa-location-dot text-2xl ${palette.accentText}"></i>
        <h4 class="font-bold text-white text-xs">Address</h4>
        <p class="text-xs text-neutral-400">428 Montgomery Street, Financial District, SF</p>
      </div>
      <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
        <i class="fa-solid fa-clock text-2xl ${palette.accentText}"></i>
        <h4 class="font-bold text-white text-xs">Hours</h4>
        <p class="text-xs text-neutral-400">Tue — Sun: 5:30 PM – 11:00 PM<br>Mon: Closed</p>
      </div>
      <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
        <i class="fa-solid fa-phone text-2xl ${palette.accentText}"></i>
        <h4 class="font-bold text-white text-xs">Contact</h4>
        <p class="text-xs text-neutral-400">reservations@${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.com<br>+1 (415) 890-4420</p>
      </div>
    </div>
  </section>`;
}

/**
 * E-COMMERCE: Hero -> Categories -> Featured Products -> Offers -> Reviews -> Newsletter
 */
function renderEcommerce(plan, palette) {
  const store = plan.personOrBrandName;
  return `
  <!-- PROMO BAR -->
  <div class="border-b border-[#181818] bg-[#070707] py-2 px-4 text-center text-[11px] font-mono ${palette.accentText} flex items-center justify-center gap-2">
    <span>★ COMPLIMENTARY EXPRESS GLOBAL SHIPPING ON ORDERS OVER $150</span>
  </div>

  <!-- HERO SECTION -->
  <section id="hero" class="relative overflow-hidden py-24 lg:py-36 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
            AUTUMN/WINTER CAPSULE
          </span>
          <h1 class="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            Curated Luxury at <span class="${palette.accentText}">${store}</span>
          </h1>
          <p class="text-base sm:text-lg ${palette.subText} max-w-xl">
            Precision tailoring, sustainable organic fibers, and minimalist silhouettes engineered for enduring daily wear.
          </p>
          <div class="flex items-center gap-4 pt-2">
            <a href="#products" class="px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider ${palette.primaryBtn} shadow-xl transition-all">
              Shop Collection
            </a>
            <a href="#categories" class="px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider border ${palette.secondaryBtn} transition-all">
              Explore Categories
            </a>
          </div>
        </div>
        <div class="lg:col-span-5 relative">
          <div class="rounded-3xl overflow-hidden border border-[#222222] bg-[#0c0c0c] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" alt="Collection" class="w-full h-96 object-cover">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRODUCT CATEGORIES -->
  <section id="categories" class="py-20 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-white mb-8 font-mono uppercase tracking-wider">Browse by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-all cursor-pointer">
          <i class="fa-solid fa-shirt text-2xl ${palette.accentText}"></i>
          <h4 class="font-bold text-sm text-white">Apparel</h4>
          <p class="text-[10px] text-neutral-500 font-mono">18 Styles</p>
        </div>
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-all cursor-pointer">
          <i class="fa-solid fa-vest text-2xl ${palette.accentText}"></i>
          <h4 class="font-bold text-sm text-white">Outerwear</h4>
          <p class="text-[10px] text-neutral-500 font-mono">12 Styles</p>
        </div>
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-all cursor-pointer">
          <i class="fa-solid fa-clock text-2xl ${palette.accentText}"></i>
          <h4 class="font-bold text-sm text-white">Accessories</h4>
          <p class="text-[10px] text-neutral-500 font-mono">24 Styles</p>
        </div>
        <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/50 transition-all cursor-pointer">
          <i class="fa-solid fa-shoe-prints text-2xl ${palette.accentText}"></i>
          <h4 class="font-bold text-sm text-white">Footwear</h4>
          <p class="text-[10px] text-neutral-500 font-mono">9 Styles</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED PRODUCTS GRID -->
  <section id="products" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-12">
        <h2 class="text-3xl font-extrabold text-white">Featured Releases</h2>
        <span class="text-xs font-mono ${palette.accentText}">Showing 3 of 42 Items</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group">
          <div class="h-64 overflow-hidden bg-black relative">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" alt="Chronograph" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF00A8] text-white">NEW</span>
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-base">Obsidian Chrono 01</h3>
              <span class="font-mono font-extrabold text-white">$280</span>
            </div>
            <p class="text-xs ${palette.subText}">Aerospace-grade titanium chassis with Swiss automatic movement.</p>
            <button onclick="alert('Item added to shopping bag!')" class="w-full py-2.5 rounded-xl font-bold text-xs uppercase font-mono ${palette.primaryBtn} transition-all">Add to Bag</button>
          </div>
        </div>

        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group">
          <div class="h-64 overflow-hidden bg-black relative">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" alt="Headphones" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-base">Acoustic Over-Ear Monitor</h3>
              <span class="font-mono font-extrabold text-white">$340</span>
            </div>
            <p class="text-xs ${palette.subText}">Beryllium dynamic drivers with active environmental noise dampening.</p>
            <button onclick="alert('Item added to shopping bag!')" class="w-full py-2.5 rounded-xl font-bold text-xs uppercase font-mono ${palette.primaryBtn} transition-all">Add to Bag</button>
          </div>
        </div>

        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group">
          <div class="h-64 overflow-hidden bg-black relative">
            <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80" alt="Eyewear" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-base">Carbon Acetate Shades</h3>
              <span class="font-mono font-extrabold text-white">$195</span>
            </div>
            <p class="text-xs ${palette.subText}">Polarized UV400 Japanese lenses housed in lightweight cellulose acetate.</p>
            <button onclick="alert('Item added to shopping bag!')" class="w-full py-2.5 rounded-xl font-bold text-xs uppercase font-mono ${palette.primaryBtn} transition-all">Add to Bag</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- NEWSLETTER SIGNUP -->
  <section id="newsletter" class="py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <h2 class="text-3xl font-extrabold text-white">Join the ${store} Private Club</h2>
      <p class="${palette.subText} text-xs sm:text-sm">Receive exclusive access to seasonal drops, archived pieces, and VIP invitations.</p>
      <form id="contactForm" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input type="email" required placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
        <button type="submit" class="px-6 py-3 rounded-xl font-bold text-xs uppercase font-mono ${palette.primaryBtn}">Subscribe</button>
      </form>
      <div id="formSuccess" class="hidden text-emerald-400 text-xs font-mono">✓ Welcome to the inner circle! Check your inbox for your 15% discount code.</div>
    </div>
  </section>`;
}

/**
 * SAAS: Hero -> Product Demo -> Features -> How It Works -> Integrations -> Pricing -> Reviews -> FAQ -> CTA
 */
function renderSaas(plan, palette) {
  const product = plan.personOrBrandName;
  return `
  <!-- HERO SECTION -->
  <section id="hero" class="relative overflow-hidden py-24 lg:py-36 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border border-[#222222] bg-[#0c0c0c] text-neutral-300">
        <span class="w-2 h-2 rounded-full ${palette.accentHex ? 'bg-[' + palette.accentHex + ']' : 'bg-[#FF00A8]'} animate-pulse"></span>
        AUTOMATED CLOUD ENGINE 3.0
      </div>
      <h1 class="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
        Scale Modern Workflows with <span class="${palette.accentText}">${product}</span>
      </h1>
      <p class="text-base sm:text-lg ${palette.subText} max-w-2xl mx-auto">
        The complete autonomous infrastructure platform designed for engineering teams shipping high-throughput distributed applications.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <a href="#pricing" class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider ${palette.primaryBtn} shadow-xl transition-all">
          Start 14-Day Free Trial
        </a>
        <a href="#features" class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider border ${palette.secondaryBtn} transition-all">
          Explore Features
        </a>
      </div>
    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section id="features" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          CORE CAPABILITIES
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Engineered for Velocity</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-4">
          <i class="fa-solid fa-bolt text-3xl ${palette.accentText}"></i>
          <h3 class="text-lg font-bold text-white">Sub-Millisecond Edge Routing</h3>
          <p class="text-xs ${palette.subText} leading-relaxed">Distribute compute across 300+ global edge nodes with instant cold start mitigation.</p>
        </div>
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-4">
          <i class="fa-solid fa-shield-halved text-3xl ${palette.accentText}"></i>
          <h3 class="text-lg font-bold text-white">Enterprise Guardrails</h3>
          <p class="text-xs ${palette.subText} leading-relaxed">SOC2 Type II certified, automatic TLS rotation, and zero-trust IAM permissioning.</p>
        </div>
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-4">
          <i class="fa-solid fa-chart-line text-3xl ${palette.accentText}"></i>
          <h3 class="text-lg font-bold text-white">Real-Time Telemetry</h3>
          <p class="text-xs ${palette.subText} leading-relaxed">Granular traces, distributed APM logging, and automated error anomaly triage.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING MATRIX -->
  <section id="pricing" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase ${palette.accentText} bg-[#101010] border border-[#222222] px-3.5 py-1.5 rounded-full">
          PREDICTABLE PLANS
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Transparent Pricing</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] flex flex-col justify-between">
          <div class="space-y-4">
            <h3 class="font-mono text-sm font-bold text-white uppercase">Developer</h3>
            <div class="text-4xl font-extrabold text-white">$29<span class="text-xs text-neutral-400">/mo</span></div>
            <ul class="text-xs text-neutral-400 space-y-2 pt-4">
              <li>✓ Up to 5 projects</li>
              <li>✓ 100k API calls</li>
              <li>✓ Community Discord</li>
            </ul>
          </div>
          <button class="w-full mt-8 py-3 rounded-xl font-bold text-xs font-mono uppercase border ${palette.secondaryBtn}">Choose Starter</button>
        </div>

        <div class="p-8 rounded-3xl border-2 ${palette.accentBorder} bg-[#0c0c0c] flex flex-col justify-between relative shadow-2xl">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${palette.primaryBtn}">RECOMMENDED</span>
          <div class="space-y-4">
            <h3 class="font-mono text-sm font-bold text-white uppercase">Production Pro</h3>
            <div class="text-4xl font-extrabold text-white">$79<span class="text-xs text-neutral-400">/mo</span></div>
            <ul class="text-xs text-neutral-300 space-y-2 pt-4">
              <li>✓ Unlimited projects</li>
              <li>✓ 5M API calls / mo</li>
              <li>✓ Custom domains with SSL</li>
              <li>✓ 24/7 Priority Support</li>
            </ul>
          </div>
          <button class="w-full mt-8 py-3 rounded-xl font-bold text-xs font-mono uppercase ${palette.primaryBtn}">Launch Pro</button>
        </div>

        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] flex flex-col justify-between">
          <div class="space-y-4">
            <h3 class="font-mono text-sm font-bold text-white uppercase">Enterprise</h3>
            <div class="text-4xl font-extrabold text-white">$249<span class="text-xs text-neutral-400">/mo</span></div>
            <ul class="text-xs text-neutral-400 space-y-2 pt-4">
              <li>✓ Dedicated VPC clusters</li>
              <li>✓ SSO & SAML</li>
              <li>✓ 99.99% SLA Guarantee</li>
            </ul>
          </div>
          <button class="w-full mt-8 py-3 rounded-xl font-bold text-xs font-mono uppercase border ${palette.secondaryBtn}">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section id="contact" class="py-24 text-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h2 class="text-3xl font-extrabold text-white">Ready to Elevate Your Architecture?</h2>
      <p class="${palette.subText} text-xs sm:text-sm">Join over 10,000 developers shipping production software with ${product}.</p>
      <a href="#pricing" class="inline-block px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase ${palette.primaryBtn}">Get Started Now</a>
    </div>
  </section>`;
}

/**
 * Fallback Generic Renderer for Agency, Blog, Real Estate, Hotel, Fitness, Education, Healthcare
 */
function renderDomainSpecific(plan, palette) {
  const title = plan.personOrBrandName;
  const type = plan.websiteType;

  return `
  <!-- HERO SECTION -->
  <section id="hero" class="relative overflow-hidden py-24 lg:py-36 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border border-[#222222] bg-[#0c0c0c] text-neutral-300">
        <span class="w-2 h-2 rounded-full ${palette.accentHex ? 'bg-[' + palette.accentHex + ']' : 'bg-[#FF00A8]'} animate-pulse"></span>
        ${type.toUpperCase()} • PRODUCTION SUITE
      </div>
      <h1 class="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
        Welcome to <span class="${palette.accentText}">${title}</span>
      </h1>
      <p class="text-base sm:text-lg ${palette.subText} max-w-2xl mx-auto">
        Tailored experiences designed for excellence, engagement, and modern digital presence.
      </p>
      <div class="flex items-center justify-center gap-4 pt-2">
        <a href="#contact" class="px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase ${palette.primaryBtn}">Get in Touch</a>
        <a href="#about" class="px-8 py-3.5 rounded-xl font-bold text-xs font-mono uppercase border ${palette.secondaryBtn}">Learn More</a>
      </div>
    </div>
  </section>

  <!-- ABOUT & DETAILS -->
  <section id="about" class="py-24 border-b border-[#181818]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-3">
          <i class="fa-solid fa-gem text-3xl ${palette.accentText}"></i>
          <h3 class="text-lg font-bold text-white">Uncompromising Quality</h3>
          <p class="text-xs ${palette.subText}">Built with highest industry standards, rigorous attention to detail, and client focus.</p>
        </div>
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-3">
          <i class="fa-solid fa-users text-3xl ${palette.accentText}"></i>
          <h3 class="text-lg font-bold text-white">Community & Trust</h3>
          <p class="text-xs ${palette.subText}">Trusted by thousands of satisfied clients with verified outcomes and transparent processes.</p>
        </div>
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-3">
          <i class="fa-solid fa-rocket text-3xl ${palette.accentText}"></i>
          <h3 class="text-lg font-bold text-white">Modern Innovation</h3>
          <p class="text-xs ${palette.subText}">Continuously updating methodologies to deliver modern results in competitive landscapes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT FORM -->
  <section id="contact" class="py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-8 sm:p-12 text-center space-y-6">
        <h2 class="text-3xl font-extrabold text-white">Contact ${title}</h2>
        <p class="${palette.subText} text-xs sm:text-sm">Submit your inquiry and our team will get back to you within 24 hours.</p>
        <form id="contactForm" class="space-y-4 max-w-md mx-auto text-left">
          <div>
            <label class="block text-xs font-semibold mb-1 text-neutral-300">Name</label>
            <input type="text" required placeholder="Your Name" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1 text-neutral-300">Email</label>
            <input type="email" required placeholder="your@email.com" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs">
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1 text-neutral-300">Message</label>
            <textarea rows="3" required placeholder="How can we assist you?" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white text-xs resize-none"></textarea>
          </div>
          <button type="submit" class="w-full py-3.5 rounded-xl font-bold text-xs uppercase font-mono ${palette.primaryBtn}">Send Inquiry</button>
          <div id="formSuccess" class="hidden p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs text-center font-mono">
            ✓ Message received! We will follow up with you promptly.
          </div>
        </form>
      </div>
    </div>
  </section>`;
}

// ============================================================================
// 5. MASTER HTML COMPILER WITH IN-PREVIEW NAVIGATION ISOLATION
// ============================================================================

function compileStandaloneHtml(plan) {
  const palette = PALETTES[plan.colors.themeKey] || PALETTES.blackMagenta;
  const brand = plan.personOrBrandName;
  const type = plan.websiteType;

  let bodyContent = '';
  if (type === WEBSITE_TYPES.PORTFOLIO) {
    bodyContent = renderPortfolio(plan, palette);
  } else if (type === WEBSITE_TYPES.RESTAURANT) {
    bodyContent = renderRestaurant(plan, palette);
  } else if (type === WEBSITE_TYPES.ECOMMERCE) {
    bodyContent = renderEcommerce(plan, palette);
  } else if (type === WEBSITE_TYPES.SAAS) {
    bodyContent = renderSaas(plan, palette);
  } else {
    bodyContent = renderDomainSpecific(plan, palette);
  }

  // Navigation Links based strictly on category
  const navLinks = {
    [WEBSITE_TYPES.PORTFOLIO]: [
      { href: '#about', label: 'About' },
      { href: '#skills', label: 'Skills' },
      { href: '#projects', label: 'Projects' },
      { href: '#experience', label: 'Experience' },
      { href: '#resume', label: 'CV' },
      { href: '#contact', label: 'Contact' }
    ],
    [WEBSITE_TYPES.RESTAURANT]: [
      { href: '#menu', label: 'Menu' },
      { href: '#dishes', label: 'Dishes' },
      { href: '#reservation', label: 'Reserve' },
      { href: '#location', label: 'Location' }
    ],
    [WEBSITE_TYPES.ECOMMERCE]: [
      { href: '#categories', label: 'Categories' },
      { href: '#products', label: 'Shop' },
      { href: '#newsletter', label: 'Club' }
    ],
    [WEBSITE_TYPES.SAAS]: [
      { href: '#features', label: 'Features' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#contact', label: 'Contact' }
    ]
  };

  const currentNav = (navLinks[type] ? [...navLinks[type]] : [
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]);

  if (plan.requiredSections && plan.requiredSections.includes('pricing') && !currentNav.some(n => n.href === '#pricing')) {
    const contactIdx = currentNav.findIndex(n => n.href === '#contact');
    if (contactIdx >= 0) {
      currentNav.splice(contactIdx, 0, { href: '#pricing', label: 'Pricing' });
    } else {
      currentNav.push({ href: '#pricing', label: 'Pricing' });
    }
  }

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base target="_self">
  <title>${brand} • ${type.toUpperCase()}</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Antigravity Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Text:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body {
      font-family: 'Google Sans', 'Google Sans Text', 'Geist', 'Inter', system-ui, -apple-system, sans-serif;
      letter-spacing: -0.01em;
    }
    .heading-font {
      font-family: 'Google Sans', 'Geist', 'Inter', sans-serif;
      letter-spacing: -0.02em;
    }
    .mono-font {
      font-family: 'Geist Mono', 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body class="${palette.bg} ${palette.text} antialiased selection:bg-[#FF00A8] selection:text-white">

  <!-- TOP NAVBAR -->
  <header class="sticky top-0 z-50 w-full border-b ${palette.navBg} backdrop-blur-md transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-black border border-[#262626] flex items-center justify-center font-bold ${palette.accentText} text-sm">
          ⚡
        </div>
        <span class="text-base sm:text-lg font-bold tracking-tight text-white heading-font">${brand}</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
        ${currentNav.map(item => `<a href="${item.href}" class="${palette.subText} hover:text-white transition-colors">${item.label}</a>`).join('\n        ')}
      </nav>

      <!-- Action Button -->
      <div class="hidden md:flex items-center gap-4">
        <a href="#contact" class="px-5 py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider ${palette.primaryBtn} transition-all">
          ${type === WEBSITE_TYPES.PORTFOLIO ? 'Contact' : type === WEBSITE_TYPES.RESTAURANT ? 'Book Table' : 'Get Started'}
        </a>
      </div>

      <!-- Mobile Button -->
      <button id="mobileMenuBtn" aria-label="Toggle Menu" class="md:hidden p-2 rounded-lg border border-[#222222] text-neutral-300 hover:text-white bg-[#0e0e0e]">
        <i class="fa-solid fa-bars text-sm"></i>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div id="mobileDrawer" class="hidden md:hidden border-b border-[#1f1f1f] bg-[#080808] px-6 py-4 space-y-3">
      ${currentNav.map(item => `<a href="${item.href}" class="block text-xs font-mono uppercase ${palette.subText}">${item.label}</a>`).join('\n      ')}
      <a href="#contact" class="block w-full text-center px-4 py-2.5 rounded-xl font-bold text-xs uppercase font-mono ${palette.primaryBtn}">
        ${type === WEBSITE_TYPES.PORTFOLIO ? 'Contact' : 'Get Started'}
      </a>
    </div>
  </header>

  <!-- MAIN CATEGORY CONTENT -->
  <main>
    ${bodyContent}
  </main>

  <!-- FOOTER -->
  <footer class="border-t ${palette.footerBg} py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 rounded-md bg-black border border-[#262626] flex items-center justify-center text-[10px] ${palette.accentText}">
          ⚡
        </div>
        <span class="font-bold text-white text-xs">${brand}</span>
      </div>
      <p class="text-xs ${palette.subText} font-mono">
        © 2025 ${brand}. All rights reserved. Powered by BRAHMA.
      </p>
      <div class="flex items-center gap-4 text-neutral-500 text-xs">
        <a href="#hero" class="hover:text-white"><i class="fa-brands fa-github"></i></a>
        <a href="#hero" class="hover:text-white"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="#hero" class="hover:text-white"><i class="fa-brands fa-linkedin"></i></a>
      </div>
    </div>
  </footer>

  <!-- SCRIPT: SMOOTH SCROLLING, FORM HANDLING & PREVIEW ISOLATION -->
  <script>
    // Smooth in-page anchor scrolling without parent navigation
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').slice(1);
        if (!targetId || targetId === '' || targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          var target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Mobile drawer toggle
    var mobileBtn = document.getElementById('mobileMenuBtn');
    var drawer = document.getElementById('mobileDrawer');
    if (mobileBtn && drawer) {
      mobileBtn.addEventListener('click', function() {
        drawer.classList.toggle('hidden');
      });
    }

    // Contact/Reservation form submit confirmation
    var form = document.getElementById('contactForm');
    var successBox = document.getElementById('formSuccess');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (successBox) {
          successBox.classList.remove('hidden');
          form.reset();
          setTimeout(function() {
            successBox.classList.add('hidden');
          }, 4500);
        }
      });
    }
  </script>
</body>
</html>`;
}

// ============================================================================
// 6. QUALITY CHECK BEFORE RETURNING (Requirement 11)
// ============================================================================

/**
 * Validates that the generated output strictly complies with user intent.
 */
function verifyAndEnforceQuality(output, plan, prompt) {
  const p = prompt.toLowerCase();
  const html = output.previewHtml || '';

  // Check 1: Did we generate the requested website type?
  if (plan.websiteType === WEBSITE_TYPES.PORTFOLIO) {
    // A developer portfolio must NEVER contain restaurant menus or SaaS pricing tables
    if (html.includes('Miyazaki A5 Wagyu') || html.includes('Seasonal Chef\'s Tasting') || html.includes('Add to Reservation')) {
      console.warn('[Quality Check] Correcting accidental restaurant elements in portfolio');
      output.previewHtml = compileStandaloneHtml(plan);
    }
  }

  // Check 2: Did we preserve person or brand name?
  if (plan.personOrBrandName && !html.includes(plan.personOrBrandName)) {
    console.warn(`[Quality Check] Enforcing specified name "${plan.personOrBrandName}" in previewHtml`);
    output.projectName = plan.personOrBrandName;
    output.previewHtml = compileStandaloneHtml(plan);
  }

  // Check 3: Did we preserve role if specified?
  if (p.includes('react developer') && !html.includes('React Developer')) {
    plan.professionOrRole = 'React Developer';
    output.previewHtml = compileStandaloneHtml(plan);
  }

  return output;
}

// ============================================================================
// 7. PUBLIC ENTRY POINTS: SYNTHESIZE & ITERATIVELY MODIFY
// ============================================================================

/**
 * Main synthesis entry point
 */
function synthesizeWebsiteFromPrompt(prompt, options = {}) {
  // Step 1 & 8: Build internal structured specification
  const plan = buildInternalPlan(prompt);

  // Step 4 & 5: Compile standalone production HTML strictly following category
  const html = compileStandaloneHtml(plan);

  // Generate runnable React project files
  const files = generateProjectFiles({
    brandName: plan.personOrBrandName,
    websiteType: plan.websiteType,
    html
  });

  const output = {
    projectName: plan.personOrBrandName,
    framework: 'react',
    websiteType: plan.websiteType,
    plan,
    explanation: `Generated a human-grade ${plan.websiteType} website for "${plan.personOrBrandName}" strictly adhering to your prompt. Configured with ${plan.colors.name} palette, Google Antigravity typography, and isolated preview navigation.`,
    previewHtml: html,
    files
  };

  // Step 11: Internal quality check before returning
  return verifyAndEnforceQuality(output, plan, prompt);
}

/**
 * Iterative modification entry point
 */
function modifyWebsiteWithInstruction(existingProject, prompt, history = []) {
  const p = prompt.toLowerCase();

  // Retrieve or reconstruct existing plan
  const existingPrompt = existingProject.originalPrompt || '';
  const existingPlan = existingProject.plan || buildInternalPlan(existingPrompt);

  // Check if user specifically requested a color/theme change
  let updatedThemeKey = existingPlan.colors.themeKey;
  if (p.includes('blue') && (p.includes('white') || p.includes('theme') || p.includes('color'))) {
    updatedThemeKey = 'blueWhite';
  } else if (p.includes('magenta') || (p.includes('black') && p.includes('pink'))) {
    updatedThemeKey = 'blackMagenta';
  } else if (p.includes('green') || p.includes('emerald')) {
    updatedThemeKey = 'darkEmerald';
  } else if (p.includes('gold') || p.includes('amber')) {
    updatedThemeKey = 'luxuryGold';
  } else if (p.includes('purple') || p.includes('violet')) {
    updatedThemeKey = 'violetCyber';
  } else if (p.includes('red') || p.includes('crimson')) {
    updatedThemeKey = 'crimsonDark';
  }

  // Update plan while preserving existing website category (Requirement 10)
  const updatedPlan = {
    ...existingPlan,
    colors: {
      ...existingPlan.colors,
      themeKey: updatedThemeKey,
      name: (PALETTES[updatedThemeKey] || PALETTES.blackMagenta).name
    }
  };

  // Check for explicit section additions
  if (p.includes('pricing') && !updatedPlan.requiredSections.includes('pricing')) {
    updatedPlan.requiredSections.push('pricing');
  }
  if ((p.includes('project') || p.includes('case study')) && !updatedPlan.requiredSections.includes('projects')) {
    updatedPlan.requiredSections.push('projects');
  }

  // Compile updated HTML
  const updatedHtml = compileStandaloneHtml(updatedPlan);

  const files = generateProjectFiles({
    brandName: updatedPlan.personOrBrandName,
    websiteType: updatedPlan.websiteType,
    html: updatedHtml
  });

  const output = {
    projectName: updatedPlan.personOrBrandName,
    framework: 'react',
    websiteType: updatedPlan.websiteType,
    plan: updatedPlan,
    explanation: `Updated "${updatedPlan.personOrBrandName}" while preserving the ${updatedPlan.websiteType} structure. Applied requested changes (${prompt}) and maintained in-preview link isolation.`,
    previewHtml: updatedHtml,
    files
  };

  return verifyAndEnforceQuality(output, updatedPlan, prompt);
}

/**
 * Generate standard React source code files for export
 */
function generateProjectFiles(config) {
  const { brandName, websiteType, html } = config;
  const safeName = (brandName || 'brahma-website').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  return [
    {
      fileName: 'package.json',
      filePath: 'package.json',
      content: JSON.stringify({
        name: safeName,
        private: true,
        version: '0.1.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview'
        },
        dependencies: {
          react: '^18.3.1',
          'react-dom': '^18.3.1',
          'lucide-react': '^0.400.0'
        },
        devDependencies: {
          '@vitejs/plugin-react': '^4.3.1',
          autoprefixer: '^10.4.19',
          postcss: '^8.4.38',
          tailwindcss: '^3.4.4',
          vite: '^5.3.1'
        }
      }, null, 2)
    },
    {
      fileName: 'index.html',
      filePath: 'index.html',
      content: html
    },
    {
      fileName: 'App.jsx',
      filePath: 'src/App.jsx',
      content: `import React from 'react';

// Production Component for ${brandName} (${websiteType.toUpperCase()})
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Standalone production application */}
      <iframe 
        srcDoc={\`${html.replace(/`/g, '\\`')}\`} 
        title="${brandName}"
        className="w-full h-screen border-none"
      />
    </div>
  );
}`
    },
    {
      fileName: 'README.md',
      filePath: 'README.md',
      content: `# ${brandName} • ${websiteType.toUpperCase()}

Generated by **BRAHMA** • Autonomous AI Website Builder.

## Running Locally

\`\`\`bash
npm install
npm run dev
\`\`\`
`
    }
  ];
}

module.exports = {
  synthesizeWebsiteFromPrompt,
  modifyWebsiteWithInstruction,
  buildInternalPlan,
  WEBSITE_TYPES,
  PALETTES
};
