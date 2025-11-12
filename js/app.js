/***** PrizePaths app (compat SDK) *****/

// --- Firebase config (from your project) ---
const firebaseConfig = {
  apiKey: "AIzaSyAUB149FSoe2esB6-4mBCClXrBucbsbq5E",
  authDomain: "prizepaths.firebaseapp.com",
  projectId: "prizepaths",
  storageBucket: "prizepaths.firebasestorage.app",
  messagingSenderId: "908497618587",
  appId: "1:908497618587:web:437f61c6ab1ac71ef3a83e"
};

// --- Initialise Firebase (compat) and expose globals ---
(function initFirebase() {
  if (!window.firebase) {
    alert("Firebase SDK not loaded — check script order in index.html");
    return;
  }
  try {
    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    // make globally available
    window.auth = firebase.auth();
    window.db   = firebase.firestore();
    console.log("[PrizePaths] Firebase initialised. apiKey:", (firebase.app().options.apiKey||"").slice(0,10)+"…");
  } catch (e) {
    console.error("Firebase init error:", e);
    alert("Firebase init error: " + (e.message || e));
  }
})();

// --- Boot banner: proves JS loaded on page ---
document.addEventListener("DOMContentLoaded", () => {
  const boot = document.createElement("div");
  boot.id = "pp-boot";
  boot.style.cssText = "position:fixed;top:8px;left:8px;z-index:9999;background:#111;color:#0f0;padding:6px 10px;border-radius:8px;font:12px/1.2 system-ui";
  boot.textContent = "PrizePaths JS loaded ✔";
  document.body.appendChild(boot);
});

// === Visible error helper ===
function showErr(msg) {
  let el = document.getElementById("pp-error");
  if (!el) {
    el = document.createElement("div");
    el.id = "pp-error";
    el.style.cssText = "max-width:760px;margin:16px auto;padding:12px;border:1px solid #e11;color:#b00;background:#fee;border-radius:8px;font-family:system-ui";
    document.body.prepend(el);
  }
  el.textContent = msg;
  console.error("[PrizePaths]", msg);
}

// Visible debug helper (green console + on-page log)
function pp(msg) {
  console.log("[PrizePaths]", msg);
  let el = document.getElementById("pp-debug");
  if (!el) {
    el = document.createElement("pre");
    el.id = "pp-debug";
    el.style.cssText = "white-space:pre-wrap;background:#222;color:#0f0;padding:8px;margin:8px;font-family:monospace;border-radius:8px";
    document.body.prepend(el);
  }
  el.textContent += msg + "\n";
}

// --- Attach signup handler after DOM is ready ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  if (!form) return pp("⚠️ No #signupForm found on page");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name?.value.trim() || "";
    const email = form.email?.value.trim().toLowerCase() || "";
    const pass = form.password?.value || "";

    pp("Submitting " + email);
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, pass);
      pp("✅ Created user " + cred.user.uid);

      await db.collection("users").doc(cred.user.uid).set({
        name,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        surveyCompleted: false,
      }, { merge: true });

      pp("✅ Firestore write done, redirecting to survey.html …");
      window.location.href = "survey.html";
    } catch (err) {
      pp("❌ " + (err?.code || "") + " " + (err?.message || err));
      alert("Signup error: " + (err?.message || err));
    }
  });
});
