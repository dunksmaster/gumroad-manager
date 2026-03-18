# 🛍️ Gumroad Manager

A beautiful, browser-based dashboard to manage your Gumroad products — edit descriptions, prices, tags, and more. Powered by the Gumroad API + AI-assisted description improvement.

## ✨ Features

- 📦 **View all products** — thumbnails, prices, sales count, publish status
- ✏️ **Edit products** — name, price, description, summary, tags
- ✨ **AI-powered descriptions** — improve your product descriptions with one click using Claude AI
- 💰 **Sales dashboard** — view your 50 most recent sales
- 👤 **Account info** — your Gumroad profile at a glance
- 🔍 **Search** — filter products instantly
- 🔐 **Secure** — your API token never leaves your browser

## 🚀 How to Use

1. Open the app
2. Paste your [Gumroad API token](https://app.gumroad.com/settings/advanced)
3. Start managing your products!

## 🔑 Getting Your API Token

1. Go to [gumroad.com/settings/advanced](https://app.gumroad.com/settings/advanced)
2. Create an Application
3. Click **Generate access token**
4. Paste it into the dashboard

## 🛠️ Tech Stack

- Vanilla HTML/CSS/JS — no frameworks, no installs
- Gumroad REST API v2
- Claude AI API for description improvements

## 📦 Deploy

Deployed via [Vercel](https://vercel.com) — auto-deploys on every push to `main`.

## 🔒 Security

Your API token is stored only in `sessionStorage` — it's never sent to any server other than `api.gumroad.com` directly from your browser.

---

Built with ❤️ using Claude AI
