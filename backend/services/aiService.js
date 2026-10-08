/**
 * AI Service with Gemini API integration and Generative Fallback Engine
 * Strictly enforces website type priority, internal planning, prompt adherence,
 * and iterative modification persistence.
 */
const { synthesizeWebsiteFromPrompt, modifyWebsiteWithInstruction, buildInternalPlan } = require('./codeGenerator');

class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  /**
   * Generates a new website project from prompt
   */
  async generateWebsite(prompt) {
    if (this.apiKey && this.apiKey.trim().length > 10) {
      try {
        console.log(`[AI Service] Calling Gemini API for prompt: "${prompt.slice(0, 60)}..."`);
        const geminiResult = await this.callGeminiForGeneration(prompt);
        if (geminiResult && geminiResult.previewHtml && geminiResult.files) {
          console.log('[AI Service] Successfully generated website via Gemini API');
          return geminiResult;
        }
      } catch (err) {
        console.warn('[AI Service] Gemini API failed, falling back to built-in synthesizer:', err.message);
      }
    }

    console.log(`[AI Service] Synthesizing website using high-fidelity prompt-adherent engine for prompt: "${prompt.slice(0, 60)}..."`);
    return synthesizeWebsiteFromPrompt(prompt);
  }

  /**
   * Modifies an existing website iteratively
   */
  async modifyWebsite(existingProject, prompt, history = []) {
    if (this.apiKey && this.apiKey.trim().length > 10) {
      try {
        console.log(`[AI Service] Calling Gemini API for iteration: "${prompt.slice(0, 60)}..."`);
        const geminiResult = await this.callGeminiForIteration(existingProject, prompt, history);
        if (geminiResult && geminiResult.previewHtml) {
          console.log('[AI Service] Successfully modified website via Gemini API');
          return geminiResult;
        }
      } catch (err) {
        console.warn('[AI Service] Gemini API iteration failed, falling back to built-in synthesizer:', err.message);
      }
    }

    console.log(`[AI Service] Modifying website using generative engine for instruction: "${prompt.slice(0, 60)}..."`);
    return modifyWebsiteWithInstruction(existingProject, prompt, history);
  }

  /**
   * Helper to call Gemini REST endpoint with strict prompt-following directives
   */
  async callGeminiForGeneration(userPrompt) {
    const internalPlan = buildInternalPlan(userPrompt);

    const systemPrompt = `You are BRAHMA, an elite full-stack web developer and UI/UX art director.

CRITICAL INSTRUCTIONS - ACCURATELY FOLLOW USER'S PROMPT:
1. IDENTIFY WEBSITE TYPE FIRST:
   Determine exact website category (portfolio, restaurant, e-commerce, saas, agency, blog, real estate, hotel, fitness, education, healthcare, startup).
   THE USER'S REQUESTED WEBSITE TYPE IS THE HIGHEST-PRIORITY REQUIREMENT.
   - If user asks for a portfolio, the output MUST be a personal/developer portfolio. NEVER generate a restaurant, e-commerce, or SaaS!
   - If user asks for a restaurant, it MUST be a restaurant with menu, dishes, and reservations.
   - If user asks for e-commerce, it MUST be an online store with product catalog, cart, and offers.
   - If user asks for SaaS, it MUST be a software product with features, demo, and pricing.

2. PRESERVE USER REQUIREMENTS:
   - Extract Person/Brand Name (e.g. "Rahul", "L'Atelier Noir")
   - Extract Profession/Role (e.g. "React Developer", "UI/UX Designer")
   - Extract Colors (e.g. "black and magenta", "blue and white")
   - Extract Style & Aesthetics

3. USE WEBSITE-TYPE-SPECIFIC STRUCTURE:
   - PORTFOLIO: Hero (Name, Role, CTA) -> About Me -> Skills/Tech Stack -> Featured Projects -> Work Experience -> Education/Credentials -> Resume Download -> Contact Form -> Footer
   - RESTAURANT: Hero -> Menu -> Featured Dishes -> About -> Gallery -> Reviews -> Reservation Form -> Location & Hours -> Footer
   - E-COMMERCE: Announcement Bar -> Hero -> Categories -> Featured Products -> Offers -> Reviews -> Newsletter -> Footer
   - SAAS: Hero -> Product Demo -> Core Features -> How It Works -> Integrations -> Pricing Tiers -> Reviews -> FAQ -> CTA -> Footer

4. PREVIEW ISOLATION:
   - Always include <base target="_self"> in the <head>.
   - Navigation links must use in-page anchors (e.g. href="#about", href="#projects", href="#contact").
   - NEVER use target="_blank" on in-page navigation or root links.

You MUST output ONLY a valid JSON object matching this schema:
{
  "plan": {
    "websiteType": "${internalPlan.websiteType}",
    "purpose": "...",
    "industry": "...",
    "targetAudience": "...",
    "style": "...",
    "colors": "...",
    "requiredSections": [],
    "specialRequirements": []
  },
  "projectName": "${internalPlan.personOrBrandName}",
  "framework": "react",
  "explanation": "Clear explanation confirming the website type, developer/brand name, role, colors, and sections generated.",
  "previewHtml": "<!DOCTYPE html><html lang='en' class='scroll-smooth'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><base target='_self'><script src='https://cdn.tailwindcss.com'></script><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'><title>Site</title></head><body class='bg-[#050505] text-white'>...complete standalone HTML with category-specific sections, interactive mobile menu, contact form, and footer...</body></html>",
  "files": [
    { "fileName": "package.json", "filePath": "package.json", "content": "..." },
    { "fileName": "index.html", "filePath": "index.html", "content": "..." },
    { "fileName": "App.jsx", "filePath": "src/App.jsx", "content": "..." },
    { "fileName": "README.md", "filePath": "README.md", "content": "..." }
  ]
}`;

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemPrompt}\n\nUser Prompt: ${userPrompt}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json'
      }
    };

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('No candidate content returned by Gemini');
    }

    const cleaned = candidateText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    return JSON.parse(cleaned);
  }

  /**
   * Helper for iterative editing via Gemini
   */
  async callGeminiForIteration(existingProject, instruction, history = []) {
    const existingHtml = existingProject.generatedCode || '';
    const systemPrompt = `You are BRAHMA, an elite full-stack web developer and UI/UX art director.

CRITICAL INSTRUCTIONS FOR ITERATIVE EDITING:
1. PRESERVE THE EXISTING WEBSITE CATEGORY AND PURPOSE:
   If the existing website is a Portfolio, KEEP it as a portfolio.
   If the user asks to "change accent color to blue", change the color palette but keep all sections and content intact.
   If the user asks to "add a projects section", insert or expand the projects section while keeping everything else.
   If the user asks to "make the hero larger", adjust hero padding and typography without removing other sections.
   NEVER regenerate an unrelated website category!

2. PRESERVE IN-PREVIEW ISOLATION:
   Keep <base target="_self"> and in-page anchor links intact.

Output ONLY a valid JSON object matching:
{
  "projectName": "${existingProject.projectName}",
  "framework": "react",
  "explanation": "Friendly explanation of what was modified while preserving the existing structure.",
  "previewHtml": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><base target='_self'><script src='https://cdn.tailwindcss.com'></script><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'><title>Site</title></head><body class='bg-[#050505] text-white'>...updated complete standalone HTML...</body></html>",
  "files": [
    { "fileName": "index.html", "filePath": "index.html", "content": "..." },
    { "fileName": "App.jsx", "filePath": "src/App.jsx", "content": "..." },
    { "fileName": "package.json", "filePath": "package.json", "content": "..." },
    { "fileName": "README.md", "filePath": "README.md", "content": "..." }
  ]
}`;

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\nExisting Project HTML snippet (first 3500 chars):\n${existingHtml.slice(0, 3500)}\n\nUser Modification Instruction: ${instruction}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json'
      }
    };

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) throw new Error('No candidate content returned');

    const cleaned = candidateText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    return JSON.parse(cleaned);
  }
}

module.exports = new AIService();
