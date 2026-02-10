# Vercel Deployment Fix Guide

This guide resolves the deployment authentication issue where the Git author (`kiiromate`) lacks access to the Vercel project owned by `tychera`. We implement a **GitHub Actions** workflow to handle deployments using a token from the `tychera` account, bypassing the direct user permission check.

## 1. Access Resolution: Generate Vercel Token

**Perform these steps while logged into the `tychera` Vercel account:**

1.  Go to **Account Settings** (click avatar → Settings).
2.  Select **Tokens** from the left sidebar.
3.  Click **Create Token**.
4.  Name it: `github-action-deploy`.
5.  Scope: Select **Full Account Access** (simplest) or scope to the specific team/project if available.
6.  **Copy the token immediately**. You won't see it again.

## 2. Configuration: Update GitHub Secrets

**Perform these steps in the `TIL7/tychera-website` GitHub repository:**

1.  Go to **Settings** → **Secrets and variables** → **Actions**.
2.  Click **New repository secret**.
3.  Add the following secrets:

    *   **Name**: `VERCEL_TOKEN`
        *   **Value**: (The token you copied in Step 1)

    *   **Name**: `VERCEL_ORG_ID`
        *   **Value**: (Find this in Vercel: Project Settings → General → "Org ID" or `.vercel/project.json` if you pulled locally. Since you are on freemium, it's likely your User ID)
        *   *To find it manually:* Log in to Vercel, go to https://vercel.com/account/settings, copy "Your ID" (starts with `team_` or similar if it's a team, or just ID). OR run `vercel link` locally and check `.vercel/project.json`.

    *   **Name**: `VERCEL_PROJECT_ID`
        *   **Value**: (Find this in Vercel: Project Settings → General → "Project ID")

## 3. Account Management & Workflow

### How it Works
Instead of Vercel pulling code from GitHub and checking *who* pushed it, GitHub Actions now pushes the built code to Vercel using the `VERCEL_TOKEN`. Vercel sees this as a manual deployment authorized by the `tychera` account owner.

### Workflow
1.  You push code to `main` on GitHub.
2.  GitHub Actions triggers automatically.
3.  It builds the project and deploys to Vercel Production.

## 4. Verification Procedures

### Checklist
- [ ] `VERCEL_TOKEN` added to GitHub Secrets.
- [ ] `VERCEL_ORG_ID` added to GitHub Secrets.
- [ ] `VERCEL_PROJECT_ID` added to GitHub Secrets.
- [ ] A new commit pushed to `main`.

### Verification Steps
1.  Push the changes (including the new `.github` folder) to `main`:
    ```bash
    git add .github
    git commit -m "chore: add github actions for vercel deployment"
    git push origin main
    ```
2.  Go to the **Actions** tab in your GitHub repository.
3.  You should see a workflow named "Deploy to Vercel" running.
4.  Wait for it to turn green (Success).
5.  Go to your Vercel Dashboard → Deployments to confirm a new deployment has appeared.

## 5. Long-term Solution Architecture

This setup ("Push-to-Deploy" via CI) is the industry standard for professional teams, especially when crossing organization boundaries.

*   **Decoupling**: Deployment permission is tied to the *Repository* (via Secrets), not the individual *User*.
*   **Scalability**: New developers can be added to the GitHub repo without needing Vercel access.
*   **Security**: You can rotate the `VERCEL_TOKEN` at any time without asking contributors to re-authenticate.

---
**Note:** Ensure you disable the automatic Vercel-GitHub integration in the Vercel Project Settings → Git to prevent duplicate (failed) build attempts, although keeping it is fine as the GitHub Action will just override it.
