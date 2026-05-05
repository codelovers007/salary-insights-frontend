# 💻 Salary Insights Frontend

A React-based dashboard for managing employees and analyzing salary insights across countries and job roles.

---

## 🚀 Live Demo

- 🌐 Frontend: https://salary-insights-frontend.onrender.com
- 🔗 Backend API: https://salary-insights-backend.onrender.com

---

## 🧠 Features

### 📊 Dashboard
- View employee list
- Job insights API:
  - Country
  - Job Title
- Salary insights:
  - Min / Max / Avg salary by country
  - Avg salary by job title
  - Top paid employees

---

### 👨‍💼 Employee Management
- ➕ Create new employee
- ✏️ Edit employee
- 👁️ View employee details
- ❌ Delete employee (with confirmation)

---

## 🧭 Routing

| Route | Description |
|------|------------|
| `/` | Dashboard |
| `/create` | Create Employee |
| `/edit/:id` | Edit Employee |
| `/view/:id` | View Employee |
| `/dropdowns/countries` | Dropdown Conuntries |
| `/dropdowns/job_titles` | Dropdown Titles |
| `/insights/country?country=India` | Country Salary Insights|
| `/insights/job?country=India&job_title=Engineer` | Job Average Salary Insights|

---

## 🏗️ Tech Stack

- React (Vite)
- React Router
- Axios

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone <repo-url>
cd salary-insights-frontend
