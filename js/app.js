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
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = signupForm.name.value.trim();
    const email = signupForm.email.value.trim().toLowerCase();
    const password = signupForm.password.value;

    try {
      console.log('[Signup] Using apiKey:', (firebase.app().options.apiKey||'unknown').slice(0,10)+'...');
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      console.log('[Signup] Success UID:', cred.user?.uid);

      await db.collection('users').doc(cred.user.uid).set({
        name,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        surveyCompleted: false
      }, { merge: true });

      window.location.href = 'survey.html';
    } catch (err) {
      showErr(`Signup error: ${err?.code || ''} ${err?.message || err}`);
      alert(err?.message || 'Signup failed');
    }
  });
}
