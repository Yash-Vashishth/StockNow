<div align="center">
  <img src="./public/public/assets/icons/logo.svg" alt="StockNow Logo" width="120" />
</div>

# StockNow 📈

> **A modern, fast, and intuitive stock market tracking application built with Next.js 16.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

---

## 🌟 Overview

**StockNow** is a comprehensive personal finance and stock monitoring dashboard designed to help you keep track of your favorite stocks, discover new investments, and stay up to date with the latest market news. With a sleek UI and daily automated news summaries directly to your inbox, StockNow makes market analysis accessible and intuitive.

<div align="center">
  <img src="./public/public/assets/images/dashboard-preview.png" alt="StockNow Dashboard Preview" width="800" />
</div>

---

## ✨ Key Features

- **📊 Dynamic Watchlist:** Seamlessly search and add your favorite stocks to a personalized watchlist.
- **🔍 Fast Stock Search:** Integrated with **Finnhub API** for lightning-fast, real-time stock lookup.
- **📰 Daily Market Insights:** Automated daily market news summaries sent directly to your email via **Inngest** and **Nodemailer**.
- **🔒 Secure Authentication:** Robust user authentication built with **Better-Auth**.
- **💅 Beautiful UI:** Designed with **TailwindCSS v4**, **Shadcn UI**, and **Radix UI** for accessible, visually stunning components.
- **📱 Responsive & Fast:** Built on **Next.js 16** with the App Router, combining Server Components and Client interactions for blazing performance.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), CLSX, Tailwind Merge
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/), Radix UI, Lucide React
- **Authentication:** [Better-Auth](https://better-auth.com/)
- **Database:** MongoDB & Mongoose
- **Background Jobs:** [Inngest](https://www.inngest.com/)
- **Email Service:** Nodemailer
- **Data Provider:** Finnhub API

---

## 🚀 Getting Started

Follow these steps to run StockNow locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed along with `npm`, `yarn`, `pnpm`, or `bun`. You will also need a MongoDB database cluster and a Finnhub API key.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/stocknow.git
   cd stocknow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure your keys:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (Better-Auth)
   BETTER_AUTH_SECRET=your_auth_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # External APIs
   FINNHUB_API_KEY=your_finnhub_api_key

   # Inngest
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key

   # Nodemailer
   EMAIL_SERVER_USER=your_email_address
   EMAIL_SERVER_PASSWORD=your_email_password
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action!

---

## 🔮 Roadmap & Future Enhancements

- [ ] Advanced charting for individual stock metrics.
- [ ] Portfolio tracking with simulated buy/sell functionality.
- [ ] Real-time push notifications for price movements.
- [ ] Dark / Light mode optimization across all components.

---

## 📝 License

This project is open-source. Feel free to fork and use it for your own personal finance endeavors!

<div align="center">
  <i>Built with ❤️ using Next.js & React</i>
</div>
