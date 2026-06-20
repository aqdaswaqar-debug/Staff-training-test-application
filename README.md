# Berkowits Hair Loss Knowledge Test

A staff training assessment app for Berkowits Hair and Skin Clinic.

- 25 multiple-choice questions, 2 marks each (50 total)
- One question per screen, 30-second timer per question
- Answers lock immediately on selection — no going back, no skipping ahead
- Each Employee ID can only attempt the test once
- Camera snapshots taken periodically during the test for review
- Results (score, answers, branch, snapshots) saved automatically to a Google Sheet

## Setup

See **SETUP.md** for full step-by-step instructions to get this live and connected
to your Google Sheet — no coding experience required.

## Local development (optional, for technical users)

```bash
npm install
cp .env.example .env.local   # then fill in the values, see SETUP.md
npm run dev
```

## Project structure

- `lib/questions.ts` — the 25 questions and correct answers
- `lib/sheets.ts` — Google Sheets read/write logic
- `app/page.tsx` — entry screen (Employee ID, Name, Branch)
- `app/test/page.tsx` — the timed test itself
- `app/result/page.tsx` — final score screen
- `app/api/` — server-side logic (answer checking, scoring, Sheet writes)
