# 🛍️ Gumroad Manager

A full-featured, browser-based dashboard to manage your entire Gumroad store — built with vanilla HTML/CSS/JS and powered by the Gumroad API + Claude AI.

No installs. No backend. Just open in your browser and go.

---

## 🚀 Live App

👉 **[gumroad-manager-atep.vercel.app](https://gumroad-manager-atep.vercel.app)**

---

## 🛠️ Tools

### 📦 Dashboard (`index.html`)
Your main hub. View all products with thumbnails, prices, and sales counts. Edit any product — name, price, description, summary, tags, and publish status. Includes an AI-powered description improver and a live sales feed.

### ✨ AI Rewriter (`rewriter.html`)
Bulk rewrite all your product titles and descriptions using Claude AI. Choose your writing style (professional, compelling, minimal, or friendly), filter which products to process, and watch it update everything automatically with a live progress log.

### 🏷️ Category Manager (`categories.html`)
Assign categories and tags to your products in bulk. Two modes: AI auto-assigns the best category per product based on its name and description, or manual mode where you pick from a dropdown for each product. Supports custom categories.

### 🕵️ Competitor Checker (`competitor.html`)
Paste any competitor's Gumroad profile URL and get a full breakdown — their products vs yours, pricing strategy comparison, tag overlap analysis, gap analysis showing what they sell that you don't, and AI-generated strategic action points to outcompete them. Exports to CSV.

### 📊 Sales Chart (`sales-chart.html`)
Visualize your revenue over time with interactive charts. Filter by last 30, 90, 180 days or a full year. Group by day, week, or month. See top products by revenue and sales count, plus a full sortable sales table. Exports to CSV.

### 💡 Price Optimizer (`price-optimizer.html`)
Scans your free products and uses AI to recommend which ones to convert to paid based on download count and content quality — with suggested price points and reasoning for each recommendation.

### 💀 Dead Products Finder (`dead-products.html`)
Finds products with zero or very low sales so you can clean up your store. Select multiple dead products and bulk-unpublish them with one click. Exports the list to CSV.

### ⚡ Bulk Publish / Unpublish (`bulk-publish.html`)
Toggle many products published or unpublished at once. Filter by status, search by name, use checkboxes to select specific products, or use the master toggle to select all.

### 💼 LinkedIn Post Generator (`linkedin.html`)
Select any product, choose a post style (story, value bomb, direct promo, question hook, or list post) and Claude writes a ready-to-post LinkedIn post instantly. Includes tone control and a copy-to-clipboard button.

### 🎟️ Discount Code Generator (`discount-codes.html`)
Create coupon codes for your products. Choose percentage or fixed discount, set max uses, apply to specific products or all products universally. Bulk-generate 10 unique codes at once. Exports all codes to CSV.

---

## 🔑 Getting Your API Keys

**Gumroad API Token:**
1. Go to [gumroad.com/settings/advanced](https://app.gumroad.com/settings/advanced)
2. Create an Application
3. Click **Generate access token**

**Anthropic API Key** (for AI features):
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. API Keys → Create new key

> Tokens are stored in `sessionStorage` — they stay in your browser tab only and are never sent to any server other than `api.gumroad.com` and `api.anthropic.com` directly. Enter them once and all tools remember them for the session.

---

## 🔒 Security

- All API calls go directly from your browser to Gumroad and Anthropic
- No tokens are stored server-side or in any database
- Vercel only hosts the static HTML files — it never sees your tokens
- Tokens are cleared when you close the browser tab

---

## 🧱 Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools
- Gumroad REST API v2
- Anthropic Claude API (claude-sonnet-4) for AI features
- Chart.js for sales visualizations
- Deployed on Vercel via GitHub auto-deploy

---

## 📁 File Structure

```
index.html           → Main dashboard
rewriter.html        → Bulk AI title & description rewriter
categories.html      → Bulk category & tag manager
competitor.html      → Competitor analysis tool
sales-chart.html     → Revenue & sales charts
price-optimizer.html → Free-to-paid conversion advisor
dead-products.html   → Zero-sales product cleaner
bulk-publish.html    → Bulk publish/unpublish toggle
linkedin.html        → LinkedIn post generator
discount-codes.html  → Coupon code creator
shared.js            → Shared token storage, nav, API helpers
```

---

## 🚀 Deploy Your Own

1. Fork this repo
2. Connect to [Vercel](https://vercel.com) — import the GitHub repo
3. Deploy — no build settings needed
4. Open the live URL and paste your Gumroad token

---

Built with ❤️ using Claude AI · [DuaCrypto](https://duacrypto.gumroad.com)
