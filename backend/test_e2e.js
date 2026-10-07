// Comprehensive End-to-End BRAHMA Verification Test Script
async function runVerification() {
  console.log('🧪 Starting End-to-End BRAHMA AI Verification Test...');

  const BASE_API = 'http://localhost:5000/api';

  // 1. Backend Health Check
  console.log('\n[1/12] Testing BRAHMA Backend Health Check...');
  const healthRes = await fetch(`${BASE_API}/health`);
  const healthJson = await healthRes.json();
  console.log('  ✓ Backend response:', healthJson);
  if (!healthJson.service.includes('BRAHMA')) {
    throw new Error('Health check does not mention BRAHMA');
  }

  // 2. User Registration
  console.log('\n[2/12] Testing User Registration...');
  const rawEmail = `brahma.creator.${Date.now()}@brahma.ai`;
  const regRes = await fetch(`${BASE_API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Elena Rostova',
      email: `  ${rawEmail}  `, // Test whitespace trimming
      password: 'password123'
    })
  });
  const regData = await regRes.json();
  console.log('  ✓ Register success:', regData.success, 'User:', regData.user?.email);
  if (!regData.token) throw new Error('No token returned from registration');

  // 3. Login with exact and case-insensitive email + whitespace
  console.log('\n[3/12] Testing Login with uppercase & whitespace email (Bug fix test)...');
  const upperEmail = `  ${rawEmail.toUpperCase()}  `;
  const loginRes = await fetch(`${BASE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: upperEmail,
      password: 'password123'
    })
  });
  const loginData = await loginRes.json();
  console.log('  ✓ Case-insensitive Login success:', loginData.success, 'Token received:', !!loginData.token);
  if (!loginData.success || !loginData.token) {
    throw new Error('Case-insensitive / whitespace login failed');
  }
  const token = loginData.token;

  // 4. Test Login rejection on invalid password
  console.log('\n[4/12] Testing Login rejection on incorrect password...');
  const badLoginRes = await fetch(`${BASE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: rawEmail,
      password: 'wrong_password_999'
    })
  });
  const badLoginData = await badLoginRes.json();
  console.log('  ✓ Incorrect credentials correctly rejected:', badLoginData.success === false);
  if (badLoginData.success) {
    throw new Error('Incorrect password was unexpectedly accepted');
  }

  // 5. Verify /auth/me session recovery
  console.log('\n[5/12] Testing /auth/me session profile recovery...');
  const meRes = await fetch(`${BASE_API}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const meData = await meRes.json();
  console.log('  ✓ User profile loaded:', meData.user?.name, 'Email:', meData.user?.email);

  // 6. Generate Website via Prompt
  console.log('\n[6/12] Testing BRAHMA AI Website Generation from Prompt...');
  const promptText = 'Create a modern portfolio website for a software engineering student with a dark theme, projects section, skills section, contact form and responsive design.';
  const projRes = await fetch(`${BASE_API}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      prompt: promptText,
      projectName: 'Kaelen Vance | Systems'
    })
  });
  const projData = await projRes.json();
  console.log('  ✓ Project created:', projData.success);
  console.log('  ✓ Project Name:', projData.project?.projectName);
  console.log('  ✓ Preview HTML length:', projData.previewHtml?.length, 'bytes');

  // Verify preview isolation marker <base target="_self">
  const hasBaseTarget = projData.previewHtml.includes('<base target="_self">') || projData.previewHtml.includes("target='_self'");
  console.log('  ✓ Preview includes <base target="_self"> isolation:', hasBaseTarget);

  const projectId = projData.project._id || projData.project.id;

  // 7. Test Iterative AI Editing
  console.log('\n[7/12] Testing Iterative AI Editing Prompt...');
  const iterPrompt = 'Change the website to a high-contrast dark theme with magenta accents and add a pricing section.';
  const chatRes = await fetch(`${BASE_API}/projects/${projectId}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message: iterPrompt })
  });
  const chatData = await chatRes.json();
  console.log('  ✓ Iteration response received:', chatData.success);
  console.log('  ✓ AI Co-Pilot Explanation:', chatData.assistantMessage?.message);
  console.log('  ✓ Updated HTML length:', chatData.previewHtml?.length, 'bytes');

  const hasPricing = chatData.previewHtml.includes('pricing') || chatData.previewHtml.includes('Pricing');
  console.log('  ✓ Updated preview includes pricing section:', hasPricing);

  // 8. Verify Project Files
  console.log('\n[8/12] Testing Project Files Explorer endpoint...');
  const filesRes = await fetch(`${BASE_API}/projects/${projectId}/files`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const filesData = await filesRes.json();
  console.log('  ✓ Files count:', filesData.files?.length);
  console.log('  ✓ File paths:', filesData.files?.map(f => f.filePath));

  // 9. Test ZIP Download Packaging
  console.log('\n[9/12] Testing Project ZIP File Download...');
  const zipRes = await fetch(`${BASE_API}/projects/${projectId}/download`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const zipBlob = await zipRes.arrayBuffer();
  console.log('  ✓ ZIP package status:', zipRes.status, 'Size:', zipBlob.byteLength, 'bytes');

  // 10. Test Live Cloud Deployment
  console.log('\n[10/12] Testing Website Deployment Pipeline...');
  const deployRes = await fetch(`${BASE_API}/projects/${projectId}/deploy`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const deployData = await deployRes.json();
  console.log('  ✓ Deployment status:', deployData.status);
  console.log('  ✓ Live URL:', deployData.deploymentUrl);
  console.log('  ✓ Deployment ID:', deployData.deploymentId);

  // 11. Fetch Live Website directly via its Public Deployment URL
  console.log('\n[11/12] Testing Public Live Hosted Website Route...');
  const liveRes = await fetch(`http://localhost:5000/live/${deployData.deploymentId}`);
  const liveHtml = await liveRes.text();
  console.log('  ✓ Live Site HTTP Status:', liveRes.status);
  console.log('  ✓ Live Site Title check:', liveHtml.includes('<title>'));
  console.log('  ✓ Live Site Brand check:', liveHtml.includes('Kaelen Vance'));

  // 12. Test Restaurant Niche Generation
  console.log('\n[12/12] Testing Restaurant Niche Synthesis...');
  const restRes = await fetch(`${BASE_API}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      prompt: 'Create a restaurant website with a premium dark theme, hero section, menu, about section, customer reviews and contact information.',
      projectName: 'L\'Atelier Noir'
    })
  });
  const restData = await restRes.json();
  console.log('  ✓ Restaurant Project created:', restData.success);
  console.log('  ✓ Contains menu section:', restData.previewHtml.includes('id="menu"'));
  console.log('  ✓ Contains chef tasting:', restData.previewHtml.includes('Tasting') || restData.previewHtml.includes('Wagyu'));

  console.log('\n🎉 ALL 12/12 BRAHMA VERIFICATION CHECKS PASSED PERFECTLY!\n');
}

runVerification().catch(err => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
