# CoinyKids - Financial Literacy Platform

**CoinyKids** is an interactive web platform designed to teach children the fundamentals of financial literacy (Earning, Saving, and Spending) through gamification. Kids can earn virtual coins by learning, buy items in a safe simulated store, and manage their profiles under parental supervision.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

*   **Node.js**: Ensure you have Node.js installed.
    *   **Recommended Version**: Node.js **v18.0.0** or higher (required for Vite and Tailwind CSS v4 support).

### Installation & Run

1.  **Clone or Download the repository**:
    Navigate to the project folder in your terminal.

2.  **Install Dependencies**:
    Run the following command to install all necessary packages listed in `package.json`:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    Start the local development server:
    ```bash
    npm run dev
    ```
    *   Once started, open your browser and navigate to the local URL provided (usually `http://localhost:5173`).

---

## 🌟 Project Overview

CoinyKids is built with a modern tech stack to provide a smooth, animated, and secure experience for children and parents.

### ✨ Key Features

1.  **Authentication & Accounts:**
    *   User signup/login system storing data in `localStorage`.
    *   Child profiles with customizable details (Name, Age, Gender-based 3D Avatars).
    *   **Parental PIN** protection for sensitive actions.

2.  **Learn & Earn (Gamification):**
    *   **Video Lessons:** Kids watch educational videos to earn coins. Includes anti-cheat detection (pauses if the tab is switched).
    *   **Quizzes:** Interactive quizzes to test knowledge and earn rewards.

3.  **Mini Store (Simulation):**
    *   A virtual marketplace to spend earned coins on toys, clothes, and art.
    *   **Shopping Cart:** Add items, view total cost, and checkout.
    *   **Parental Approval:** Checkout requires a Parent PIN to proceed, simulating real-world permission.

4.  **Profile & Wallet:**
    *   Real-time wallet balance display.
    *   **Inventory:** View purchased items.
    *   **Selling:** Kids can list items for sale (requires approval), teaching the concept of earning through sales.

5.  **Admin Dashboard:**
    *   A dedicated route (`/admin`) for administrators.
    *   View all registered users, total economy stats, and manage accounts (delete users).

### 🛠️ Tech Stack

*   **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS (v4)](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives).
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/).
*   **State Management:** React Context API (`UserAuth`, `Cart`, `GlobalCoin`, `ParentalApproval`).
*   **Routing:** React Router DOM.
*   **Icons:** Lucide React.

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Buttons, Cards, Modals)
├── contexts/         # Global state logic (Auth, Cart, Coins, Security)
├── layouts/          # Page layouts (PublicLayout, DashboardLayout)
├── pages/            # Main application pages
│   ├── LandingPage.tsx   # Homepage
│   ├── AuthPage.tsx      # Login/Signup
│   ├── GetCoins.tsx      # Earn section (Videos/Quizzes)
│   ├── MiniStore.tsx     # Shopping section
│   ├── Profile.tsx       # User dashboard
│   └── AdminDashboard.tsx # Admin control panel
└── lib/              # Utilities and helpers
```

---

## ⚠️ Important Note
This project acts as a **Frontend Prototype**. It uses the browser's **Local Storage** to persist user data, balances, and inventory. Clearing your browser cache will reset the application data.