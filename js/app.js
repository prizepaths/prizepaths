/***** PrizePaths app (compat SDK) – CLEAN PRODUCTION VERSION *****/

// --- Firebase config ---
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
    console.error("Firebase SDK not loaded — check script order in index.html");
    return;
  }
  try {
    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    // make globally available
    window.auth = firebase.auth();
    window.db   = firebase.firestore();
    console.log("[PrizePaths] Firebase initialised.");
  } catch (e) {
    console.error("Firebase init error:", e);
  }
})();

// === Error helper (only visible if something breaks) ===
function showErr(msg) {
  let el = document.getElementById("pp-error");
  if (!el) {
    el = document.createElement("div");
    el.id = "pp-error";
    el.style.cssText =
      "max-width:760px;margin:16px auto;padding:12px;border:1px solid #e11;" +
      "color:#b00;background:#fee;border-radius:8px;font-family:system-ui";
    document.body.prepend(el);
  }
  el.textContent = msg;
  console.error("[PrizePaths]", msg);
}

// --- SIGNUP HANDLER (clean version, no debug output) ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name?.value.trim() || "";
    const email = form.email?.value.trim().toLowerCase() || "";
    const pass = form.password?.value || "";

    try {
      const cred = await auth.createUserWithEmailAndPassword(email, pass);

      await db.collection("users").doc(cred.user.uid).set({
        name,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        surveyCompleted: false,
      }, { merge: true });

      // redirect
      window.location.href = "survey.html";
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup error: " + (err?.message || err));
    }
  });
});
