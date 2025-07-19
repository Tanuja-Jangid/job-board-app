# 🧑‍💼 Job Board Application

A full-stack **Job Board Application** built using **FastAPI**, **React.js**, and **PostgreSQL**, with JWT-based authentication for Admin and User roles. Dockerized for seamless development and deployment.

---

## 📌 Table of Contents

- [🚀 Features](#-features)
- [🧱 Tech Stack](#-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Environment Variables](#️-environment-variables)
- [🐳 Run with Docker](#-run-with-docker)
- [💻 Running Locally Without Docker](#-running-locally-without-docker)
- [📬 API Documentation](#-api-documentation)
- [📦 Postman Collection](#-postman-collection)
- [🛠️ Developer Notes](#️-developer-notes)
- [✅ Author](#-author)
- [🪪 License](#-license)

---

## 🚀 Features

### 👩‍💼 Admin Panel
- JWT Authentication
- Create, Update, and Delete job listings
- View applications with resume download links

### 👨‍💻 User Interface
- View job listings
- Apply for jobs (name, email, resume)
- View submitted applications

### 🎁 Bonus Features
- Search and filter jobs by location and salary
- Limit users to 5 job applications
- Swagger and ReDoc for API docs

---

## 🧱 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | [React.js](https://reactjs.org)                 |
| Backend     | [FastAPI](https://fastapi.tiangolo.com)        |
| Database    | [PostgreSQL](https://www.postgresql.org/)      |
| Auth        | JWT (OAuth2PasswordBearer)                     |
| File Upload | Local storage (FastAPI)                        |
| DevOps      | Docker, Docker Compose                         |
| Docs        | Swagger UI, ReDoc                              |

---

## 📁 Folder Structure

```
job-board-app/
│
├── backend/                  # FastAPI app
│   ├── main.py               # App entrypoint
│   ├── database.py           # DB setup
│   ├── models.py             # SQLAlchemy models
│   ├── schemas.py            # Pydantic schemas
│   ├── routes/               # API endpoints
│   │   ├── users.py
│   │   ├── jobs.py
│   │   └── applications.py
│   └── utils/                # JWT, hashing, helper functions
│
├── frontend/                 # React app
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
│
├── docker-compose.yml        # Docker orchestration
├── .env                      # Environment variables
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` folder with:

```
DATABASE_URL=postgresql://postgres:postgres@db:5432/jobboard
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 🐳 Run with Docker

```bash
# Step 1: Clone the repository
git clone https://github.com/your-username/job-board-app.git
cd job-board-app

# Step 2: Build and run containers
docker-compose up --build
```

✅ App will run at:
- Backend: [http://localhost:8000](http://localhost:8000)
- Frontend: [http://localhost:3000](http://localhost:3000)
- Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 💻 Running Locally Without Docker

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 📬 API Documentation

API docs are automatically generated:

- 🔹 Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- 🔹 ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📦 Postman Collection

You can import the backend API using Postman:

👉 [Download Postman Collection](./job_board_postman_collection.json)

> Make sure to include the bearer token for secured routes.

---

## 🛠️ Developer Notes

- Use `/users/register` and `/users/login` to create/test users.
- Use `/auth/login` for token-based OAuth2 login.
- Apply for a job using `/applications/apply/{job_id}`.
- Include the `Authorization: Bearer <token>` header for secured routes.
- Resume files are uploaded via `multipart/form-data` and stored locally.

---

## ✅ Author

Made with by [**Tanuja Jangid**](https://github.com/Tanuja-Jangid)

---

