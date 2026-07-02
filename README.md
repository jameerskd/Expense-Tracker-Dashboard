# Expense Tracker Dashboard

## Intern Details
- **Intern ID:** CITS6159
- **Full Name:** Shaik Jameer
- **Organization:** Codtech IT Solutions Private Limited
- **No. of Weeks:** 4 Weeks
- **Internship Period:** 30 June 2026 – 28 July 2026
- **Project Name:** Expense Tracker Dashboard
- **Project Scope:** Full Stack Web Development (Frontend) — Internship Task

## Project Description
The Expense Tracker Dashboard is a responsive, single-page web application built using **HTML, CSS, and vanilla JavaScript**. It allows users to record income and expenses, categorize transactions, visualize spending patterns through a dynamic pie chart, and manage their personal finances through an intuitive dashboard interface.

## Features
- 📊 **Dashboard Overview** — displays total income, total expense, and current balance at a glance.
- 🥧 **Spending by Category Chart** — an interactive donut/pie chart (rendered with native HTML5 Canvas, no external libraries) that visualizes expense distribution.
- 📋 **Transaction Management** — view all transactions in a sortable, searchable, filterable table.
- 🔍 **Search & Filter** — filter transactions by description, type (income/expense), and category.
- ➕ **Add Transactions** — simple form to add new income or expense entries with description, amount, category, and date.
- 🗑️ **Delete Transactions** — remove any transaction directly from the table.
- 💾 **Persistent Storage** — all data is saved in the browser's `localStorage`, so transactions persist across page reloads.
- 📱 **Responsive Design** — adapts cleanly to desktop, tablet, and mobile screen sizes.

## Technologies Used
- **HTML5** — semantic page structure
- **CSS3** — custom styling, flexbox/grid layout, responsive design
- **JavaScript (ES6+)** — application logic, DOM manipulation, localStorage, Canvas API for charting

## File Structure
```
expense-tracker/
│
├── index.html      # Main HTML structure (Dashboard, Transactions, Add New sections)
├── style.css        # Styling and responsive layout
├── script.js         # Application logic, data handling, and chart rendering
└── README.md       # Project documentation
```

## How to Run
1. Download/clone the project folder.
2. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox).
3. No installation, server, or build step is required — it runs entirely client-side.

## How to Use
1. **Dashboard tab** — view your total income, expenses, balance, and a category-wise spending chart.
2. **Transactions tab** — browse, search, and filter all your recorded transactions; delete any entry using the trash icon.
3. **Add New tab** — toggle between "Expense" and "Income", fill in the description, amount, category, and date, then click **Add Transaction**.

## Future Enhancements
- Export transactions to CSV/PDF
- Monthly/yearly trend graphs
- Multi-user login with cloud sync
- Budget limit alerts per category

## Author
**Shaik Jameer**
Full Stack Web Development Intern — Codtech IT Solutions Pvt. Ltd.
