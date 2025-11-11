// === Visible error helper ===
function showErr(msg) {
  let el = document.getElementById('pp-error');
  if (!el) {
    el = document.createElement('div');
    el.id = 'pp-error';
    el.style.cssText = 'max-width:760px;margin:16px auto;padding:12px;border:1px solid #e11;color:#b00;background:#fee;border-radius:8px;font-family:system-ui';
    document.body.prepend(el);
  }
  el.textContent = msg;
  console.error('[PrizePaths]', msg);
}

// Handle signup on index.html
const signupForm = // Visible debug helper
function pp(msg) {
  console.log('[PrizePaths]', msg);
  let el = document.getElementById('pp-debug');
  if (!el) {
    el = document.createElement('pre');
    el.id = 'pp-debug';
    el.style.cssText = 'white-space:pre-wrap;background:#222;color:#0f0;padding:8px;margin:8px;font-family:monospace';
    document.body.prepend(el);
  }
  el.textContent += msg + '\n';
}

// Handle signup
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  if (!form) return pp('⚠️ No #signupForm found');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const pass = form.password.value;
    pp('Submitting ' + email);
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, pass);
      pp('✅ Created user ' + cred.user.uid);
      await db.collection('users').doc(cred.user.uid).set({
        name, email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        surveyCompleted: false
      });
      pp('✅ Firestore write done, redirecting...');
      window.location.href = 'survey.html';
    } catch (err) {
      pp('❌ ' + (err.code || '') + ' ' + (err.message || err));
      alert('Signup error: ' + (err.message || err));
    }
  });
});

