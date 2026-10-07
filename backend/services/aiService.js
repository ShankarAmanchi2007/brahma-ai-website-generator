/**
 * AI Service with Gemini API integration and Generative Fallback Engine
 */
const { synthesizeWebsiteFromPrompt, modifyWebsiteWithInstruction } = require('./codeGenerator');

const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

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
        console.log(`[AI Service] Calling Gemini API for prompt: "${prompt.slice(0, 50)}..."`);
        const geminiResult = await this.callGeminiForGeneration(prompt);
        if (geminiResult && geminiResult.previewHtml && geminiResult.files) {
          console.log('[AI Service] Successfully generated website via Gemini API');
          return geminiResult;
        }
      } catch (err) {
        console.warn('[AI Service] Gemini API failed, falling back to built-in synthesizer:', err.message);
      }
    }

    console.log(`[AI Service] Synthesizing website using high-fidelity generative engine for prompt: "${prompt.slice(0, 50)}..."`);
    return synthesizeWebsiteFromPrompt(prompt);
  }

  /**
   * Modifies an existing website iteratively
   */
  async modifyWebsite(existingProject, prompt, history = []) {
    if (this.apiKey && this.apiKey.trim().length > 10) {
      try {
        console.log(`[AI Service] Calling Gemini API for iteration: "${prompt.slice(0, 50)}..."`);
        const geminiResult = await this.callGeminiForIteration(existingProject, prompt, history);
        if (geminiResult && geminiResult.previewHtml) {
          console.log('[AI Service] Successfully modified website via Gemini API');
          return geminiResult;
        }
      } catch (err) {
        console.warn('[AI Service] Gemini API iteration failed, falling back to built-in synthesizer:', err.message);
      }
    }

    console.log(`[AI Service] Modifying website using generative engine for instruction: "${prompt.slice(0, 50)}..."`);
    return modifyWebsiteWithInstruction(existingProject, prompt, history);
  }

  /**
   * Helper to call Gemini REST endpoint
   */
  async callGeminiForGeneration(userPrompt) {
    const systemPrompt = `You are BRAHMA, an elite full-stack web developer and UI/UX art director.
When a user asks you to create a website, generate a complete, responsive, modern, production-grade website adhering to the BRAHMA Design System:
- Palette: Dominant deepest blacks (bg-[#050505], bg-[#070707]), carbon surfaces (bg-[#0c0c0c], bg-[#121212]), precision thin borders (border-[#1f1f1f], border-[#262626]), crisp white typography, neutral muted text (text-neutral-400), and focused hot-magenta accents (#FF00A8, hover: #D9008F).
- Aesthetics: Human-designed editorial balance, high contrast, clean typography, avoid generic AI tropes (no repetitive purple gradients, no floating blobs).
- Functionality: Complete HTML with <base target="_self">, responsive navigation, mobile drawer toggle, hero, requested domain-specific sections, interactive contact/reservation form, and footer.
You MUST output ONLY a valid JSON object conforming to this schema:
{
  "projectName": "Catchy Brand or Person Name",
  "framework": "react",
  "explanation": "Brief 1-2 sentence overview of what was generated",
  "previewHtml": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><base target='_self'><script src='https://cdn.tailwindcss.com'></script><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'><title>Site</title></head><body class='bg-[#050505] text-white'>...complete rich HTML with responsive nav, hero, requested sections, contact form, footer, and interactive script...</body></html>",
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
        temperature: 0.7,
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
The user has an existing website and wants to make modifications.
Preserve the existing website's structure, layout, and sections UNLESS the user explicitly asked to change or remove them.
Adhere to the BRAHMA Design System:
- Deep black background (bg-[#050505]), carbon surfaces (bg-[#0c0c0c]), thin precision borders (border-[#1f1f1f]), white typography, and hot-magenta accents (#FF00A8).
Make the requested modifications accurately (e.g. change color theme, add section, adjust hero size, update text).
Output ONLY a valid JSON object conforming to:
{
  "projectName": "${existingProject.projectName}",
  "framework": "react",
  "explanation": "Friendly explanation of what was changed and updated",
  "previewHtml": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><base target='_self'><script src='https://cdn.tailwindcss.com'></script><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'><title>Site</title></head><body class='bg-[#050505] text-white'>...updated complete standalone HTML...</body></html>",
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
              text: `${systemPrompt}\n\nExisting HTML snippet (first 3000 chars):\n${existingHtml.slice(0, 3000)}\n\nUser Modification Request: ${instruction}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
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
