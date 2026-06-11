const caseSlides = [
  {
    id: "case-1",
    progress: "Case 1 of 6",
    title: "Lower Extremity Screening Challenge",
    image: "assets/lower-extremity-red-flags.png",
    prompt: "A patient reports calf discomfort that begins with walking and settles after stopping for a short rest. The symptoms are not strongly changed by spinal position.",
    clues: [
      "Calf pain appears with walking",
      "Symptoms ease with stopping to rest",
      "No clear relief pattern with trunk flexion",
      "No recent traumatic injury"
    ],
    legend: "Which interpretation fits this presentation best?",
    options: [
      "More consistent with vascular claudication pattern",
      "More consistent with neurogenic claudication pattern",
      "More consistent with peripheral neuropathy pattern"
    ],
    answer: 0,
    feedback: [
      "Best choice. This pattern is more consistent with vascular claudication because the symptoms are linked to walking and settle with rest.",
      "Not the best choice. Neurogenic claudication is more likely when sitting or trunk flexion clearly changes symptoms.",
      "Not the best choice. Peripheral neuropathy more often sounds like burning, numbness, or distal sensory change rather than exercise-linked calf pain."
    ]
  },
  {
    id: "case-2",
    progress: "Case 2 of 6",
    title: "Upper Extremity Referral Pattern Challenge",
    image: "assets/upper-extremity-red-flags.png",
    prompt: "A patient describes deep left shoulder discomfort that does not change much with shoulder testing. They also report shortness of breath and a heavy, non-mechanical quality.",
    clues: [
      "Left shoulder pain",
      "Shortness of breath",
      "Little change during local shoulder testing",
      "Pain feels deep and non-mechanical"
    ],
    legend: "Which interpretation is most appropriate from a screening perspective?",
    options: [
      "Continue PT evaluation as a routine shoulder strain",
      "Monitor and reassess after exercise",
      "Refer for medical follow-up because the pattern may reflect a non-musculoskeletal source"
    ],
    answer: 2,
    feedback: [
      "Not the best choice. The presentation does not behave like a routine mechanical shoulder problem.",
      "Not the best choice. Monitoring alone is weaker here because the shortness of breath and non-mechanical pattern raise a stronger referral concern.",
      "Best choice. Left shoulder discomfort with breathing symptoms and minimal mechanical change should raise awareness of a possible systemic referral source."
    ]
  },
  {
    id: "case-3",
    progress: "Case 3 of 6",
    title: "Fracture Screening / Red Flag Challenge",
    image: "assets/fracture-screening.png",
    prompt: "A patient fell on an outstretched hand yesterday and now has rapid wrist swelling, strong guarding, and pain with even small attempts to move.",
    clues: [
      "Fall on an outstretched hand",
      "Rapid swelling",
      "Marked guarding",
      "Pain with minimal wrist movement"
    ],
    legend: "What is the most appropriate action?",
    options: [
      "Continue PT evaluation and test full wrist motion",
      "Monitor and schedule a recheck later",
      "Refer for medical follow-up before routine rehabilitation testing"
    ],
    answer: 2,
    feedback: [
      "Not the best choice. Multiple fracture-screening indicators make routine testing inappropriate.",
      "Not the best choice. Monitoring alone is not enough when the symptom cluster suggests possible fracture or a more urgent injury.",
      "Best choice. The trauma history, swelling, and guarded motion support referral before routine PT testing."
    ]
  },
  {
    id: "case-4",
    progress: "Case 4 of 6",
    title: "Night Pain / Non-Mechanical Symptoms",
    image: "",
    prompt: "A patient reports shoulder-region pain that wakes them at night and stays intense even after changing position. The symptoms are only minimally changed by movement testing.",
    clues: [
      "Night pain wakes the patient",
      "Repositioning does not help much",
      "Minimal change with local movement testing",
      "Pain feels constant rather than load-dependent"
    ],
    legend: "What is the best screening interpretation?",
    options: [
      "This is a routine mechanical presentation",
      "This pattern needs broader screening and closer medical concern awareness",
      "This is expected post-exercise soreness"
    ],
    answer: 1,
    feedback: [
      "Not the best choice. Constant night pain with little mechanical change does not fit a routine presentation well.",
      "Best choice. Night pain and non-mechanical behavior should push the PT to broaden screening and consider referral needs.",
      "Not the best choice. Post-exercise soreness should usually change more clearly with rest, time, or position."
    ]
  },
  {
    id: "case-5",
    progress: "Case 5 of 6",
    title: "Visceral Referral Pattern Challenge",
    image: "",
    prompt: "A patient reports deep right shoulder and scapular discomfort that does not change with arm testing and is paired with nausea after meals.",
    clues: [
      "Right shoulder and scapular pain",
      "Little change during arm testing",
      "Associated nausea",
      "Symptoms feel deep and poorly localized"
    ],
    legend: "Which screening interpretation is most appropriate?",
    options: [
      "Possible visceral referral pattern that needs medical follow-up awareness",
      "Routine rotator cuff overload",
      "Typical delayed-onset muscle soreness"
    ],
    answer: 0,
    feedback: [
      "Best choice. A deep, non-mechanical shoulder/scapular pattern with nausea should raise visceral referral awareness.",
      "Not the best choice. Rotator cuff overload should usually be more clearly linked to shoulder movement or loading.",
      "Not the best choice. Delayed-onset soreness would not usually present with nausea and this non-mechanical pattern."
    ]
  },
  {
    id: "case-6",
    progress: "Case 6 of 6",
    title: "PT Decision-Making Challenge",
    image: "",
    prompt: "A patient with lower extremity symptoms describes a recent unexplained decline in walking tolerance, unusual fatigue, and pain that does not fully match the movement exam.",
    clues: [
      "Walking tolerance has recently declined",
      "Unusual fatigue is present",
      "Symptoms do not fully match the movement exam",
      "The picture is not clearly routine or stable"
    ],
    legend: "Which PT decision is the safest next step?",
    options: [
      "Continue full PT evaluation without changing the plan",
      "Monitor/reassess and broaden the screen before assuming a routine musculoskeletal cause",
      "Ignore the history and focus only on strength testing"
    ],
    answer: 1,
    feedback: [
      "Not the best choice. The mismatch between history and exam suggests the PT should slow down and screen more broadly.",
      "Best choice. This presentation supports a monitor/reassess decision with broader screening before treating it as routine.",
      "Not the best choice. Ignoring the history would miss the medical-screening purpose of the activity."
    ]
  }
];

const slideState = {
  currentSlide: 0,
  completedCases: new Set(),
  caseAttempts: {}
};

const slideContent = document.getElementById("slide-content");
const slideProgress = document.getElementById("slide-progress");

function getCaseAttempt(caseId) {
  if (!slideState.caseAttempts[caseId]) {
    slideState.caseAttempts[caseId] = {
      firstAnswer: null,
      currentSelection: null,
      solved: false,
      firstAttemptCorrect: false,
      feedbackIndex: null
    };
  }

  return slideState.caseAttempts[caseId];
}

function renderSlide() {
  if (slideState.currentSlide === 0) {
    renderTitleSlide();
    return;
  }

  if (slideState.currentSlide === 1) {
    renderInstructionsSlide();
    return;
  }

  if (slideState.currentSlide >= 2 && slideState.currentSlide <= 7) {
    renderCaseSlide(caseSlides[slideState.currentSlide - 2], slideState.currentSlide - 2);
    return;
  }

  renderCompletionSlide();
}

function renderTitleSlide() {
  slideProgress.textContent = "";
  slideContent.innerHTML = `
    <article class="slide-card slide-card--centered">
      <p class="section-heading__kicker">Clinical Detective</p>
      <h2 id="slide-title">Medical Screening: Upper &amp; Lower Extremities</h2>
      <p class="slide-lead">A guided clinical reasoning exercise for entry-level PT students focused on upper and lower extremity medical screening.</p>
      <div class="slide-actions">
        <button class="button button--primary" type="button" data-action="next-slide">Start</button>
      </div>
    </article>
  `;

  bindNextSlide();
}

function renderInstructionsSlide() {
  slideProgress.textContent = "Instructions";
  slideContent.innerHTML = `
    <article class="slide-card">
      <p class="section-heading__kicker">Slide 2</p>
      <h2 id="slide-title">How the activity works</h2>
      <p class="section-intro">You will move through six clinical scenarios and decide what the symptom pattern suggests from a PT screening perspective.</p>
      <div class="slide-grid">
        <section class="detail-card">
          <h3>What you will do</h3>
          <ul class="signal-list">
            <li>Review a short patient presentation.</li>
            <li>Identify the clues that matter most.</li>
            <li>Choose the interpretation or action that best fits the screening picture.</li>
          </ul>
        </section>
        <section class="detail-card">
          <h3>How answers work</h3>
          <ul class="signal-list">
            <li>If your first choice is not the best one, feedback will explain why.</li>
            <li>You can keep trying on the same slide until you reach the best answer.</li>
            <li>Your first attempt is still tracked for the completion summary.</li>
          </ul>
        </section>
      </div>
      <section class="highlight-card">
        <h3>Possible PT decisions</h3>
        <p>Across the cases, your reasoning will center on whether the presentation supports continued PT evaluation, monitoring/reassessment, or referral for medical follow-up.</p>
      </section>
      <div class="slide-actions">
        <button class="button button--ghost" type="button" data-action="prev-slide">Back</button>
        <button class="button button--primary" type="button" data-action="next-slide">Begin Activity</button>
      </div>
    </article>
  `;

  bindPrevSlide();
  bindNextSlide();
}

function renderCaseSlide(caseData, caseIndex) {
  const attempt = getCaseAttempt(caseData.id);
  const hasFeedback = Number.isInteger(attempt.feedbackIndex);
  const solved = attempt.solved;

  slideProgress.textContent = caseData.progress;
  slideContent.innerHTML = `
    <article class="slide-card">
      <p class="section-heading__kicker">Clinical Scenario</p>
      <div class="slide-header">
        <h2 id="slide-title">${caseData.title}</h2>
        <span class="progress-chip">${caseData.progress}</span>
      </div>
      ${caseData.image ? `
        <section class="detail-card topic-image">
          <img src="${caseData.image}" alt="${caseData.title}">
        </section>
      ` : ""}
      <section class="detail-card">
        <h3>Scenario</h3>
        <p>${caseData.prompt}</p>
      </section>
      <section class="highlight-card">
        <h3>Relevant clues</h3>
        <div class="clue-board">
          ${caseData.clues.map((clue) => `<span class="clue-pill">${clue}</span>`).join("")}
        </div>
      </section>
      <section class="question-card">
        <fieldset ${solved ? "disabled" : ""}>
          <legend>${caseData.legend}</legend>
          <div class="question-options">
            ${caseData.options.map((option, index) => `
              <label class="option-label">
                <input type="radio" name="${caseData.id}" value="${index}" ${attempt.currentSelection === index ? "checked" : ""}>
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </fieldset>
        <div class="slide-actions">
          ${solved
            ? `<button class="button button--primary" type="button" data-action="next-slide">${caseIndex === caseSlides.length - 1 ? "Finish Activity" : "Next Case"}</button>`
            : `<button class="button button--primary" type="button" data-action="check-case" data-case-index="${caseIndex}">Check Response</button>`}
        </div>
        <div id="case-feedback" class="feedback" ${hasFeedback ? `data-state="${attempt.feedbackIndex === caseData.answer ? "correct" : "incorrect"}"` : "hidden"}>
          ${hasFeedback ? caseData.feedback[attempt.feedbackIndex] : ""}
        </div>
      </section>
    </article>
  `;

  if (!solved) {
    document.querySelectorAll(`input[name="${caseData.id}"]`).forEach((input) => {
      input.addEventListener("change", () => {
        attempt.currentSelection = Number(input.value);
      });
    });
  }

  const checkButton = document.querySelector('[data-action="check-case"]');
  if (checkButton) {
    checkButton.addEventListener("click", () => checkCase(caseIndex));
  }

  bindNextSlide();
}

function checkCase(caseIndex) {
  const caseData = caseSlides[caseIndex];
  const attempt = getCaseAttempt(caseData.id);
  const selected = document.querySelector(`input[name="${caseData.id}"]:checked`);
  const feedback = document.getElementById("case-feedback");

  if (!selected) {
    feedback.hidden = false;
    feedback.dataset.state = "incorrect";
    feedback.textContent = "Choose the option that best matches the screening picture before moving on.";
    return;
  }

  const selectedIndex = Number(selected.value);
  attempt.currentSelection = selectedIndex;

  if (attempt.firstAnswer === null) {
    attempt.firstAnswer = selectedIndex;
    attempt.firstAttemptCorrect = selectedIndex === caseData.answer;
  }

  attempt.feedbackIndex = selectedIndex;

  if (selectedIndex === caseData.answer) {
    attempt.solved = true;
    slideState.completedCases.add(caseData.id);
  }

  renderSlide();
}

function renderCompletionSlide() {
  const firstAttemptScore = caseSlides.reduce((total, caseData) => {
    const attempt = getCaseAttempt(caseData.id);
    return total + (attempt.firstAttemptCorrect ? 1 : 0);
  }, 0);

  slideProgress.textContent = `${slideState.completedCases.size} of ${caseSlides.length} Cases Completed`;
  slideContent.innerHTML = `
    <article class="slide-card">
      <p class="section-heading__kicker">Completion</p>
      <h2 id="slide-title">Activity Complete</h2>
      <div class="completion-grid">
        <div class="completion-metric">
          <strong>${slideState.completedCases.size} of ${caseSlides.length}</strong>
          <span>Cases Completed</span>
        </div>
        <div class="completion-metric">
          <strong>${firstAttemptScore} / ${caseSlides.length}</strong>
          <span>First-Attempt Score</span>
        </div>
      </div>
      <section class="highlight-card">
        <h3>Case Summary</h3>
        <div class="summary-list">
          ${caseSlides.map((caseData) => {
            const attempt = getCaseAttempt(caseData.id);
            return `
              <article class="summary-item">
                <h4>${caseData.title}</h4>
                <p><strong>Your first answer:</strong> ${attempt.firstAnswer === null ? "No answer recorded" : caseData.options[attempt.firstAnswer]}</p>
                <p><strong>Correct / best answer:</strong> ${caseData.options[caseData.answer]}</p>
                <p><strong>First attempt:</strong> ${attempt.firstAttemptCorrect ? "Correct" : "Needed correction"}</p>
                <p><strong>Explanation:</strong> ${caseData.feedback[caseData.answer]}</p>
              </article>
            `;
          }).join("")}
        </div>
      </section>
      <p class="slide-lead">Nice work. You completed all six cases and practiced how PT screening decisions can change even when the first answer is not the final one.</p>
      <div class="slide-actions">
        <button class="button button--primary" type="button" data-action="restart-activity">Restart Activity</button>
      </div>
    </article>
  `;

  if (window.scormHelper) {
    window.scormHelper.setLessonStatus("completed");
    window.scormHelper.commit();
  }

  document.querySelector('[data-action="restart-activity"]').addEventListener("click", restartActivity);
}

function bindNextSlide() {
  const nextButton = document.querySelector('[data-action="next-slide"]');
  if (!nextButton) {
    return;
  }

  nextButton.addEventListener("click", () => {
    slideState.currentSlide += 1;
    renderSlide();
  });
}

function bindPrevSlide() {
  const prevButton = document.querySelector('[data-action="prev-slide"]');
  if (!prevButton) {
    return;
  }

  prevButton.addEventListener("click", () => {
    slideState.currentSlide -= 1;
    renderSlide();
  });
}

function restartActivity() {
  slideState.currentSlide = 0;
  slideState.completedCases = new Set();
  slideState.caseAttempts = {};

  if (window.scormHelper) {
    window.scormHelper.setLessonStatus("incomplete");
    window.scormHelper.commit();
  }

  renderSlide();
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.scormHelper) {
    window.scormHelper.initialize();
    window.scormHelper.setLessonStatus("incomplete");
    window.scormHelper.commit();
  }

  renderSlide();
});
