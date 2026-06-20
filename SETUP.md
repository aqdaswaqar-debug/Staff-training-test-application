# Setup Guide — Berkowits Hair Loss Knowledge Test

This guide walks you through the exact steps to get this test live at a shareable link.
No coding knowledge needed — just careful clicking.

---

## Step 1 — Upload this code to your GitHub repo

1. Unzip this project on your computer.
2. Go to your repo: https://github.com/aqdaswaqar-debug/Staff-training-test-application
3. Click **"uploading an existing file"** (or the **Add file → Upload files** button).
4. Drag in **all the files and folders** from the unzipped project (app, lib, public,
   package.json, etc. — everything except nothing, just the whole folder's contents).
5. Scroll down, add a commit message like "Initial upload", click **Commit changes**.

---

## Step 2 — Create a free Vercel account and import the project

1. Go to https://vercel.com and sign up (you can sign up directly with your GitHub account —
   this makes the next step automatic).
2. Click **Add New → Project**.
3. Select your `Staff-training-test-application` repo from the list and click **Import**.
4. Leave all settings as default. Click **Deploy**.
5. Wait about a minute. Vercel will give you a live link like
   `staff-training-test-application.vercel.app` — this is the link you'll share with staff.

At this point the app is live, but the Google Sheet connection won't work yet — that's Step 3.

---

## Step 3 — Connect to your Google Sheet (one-time setup)

This lets the app write results into your sheet automatically. It uses something called a
**service account** — a special Google account just for this app, not your personal Google login.

1. Go to https://console.cloud.google.com and sign in with your Google account.
2. Click the project dropdown at the top → **New Project**. Name it anything
   (e.g. "Berkowits Test App") → **Create**.
3. Once created and selected, go to **APIs & Services → Library**, search for
   **"Google Sheets API"**, click it, then click **Enable**.
4. Go to **APIs & Services → Credentials**.
5. Click **Create Credentials → Service account**.
6. Give it any name (e.g. "sheet-writer") → **Create and Continue** → **Done**
   (you can skip the optional role/access steps).
7. Click on the service account you just created (in the list on the Credentials page).
8. Go to the **Keys** tab → **Add Key → Create new key** → choose **JSON** → **Create**.
   A `.json` file will download to your computer. **Keep this file private — don't share it
   publicly or upload it to GitHub.**
9. Open that downloaded JSON file in any text editor. You'll see two values you need:
   - `client_email` — looks like `something@your-project.iam.gserviceaccount.com`
   - `private_key` — a long block of text starting with `-----BEGIN PRIVATE KEY-----`

10. Now open your Google Sheet (the one you already created and shared with me).
    Click the **Share** button (top right) and share it with the `client_email`
    address from step 9, giving it **Editor** access. This is the step that actually
    lets the app write into your sheet.

11. Go back to your Vercel project → **Settings → Environment Variables**, and add:
    - `GOOGLE_SHEET_ID` → the long ID from your sheet's URL (between `/d/` and `/edit`)
    - `GOOGLE_SERVICE_ACCOUNT_EMAIL` → the `client_email` value from step 9
    - `GOOGLE_PRIVATE_KEY` → the `private_key` value from step 9 (paste the whole thing,
      including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines)

12. Go to **Deployments** tab in Vercel, click the **⋯** menu on the latest deployment,
    and click **Redeploy** so the new settings take effect.

---

## Step 4 — Enable image storage for camera snapshots

1. In your Vercel project, go to the **Storage** tab.
2. Click **Create Database / Storage → Blob**.
3. Follow the prompts to create it and connect it to this project — Vercel will
   automatically add the `BLOB_READ_WRITE_TOKEN` environment variable for you.
4. Redeploy once more (same as step 12 above) so it picks up the new variable.

---

## Step 5 — Test it yourself before sending to staff

1. Open your live link.
2. Enter a test Employee ID, name, and branch (use something obviously fake like
   "TEST001" so it doesn't look like a real attempt in your records).
3. Allow camera access when prompted.
4. Go through a few questions, letting at least one time out to confirm auto-advance works.
5. Check your Google Sheet — a new row should appear with the test data.
6. Try visiting the link again with the same Employee ID — it should block you with
   the "already submitted" message.

If everything checks out, you're ready to share the real link with staff.

---

## Where the questions live

The 25 questions and their correct answers are in `lib/questions.ts`. If you ever need
to change a question or correct answer, that file is where it happens — send me the change
and I'll update it for you, or edit the text directly if you're comfortable doing so
(it's plain, readable text, not code logic).

## Need changes later?

Just describe what you'd like changed, and I'll update the code and give you the new
files to re-upload to the same GitHub repo (same drag-and-drop process as Step 1).
Vercel will automatically redeploy whenever the GitHub repo changes.
