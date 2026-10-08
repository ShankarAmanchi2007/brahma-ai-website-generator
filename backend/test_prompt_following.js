/**
 * Comprehensive Verification Suite for BRAHMA's Prompt-Adherent Generation System
 * Tests all 11 critical requirements specified in the user's instruction.
 */
const assert = require('assert');
const { synthesizeWebsiteFromPrompt, modifyWebsiteWithInstruction, buildInternalPlan, WEBSITE_TYPES } = require('./services/codeGenerator');

console.log('====================================================');
console.log('🧪 BRAHMA PROMPT-FOLLOWING & ACCURACY TEST SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ [PASS] ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [FAIL] ${testName}: ${err.message}`);
  }
}

// TEST 1: Identify Website Type First
runTest('1. Exact Website Category Identification', () => {
  const tests = [
    { prompt: 'Create a developer portfolio website for a React developer', expected: WEBSITE_TYPES.PORTFOLIO },
    { prompt: 'Build an Italian fine-dining restaurant website with tasting menu', expected: WEBSITE_TYPES.RESTAURANT },
    { prompt: 'Create an e-commerce online store for luxury streetwear shoes', expected: WEBSITE_TYPES.ECOMMERCE },
    { prompt: 'Build a SaaS software platform for AI cloud analytics', expected: WEBSITE_TYPES.SAAS },
    { prompt: 'Create an agency website for creative digital branding', expected: WEBSITE_TYPES.AGENCY },
    { prompt: 'Create a real estate website for luxury urban apartments', expected: WEBSITE_TYPES.REAL_ESTATE },
    { prompt: 'Create a fitness gym website with workout class timetable', expected: WEBSITE_TYPES.FITNESS },
    { prompt: 'Build a college website for engineering student admissions', expected: WEBSITE_TYPES.EDUCATION },
    { prompt: 'Create a dental clinic healthcare website with appointment booking', expected: WEBSITE_TYPES.HEALTHCARE },
    { prompt: 'Create a hotel website for a beachfront luxury resort', expected: WEBSITE_TYPES.HOTEL }
  ];

  tests.forEach(({ prompt, expected }) => {
    const plan = buildInternalPlan(prompt);
    assert.strictEqual(plan.websiteType, expected, `Prompt "${prompt}" did not match expected type "${expected}", got "${plan.websiteType}"`);
  });
});

// TEST 2: Strict Prompt Following (Developer Portfolio for React developer)
runTest('2. Strict Prompt Following: React Developer Portfolio', () => {
  const prompt = 'Create a developer portfolio website for a React developer.';
  const result = synthesizeWebsiteFromPrompt(prompt);

  assert.strictEqual(result.websiteType, WEBSITE_TYPES.PORTFOLIO);
  assert(result.previewHtml.includes('React Developer') || result.previewHtml.includes('React.js'), 'Must contain React Developer title or skills');
  assert(result.previewHtml.includes('id="projects"'), 'Portfolio must have projects section');
  assert(result.previewHtml.includes('id="skills"'), 'Portfolio must have skills section');
  assert(result.previewHtml.includes('id="experience"'), 'Portfolio must have experience section');
  assert(result.previewHtml.includes('id="resume"'), 'Portfolio must have resume/CV section');
  assert(result.previewHtml.includes('id="contact"'), 'Portfolio must have contact section');

  // Must NOT contain wrong domain sections
  assert(!result.previewHtml.includes('Miyazaki A5 Wagyu'), 'Must not contain restaurant dishes');
  assert(!result.previewHtml.includes('Add to Bag'), 'Must not contain e-commerce shopping bag');
  assert(!result.previewHtml.includes('14-Day Free Trial'), 'Must not contain SaaS free trial buttons');
});

// TEST 3: Preserve User Requirements (Name, Profession, Style, Colors)
runTest('3. Preserve User Requirements: Rahul, Frontend Dev, Black & Magenta', () => {
  const prompt = 'Create a modern black and magenta portfolio website for a frontend developer named Rahul.';
  const result = synthesizeWebsiteFromPrompt(prompt);

  assert.strictEqual(result.websiteType, WEBSITE_TYPES.PORTFOLIO);
  assert.strictEqual(result.projectName, 'Rahul');
  assert(result.previewHtml.includes('Rahul'), 'Preview HTML must prominently feature the name Rahul');
  assert(result.previewHtml.includes('Frontend Developer'), 'Preview HTML must include Frontend Developer');
  assert(result.previewHtml.includes('#FF00A8') || result.previewHtml.includes('blackMagenta'), 'Preview HTML must include magenta styling');
  assert.strictEqual(result.plan.colors.themeKey, 'blackMagenta');
});

// TEST 4: Category-Specific Structures
runTest('4. Category-Specific Structures (Portfolio vs Restaurant vs E-Commerce vs SaaS)', () => {
  const portfolio = synthesizeWebsiteFromPrompt('developer portfolio');
  const restaurant = synthesizeWebsiteFromPrompt('restaurant website with food menu and table reservations');
  const ecommerce = synthesizeWebsiteFromPrompt('e-commerce store with product categories and special offers');
  const saas = synthesizeWebsiteFromPrompt('SaaS software product with features, pricing tiers and demo');

  // Portfolio structure
  assert(portfolio.previewHtml.includes('id="skills"'));
  assert(portfolio.previewHtml.includes('id="experience"'));
  assert(portfolio.previewHtml.includes('id="resume"'));

  // Restaurant structure
  assert(restaurant.previewHtml.includes('id="menu"'));
  assert(restaurant.previewHtml.includes('id="dishes"'));
  assert(restaurant.previewHtml.includes('id="reservation"'));
  assert(restaurant.previewHtml.includes('id="location"'));

  // E-commerce structure
  assert(ecommerce.previewHtml.includes('id="categories"'));
  assert(ecommerce.previewHtml.includes('id="products"'));
  assert(ecommerce.previewHtml.includes('id="newsletter"'));

  // SaaS structure
  assert(saas.previewHtml.includes('id="features"'));
  assert(saas.previewHtml.includes('id="pricing"'));
  assert(saas.previewHtml.includes('Developer') && saas.previewHtml.includes('Production Pro'));
});

// TEST 5: Semantic Comprehension
runTest('5. Semantic Generation: "Build me a website where I can showcase my work as a UI/UX designer"', () => {
  const prompt = 'Build me a website where I can showcase my work as a UI/UX designer.';
  const plan = buildInternalPlan(prompt);
  assert.strictEqual(plan.websiteType, WEBSITE_TYPES.PORTFOLIO);
  assert(plan.professionOrRole.toLowerCase().includes('designer'));

  const result = synthesizeWebsiteFromPrompt(prompt);
  assert.strictEqual(result.websiteType, WEBSITE_TYPES.PORTFOLIO);
  assert(result.previewHtml.includes('Designer'));
});

// TEST 6: Conflict Resolution & Combining Multiple Constraints
runTest('6. Conflict Resolution: "Create a dark luxury fashion e-commerce website"', () => {
  const prompt = 'Create a dark luxury fashion e-commerce website.';
  const plan = buildInternalPlan(prompt);
  assert.strictEqual(plan.websiteType, WEBSITE_TYPES.ECOMMERCE);
  assert(plan.style.toLowerCase().includes('luxury'));
  assert.strictEqual(plan.colors.themeKey, 'luxuryGold');

  const result = synthesizeWebsiteFromPrompt(prompt);
  assert.strictEqual(result.websiteType, WEBSITE_TYPES.ECOMMERCE);
  assert(result.previewHtml.includes('Curated Luxury'));
});

// TEST 7: Internal Generation Plan Structure
runTest('7. Internal Generation Plan Completeness', () => {
  const prompt = 'Create a modern portfolio website for a frontend developer named Rahul.';
  const plan = buildInternalPlan(prompt);

  assert(plan.websiteType, 'plan must have websiteType');
  assert(plan.purpose, 'plan must have purpose');
  assert(plan.industry, 'plan must have industry');
  assert(plan.targetAudience, 'plan must have targetAudience');
  assert(plan.style, 'plan must have style');
  assert(plan.colors, 'plan must have colors');
  assert(Array.isArray(plan.requiredSections) && plan.requiredSections.length > 0, 'plan must have requiredSections array');
  assert(Array.isArray(plan.specialRequirements), 'plan must have specialRequirements');
});

// TEST 8: Preview Isolation & Navigation Safety
runTest('8. Preview Isolation: <base target="_self"> and In-Page Anchor Links', () => {
  const result = synthesizeWebsiteFromPrompt('Create a portfolio website for Rahul');
  assert(result.previewHtml.includes('<base target="_self">'), 'Preview HTML must declare <base target="_self">');
  assert(result.previewHtml.includes('addEventListener(\'click\''), 'Preview HTML must include smooth scroll isolation script');
  assert(!result.previewHtml.includes('href="/"'), 'Preview navigation must not use root link href="/"');
});

// TEST 9: Iterative Modification Preserves Website Category
runTest('9. Iterative Modification: Preserves Category & Applied Changes', () => {
  const initial = synthesizeWebsiteFromPrompt('Create a portfolio website for a React developer named Rahul.');
  assert.strictEqual(initial.websiteType, WEBSITE_TYPES.PORTFOLIO);

  // Iteration 1: Add projects
  const modified1 = modifyWebsiteWithInstruction({
    projectName: initial.projectName,
    originalPrompt: 'Create a portfolio website for a React developer named Rahul.',
    plan: initial.plan,
    generatedCode: initial.previewHtml
  }, 'Add a projects section');

  assert.strictEqual(modified1.websiteType, WEBSITE_TYPES.PORTFOLIO, 'Must preserve portfolio category');
  assert(modified1.previewHtml.includes('Rahul'), 'Must preserve name Rahul');

  // Iteration 2: Change accent color to blue
  const modified2 = modifyWebsiteWithInstruction({
    projectName: initial.projectName,
    originalPrompt: 'Create a portfolio website for a React developer named Rahul.',
    plan: modified1.plan,
    generatedCode: modified1.previewHtml
  }, 'Change the accent color to blue');

  assert.strictEqual(modified2.websiteType, WEBSITE_TYPES.PORTFOLIO, 'Must preserve portfolio category');
  assert.strictEqual(modified2.plan.colors.themeKey, 'blueWhite', 'Theme must switch to blueWhite');
  assert(modified2.previewHtml.includes('blue'), 'Preview HTML must contain blue styling');
});

// TEST 10: Quality Verification Check
runTest('10. Quality Verification Check Auto-Remedies Discrepancies', () => {
  const prompt = 'Create a developer portfolio website for a React developer';
  const result = synthesizeWebsiteFromPrompt(prompt);
  assert(result.previewHtml.includes('React Developer'), 'Quality check must ensure React Developer is rendered');
  assert(!result.previewHtml.includes('Wagyu'), 'Quality check must ensure no restaurant copy in portfolio');
});

console.log('\n====================================================');
console.log(`SUMMARY: ${passedTests}/${totalTests} Tests Passed successfully!`);
console.log('====================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
