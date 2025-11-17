// PrizePaths member survey (generic, no PS5 images)

// Guard: user must be logged in
auth.onAuthStateChanged((user) => {
  if (!user) {
    console.warn("[PrizePaths] No user, redirecting to login.");
    window.location.href = "login.html";
  }
});

// SURVEY QUESTIONS
// NOTE: daily-goodie-box.png and nurture-life.png should live in assets/img/
const questions = [
  // Q1
  {
    id: "want_free_products",
    title: "Do you want to test & receive free products?",
    text: "Let us know how excited you are about trying new products.",
    type: "single",
    options: [
      { label: "Absolutely", value: "absolutely" },
      { label: "Yes, I'd love to", value: "yes_love_to" },
      { label: "No, I'll miss out", value: "no_miss_out" }
    ]
  },

  // Q2
  {
    id: "last_product_test",
    title: "When was the last time you did a product test?",
    text: "Think about the last time you received a product to try and review.",
    type: "single",
    options: [
      { label: "Within the last 6 months", value: "within_6_months" },
      { label: "Within the last year", value: "within_year" },
      { label: "Over a year ago", value: "over_year" },
      { label: "I never have", value: "never" }
    ]
  },

  // Q3
  {
    id: "enjoy_free_products",
    title: "Do you enjoy getting free products to try?",
    text: "Be honest — we want to know if you actually enjoy samples and test products.",
    type: "single",
    options: [
      { label: "Yes, absolutely", value: "yes_absolutely" },
      { label: "Yes, sometimes", value: "yes_sometimes" },
      { label: "No, not for me", value: "no_not_for_me" }
    ]
  },

  // Q4
  {
    id: "shop_for_most",
    title: "Who do you shop for the most?",
    text: "Choose the option that best describes your main shopping focus.",
    type: "single",
    options: [
      { label: "Myself", value: "myself" },
      { label: "Partner", value: "partner" },
      { label: "Children", value: "children" },
      { label: "Friends", value: "friends" },
      { label: "Pets", value: "pets" }
    ]
  },

  // Q5
  {
    id: "products_important",
    title: "Which products are most important to you?",
    text: "You can choose more than one category if they all matter to you.",
    type: "multi",
    options: [
      { label: "Health / Fitness", value: "health_fitness" },
      { label: "Beauty", value: "beauty" },
      { label: "Clothing", value: "clothing" },
      { label: "Food", value: "food" },
      { label: "Subscriptions", value: "subscriptions" }
    ]
  },

  // Q6
  {
    id: "know_about_new_products",
    title: "Do you want to know about new products to test & other freebies?",
    text: "We can let you know when new test products and freebies are available.",
    type: "single",
    options: [
      { label: "Yes, please", value: "yes_please" },
      { label: "No, I'll miss out", value: "no_miss_out" }
    ]
  },

  // Q7
  {
    id: "free_sample_box",
    title: "If a company offered a 100% free sample box or heavily discounted trial, would you want to see it?",
    text: "Some brands run full-size box trials or heavily discounted offers.",
    type: "single",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" }
    ]
  },

  // Q8 – Daily Goodie Box
  {
    id: "daily_goodie_box",
    title: "Would you like to receive a free Daily Goodie Box?",
    text: "Daily Goodie Box sends free boxes with assorted samples when you qualify.",
    type: "single",
    image: "assets/img/daily-goodie-box.png?v=13",
    imageAlt: "Daily Goodie Box",
    options: [
      {
        label: "Yes, please",
        value: "yes_dgb",
        // Open this when selected, then move to next question
        offerUrl: "https://la.luxeads.com/aff_c?offer_id=4200&aff_id=4555"
      },
      { label: "No, thanks", value: "no_dgb" }
    ]
  },

  // Q9
  {
    id: "grocery_spend",
    title: "How much do you spend on groceries each week?",
    text: "An estimate is fine — we just want a rough idea.",
    type: "single",
    options: [
      { label: "Under $100", value: "under_100" },
      { label: "$100 – $199", value: "100_199" },
      { label: "$200 – $300", value: "200_300" },
      { label: "$300+", value: "300_plus" }
    ]
  },

  // Q10
  {
    id: "save_time_money_shopping",
    title: "Would you like a way to save time & money on shopping?",
    text: "Some offers focus on saving you time, others save you money — some do both.",
    type: "single",
    options: [
      { label: "Yes, that sounds great", value: "yes_sounds_great" },
      { label: "No, thanks", value: "no_thanks" }
    ]
  },

  // Q11 – Nurture Life
  {
    id: "nurture_life_offer",
    title: "Would you like to save time & money with Nurture Life (50% off)?",
    text: "Nurture Life delivers healthy, ready-to-eat meals for children aged 8 months up to 10 years. "
        + "Nutritious food delivered to your door, ready in as little as one minute.",
    type: "single",
    image: "assets/img/nurture-life.png?v=13",
    imageAlt: "Nurture Life meals",
    options: [
      {
        label: "Yes, please",
        value: "yes_nurture_life",
        offerUrl: "https://afflat3e1.com/trk/lnk/CBC3F3EB-4292-4F6A-99B5-397832E8F242/?o=30729&c=918277&a=775201&k=F618F6F5BFE3B2514825E0019EEDF6EC&l=35329"
      },
      { label: "No", value: "no_nurture_life" }
    ]
  }
];

let currentIndex = 0;
const responses = {};

// DOM references
const cardEl      = document.getElementById("pp-question-card");
const contentEl   = document.getElementById("pp-question-content");
const completeEl  = document.getElementById("pp-complete");
const backBtn     = document.getElementById("pp-btn-back");
const nextBtn     = document.getElementById("pp-btn-next");
const skipBtn     = document.getElementById("pp-btn-skip");
const progressLbl = document.getElementById("pp-progress-label");
const progressPct = document.getElementById("pp-progress-percent");
const progressBar = document.getElementById("pp-progress-bar");

function updateProgress() {
  const total = questions.length;
  const qNum  = currentIndex + 1;
  const pct   = Math.round((qNum - 1) / total * 100);

  if (progressLbl) progressLbl.textContent = `Question ${qNum} of ${total}`;
  if (progressPct) progressPct.textContent = `${pct}%`;
  if (progressBar) progressBar.style.width = `${pct}%`;
}

function renderQuestion() {
  const q = questions[currentIndex];
  if (!q || !contentEl) return;

  updateProgress();

  if (backBtn) backBtn.disabled = currentIndex === 0;
  if (nextBtn) {
    nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish →" : "Next →";
  }

  const stored = responses[q.id];
  let html = "";

  html += `<h2 class="text-xl sm:text-2xl font-semibold mb-3">${q.title}</h2>`;
  html += `<p class="text-sm sm:text-base text-gray-700 mb-4">${q.text}</p>`;

  if (q.image) {
    html += `
      <div class="mb-4 flex justify-center">
        <img src="${q.image}" alt="${q.imageAlt || ""}"
             class="max-h-52 w-auto rounded-xl shadow-sm" />
      </div>
    `;
  }

  if (q.type === "single") {
    html += `<div class="space-y-3">`;
    q.options.forEach((opt, idx) => {
      const inputId = `${q.id}_${idx}`;
      const checked = stored === opt.value ? "checked" : "";
      html += `
        <label for="${inputId}" class="flex items-start gap-3 text-sm sm:text-base cursor-pointer">
          <input
            id="${inputId}"
            type="radio"
            name="${q.id}"
            value="${opt.value}"
            class="mt-1 h-4 w-4 border-gray-400"
            ${checked}
          />
          <span>${opt.label}</span>
        </label>
      `;
    });
    html += `</div>`;
  } else if (q.type === "multi") {
    const arr = Array.isArray(stored) ? stored : [];
    html += `<div class="space-y-3">`;
    q.options.forEach((opt, idx) => {
      const inputId = `${q.id}_${idx}`;
      const checked = arr.includes(opt.value) ? "checked" : "";
      html += `
        <label for="${inputId}" class="flex items-start gap-3 text-sm sm:text-base cursor-pointer">
          <input
            id="${inputId}"
            type="checkbox"
            name="${q.id}"
            value="${opt.value}"
            class="mt-1 h-4 w-4 border-gray-400"
            ${checked}
          />
          <span>${opt.label}</span>
        </label>
      `;
    });
    html += `</div>`;
  }

  contentEl.innerHTML = html;
}

function getCurrentResponse() {
  const q = questions[currentIndex];
  if (!q) return null;

  if (q.type === "single") {
    const selected = document.querySelector(`input[name="${q.id}"]:checked`);
    return selected ? selected.value : null;
  }

  if (q.type === "multi") {
    const selected = Array.from(document.querySelectorAll(`input[name="${q.id}"]:checked`));
    return selected.map((el) => el.value);
  }

  return null;
}

function maybeOpenOfferLinks(q, value) {
  if (!q || !q.options) return;

  if (q.type === "single") {
    const opt = q.options.find(o => o.value === value);
    if (opt && opt.offerUrl) {
      window.open(opt.offerUrl, "_blank");
    }
  } else if (q.type === "multi" && Array.isArray(value)) {
    q.options.forEach(opt => {
      if (opt.offerUrl && value.includes(opt.value)) {
        window.open(opt.offerUrl, "_blank");
      }
    });
  }
}

function goNext(skipCurrent = false) {
  const q = questions[currentIndex];
  if (!q) return;

  if (!skipCurrent) {
    const value = getCurrentResponse();
    if (value === null || (Array.isArray(value) && value.length === 0)) {
      alert("Please select an option or tap Skip for this question.");
      return;
    }
    responses[q.id] = value;
    maybeOpenOfferLinks(q, value);
  } else {
    responses[q.id] = null;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    finishSurvey();
  }
}

function goBack() {
  if (currentIndex === 0) return;
  currentIndex--;
  renderQuestion();
}

async function finishSurvey() {
  try {
    const user = auth.currentUser;
    if (user && db) {
      await db.collection("users").doc(user.uid).set(
        {
          surveyCompleted: true,
          surveyResponses: responses,
          surveyCompletedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (err) {
    console.error("[PrizePaths] Error saving survey:", err);
  }

  if (cardEl) cardEl.classList.add("hidden");
  if (completeEl) completeEl.classList.remove("hidden");

  if (progressBar) progressBar.style.width = "100%";
  if (progressPct) progressPct.textContent = "100%";
  if (progressLbl) progressLbl.textContent = "Completed";
}

// Wire buttons
if (nextBtn) nextBtn.addEventListener("click", () => goNext(false));
if (skipBtn) skipBtn.addEventListener("click", () => goNext(true));
if (backBtn) backBtn.addEventListener("click", goBack);

// First render
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
});
