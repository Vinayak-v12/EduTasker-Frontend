# 🎨 EduTasker Frontend — Vite + Tailwind CSS

EduTasker is a collaborative **Academic Project & Task Management System** for **students & instructors**.  
This repository contains the **frontend UI built using Vite & Tailwind CSS**, consuming the EduTasker Spring Boot backend REST APIs.

---

## ✨ Features

- 🔐 Login & registration (Student / Instructor)
- 🎯 Role-based dashboard
- 📘 Instructor — create & assign projects
- 📌 Student — view assigned projects & tasks
- 🗂 Task status updates
- 📂 Project submission module
- 📝 Feedback & grading view
- 💨 Tailwind-powered responsive UI

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Markup | HTML |
| Script | JavaScript (Fetch API) |
| State | LocalStorage (JWT token) |

---

## 🚀 Getting Started

### 📥 Clone
```bash
git clone <this-frontend-repo-url>
cd edutasker-frontend

📦 Install dependencies
npm install

▶️ Run development server
npm run dev


Development server:

http://localhost:5173
## project Structure
src/
├── pages/          # Login, Dashboard, Project, Submission UI
├── scripts/        # API calls, auth, token helper
├── styles/         # Tailwind CSS setup
