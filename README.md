# 🚀 Enterprise Task Analytics Dashboard

A high-performance productivity suite built with **React.js** and **Tailwind CSS**. This application features a custom Kanban workflow, real-time linear search filtering, and an integrated analytics engine to visualize project velocity.

> **Live Demo:** https://enterprise-task-dashboard.vercel.app

## ✨ Key Features

- **⚡ Zero-Latency Search:** Engineered a custom linear search algorithm that filters tasks instantly (<10ms) without triggering expensive re-renders.
- **📊 Visual Analytics Engine:** Real-time calculation of completion rates, velocity, and priority distribution using derived state logic.
- **🔄 Interactive Kanban Board:** Fully functional Drag-and-Drop workflow (Pending → In Progress → Done) with smooth state updates.
- **💾 Local Persistence Layer:** Implemented a robust storage engine using `localStorage` to preserve user state across sessions and reloads.
- **📱 Adaptive Mobile-First Layout:** Responsive CSS Grid/Flexbox architecture that scales perfectly from mobile stacks to desktop dashboards.

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Deployment:** Vercel

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/swaroop999/enterprise-task-dashboard.git](https://github.com/swaroop999/enterprise-task-dashboard.git)
    cd enterprise-task-dashboard
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:5173` to view the app.

## 🔮 Future Improvements

- [ ] Integration with a backend (Node.js/Express) for multi-user collaboration.
- [ ] Dark Mode toggle using Tailwind's dark modifier.
- [ ] Export analytics reports to PDF/CSV.

---

_Built by Swaroop B - 2025_
