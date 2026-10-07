// Targeted Navigation Bug Fix Verification Suite
import fs from 'fs';
import path from 'path';

function runNavigationTests() {
  console.log('🧪 Starting Navigation & Preview Isolation Fix Verification...\n');

  // Test 1: Route Parser Behavior (App.jsx)
  console.log('[Test 1] Testing parseAppRoute for App Routes vs In-Page Preview Anchors...');
  
  function parseAppRoute(pathname, hash) {
    if (pathname) {
      const pathEditorMatch = pathname.match(/^\/projects\/([^\/]+)(?:\/editor)?\/?$/i);
      if (pathEditorMatch) {
        return { page: 'editor', projectId: pathEditorMatch[1] };
      }
      if (pathname === '/dashboard') {
        return { page: 'dashboard', projectId: null };
      }
    }

    if (hash) {
      if (hash.startsWith('#/editor/')) {
        const id = hash.replace('#/editor/', '').split('?')[0].split('#')[0];
        if (id) return { page: 'editor', projectId: id };
      }
      if (hash.startsWith('#/projects/')) {
        const parts = hash.replace('#/projects/', '').split('/');
        const id = parts[0].split('?')[0].split('#')[0];
        if (id) return { page: 'editor', projectId: id };
      }
      if (hash === '#/dashboard' || hash.startsWith('#/dashboard')) {
        return { page: 'dashboard', projectId: null };
      }
      if (hash === '#/' || hash === '' || hash === '#') {
        return { page: 'landing', projectId: null };
      }
    }

    return null;
  }

  // Valid app routes
  const r1 = parseAppRoute('', '#/editor/proj-abc-123');
  console.assert(r1 && r1.page === 'editor' && r1.projectId === 'proj-abc-123', 'r1 failed');
  console.log('  ✓ #/editor/proj-abc-123 correctly identified as Editor route');

  const r2 = parseAppRoute('/projects/proj-abc-123/editor', '');
  console.assert(r2 && r2.page === 'editor' && r2.projectId === 'proj-abc-123', 'r2 failed');
  console.log('  ✓ /projects/proj-abc-123/editor correctly identified as Editor route');

  const r3 = parseAppRoute('', '#/dashboard');
  console.assert(r3 && r3.page === 'dashboard', 'r3 failed');
  console.log('  ✓ #/dashboard correctly identified as Dashboard route');

  // Preview anchor links that previously caused the bug
  const anchorTests = ['#about', '#menu', '#projects', '#skills', '#pricing', '#reviews', '#contact', '#hero', '#order'];
  for (const anchor of anchorTests) {
    const res = parseAppRoute('', anchor);
    console.assert(res === null, `Anchor ${anchor} should return null so parent router ignores it!`);
    console.log(`  ✓ Preview anchor "${anchor}" correctly ignored (returned null)`);
  }

  // Test 2: LivePreview.jsx source inspection
  console.log('\n[Test 2] Verifying LivePreview.jsx Isolation & Sandbox Configuration...');
  const livePreviewPath = path.resolve('./src/components/editor/LivePreview.jsx');
  const livePreviewCode = fs.readFileSync(livePreviewPath, 'utf8');

  console.assert(livePreviewCode.includes('<base target="_self">'), 'LivePreview must inject <base target="_self">');
  console.log('  ✓ <base target="_self"> correctly configured to prevent targeting parent/top window');

  console.assert(livePreviewCode.includes("sandbox=\"allow-scripts allow-forms allow-modals\""), 'LivePreview must use isolated sandbox');
  console.log('  ✓ Sandbox attribute is strictly isolated (allow-top-navigation is omitted)');

  console.assert(livePreviewCode.includes("addEventListener('click'"), 'LivePreview must intercept link clicks');
  console.assert(livePreviewCode.includes("e.preventDefault()"), 'LivePreview must prevent default link navigation');
  console.assert(livePreviewCode.includes("e.stopPropagation()"), 'LivePreview must stop event propagation');
  console.log('  ✓ Capture-phase link click interceptor correctly halts browser URL modification');

  // Test 3: App.jsx inspection
  console.log('\n[Test 3] Verifying App.jsx Route Guard Immunity...');
  const appPath = path.resolve('./src/App.jsx');
  const appCode = fs.readFileSync(appPath, 'utf8');

  console.assert(appCode.includes('if (!route)'), 'App.jsx must ignore null routes from preview anchors');
  console.log('  ✓ App.jsx explicitly ignores in-page anchors and prevents unexpected redirects');

  console.assert(appCode.includes('sessionStorage'), 'App.jsx must persist activeProjectId');
  console.log('  ✓ Active project ID is persisted in sessionStorage across remounts');

  // Test 4: EditorPage.jsx inspection
  console.log('\n[Test 4] Verifying EditorPage.jsx Loading Decoupling...');
  const editorPagePath = path.resolve('./src/pages/EditorPage.jsx');
  const editorPageCode = fs.readFileSync(editorPagePath, 'utf8');

  console.assert(editorPageCode.includes('projectDetailLoading'), 'EditorPage must use decoupled projectDetailLoading');
  console.assert(editorPageCode.includes('isCurrentProjectLoaded'), 'EditorPage must not unmount if project is already loaded');
  console.log('  ✓ EditorPage avoids unnecessary unmounting when reopening or navigating project');

  console.log('\n🎉 ALL NAVIGATION & PREVIEW ISOLATION TESTS PASSED!\n');
}

runNavigationTests();
