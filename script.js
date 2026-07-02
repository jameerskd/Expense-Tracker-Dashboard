// ===== Expense Tracker Dashboard =====
// Data persisted in localStorage

const STORAGE_KEY = "expense_tracker_transactions";

let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || seedData();

function seedData() {
  const today = new Date();
  const fmt = (d) => d.toISOString().split("T")[0];
  const day = (n) => fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate() - n));
  return [
    { id: cryptoId(), desc: "Monthly Salary", category: "Salary", type: "income", amount: 45000, date: day(20) },
    { id: cryptoId(), desc: "Grocery Shopping", category: "Food", type: "expense", amount: 2200, date: day(18) },
    { id: cryptoId(), desc: "Bus Pass", category: "Transport", type: "expense", amount: 800, date: day(15) },
    { id: cryptoId(), desc: "Electricity Bill", category: "Bills", type: "expense", amount: 1500, date: day(12) },
    { id: cryptoId(), desc: "Movie Night", category: "Entertainment", type: "expense", amount: 600, date: day(8) },
    { id: cryptoId(), desc: "Freelance Project", category: "Salary", type: "income", amount: 8000, date: day(6) },
    { id: cryptoId(), desc: "New Shoes", category: "Shopping", type: "expense", amount: 3200, date: day(4) },
    { id: cryptoId(), desc: "Pharmacy", category: "Health", type: "expense", amount: 450, date: day(2) },
  ];
}

function cryptoId() {
  return "id-" + Math.random().toString(36).slice(2, 10);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// ===== Navigation =====
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("page-title");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    const target = link.dataset.section;
    sections.forEach((s) => s.classList.toggle("active", s.id === target));
    pageTitle.textContent = link.textContent.trim().replace(/^\W+\s*/, "");
    if (target === "dashboard") renderDashboard();
    if (target === "transactions") renderTransactions();
  });
});

// ===== Date display =====
document.getElementById("date-display").textContent = new Date().toLocaleDateString("en-IN", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
});

// ===== Currency formatting =====
function formatCurrency(num) {
  return "₹" + Number(num).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ===== Dashboard rendering =====
function renderDashboard() {
  const income = transactions.filter(t => t.type === "income").reduce((a, t) => a + Number(t.amount), 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + Number(t.amount), 0);
  const balance = income - expense;

  document.getElementById("total-income").textContent = formatCurrency(income);
  document.getElementById("total-expense").textContent = formatCurrency(expense);
  document.getElementById("total-balance").textContent = formatCurrency(balance);

  renderRecent();
  renderChart();
}

function renderRecent() {
  const list = document.getElementById("recent-list");
  list.innerHTML = "";
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  if (recent.length === 0) {
    list.innerHTML = '<p class="empty-msg">No transactions yet.</p>';
    return;
  }

  recent.forEach((t) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${t.desc} <small style="color:#9aa0bb">(${t.category})</small></span>
      <span class="${t.type === 'income' ? 'amt-income' : 'amt-expense'}">
        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
      </span>`;
    list.appendChild(li);
  });
}

// ===== Pie chart (canvas, no external libs) =====
function renderChart() {
  const canvas = document.getElementById("categoryChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const expenses = transactions.filter(t => t.type === "expense");
  const byCategory = {};
  expenses.forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + Number(t.amount);
  });

  const categories = Object.keys(byCategory);
  const total = Object.values(byCategory).reduce((a, b) => a + b, 0);

  if (total === 0) {
    ctx.fillStyle = "#9aa0bb";
    ctx.font = "16px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("No expense data", canvas.width / 2, canvas.height / 2);
    return;
  }

  const colors = ["#6c63ff", "#ff4d4f", "#28a745", "#ffb020", "#17a2b8", "#e83e8c", "#6610f2", "#fd7e14"];
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(cx, cy) - 20;

  let startAngle = -Math.PI / 2;
  categories.forEach((cat, i) => {
    const value = byCategory[cat];
    const sliceAngle = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    startAngle += sliceAngle;
  });

  // donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.fillStyle = "#1b1f3b";
  ctx.font = "bold 14px Poppins";
  ctx.textAlign = "center";
  ctx.fillText("Expenses", cx, cy - 4);
  ctx.font = "12px Poppins";
  ctx.fillText(formatCurrency(total), cx, cy + 14);

  // legend
  let legendY = cy + radius + 20;
  ctx.font = "11px Poppins";
  categories.forEach((cat, i) => {
    const x = 10 + (i % 2) * 160;
    const y = legendY + Math.floor(i / 2) * 18;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, y, 10, 10);
    ctx.fillStyle = "#1b1f3b";
    ctx.textAlign = "left";
    ctx.fillText(cat, x + 16, y + 9);
  });
}

// ===== Transactions table =====
const tbody = document.getElementById("transactions-body");
const searchInput = document.getElementById("search-input");
const filterType = document.getElementById("filter-type");
const filterCategory = document.getElementById("filter-category");

function populateCategoryFilter() {
  const cats = [...new Set(transactions.map(t => t.category))];
  filterCategory.innerHTML = '<option value="all">All Categories</option>' +
    cats.map(c => `<option value="${c}">${c}</option>`).join("");
}

function renderTransactions() {
  populateCategoryFilter();
  const search = searchInput.value.toLowerCase();
  const type = filterType.value;
  const category = filterCategory.value;

  let filtered = [...transactions]
    .filter(t => t.desc.toLowerCase().includes(search))
    .filter(t => type === "all" || t.type === type)
    .filter(t => category === "all" || t.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  tbody.innerHTML = "";

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-msg">No transactions found.</td></tr>`;
    return;
  }

  filtered.forEach((t) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(t.date).toLocaleDateString("en-IN")}</td>
      <td>${t.desc}</td>
      <td>${t.category}</td>
      <td><span class="type-badge ${t.type}">${t.type}</span></td>
      <td class="${t.type === 'income' ? 'amt-income' : 'amt-expense'}">
        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
      </td>
      <td><button class="delete-btn" data-id="${t.id}" title="Delete">🗑</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      transactions = transactions.filter(t => t.id !== btn.dataset.id);
      save();
      renderTransactions();
      renderDashboard();
    });
  });
}

searchInput.addEventListener("input", renderTransactions);
filterType.addEventListener("change", renderTransactions);
filterCategory.addEventListener("change", renderTransactions);

// ===== Add transaction form =====
const form = document.getElementById("transaction-form");
const toggleButtons = document.querySelectorAll(".toggle-btn");
let selectedType = "expense";

toggleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedType = btn.dataset.type;
  });
});

document.getElementById("date").valueAsDate = new Date();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!desc || !amount || amount <= 0) return;

  transactions.push({
    id: cryptoId(),
    desc,
    category,
    type: selectedType,
    amount,
    date
  });
  save();

  form.reset();
  document.getElementById("date").valueAsDate = new Date();
  const msg = document.getElementById("form-message");
  msg.textContent = "✓ Transaction added successfully!";
  setTimeout(() => (msg.textContent = ""), 2500);

  renderDashboard();
  renderTransactions();
});

// ===== Init =====
renderDashboard();
renderTransactions();
