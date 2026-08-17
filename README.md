# Medical Screening: Upper & Lower Extremities

## Project Overview
This project is a small HTML, CSS, and JavaScript interactive learning activity for DPT 6221 Clinical Medicine II. It presents a slide-based "Clinical Detective" screening experience focused on upper and lower extremity medical screening through six guided cases.

The activity is designed to run as a standalone web page or inside a SCORM 1.2-compatible learning management system.

## Learning Objectives
- Differentiate common lower extremity symptom patterns using clue-based clinical reasoning.
- Recognize upper extremity and shoulder referral patterns that may suggest systemic or visceral involvement.
- Interpret red flags, fracture indicators, night pain, visceral referral clues, and PT decision-making scenarios.
- Apply entry-level PT decision-making through guided clinical scenarios and feedback.

## Topics Covered
- Title Screen
- Instructions
- Case 1: Lower Extremity Screening Challenge
- Case 2: Upper Extremity Referral Pattern Challenge
- Case 3: Fracture Screening / Red Flag Challenge
- Case 4: Night Pain / Non-Mechanical Symptoms
- Case 5: Visceral Referral Pattern Challenge
- Case 6: PT Decision-Making Challenge
- Completion Screen

## File Structure
- `index.html`: Main slide-based structure with the hero header and guided activity panel.
- `styles.css`: Baylor-inspired visual styling for the slide flow, case cards, clue boards, Quick Reference modal, and responsive behavior.
- `script.js`: Slide progression, multi-attempt case feedback logic, first-attempt tracking, Quick Reference behavior, restart behavior, and LMS completion flow.
- `scorm.js`: Basic SCORM 1.2 detection and communication helper.
- `imsmanifest.xml`: SCORM 1.2 manifest for packaging and LMS import.
- `README.md`: Project documentation and usage notes.
- `assets/`: Hero, case-support images, and the faculty-source reference image used to reproduce the Quick Reference tables.

## Local Testing Instructions
1. Open `index.html` directly in a browser for a quick local review.
2. For a more realistic browser test, serve the folder with a lightweight local server.
3. Verify that the Start, Begin Activity, Next Case, Finish Activity, and Restart Activity buttons move through the slide sequence correctly.
4. Verify that incorrect case answers keep the learner on the same slide and allow another attempt immediately.
5. Verify that the floating `Quick Reference` button appears during the case slides, opens the modal, and closes by button, backdrop click, and `Esc`.
6. Verify that the completion slide shows `6 of 6 Cases Completed`, a first-attempt score, and a case-by-case summary.
7. When testing locally without an LMS, the activity should still function normally because the SCORM helper fails gracefully when no LMS API is present.

## SCORM Packaging Instructions
1. Place `index.html`, `styles.css`, `script.js`, `scorm.js`, `imsmanifest.xml`, and any support files in the root of a package folder.
2. Keep the `assets` folder alongside the main files if it contains screenshots or media.
3. Zip the contents of that folder, not the folder itself, so `imsmanifest.xml` remains at the top level of the `.zip`.
4. A ready-to-upload SCORM package can be generated as `Medical-Screening-Upper-Lower-Extremities-SCORM12.zip`.
5. Upload the `.zip` package to a SCORM 1.2-compatible LMS.
6. On launch, the activity attempts to initialize the LMS API and sets `cmi.core.lesson_status` to `incomplete`.
7. When the learner reaches the completion screen, the activity sets `cmi.core.lesson_status` to `completed`.

## Accessibility Notes
- The activity uses semantic headings, buttons, fieldsets, legends, and labeled radio inputs.
- A skip link is included for keyboard users.
- Focus states are intentionally visible and use strong contrast.
- The layout is responsive and stacks vertically on smaller screens.
- Case feedback remains visible after each response.
- The Quick Reference dialog supports keyboard dismissal with `Esc`, focus containment while open, and returns focus to the previously active control on close.
- The Quick Reference tables use real HTML table markup with column headers, row headers, and horizontal scrolling on small screens.
- The slide flow uses clear action buttons and a restart path so learners can review the experience multiple times.

## GitHub Documentation Notes
- This project is fully static and can be hosted with GitHub Pages.
- SCORM communication will not activate on GitHub Pages because a standard web host does not expose an LMS API object.
- If sharing on GitHub, note that completion tracking appears only inside an LMS.
- If you want a repository preview, add screenshots inside `assets/` and reference them from this README.
