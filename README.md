# BRAHMA • Autonomous AI Website Builder & Generator

**BRAHMA** is a full-stack, enterprise-grade AI-powered website builder web application that transforms natural-language prompts into human-grade, production-ready websites with real-time multi-device interactive previews, conversational editing, multi-file code exploration, ZIP export, and instant cloud deployment.

Styled with **Google Antigravity typography** and designed for maximum aesthetic fidelity.

---

## 🌟 Key Features

1. **Modern BRAHMA SaaS Landing Page**
   - High-conversion hero section with interactive prompt demo and preset inspiration chips.
   - Comprehensive showcase of features, 4-step workflow, benefits, and call-to-action.
   - Seamless authentication modals (Sign Up, Log In with one-click Demo access, Forgot Password).
   - Google Antigravity typography (`Google Sans`, `Geist`, `Inter`, `JetBrains Mono`).

2. **Full User Authentication & Session Security**
   - Secure registration, JWT token authentication, and bcryptjs password hashing.
   - Case-insensitive email normalization and whitespace trimming.
   - Native PostgreSQL / NeonDB connection support with seamless local relational fallback.
   - Protected routes and authorization middleware ensuring users access only their own projects.
   - One-Click Demo Mode for rapid evaluation and testing.

3. **User Dashboard**
   - Central project management workspace with sidebar navigation.
   - View, search, filter, rename, and delete generated websites.
   - Direct shortcuts to live deployment URLs and project ZIP downloads.

4. **Human-Grade Natural-Language AI Website Generation**
   - Understands natural-language requirements for any niche (Restaurants, Portfolios, SaaS, E-Commerce, Studios, Healthcare, etc.).
   - Dynamically synthesizes semantic HTML5, modern Tailwind CSS classes, responsive mobile drawers, interactive modals, tabs, and curated high-resolution imagery.
   - Multi-file project generation including `package.json`, `index.html`, `src/App.jsx`, and `README.md`.

5. **Iterative AI Co-Pilot Editing**
   - Conversational chat interface: *"Tell AI what you want to change..."*
   - Context-preserving modifications (e.g., *"Change theme to blue and white"*, *"Add a 3-tier pricing section"*, *"Make the hero larger"*).
   - Preserves existing sections and logic while updating the live preview in real time.

6. **Interactive Multi-Device Live Preview & Navigation Isolation**
   - Real-time rendering inside an isolated interactive iframe.
   - Navigation sandbox prevents preview links from disrupting parent editor state.
   - Device switcher with simulated device frames:
     - 💻 **Desktop View** (100% fluid)
     - 📱 **Tablet View** (iPad 768px with hardware bezel)
     - 📱 **Mobile View** (iPhone 375px with notch & home indicator)
   - Real-time refresh and fullscreen popup support.

7. **Project File Explorer & Source Code Viewer**
   - Interactive project file tree with file-type icons.
   - Code inspector with line numbers and one-click copy code functionality.

8. **One-Click ZIP Export**
   - Server-side ZIP packaging with streaming archiver.
   - Exports complete, runnable Vite + React projects with `package.json` ready for `npm install && npm run dev`.

9. **Live Cloud Deployment Engine**
   - Multi-stage deployment pipeline: `Validating` → `Building` → `Uploading` → `Deploying` → `Live ✓`.
   - Generates unique live public URL (`/live/:deploymentId`) with SSL-ready headers and standalone hosting.
   - Confetti celebration upon successful deployment.

10. **Resilient NeonDB / PostgreSQL + Zero-Config Fallback**
    - Seamlessly connects to PostgreSQL / NeonDB via connection pooling.
    - If database is offline or not configured, automatically activates an embedded persistent store—**guaranteeing the application runs 100% out of the box with zero external setup required!**

---

## 🏗️ Architecture & Tech Stack

```
ai-website-generator/
├── backend/
│   ├── config/             # DB connection (NeonDB / PostgreSQL + Resilient Fallback)
│   ├── controllers/        # Auth, Project, File, AI, and Deploy controllers
│   ├── database/           # Persistent document store & fallback storage
│   ├── deployments/        # Live hosted website bundles
│   ├── middleware/         # JWT auth middleware & global error handler
│   ├── models/             # Database schemas & unified repository
│   ├── routes/             # Express API routes (/api/auth, /api/projects)
│   ├── services/           # AI service, code generator, ZIP packager, deployer
│   ├── server.js           # Express application entry point
│   ├── .env.example        # Environment variable template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Landing, Auth, Dashboard, Editor, Preview widgets
│   │   ├── context/        # AuthContext & ProjectContext providers
│   │   ├── pages/          # LandingPage, DashboardPage, EditorPage
│   │   ├── services/       # Frontend API client
│   │   ├── App.jsx         # App router & layout shell
│   │   ├── main.jsx
│   │   └── index.css       # Tailwind CSS & Antigravity typography
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

### Technology Matrix
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt.js, Archiver, UUID, pg (PostgreSQL).
- **Database**: PostgreSQL / NeonDB + Embedded Resilient Data Store fallback.
- **AI Engine**: Google Gemini API (`gemini-2.5-flash`) + BRAHMA Generative Code Synthesizer.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (Node v20+ or v24+ recommended).
- **npm**: v9.0.0 or later.
- *(Optional)* PostgreSQL / NeonDB database URL.

---

### 2. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   **`.env` Options:**
   ```ini
   PORT=5000
   DATABASE_URL=postgresql://neondb_owner:password@ep-sample-pool.us-east-2.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=super_secret_jwt_key_brahma_ai_2025

   # (Optional) Add your Google Gemini API key if desired.
   # If left empty, BRAHMA's built-in generative engine runs automatically!
   GEMINI_API_KEY=
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   *The server will start on `http://localhost:5000`.*

---

### 3. Frontend Setup

1. Open a second terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The web application will open at `http://localhost:5173`.*

---

## 🧪 Verification Flow

1. **Sign Up / Login**:
   - Visit `http://localhost:5173`.
   - Click **"Get Started Free"** or use **"One-Click Demo Login"** on the Sign In modal.

2. **Dashboard**:
   - Access your personal dashboard with project stats, search bar, and project grid.

3. **Generate Website**:
   - Click **"New Website"** or **"Generate Your First Website"**.
   - Select an inspiration template or enter a custom prompt:
     > *"Create a restaurant website with a premium dark theme, hero section, menu, about section, customer reviews and contact information."*
   - Watch the animated 4-stage generation stepper synthesize the site.

4. **Interactive Preview**:
   - Switch between **Desktop (100%)**, **Tablet (iPad 768px)**, and **Mobile (iPhone 375px)** device views.
   - Click through the live menu, test interactive buttons, and trigger responsive navigation drawers.

5. **Iterative AI Editing**:
   - In the AI Co-Pilot chat panel on the left, type:
     > *"Change the website to a blue and white theme."*
   - Or:
     > *"Add a pricing section."*
   - Observe the assistant confirm the modifications and hot-reload the preview frame while preserving previous content.

6. **File Explorer**:
   - Switch to the **Files** tab in the top navigation bar.
   - Inspect `package.json`, `index.html`, `src/App.jsx`, and `README.md`.
   - Use **"Copy Code"** to copy source files directly to your clipboard.

7. **Download ZIP**:
   - Click **"Download"** in the top bar.
   - Extract the downloaded `.zip` archive on your computer and verify that it contains a runnable Vite + React setup.

8. **Deploy Live**:
   - Click **"Deploy"** in the top bar.
   - Watch the deployment pipeline advance: `Validating` → `Building` → `Uploading` → `Deploying` → `Live ✓`.
   - Open the live URL (`http://localhost:5000/live/<deployId>`) in an external tab to view your published website!

---

## 🔒 Security Best Practices
- Passwords salted and hashed with `bcryptjs` (10 rounds).
- Stateless authentication with signed JWT tokens.
- Server-side project ownership validation on all routes.
- Strict input validation and sanitization.
- AI API keys stored securely in `.env` and never exposed to client-side bundles.
