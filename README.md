# 🧑‍💼 Job Board App

A full-stack job board application with admin and user interfaces built using **FastAPI**, **PostgreSQL**, and **React.js**, packaged using **Docker**.

---

## 🚀 Features

### 👩‍💼 Admin Panel
- JWT Authentication
- Add/Edit/Delete job listings
- View applicants with resume URLs

### 👨‍💻 User Interface
- View available jobs
- Apply for jobs (name, email, upload resume)
- View submitted applications

### 🎁 Bonus Features
- Search & filter jobs by location and salary
- Limit to 5 applications per user
- Swagger docs for backend API

---

## 🧱 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React.js                 |
| Backend     | FastAPI                  |
| Database    | PostgreSQL               |
| Auth        | JWT                      |
| File Upload | Local storage            |
| DevOps      | Docker, Docker Compose   |
| Deployment  | GitHub (CI/CD optional)  |

---

## 📁 Folder Structure

```
job-board-app/
│
├── backend/              # FastAPI app
│   ├── main.py
│   ├── models.py
│   ├── routes/
│   └── utils/
│
├── frontend/             # React frontend
│   └── (React app files)
│
├── docker-compose.yml    # Docker orchestration
├── .env                  # Env variables
└── README.md
```

---

## 🐳 How to Run with Docker

```bash
# Build and run containers
docker-compose up --build
```

App runs on: `http://localhost:8000`  
React app on: `http://localhost:3000`  
Swagger docs: `http://localhost:8000/docs`

---

## 📬 API Documentation

Visit `/docs` on backend for Swagger UI, or import the provided Postman Collection.

---

## ✅ Author

Built by [Tanuja Jangid](https://github.com/Tanuja-Jangid)