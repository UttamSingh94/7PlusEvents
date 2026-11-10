# 7 Plus Events — Official Website Demo

> **Premier Balloon, Birthday & Event Decoration in Udaipur, Rajasthan**  
> *Production-Ready Static Business Website optimized for GitHub Pages, Mobile Devices, and iOS Safari.*

---

## 📌 Project Overview

This website is a production-grade, lightweight, responsive static web platform built for **7 Plus Events**, Udaipur's premier event and balloon styling brand. 

* **Business Name:** 7 Plus Events
* **Category:** Balloon Decoration, Birthday Decoration & Event Styling
* **Studio Address:** University Rd, Keshav Nagar, Ayad, Pahada, Udaipur, Rajasthan 313001
* **Verified Phone & WhatsApp:** +91 79769 67467 (`07976967467`)
* **Official Google Maps Link:** [https://maps.app.goo.gl/unFHhDAecw6rCvzb9](https://maps.app.goo.gl/unFHhDAecw6rCvzb9)
* **Architecture:** 100% Static HTML5 / CSS3 / Vanilla JavaScript (No backend, no database, no build step required).

---

## 📁 Repository & Folder Structure

```text
7-plus-events/
│
├── index.html                     # Primary website entry point (GitHub Pages root)
├── README.md                      # Documentation & deployment guide
├── favicon.svg                    # Vector brand favicon (gold celebration theme)
├── favicon.ico                    # Standard ICO favicon fallback
│
└── assets/
    ├── css/
    │   └── style.css              # Custom styling, iOS Safari fixes & responsive design
    │
    ├── js/
    │   ├── business-config.js     # Single-source-of-truth configuration for business contact info
    │   └── main.js                # Core interactive behaviors, validation & modals
    │
    └── images/
        ├── hero/                  # High-resolution hero balloon arch photography
        ├── services/              # 15+ curated service category cover images
        ├── gallery/               # Real celebratory setup photos & map graphic
        ├── logo/                  # Vector logo assets (SVG)
        └── icons/                 # UI assets & decorative symbols
```

---

## 🚀 How to Run Locally

Because this is a pure static website with zero dependencies or build scripts, you can run it in multiple ways:

### Option 1: Direct File Open
Double-click `index.html` in your file explorer to open it in Google Chrome, Microsoft Edge, Safari, or Firefox.

### Option 2: Using VS Code Live Server
1. Open this repository in Visual Studio Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **"Open with Live Server"**.

### Option 3: Using Node.js or Python (Local Web Server)
```bash
# Using Python 3:
python -m http.server 8000

# Using Node.js npx:
npx serve .
```
Then visit `http://localhost:8000` or `http://localhost:3000` in your browser.

---

## 🌐 How to Upload to GitHub & Enable GitHub Pages

Follow these simple steps to deploy this website live for free on GitHub Pages:

### Step 1: Initialize Git and Commit
Open terminal in the project directory:
```bash
git init
git add .
git commit -m "Initial commit: 7 Plus Events production website"
```

### Step 2: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `7-plus-events` (set to **Public**).
2. Connect your local repository and push:
```bash
git remote add origin https://github.com/<YOUR_USERNAME>/7-plus-events.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages** (in the left sidebar).
3. Under **Branch**, select `main` from the dropdown and leave the folder as `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, your website will be live at:
   `https://<YOUR_USERNAME>.github.io/7-plus-events/`

---

## ⚙️ How to Update Business Contact Details

All contact and business details are centralized in a single configuration file:
👉 **[`assets/js/business-config.js`](assets/js/business-config.js)**

```javascript
const BUSINESS = {
    name: "7 Plus Events",
    location: "University Rd, Keshav Nagar, Ayad, Pahada, Udaipur, Rajasthan 313001",
    googleMaps: "https://maps.app.goo.gl/unFHhDAecw6rCvzb9",
    
    // Verified numbers:
    phone: "+91 79769 67467",
    whatsapp: "7976967467",
    email: "", // Enter official email when ready
    instagram: "",
    facebook: ""
};
```

### Important Verification Rules:
* When `whatsapp` is left empty `""`, tapping any WhatsApp button or submitting the enquiry form automatically presents an elegant preview dialog showing the formatted WhatsApp message and explains that the number is pending business verification.
* When `phone` is empty `""`, click-to-call buttons inform the visitor that phone confirmation is pending.
* When you add verified numbers into `business-config.js`, all call buttons and WhatsApp booking buttons across the entire website instantly activate with zero extra code changes!

---

## 🖼️ How to Replace Gallery Images

1. Place your new photograph (`.jpg`, `.png`, or `.webp`) in the corresponding folder:
   - For services: `assets/images/services/`
   - For gallery: `assets/images/gallery/`
2. Open `index.html` and update the `src` attribute of the target image tag.
3. Update the `alt` tag to describe the setup accurately (e.g., `alt="Golden ring balloon decoration in Udaipur"`).

---

## 📱 Mobile & iOS Safari Compatibility

This website has been built with strict mobile-first standards:
* **iOS Viewport Safe Areas:** Accommodates iPhone notches, dynamic islands, and home indicators using `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
* **Zero Form Zoom on iPhone:** Inputs have a 16px minimum font size to prevent automatic iOS Safari zooming on focus.
* **Touch-Friendly Controls:** Hamburger menu and floating WhatsApp actions are sized at $\ge 44 \times 44\text{px}$ touch targets.
* **Zero Layout Shift:** Responsive image aspect ratios ensure fast, smooth rendering on mobile 3G/4G/5G connections.

---

## 📄 License & Attribution
© 2026 7 Plus Events Udaipur. All rights reserved.
Designed & Developed for 7 Plus Events, Udaipur, Rajasthan, India.
