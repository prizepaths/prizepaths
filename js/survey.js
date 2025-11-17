/****************************************************
 * PrizePaths — Full Survey Logic (Clean Version)
 * Works like the PS5 survey but no progress bar.
 ****************************************************/

// Image Paths
const dailyGoodieImage = "assets/img/daily-goodie-box.png";
const nurtureLifeImage = "assets/img/nurture-life.png";

// Q&A Structure
const surveyQuestions = [
  {
    question: "Do you want to test & receive free products?",
    options: [
      "Absolutely",
      "YES I'd love to",
      "NO I'll miss out"
    ]
  },

  {
    question: "When was the last time you did a product test?",
    options: [
      "Within the last 6 months",
      "Within the last year",
      "Over a year ago",
      "I never have"
    ]
  },

  {
    question: "Do you enjoy getting free products to try?",
    options: [
      "YES, Absolutely",
      "Yes, Sometimes",
      "NO, Not for me"
    ]
  },

  {
    question: "Who do you shop for the most?",
    options: [
      "Myself",
      "Partner",
      "Children",
      "Friends",
      "Pets"
    ]
  },

  {
    question: "Which products are most important to you?",
    options: [
      "Health / Fitness",
      "Beauty",
      "Clothing",
      "Food",
      "Subscriptions"
    ]
  },

  {
    question: "Do you want to know about new products to test & other freebies?",
    options: [
      "Yes Please",
      "No I'll miss out"
    ]
  },

  {
    question: "If a company offered a 100% free sample box or heavily discounted trial, would you want to see it?",
    options: [
      "Yes",
      "No"
    ]
  },

  {
    question: "Do you want to receive a Free Daily Goodie Box?",
    image: dailyGoodieImage,
    options: [
      {
        label: "Yes Please",
        action: () => {
          window.open(
            "https://la.luxeads.com/aff_c?offer_id=4200&aff_id=4555",
            "_blank"
          );
        }
      },
      { label: "No Thanks" }
    ]
  },

  {
    question: "How much do you spend on groceries each week?",
    options: [
      "Under $100",
      "$100 - $199",
      "$200 - $300",
      "$300+"
    ]
  },

  {
    question: "Would you like a way to save time & money on shopping?",
    options: [
      "Yes that sounds great",
      "No thanks"
    ]
  },

  {
    question: "Would you like to save time & money on Nurture Life (50% off)?",
    description: "Nurture Life delivers healthy, ready-to-eat meals for children aged 8 months to 10 years. Fresh, nutritious meals delivered to your door and ready in minutes.",
    image: nurtureLifeImage,
    options: [
      {
        label: "YES Please",
        action: () => {
          window.open(
            "https://afflat3e1.com/trk/lnk/CBC3F3EB-4292-4F6A-99B5-397832E8F242/?o=30729&c=918277&a=775201&k=F618F6F5BFE3B2514825E0019EEDF6EC&l=35329",
            "_blank"
          );
        }
      },
      { label: "NO" }
    ]
  },
];

// Thank You Page
function showThankYou() {
  const app = document.getElementById("surveyApp");
  app.innerHTML = `
    <div class="text-center mt-20">
      <h1 class="text-3xl font-serif mb-6">ALL DONE</h1>
      <p class="text-lg mb-6">Congratulations — you are now a PrizePaths member.</p>
      <p class="text-md mb-10">You now have exclusive access to hundreds of offers.</p>

      <a href="offers.html" class="px-6 py-3 bg-black text-white rounded-xl text-lg font-semibold">
        View Premium Offers
      </a>

      <p class="mt-10 text-sm opacity-70">® PrizePaths</p>
    </div>
  `;
}

// Render Question UI
let currentQuestion = 0;

function renderQuestion() {
  const app = document.getElementById("surveyApp");
  const q = surveyQuestions[currentQuestion];

  let imageHTML = q.image ? `
      <img src="${q.image}" class="mx-auto w-64 rounded-xl mb-6 shadow-lg"/>
  ` : "";

  let descriptionHTML = q.description ? `
      <p class="mb-4 text-gray-700 text-sm">${q.description}</p>
  ` : "";

  let optionsHTML = q.options.map(opt => {
    if (typeof opt === "string") {
      return `
        <button class="w-full md:w-1/2 mx-auto block mb-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
          onclick="nextQuestion()">
          ${opt}
        </button>
      `;
    } else {
      return `
        <button class="w-full md:w-1/2 mx-auto block mb-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
          onclick="
            ${opt.action ? "(" + opt.action.toString() + ")()" : ""}
            nextQuestion();
          ">
          ${opt.label}
        </button>
      `;
    }
  }).join("");

  app.innerHTML = `
    <div class="max-w-2xl mx-auto text-center mt-24 px-6">
      ${imageHTML}
      <h2 class="text-2xl font-semibold mb-6">${q.question}</h2>
      ${descriptionHTML}
      ${optionsHTML}
    </div>
  `;
}

// Next Question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= surveyQuestions.length) {
    showThankYou();
  } else {
    renderQuestion();
  }
}

// Start Survey
document.addEventListener("DOMContentLoaded", renderQuestion);
