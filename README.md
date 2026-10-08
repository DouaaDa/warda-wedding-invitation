Luxury Wedding Invitation

A premium interactive digital wedding invitation designed for **Warda & Yasser**, combining elegant editorial design, cinematic transitions, multilingual content, and a responsive experience across mobile, tablet, and desktop.

## ✨ Overview

This project transforms a traditional wedding invitation into an immersive digital experience.

The experience is designed around a cinematic flow:

**Envelope → Henna Celebration → Wedding Day → RSVP → Final Experience**

The interface focuses on refined typography, burgundy and ivory tones, champagne-gold details, elegant photography, subtle animations, and a premium stationery-inspired visual identity.

## 🎨 Design

* Luxury editorial wedding aesthetic
* Burgundy / Deep Wine color palette
* Ivory backgrounds
* Champagne-gold accents
* Elegant typography
* Cinematic page transitions
* Subtle motion and visual effects
* Responsive layouts
* Mobile-first considerations
* Arabic RTL support
* French content support

## 🚀 Features

* 💌 Interactive opening envelope
* 🌿 Warda's Henna Day experience
* 📸 Wedding photography sections
* 📅 Wedding date and event details
* ⏳ Live countdown to the wedding
* 📍 Google Maps location
* 📝 RSVP experience
* 🔐 Admin dashboard
* 🌐 Multilingual content support
* 📱 Responsive design for mobile, tablet and desktop
* ☁️ Supabase integration
* 🖼️ Supabase Storage for images
* 🔑 Authentication for administration
* ✨ Framer Motion animations

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* JavaScript (ES6+)
* i18next

### Backend / Data

* Supabase
* PostgreSQL
* Supabase Authentication
* Supabase Storage
* Supabase API

### Deployment

* Vercel
* GitHub

## 🏗️ Project Structure

```text
warda-wedding-invitation/
│
├── public/
│   ├── images/
│   ├── music/
│   └── ...
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── config/
│   └── ...
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DouaaDa/warda-wedding-invitation.git
cd warda-wedding-invitation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Never commit `.env.local` or Supabase service-role keys to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The application will be available locally through the Vite development server.

### 5. Build for production

```bash
npm run build
```

## ☁️ Deployment

The project is deployed using **Vercel** and connected to the GitHub repository.

Production workflow:

```text
Local Development
       ↓
     Git
       ↓
    GitHub
       ↓
    Vercel
       ↓
 Production
```

Every update pushed to the `main` branch can be automatically deployed through Vercel.

## 🗄️ Supabase

Supabase is used as the backend/data platform of the application.

It provides:

* PostgreSQL database
* Authentication
* Storage
* API access
* Secure data access through Row Level Security

The application can use Supabase to manage invitation settings, RSVP responses, authentication, and uploaded media.

## 📱 Responsive Experience

The interface is designed to adapt to:

* 📱 Mobile phones
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop screens
* 🖥️ Large displays

The goal is to preserve the same luxury visual identity while adapting typography, spacing, image dimensions, and composition to each screen size.

## 🔐 Security

Environment variables are kept outside the public repository.

The repository does **not** contain:

* Supabase service-role keys
* Private credentials
* Passwords
* `.env.local`

## 👩‍💻 Developer

**Douaa Daoud**

Software Engineering Student — Full Stack Developer

* GitHub: https://github.com/DouaaDa
* Portfolio: https://ady-store.vercel.app/

## 📄 License

This project was developed as a custom wedding invitation experience for a private client.

© 2026 Douaa Daoud
