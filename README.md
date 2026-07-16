# 🎓 StuVio - Student Learning & Collaboration Platform

<p align="center">
  <img src="frontend/public/logo.jpg" alt="StuVio Logo" width="140"/>
</p>

<p align="center">
  <b>A Modern Learning Management System for Students</b><br>
  Organize Courses • Study Materials • Assignments • Videos • Notes • Community
</p>

---

## 📖 Overview

StuVio is a modern web-based student learning platform developed to simplify academic learning and collaboration.

The platform allows students to:

- 📚 Access enrolled courses
- 📖 Browse semesters & subjects
- 📝 Download notes
- 🎥 Watch educational videos
- 📌 View assignments
- 📅 Manage class schedules
- 👥 Participate in student communities
- 🏆 View certificates
- 👤 Manage personal profile

StuVio is built with a clean and responsive interface inspired by modern educational platforms.

---

# 🚀 Features

### Authentication

- Secure Login
- JWT Authentication
- Protected Routes
- Session Management

### Student Dashboard

- Personalized Dashboard
- Quick Navigation
- Modern Sidebar
- Dark Mode Support

### Course Management

- View Available Courses
- Browse Semesters
- Browse Subjects
- Subject-wise Resources

### Learning Resources

- Notes
- Video Lectures
- Assignments

### Academic

- Weekly Schedule
- Upcoming Classes
- Exam Timeline

### Community

- Student Discussion Area
- Academic Collaboration

### Profile

- Student Profile
- Account Management

### Certificates

- Academic Certificates
- Achievement Section

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Vite
- JavaScript
- CSS (Inline Styling)

## Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate
- JPA

## Database

- MySQL

---

# 📂 Project Structure

```
StuVio
│
├── backend
│   ├── src
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── entities
│   ├── security
│   └── resources
│
├── frontend
│   ├── src
│   │
│   ├── pages
│   ├── components
│   ├── api
│   ├── assets
│   └── App.jsx
│
└── README.md
```

---

# 📸 Modules

- Login
- Dashboard
- Courses
- Semesters
- Subjects
- Notes
- Videos
- Assignments
- Schedule
- Community
- Certificates
- Profile

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/itsneeraj065/StuVio-Project.git
```

Move into project

```bash
cd StuVio-Project
```

---

## Backend Setup

```bash
cd backend
```

Run

```bash
./mvnw spring-boot:run
```

Backend starts at

```
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend starts at

```
http://localhost:5173
```

---

# 🗄 Database

Database Used

```
MySQL
```

Configure your

```
application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/stuvio
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

---

# 🔐 Authentication

StuVio uses

- Spring Security
- JWT Authentication

Protected APIs require a valid JWT Token.

---

# 🌐 Deployment

Frontend

- Vercel

Backend

- Railway

Domain

- GoDaddy

---

# 📈 Future Enhancements

- AI Study Assistant
- Live Classes
- Video Streaming
- Attendance System
- Student Chat
- Notifications
- File Uploads
- Admin Dashboard
- Faculty Portal
- Mobile App
- Online Exams
- Quiz System
- Discussion Forums
- Calendar Integration

---

# 👨‍💻 Developer

**Neeraj Singh Baghel**

Computer Science Engineer

Built with ❤️ using React, Spring Boot & MySQL

GitHub

https://github.com/itsneeraj065

---

# 📜 License

This project is developed for educational purposes.

© 2026 StuVio. All Rights Reserved.
