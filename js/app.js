/***** PrizePaths app (compat SDK) *****/

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
    alert("Firebase SDK not loaded — check script order in HTML");
    return;
  }
  try {
    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    window.auth = firebase.auth();
    window.db   = firebase.firestore();
    console.log(
      "[PrizePaths] Firebase initialised. apiKey:",
      (firebase.app().options.apiKey || "").slice(0, 10) + "…"
    );
  } catch (e) {
    console.error("Firebase init error:", e);
    alert("Firebase init error: " + (e.message || e));
  }
})();

// === Visible error helper ===
function showErr(msg) {
  let el = document.getElementById("pp-error");
  if (!el) {
    el = document.createElement("div");
    el.id = "pp-error";
    el.style.cssText =
      "max-width:760px;margin:16px auto;padding:12px;border:1px solid #e11;color:#b00;background:#fee;border-radius:8px;font-family:system-ui";
    document.body.prepend(el);
  }
  el.textContent = msg;
  console.error("[PrizePaths]", msg);
}

// Visible debug helper (hidden on pages via CSS)
function pp(msg) {
  console.log("[PrizePaths]", msg);
  let el = document.getElementById("pp-debug");
  if (!el) {
    el = document.createElement("pre");
    el.id = "pp-debug";
    el.style.cssText =
      "white-space:pre-wrap;background:#222;color:#0f0;padding:8px;margin:8px;font-family:monospace;border-radius:8px";
    document.body.prepend(el);
  }
  el.textContent += msg + "\n";
}

// --- Boot banner (also hidden via CSS) ---
document.addEventListener("DOMContentLoaded", () => {
  const boot = document.createElement("div");
  boot.id = "pp-boot";
  boot.style.cssText =
    "position:fixed;top:8px;left:8px;z-index:9999;background:#111;color:#0f0;padding:6px 10px;border-radius:8px;font:12px/1.2 system-ui";
  boot.textContent = "PrizePaths JS loaded ✔";
  document.body.appendChild(boot);
});

// --- Signup + Login handlers ---
document.addEventListener("DOMContentLoaded", () => {
  // SIGNUP FLOW (index.html)
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = signupForm.name?.value.trim() || "";
      const email = signupForm.email?.value.trim().toLowerCase() || "";
      const pass = signupForm.password?.value || "";

      if (!email || !pass) {
        showErr("Please enter a valid email and password.");
        return;
      }

      pp("Submitting signup for " + email);
      try {
        const cred = await auth.createUserWithEmailAndPassword(email, pass);
        pp("✅ Created user " + cred.user.uid);

        await db
          .collection("users")
          .doc(cred.user.uid)
          .set(
            {
              name,
              email,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              surveyCompleted: false,
            },
            { merge: true }
          );

        pp("✅ Firestore write done, redirecting to survey.html …");
        window.location.href = "survey.html";
      } catch (err) {
        pp("❌ " + (err?.code || "") + " " + (err?.message || err));
        alert("Signup error: " + (err?.message || err));
      }
    });
  }

  // LOGIN FLOW (login.html → login survey)
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.email?.value.trim().toLowerCase() || "";
      const pass = loginForm.password?.value || "";

      if (!email || !pass) {
        showErr("Please enter your email and password to log in.");
        return;
      }

      pp("Attempting login for " + email);
      try {
        const cred = await auth.signInWithEmailAndPassword(email, pass);
        pp("✅ Logged in " + cred.user.uid);

        // ✅ After login, send them to the login-only survey
        window.location.href = "survey-login.html";
      } catch (err) {
        pp("❌ Login error " + (err?.code || "") + " " + (err?.message || err));
        alert("Login error: " + (err?.message || err));
      }
    });
  }
});
