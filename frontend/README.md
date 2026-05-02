# 📌 Team Task Manager (Full-Stack Web App)

A full-stack role-based project management system built using **FastAPI + React.js**, designed to manage projects, assign tasks, and track progress efficiently.

---

## 🚀 Live Demo
> Add your deployed links here (Railway / Vercel)

- Backend: `https://your-backend-url`
- Frontend: `https://your-frontend-url`

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication
- Role-based access control (Admin / Member)

### 📁 Project Management
- Create projects (Admin only)
- View all / assigned projects
- Assign members to projects

### 📋 Task Management
- Create tasks under projects
- Assign tasks to users
- Update task status (Pending / In Progress / Completed)
- Delete tasks (Admin only)

### 📊 Dashboard
- Total tasks count
- Completed tasks
- Pending tasks
- Overdue tasks
- Role-based task filtering

### 👥 Team Management
- Assign members to projects
- View project team members

---

## ⚙️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite / PostgreSQL
- JWT Authentication
- Pydantic

### Frontend
- React.js
- Axios
- React Router DOM
- CSS (Custom Styling)

---

## 📂 Project Structure

### Backend

backend/
│── main.py
│── database.py
│── models.py
│── schemas.py
│── auth.py
│── dependencies.py
│
├── routers/
│ ├── user.py
│ ├── project.py
│ ├── task.py
│
└── requirements.txt


### Frontend

frontend/src/
│── App.js
│── api.js
│── styles.css
│
├── pages/
│ ├── Login.jsx
│ ├── Signup.jsx
│ ├── Dashboard.jsx
│ ├── Projects.jsx
│ ├── CreateTask.jsx
│ ├── ProjectTasks.jsx
│ ├── Team.jsx



---

## ▶️ Installation & Setup

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at:

http://127.0.0.1:8000




🔹 Frontend Setup
cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000


🌐 API Endpoints
🔐 Auth
| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | `/signup` | Register user |
| POST   | `/login`  | Login user    |




📁 Projects

| Method | Endpoint                                  | Description    |
| ------ | ----------------------------------------- | -------------- |
| POST   | `/projects`                               | Create project |
| GET    | `/projects`                               | Get projects   |
| POST   | `/projects/{project_id}/assign/{user_id}` | Assign member  |



📋 Tasks

| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| POST   | `/tasks`           | Create task |
| GET    | `/tasks`           | Get tasks   |
| PUT    | `/tasks/{task_id}` | Update task |
| DELETE | `/tasks/{task_id}` | Delete task |



 🔑 Roles & Permissions

- 👑 Admin
Create projects
Create tasks
Assign members
Delete tasks
View all data


- 👤 Member
View assigned projects
View assigned tasks
Update task status


🚀 Deployment
- Backend: Railway 
- Frontend: vercel


📌 Future Enhancements

- Real-time notifications
- Chat system for teams
- File uploads in tasks
- Advanced analytics dashboard
- Drag & drop task board


👨‍💻 Author

Built as a Full-Stack Assignment Project to demonstrate:

- REST API development
- Role-based authentication
- Full-stack integration
- CRUD operations
- Deployment readiness



⭐ If you like this project

Give it a ⭐ on GitHub!