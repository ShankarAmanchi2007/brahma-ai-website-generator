/**
 * BRAHMA • Autonomous AI Website Creator
 * High-Fidelity Code Generator & Design System Engine
 * Generates human-designed, responsive, production-grade web applications.
 */

// Niche classification keywords
const NICHES = {
  restaurant: ['restaurant', 'cafe', 'food', 'bakery', 'dining', 'pizza', 'bistro', 'coffee', 'bar', 'chef', 'menu', 'steak', 'gourmet', 'culinary'],
  portfolio: ['portfolio', 'resume', 'cv', 'developer', 'engineer', 'student', 'designer', 'personal website', 'freelancer', 'coder', 'programmer'],
  saas: ['saas', 'software', 'app', 'platform', 'ai tool', 'cloud', 'analytics', 'dashboard', 'tech startup', 'automation', 'devops', 'api'],
  ecommerce: ['shop', 'store', 'ecommerce', 'e-commerce', 'products', 'clothing', 'fashion', 'shoes', 'retail', 'cart', 'boutique', 'apparel'],
  agency: ['agency', 'marketing', 'creative', 'studio', 'consulting', 'digital marketing', 'branding', 'media', 'architectural'],
  fitness: ['gym', 'fitness', 'workout', 'trainer', 'yoga', 'crossfit', 'sports', 'health club', 'bodybuilding', 'athletic'],
  realestate: ['real estate', 'property', 'realtor', 'homes', 'apartments', 'villa', 'housing', 'architecture'],
  education: ['course', 'academy', 'school', 'learn', 'education', 'university', 'tutoring', 'bootcamp', 'classes'],
  healthcare: ['clinic', 'doctor', 'hospital', 'medical', 'dental', 'health', 'dentist', 'therapy', 'pharmacy']
};

// BRAHMA Design System Palette Presets
const THEMES = {
  brahmaDark: {
    name: 'BRAHMA Obsidian & Magenta',
    bg: 'bg-[#050505]',
    text: 'text-white',
    cardBg: 'bg-[#0c0c0c] border-[#1f1f1f]',
    primary: 'from-[#FF00A8] to-[#D9008F]',
    primaryBtn: 'bg-[#FF00A8] hover:bg-[#D9008F] text-white',
    secondaryBtn: 'border-[#262626] bg-[#121212] hover:bg-[#181818] text-neutral-300 hover:text-white',
    accentText: 'text-[#FF00A8]',
    accentBorder: 'border-[#FF00A8]',
    accentBg: 'bg-[#FF00A8]/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#050505]/90 border-[#1a1a1a]',
    footerBg: 'bg-[#050505] border-[#1a1a1a]'
  },
  dark: {
    name: 'Carbon & Hot Magenta',
    bg: 'bg-[#070707]',
    text: 'text-white',
    cardBg: 'bg-[#0e0e0e] border-[#222222]',
    primary: 'from-[#FF00A8] to-[#BF007E]',
    primaryBtn: 'bg-[#FF00A8] hover:bg-[#D9008F] text-white',
    secondaryBtn: 'border-[#262626] bg-[#141414] hover:bg-[#1c1c1c] text-neutral-300',
    accentText: 'text-[#FF00A8]',
    accentBorder: 'border-[#FF00A8]',
    accentBg: 'bg-[#FF00A8]/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#070707]/90 border-[#1f1f1f]',
    footerBg: 'bg-[#070707] border-[#1f1f1f]'
  },
  blueWhite: {
    name: 'Minimal Ocean & Ice',
    bg: 'bg-[#070b14]',
    text: 'text-white',
    cardBg: 'bg-[#0c1222] border-[#1b253b]',
    primary: 'from-blue-500 to-cyan-400',
    primaryBtn: 'bg-blue-600 hover:bg-blue-500 text-white',
    secondaryBtn: 'border-[#1b253b] bg-[#0c1222] hover:bg-[#131c33] text-neutral-300',
    accentText: 'text-blue-400',
    accentBorder: 'border-blue-500',
    accentBg: 'bg-blue-500/10',
    subText: 'text-slate-400',
    navBg: 'bg-[#070b14]/90 border-[#1b253b]',
    footerBg: 'bg-[#070b14] border-[#1b253b]'
  },
  violetDark: {
    name: 'Cyberpunk Neon',
    bg: 'bg-[#09050d]',
    text: 'text-white',
    cardBg: 'bg-[#120a1c] border-[#251538]',
    primary: 'from-[#FF00A8] to-violet-600',
    primaryBtn: 'bg-[#FF00A8] hover:bg-[#D9008F] text-white',
    secondaryBtn: 'border-[#251538] bg-[#120a1c] hover:bg-[#1a0e28] text-neutral-300',
    accentText: 'text-[#FF00A8]',
    accentBorder: 'border-[#FF00A8]',
    accentBg: 'bg-[#FF00A8]/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#09050d]/90 border-[#251538]',
    footerBg: 'bg-[#09050d] border-[#251538]'
  },
  goldDark: {
    name: 'Luxury Amber & Obsidian',
    bg: 'bg-[#080808]',
    text: 'text-neutral-100',
    cardBg: 'bg-[#101010] border-[#262420]',
    primary: 'from-amber-400 to-amber-600',
    primaryBtn: 'bg-amber-400 hover:bg-amber-300 text-black font-bold',
    secondaryBtn: 'border-[#262420] bg-[#121212] hover:bg-[#1a1a1a] text-neutral-300',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-400',
    accentBg: 'bg-amber-400/10',
    subText: 'text-neutral-400',
    navBg: 'bg-[#080808]/90 border-[#262420]',
    footerBg: 'bg-[#080808] border-[#262420]'
  }
};

function detectNiche(prompt) {
  const p = prompt.toLowerCase();
  for (const [niche, keywords] of Object.entries(NICHES)) {
    if (keywords.some(kw => p.includes(kw))) {
      return niche;
    }
  }
  return 'saas';
}

function detectTheme(prompt, fallback = 'brahmaDark') {
  const p = prompt.toLowerCase();
  if (p.includes('blue') && (p.includes('white') || p.includes('light') || p.includes('ocean'))) return 'blueWhite';
  if (p.includes('purple') || p.includes('violet') || p.includes('cyberpunk') || p.includes('neon')) return 'violetDark';
  if (p.includes('gold') || p.includes('luxury') || p.includes('amber') || p.includes('warm')) return 'goldDark';
  return fallback || 'brahmaDark';
}

function extractProjectName(prompt, niche) {
  const match = prompt.match(/(?:named|called|for)\s+["']?([A-Z][a-zA-Z0-9\s]+)["']?/);
  if (match && match[1].trim().length < 28) {
    return match[1].trim();
  }
  const defaults = {
    portfolio: 'Kaelen Vance',
    restaurant: 'L\'Atelier Noir',
    saas: 'Synthetix AI',
    ecommerce: 'Monolith Goods',
    agency: 'Atelier Vanguard',
    fitness: 'Valkyrie Athletic',
    realestate: 'Aethel Luxury Real Estate',
    education: 'Apex Mastery Academy',
    healthcare: 'NovaCare BioLab'
  };
  return defaults[niche] || 'Apex Studio';
}

/**
 * Generate full website bundle
 */
function synthesizeWebsiteFromPrompt(prompt, options = {}) {
  const niche = detectNiche(prompt);
  const themeKey = detectTheme(prompt, 'brahmaDark');
  const theme = THEMES[themeKey] || THEMES.brahmaDark;
  const brandName = extractProjectName(prompt, niche);

  const p = prompt.toLowerCase();
  const includePricing = p.includes('pricing') || niche === 'saas';
  const includeMenu = p.includes('menu') || niche === 'restaurant';
  const includeProjects = p.includes('project') || p.includes('work') || niche === 'portfolio';
  const includeSkills = p.includes('skill') || niche === 'portfolio';
  const includeReviews = p.includes('review') || p.includes('testimonial') || true;
  const includeContact = p.includes('contact') || true;
  const includeAbout = p.includes('about') || true;

  const html = generateInteractiveHtml({
    brandName,
    niche,
    themeKey,
    theme,
    originalPrompt: prompt,
    includePricing,
    includeMenu,
    includeProjects,
    includeSkills,
    includeReviews,
    includeContact,
    includeAbout
  });

  const files = generateProjectFiles({
    brandName,
    niche,
    themeKey,
    theme,
    originalPrompt: prompt,
    html
  });

  return {
    projectName: brandName,
    framework: 'react',
    niche,
    theme: themeKey,
    explanation: `Synthesized a human-designed, responsive ${niche} web application for "${brandName}" with BRAHMA design system, clean carbon surfaces, hot-magenta accents, and isolated navigation.`,
    previewHtml: html,
    files
  };
}

/**
 * Iterative modification engine
 */
function modifyWebsiteWithInstruction(existingProject, prompt, history = []) {
  const p = prompt.toLowerCase();
  let themeKey = existingProject.theme || 'brahmaDark';

  if (p.includes('theme') || p.includes('color') || p.includes('blue') || p.includes('magenta') || p.includes('gold')) {
    themeKey = detectTheme(prompt, themeKey);
  }

  const niche = existingProject.niche || detectNiche(existingProject.originalPrompt || prompt);
  const brandName = existingProject.projectName || extractProjectName(prompt, niche);
  const theme = THEMES[themeKey] || THEMES.brahmaDark;

  let currentHtml = existingProject.generatedCode || '';

  const wantsPricing = p.includes('pricing');
  const wantsContact = p.includes('contact');
  const wantsReviews = p.includes('review') || p.includes('testimonial');
  const wantsProjects = p.includes('project') || p.includes('work');
  const wantsMenu = p.includes('menu') || niche === 'restaurant';
  const wantsHeroBigger = p.includes('hero') && (p.includes('large') || p.includes('bigger') || p.includes('expand'));

  const updatedHtml = generateInteractiveHtml({
    brandName,
    niche,
    themeKey,
    theme,
    originalPrompt: `${existingProject.originalPrompt} | Iteration: ${prompt}`,
    includePricing: wantsPricing || currentHtml.includes('id="pricing"'),
    includeMenu: wantsMenu || currentHtml.includes('id="menu"'),
    includeProjects: wantsProjects || currentHtml.includes('id="projects"'),
    includeSkills: niche === 'portfolio' || currentHtml.includes('id="skills"'),
    includeReviews: wantsReviews || currentHtml.includes('id="reviews"') || currentHtml.includes('id="testimonials"'),
    includeContact: wantsContact || currentHtml.includes('id="contact"'),
    includeAbout: currentHtml.includes('id="about"') || true,
    heroSize: wantsHeroBigger ? 'large' : 'normal'
  });

  const files = generateProjectFiles({
    brandName,
    niche,
    themeKey,
    theme,
    originalPrompt: `${existingProject.originalPrompt} + ${prompt}`,
    html: updatedHtml
  });

  let explanation = `Updated "${brandName}" based on your instruction: "${prompt}".`;
  if (p.includes('theme') || p.includes('color')) {
    explanation += ` Adjusted color palette to ${theme.name}.`;
  }
  if (wantsPricing) {
    explanation += ` Added transparent 3-tier pricing matrix with interactive billing options.`;
  }
  if (wantsContact) {
    explanation += ` Integrated a sleek responsive contact form with confirmation states.`;
  }
  if (wantsHeroBigger) {
    explanation += ` Expanded hero presentation with high-impact typography and twin actions.`;
  }
  explanation += ` Preserved all existing sections, responsive viewport adaptability, and in-frame navigation.`;

  return {
    projectName: brandName,
    framework: 'react',
    niche,
    theme: themeKey,
    explanation,
    previewHtml: updatedHtml,
    files
  };
}

/**
 * Generate human-designed, production-grade standalone HTML
 */
function generateInteractiveHtml(config) {
  const { brandName, niche, theme, includePricing, includeMenu, includeProjects, includeSkills, includeReviews, includeContact, includeAbout, heroSize } = config;

  // Unsplash images by niche with verified high quality
  const images = {
    restaurant: {
      hero: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
      dish1: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      dish2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      dish3: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
      interior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    },
    portfolio: {
      hero: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      project1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      project2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      project3: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
    },
    saas: {
      hero: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
      dash: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
    },
    ecommerce: {
      hero: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
      prod1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      prod2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      prod3: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80'
    }
  };

  const imgSet = images[niche] || images.saas;

  // Curated editorial copy
  let heroTagline = 'Autonomous Architecture for the Next Web';
  let heroDesc = 'Engineered with precision typography, sub-second interaction speed, and scalable distributed state.';
  if (niche === 'portfolio') {
    heroTagline = 'Software Engineer & Systems Architect';
    heroDesc = 'Specializing in distributed backend runtimes, high-throughput data pipelines, and developer tooling.';
  } else if (niche === 'restaurant') {
    heroTagline = 'Artisanal Gastronomy & Modern Hospitality';
    heroDesc = 'A sensory dining journey celebrating wood-fired seasonal provisions and rare vintage pairings in an intimate setting.';
  } else if (niche === 'ecommerce') {
    heroTagline = 'Precision Crafted Goods for Daily Purpose';
    heroDesc = 'Minimalist hardware, refined timepieces, and acoustic equipment crafted with aerospace-grade tolerances.';
  }

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base target="_self">
  <title>${brandName} • Powered by BRAHMA</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Antigravity Typography Stack -->
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
      font-family: 'Google Sans', 'Geist', 'Space Grotesk', 'Inter', sans-serif;
      letter-spacing: -0.02em;
    }
    .mono-font {
      font-family: 'Geist Mono', 'JetBrains Mono', 'Google Sans Code', monospace;
    }
  </style>
</head>
<body class="${theme.bg} ${theme.text} antialiased selection:bg-[#FF00A8] selection:text-white">

  <!-- TOP BANNER BAR -->
  <div class="border-b border-[#181818] bg-[#070707] py-2 px-4 text-center text-[11px] mono-font text-neutral-400 flex items-center justify-center gap-2">
    <span class="w-1.5 h-1.5 rounded-full bg-[#FF00A8] animate-pulse"></span>
    <span>RELEASE v2.5 NOW LIVE</span>
    <span class="text-neutral-700">•</span>
    <span class="text-neutral-300">EXPLORE THE ARCHITECTURE</span>
  </div>

  <!-- NAVBAR -->
  <header class="sticky top-0 z-50 w-full border-b ${theme.navBg} backdrop-blur-md transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-9 h-9 rounded-lg bg-black border border-[#2a2a2a] flex items-center justify-center text-white relative overflow-hidden group-hover:border-[#FF00A8] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h8a4 4 0 0 1 0 8H6V3z" />
            <path d="M6 11h9a4 4 0 0 1 0 8H6V11z" />
            <circle cx="15" cy="11" r="1.5" fill="#FF00A8" stroke="none" />
          </svg>
        </div>
        <span class="text-lg font-bold tracking-tight heading-font text-white">${brandName}</span>
      </a>

      <!-- Desktop Nav Links -->
      <nav class="hidden md:flex items-center gap-8 text-xs mono-font uppercase tracking-wider">
        ${includeAbout ? `<a href="#about" class="${theme.subText} hover:text-white transition-colors">About</a>` : ''}
        ${includeMenu ? `<a href="#menu" class="${theme.subText} hover:text-white transition-colors">Menu</a>` : ''}
        ${includeProjects ? `<a href="#projects" class="${theme.subText} hover:text-white transition-colors">Projects</a>` : ''}
        ${includeSkills ? `<a href="#skills" class="${theme.subText} hover:text-white transition-colors">Stack</a>` : ''}
        ${includePricing ? `<a href="#pricing" class="${theme.subText} hover:text-white transition-colors">Pricing</a>` : ''}
        ${includeReviews ? `<a href="#reviews" class="${theme.subText} hover:text-white transition-colors">Reviews</a>` : ''}
        ${includeContact ? `<a href="#contact" class="${theme.subText} hover:text-white transition-colors">Contact</a>` : ''}
      </nav>

      <!-- Action Button -->
      <div class="hidden md:flex items-center gap-4">
        <a href="#contact" class="px-5 py-2.5 rounded-xl font-bold text-xs mono-font uppercase tracking-wider transition-all duration-200 shadow-md ${theme.primaryBtn}">
          ${niche === 'restaurant' ? 'Book a Table' : niche === 'portfolio' ? 'Initiate Contact' : 'Get Started'}
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <button id="mobileMenuBtn" aria-label="Toggle Menu" class="md:hidden p-2 rounded-lg border border-[#222222] text-neutral-300 hover:text-white bg-[#0e0e0e]">
        <i class="fa-solid fa-bars text-sm"></i>
      </button>
    </div>

    <!-- Mobile Drawer Menu -->
    <div id="mobileDrawer" class="hidden md:hidden border-b border-[#1f1f1f] bg-[#080808] px-6 py-6 space-y-4">
      ${includeAbout ? `<a href="#about" class="block text-sm mono-font uppercase ${theme.subText}">About</a>` : ''}
      ${includeMenu ? `<a href="#menu" class="block text-sm mono-font uppercase ${theme.subText}">Menu</a>` : ''}
      ${includeProjects ? `<a href="#projects" class="block text-sm mono-font uppercase ${theme.subText}">Projects</a>` : ''}
      ${includeSkills ? `<a href="#skills" class="block text-sm mono-font uppercase ${theme.subText}">Stack</a>` : ''}
      ${includePricing ? `<a href="#pricing" class="block text-sm mono-font uppercase ${theme.subText}">Pricing</a>` : ''}
      ${includeReviews ? `<a href="#reviews" class="block text-sm mono-font uppercase ${theme.subText}">Reviews</a>` : ''}
      ${includeContact ? `<a href="#contact" class="block text-sm mono-font uppercase ${theme.subText}">Contact</a>` : ''}
      <a href="#contact" class="block w-full text-center px-4 py-3 rounded-xl font-bold text-xs uppercase mono-font ${theme.primaryBtn}">
        ${niche === 'restaurant' ? 'Book Table' : 'Get Started'}
      </a>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative overflow-hidden ${heroSize === 'large' ? 'py-32 lg:py-44' : 'py-20 lg:py-32'}">
    <!-- Subtle magenta depth ambient glow -->
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF00A8]/10 blur-[150px] pointer-events-none rounded-full"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border border-[#222222] bg-[#0e0e0e] text-neutral-300">
            <span class="w-1.5 h-1.5 rounded-full bg-[#FF00A8] animate-pulse"></span>
            ${niche.toUpperCase()} • PRODUCTION RELEASE
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight heading-font leading-[1.12] text-white">
            ${heroTagline}
          </h1>

          <p class="text-base sm:text-lg ${theme.subText} max-w-2xl leading-relaxed">
            ${heroDesc}
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <a href="#contact" class="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs mono-font uppercase tracking-wider shadow-xl transition-all duration-200 ${theme.primaryBtn} text-center flex items-center justify-center gap-2">
              <span>${niche === 'restaurant' ? 'Reserve A Table' : niche === 'portfolio' ? 'Explore Case Studies' : 'Launch Experience'}</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
            <a href="${includeAbout ? '#about' : '#reviews'}" class="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs mono-font uppercase tracking-wider border transition-all duration-200 ${theme.secondaryBtn} text-center">
              Overview
            </a>
          </div>

          <!-- Metrics Strip -->
          <div class="pt-8 grid grid-cols-3 gap-6 border-t border-[#1a1a1a] max-w-lg mx-auto lg:mx-0 font-mono">
            <div>
              <p class="text-2xl sm:text-3xl font-extrabold heading-font text-white">99.98%</p>
              <p class="text-[11px] text-neutral-500 uppercase mt-1">Uptime SLA</p>
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-extrabold heading-font text-[#FF00A8]">0.4ms</p>
              <p class="text-[11px] text-neutral-500 uppercase mt-1">Edge Latency</p>
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-extrabold heading-font text-white">4.9 ★</p>
              <p class="text-[11px] text-neutral-500 uppercase mt-1">Satisfaction</p>
            </div>
          </div>
        </div>

        <!-- Hero Visual Showcase -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#222222] bg-[#0c0c0c] group">
            <img src="${imgSet.hero}" alt="${brandName} Showcase" class="w-full h-80 sm:h-96 lg:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90">
            <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0a0a0a]/90 border border-[#222222] backdrop-blur-md">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-bold text-xs font-mono uppercase tracking-wider text-white">${brandName}</h4>
                  <p class="text-[11px] text-neutral-400 font-mono">Verified Production Grade</p>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF00A8]/20 text-[#FF00A8] border border-[#FF00A8]/30">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${includeAbout ? `
  <!-- ABOUT SECTION -->
  <section id="about" class="py-24 border-t border-[#1a1a1a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
            CORE PHILOSOPHY
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold heading-font mt-4 mb-6 text-white">Built for High Velocity & Visual Precision</h2>
          <p class="${theme.subText} text-sm sm:text-base leading-relaxed mb-6">
            We blend rigorous software design patterns with an uncompromising aesthetic philosophy. No bloated abstractions, no decorative fluff—just intentional typography, resilient layouts, and delightful responsiveness.
          </p>
          <div class="space-y-4 font-sans">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] text-[#FF00A8] flex items-center justify-center shrink-0 mt-1">
                <i class="fa-solid fa-code"></i>
              </div>
              <div>
                <h4 class="font-bold text-sm text-white">Type-Safe & Semantic</h4>
                <p class="${theme.subText} text-xs">Standard HTML5, accessible tags, and structured data layout.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <div>
                <h4 class="font-bold text-sm text-white">Sub-Second Execution</h4>
                <p class="${theme.subText} text-xs">Zero unneeded re-renders, lean dependencies, and optimized bundle weight.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 font-mono">
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
            <div class="text-[#FF00A8] text-xl font-bold">01</div>
            <h3 class="text-sm font-bold text-white uppercase">Architected</h3>
            <p class="text-xs text-neutral-400">Battle-tested design tokens and responsive breakpoints.</p>
          </div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2 mt-6">
            <div class="text-[#FF00A8] text-xl font-bold">02</div>
            <h3 class="text-sm font-bold text-white uppercase">Human-Centric</h3>
            <p class="text-xs text-neutral-400">Curated negative space, high contrast, and crisp hierarchies.</p>
          </div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2">
            <div class="text-[#FF00A8] text-xl font-bold">03</div>
            <h3 class="text-sm font-bold text-white uppercase">Scale-Ready</h3>
            <p class="text-xs text-neutral-400">Compatible with serverless edges, CDNs, and Docker runtimes.</p>
          </div>
          <div class="p-6 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-2 mt-6">
            <div class="text-[#FF00A8] text-xl font-bold">04</div>
            <h3 class="text-sm font-bold text-white uppercase">Exportable</h3>
            <p class="text-xs text-neutral-400">One-click ZIP archive with package.json and full source files.</p>
          </div>
        </div>
      </div>
    </div>
  </section>` : ''}

  ${includeMenu ? `
  <!-- RESTAURANT MENU SECTION -->
  <section id="menu" class="py-24 border-t border-[#1a1a1a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
          CURATED DEGUSTATION
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold heading-font text-white">Seasonal Chef's Tasting</h2>
        <p class="${theme.subText} text-xs sm:text-sm">Harvested daily from certified biodynamic growers, prepared over white oak embers.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden shadow-lg hover:border-[#FF00A8]/40 transition-all">
          <img src="${imgSet.dish1 || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'}" alt="A5 Wagyu Striploin" class="w-full h-48 object-cover opacity-90">
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-base text-white">Miyazaki A5 Wagyu</h3>
              <span class="font-mono font-extrabold text-[#FF00A8]">$68</span>
            </div>
            <p class="text-xs ${theme.subText} leading-relaxed">Charcoal seared striploin, fermented black garlic purée, bone marrow emulsion, shaved Perigord truffle.</p>
            <button class="w-full py-2.5 rounded-xl text-xs font-bold mono-font uppercase ${theme.primaryBtn}">Add to Reservation</button>
          </div>
        </div>

        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden shadow-lg hover:border-[#FF00A8]/40 transition-all">
          <img src="${imgSet.dish2 || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'}" alt="Handmade Agnolotti" class="w-full h-48 object-cover opacity-90">
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-base text-white">Smoked Ricotta Agnolotti</h3>
              <span class="font-mono font-extrabold text-[#FF00A8]">$38</span>
            </div>
            <p class="text-xs ${theme.subText} leading-relaxed">36-yolk egg pasta, roasted pine mushroom consommé, brown butter sage crunch, aged Parmigiano.</p>
            <button class="w-full py-2.5 rounded-xl text-xs font-bold mono-font uppercase ${theme.primaryBtn}">Add to Reservation</button>
          </div>
        </div>

        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden shadow-lg hover:border-[#FF00A8]/40 transition-all">
          <img src="${imgSet.dish3 || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80'}" alt="Woodfired Octopus" class="w-full h-48 object-cover opacity-90">
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-base text-white">Glazed Spanish Octopus</h3>
              <span class="font-mono font-extrabold text-[#FF00A8]">$42</span>
            </div>
            <p class="text-xs ${theme.subText} leading-relaxed">Sous-vide braised tentacles, smoked paprika romesco, fingerling potatoes, preserved lemon gremolata.</p>
            <button class="w-full py-2.5 rounded-xl text-xs font-bold mono-font uppercase ${theme.primaryBtn}">Add to Reservation</button>
          </div>
        </div>
      </div>
    </div>
  </section>` : ''}

  ${includeProjects ? `
  <!-- PORTFOLIO / CASE STUDIES SECTION -->
  <section id="projects" class="py-24 border-t border-[#1a1a1a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
            PRODUCTION ARCHITECTURE
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold heading-font mt-4 text-white">Featured Engineering Systems</h2>
        </div>
        <p class="${theme.subText} text-xs sm:text-sm font-mono max-w-md">Scalable distributed services, low-latency APIs, and open-source packages.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group hover:border-[#FF00A8]/50 transition-all flex flex-col justify-between">
          <div class="h-44 overflow-hidden bg-black relative">
            <img src="${imgSet.project1 || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="Telemetry Engine">
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 border border-[#262626] text-white">Go • WebSockets</div>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-lg font-bold text-white font-display">AetherPulse Telemetry Daemon</h3>
            <p class="text-xs ${theme.subText} leading-relaxed">High-throughput event bus streaming 120k network metrics/sec with disk ring-buffer spillover.</p>
            <div class="flex items-center gap-4 pt-2 font-mono text-xs">
              <a href="#" class="text-[#FF00A8] hover:underline font-bold">Case Study →</a>
              <a href="#" class="text-neutral-400 hover:text-white"><i class="fa-brands fa-github mr-1"></i>Repo</a>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group hover:border-[#FF00A8]/50 transition-all flex flex-col justify-between">
          <div class="h-44 overflow-hidden bg-black relative">
            <img src="${imgSet.project2 || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="Neural Workspace">
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 border border-[#262626] text-white">TypeScript • Rust</div>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-lg font-bold text-white font-display">Cognitive Canvas Studio</h3>
            <p class="text-xs ${theme.subText} leading-relaxed">Interactive node-graph IDE compiling multi-agent orchestration flows directly into executable Docker containers.</p>
            <div class="flex items-center gap-4 pt-2 font-mono text-xs">
              <a href="#" class="text-[#FF00A8] hover:underline font-bold">Case Study →</a>
              <a href="#" class="text-neutral-400 hover:text-white"><i class="fa-brands fa-github mr-1"></i>Repo</a>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden group hover:border-[#FF00A8]/50 transition-all flex flex-col justify-between">
          <div class="h-44 overflow-hidden bg-black relative">
            <img src="${imgSet.project3 || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="Vector Store">
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 border border-[#262626] text-white">C++ • WASM</div>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-lg font-bold text-white font-display">ZeroKV Embedded Vector Store</h3>
            <p class="text-xs ${theme.subText} leading-relaxed">In-browser HNSW indexer enabling sub-10ms nearest neighbor queries across 500k embedding vectors.</p>
            <div class="flex items-center gap-4 pt-2 font-mono text-xs">
              <a href="#" class="text-[#FF00A8] hover:underline font-bold">Case Study →</a>
              <a href="#" class="text-neutral-400 hover:text-white"><i class="fa-brands fa-github mr-1"></i>Repo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>` : ''}

  ${includeSkills ? `
  <!-- STACK & TOOLS SECTION -->
  <section id="skills" class="py-24 border-t border-[#1a1a1a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
          TECHNICAL COMPETENCIES
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold heading-font text-white">Ecosystem & Infrastructure</h2>
        <p class="${theme.subText} text-xs sm:text-sm">Technologies utilized across distributed systems, frontend runtimes, and databases.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/40 transition-colors">
          <i class="fa-brands fa-react text-2xl text-cyan-400"></i>
          <h4 class="font-bold text-xs text-white">React 18</h4>
          <p class="text-[10px] text-neutral-500">Advanced</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/40 transition-colors">
          <i class="fa-brands fa-node-js text-2xl text-emerald-400"></i>
          <h4 class="font-bold text-xs text-white">Node & Go</h4>
          <p class="text-[10px] text-neutral-500">Distributed</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/40 transition-colors">
          <i class="fa-solid fa-database text-2xl text-[#FF00A8]"></i>
          <h4 class="font-bold text-xs text-white">PostgreSQL</h4>
          <p class="text-[10px] text-neutral-500">Relational</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/40 transition-colors">
          <i class="fa-brands fa-docker text-2xl text-blue-400"></i>
          <h4 class="font-bold text-xs text-white">Containers</h4>
          <p class="text-[10px] text-neutral-500">DevOps</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/40 transition-colors">
          <i class="fa-brands fa-python text-2xl text-yellow-400"></i>
          <h4 class="font-bold text-xs text-white">Python AI</h4>
          <p class="text-[10px] text-neutral-500">Inference</p>
        </div>
        <div class="p-5 rounded-2xl border border-[#1f1f1f] bg-[#0c0c0c] text-center space-y-2 hover:border-[#FF00A8]/40 transition-colors">
          <i class="fa-brands fa-aws text-2xl text-amber-500"></i>
          <h4 class="font-bold text-xs text-white">Edge CDN</h4>
          <p class="text-[10px] text-neutral-500">Global</p>
        </div>
      </div>
    </div>
  </section>` : ''}

  ${includePricing ? `
  <!-- PRICING MATRIX SECTION -->
  <section id="pricing" class="py-24 border-t border-[#1a1a1a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
          TRANSPARENT METRICS
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold heading-font text-white">Predictable, Transparent Plans</h2>
        <p class="${theme.subText} text-xs sm:text-sm">Scale from early prototypes to high-volume production without surprises.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <!-- Developer Plan -->
        <div class="rounded-3xl p-8 border border-[#1f1f1f] bg-[#0c0c0c] flex flex-col justify-between">
          <div class="space-y-4 font-mono">
            <h3 class="text-base font-bold text-white uppercase">Developer</h3>
            <p class="text-xs ${theme.subText} font-sans">Ideal for solo engineers prototyping and deploying personal micro-services.</p>
            <div class="pt-4">
              <span class="text-4xl font-extrabold heading-font text-white">$24</span>
              <span class="${theme.subText} text-xs">/ mo</span>
            </div>
            <ul class="space-y-3 pt-6 text-xs text-neutral-400 font-sans">
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Up to 5 Active Websites</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Complete ZIP File Export</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> 100k API Requests/mo</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Community Discord</li>
            </ul>
          </div>
          <button class="w-full mt-8 py-3 rounded-xl font-bold text-xs uppercase mono-font border ${theme.secondaryBtn}">Select Developer</button>
        </div>

        <!-- Pro Team Plan (Featured) -->
        <div class="rounded-3xl p-8 border-2 border-[#FF00A8] bg-[#0f0a14] relative flex flex-col justify-between shadow-2xl shadow-[#FF00A8]/10">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF00A8] text-white">
            RECOMMENDED
          </div>
          <div class="space-y-4 font-mono">
            <h3 class="text-base font-bold text-white uppercase">Production Pro</h3>
            <p class="text-xs text-neutral-400 font-sans">For fast-moving squads requiring zero resource throttling and instant live domains.</p>
            <div class="pt-4">
              <span class="text-4xl font-extrabold heading-font text-white">$69</span>
              <span class="${theme.subText} text-xs">/ mo</span>
            </div>
            <ul class="space-y-3 pt-6 text-xs text-neutral-300 font-sans">
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Unlimited Projects & Revisions</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Instant Global CDN Edge Deploy</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Custom Domain with Free SSL</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Neural Prompt Co-Pilot</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> 24/7 Priority Support SLA</li>
            </ul>
          </div>
          <button class="w-full mt-8 py-3 rounded-xl font-bold text-xs uppercase mono-font ${theme.primaryBtn}">Launch Pro</button>
        </div>

        <!-- Scale / Enterprise Plan -->
        <div class="rounded-3xl p-8 border border-[#1f1f1f] bg-[#0c0c0c] flex flex-col justify-between">
          <div class="space-y-4 font-mono">
            <h3 class="text-base font-bold text-white uppercase">Enterprise</h3>
            <p class="text-xs ${theme.subText} font-sans">Tailored architecture, dedicated VPC isolation, and regulatory compliance.</p>
            <div class="pt-4">
              <span class="text-4xl font-extrabold heading-font text-white">$199</span>
              <span class="${theme.subText} text-xs">/ mo</span>
            </div>
            <ul class="space-y-3 pt-6 text-xs text-neutral-400 font-sans">
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Everything in Pro</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Custom NeonDB & Postgres VPC</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> SSO, SAML & Audit Trails</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400 text-xs"></i> Dedicated Solutions Architect</li>
            </ul>
          </div>
          <button class="w-full mt-8 py-3 rounded-xl font-bold text-xs uppercase mono-font border ${theme.secondaryBtn}">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>` : ''}

  ${includeReviews ? `
  <!-- REVIEWS / TESTIMONIALS SECTION -->
  <section id="reviews" class="py-24 border-t border-[#1a1a1a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
          VERIFIED FEEDBACK
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold heading-font text-white">What Founders & Engineers Say</h2>
        <p class="${theme.subText} text-xs sm:text-sm">Real reviews from builders who shipped applications to live production.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-4">
          <div class="flex items-center gap-1 text-[#FF00A8] text-xs">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
          <p class="${theme.subText} text-xs leading-relaxed italic">
            "The visual fidelity is lightyears ahead of typical template mills. It looks like a bespoke product created by a senior human designer in Figma."
          </p>
          <div class="flex items-center gap-3 pt-2">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Sarah Lin" class="w-9 h-9 rounded-full object-cover border border-[#2a2a2a]">
            <div>
              <h4 class="font-bold text-xs text-white">Sarah Lin</h4>
              <p class="text-[10px] text-neutral-500 font-mono">Founding Designer, Veloce</p>
            </div>
          </div>
        </div>

        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-4">
          <div class="flex items-center gap-1 text-[#FF00A8] text-xs">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
          <p class="${theme.subText} text-xs leading-relaxed italic">
            "The in-preview link isolation and clean React output made this our go-to tool for prototyping client portals. Saved us easily 40 hours of boilerplate."
          </p>
          <div class="flex items-center gap-3 pt-2">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Marcus Vance" class="w-9 h-9 rounded-full object-cover border border-[#2a2a2a]">
            <div>
              <h4 class="font-bold text-xs text-white">Marcus Vance</h4>
              <p class="text-[10px] text-neutral-500 font-mono">Principal Architect, Horizon</p>
            </div>
          </div>
        </div>

        <div class="p-8 rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] space-y-4">
          <div class="flex items-center gap-1 text-[#FF00A8] text-xs">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
          <p class="${theme.subText} text-xs leading-relaxed italic">
            "Exported the ZIP archive directly into our GitHub repository. Everything compiled with npm run dev on the first try without a single warning."
          </p>
          <div class="flex items-center gap-3 pt-2">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Elena Rostova" class="w-9 h-9 rounded-full object-cover border border-[#2a2a2a]">
            <div>
              <h4 class="font-bold text-xs text-white">Elena Rostova</h4>
              <p class="text-[10px] text-neutral-500 font-mono">CTO, Kvant Labs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>` : ''}

  ${includeContact ? `
  <!-- CONTACT FORM SECTION -->
  <section id="contact" class="py-24 border-t border-[#1a1a1a]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-8 sm:p-12 shadow-2xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div class="lg:col-span-5 space-y-4">
            <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
              INITIALIZE CONNECTION
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold heading-font text-white">Let's Discuss Your Project</h2>
            <p class="${theme.subText} text-xs sm:text-sm leading-relaxed">
              Have an engineering challenge, partnership inquiry, or reservation request? Submit a message and our team will respond within 24 hours.
            </p>
            <div class="pt-4 space-y-3 text-xs ${theme.subText} font-mono">
              <p class="flex items-center gap-3"><i class="fa-solid fa-envelope text-[#FF00A8]"></i> direct@${brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.io</p>
              <p class="flex items-center gap-3"><i class="fa-solid fa-terminal text-[#FF00A8]"></i> ssh://${brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.net</p>
              <p class="flex items-center gap-3"><i class="fa-solid fa-location-dot text-[#FF00A8]"></i> San Francisco & Tokyo Edge</p>
            </div>
          </div>

          <div class="lg:col-span-7">
            <form id="contactForm" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold mb-1 text-neutral-300">Name</label>
                  <input type="text" required placeholder="Alex Vance" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs">
                </div>
                <div>
                  <label class="block text-xs font-semibold mb-1 text-neutral-300">Email</label>
                  <input type="email" required placeholder="alex@domain.com" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs">
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-neutral-300">Subject</label>
                <input type="text" placeholder="Inquiry or Reservation Requirements" class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs">
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-neutral-300">Message</label>
                <textarea rows="4" required placeholder="Specify your architectural vision or requirements..." class="w-full px-4 py-2.5 rounded-xl border border-[#222222] bg-[#121212] text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] text-xs resize-none"></textarea>
              </div>
              <button type="submit" class="w-full py-3.5 rounded-xl font-bold text-xs uppercase mono-font tracking-wider ${theme.primaryBtn} transition-all">
                Send Message <i class="fa-solid fa-paper-plane ml-2"></i>
              </button>
              <div id="formSuccess" class="hidden p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 text-xs text-center font-mono font-medium">
                ✓ Message received! We will follow up with you promptly.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>` : ''}

  <!-- FOOTER -->
  <footer class="border-t ${theme.footerBg} py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-black border border-[#262626] flex items-center justify-center text-white text-xs">
          ⚡
        </div>
        <span class="font-bold heading-font text-white text-sm">${brandName}</span>
      </div>
      <p class="text-xs ${theme.subText} font-mono">
        © 2025 ${brandName}. Powered by BRAHMA. All rights reserved.
      </p>
      <div class="flex items-center gap-4 text-neutral-500 text-sm">
        <a href="#" class="hover:text-white transition-colors"><i class="fa-brands fa-github"></i></a>
        <a href="#" class="hover:text-white transition-colors"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="#" class="hover:text-white transition-colors"><i class="fa-brands fa-linkedin"></i></a>
      </div>
    </div>
  </footer>

  <!-- CLIENT-SIDE SCRIPT FOR INTERACTIVITY & PREVIEW ISOLATION -->
  <script>
    // In-page smooth scroll navigation
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').slice(1);
        if (!targetId || targetId === '' || targetId === '!') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          var target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Mobile menu toggle
    var mobileBtn = document.getElementById('mobileMenuBtn');
    var drawer = document.getElementById('mobileDrawer');
    if (mobileBtn && drawer) {
      mobileBtn.addEventListener('click', function() {
        drawer.classList.toggle('hidden');
      });
    }

    // Contact form submit handling with user-facing confirmation
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

/**
 * Generate standard React source code files for the project
 */
function generateProjectFiles(config) {
  const { brandName, niche, themeKey, html } = config;
  const safeName = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  return [
    {
      fileName: 'package.json',
      filePath: 'package.json',
      content: JSON.stringify({
        name: safeName || 'brahma-website',
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
      content: `import React, { useState } from 'react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF00A8] selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#050505]/90 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black border border-[#262626] flex items-center justify-center font-bold text-[#FF00A8] text-sm">
              ⚡
            </div>
            <span className="text-lg font-bold tracking-tight text-white">${brandName}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
            <button className="px-5 py-2.5 rounded-xl bg-[#FF00A8] hover:bg-[#D9008F] text-white font-bold transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-24 text-center max-w-4xl mx-auto px-6 space-y-6">
        <div className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#121212] text-[#FF00A8] border border-[#222222]">
          POWERED BY BRAHMA
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight">${brandName}</h1>
        <p className="text-base text-neutral-400 max-w-2xl mx-auto">
          Crafted with modern React, Tailwind CSS, and optimized for high performance, accessibility, and responsiveness.
        </p>
      </header>
    </div>
  );
}`
    },
    {
      fileName: 'README.md',
      filePath: 'README.md',
      content: `# ${brandName}

Generated by **BRAHMA** • Autonomous AI Website Creator.

## Quick Start (Run Locally)

1. Unzip the project folder:
\`\`\`bash
cd ${safeName}
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open the browser at \`http://localhost:5173\`.

---
Generated with ⚡ BRAHMA.
`
    }
  ];
}

module.exports = {
  synthesizeWebsiteFromPrompt,
  modifyWebsiteWithInstruction,
  detectNiche,
  detectTheme,
  THEMES
};
