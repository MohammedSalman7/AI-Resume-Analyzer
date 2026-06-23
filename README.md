# AI Resume Analyzer and ATS Optimization System

An AI-powered full-stack web application that analyzes resumes, calculates ATS scores, identifies missing skills, recommends suitable job roles, generates career roadmaps, and tracks resume improvements over time.

---

## Features

- 🔐 User Authentication (JWT)
- 📄 Resume Upload (PDF, DOC, DOCX)
- 📊 ATS Score Calculation
- ❌ Missing Skills Detection
- 🍩 Skills Match Analysis (Donut Chart)
- 💼 Role-Based Resume Evaluation
- 🎯 Job Recommendations
- 🛣️ Career Roadmap Generation
- 📈 Resume Improvement Tracker
- 🕒 Upload History
- 📥 Downloadable PDF Report

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts

### Backend
- Flask
- Flask-CORS
- Flask-JWT-Extended
- ReportLab
- Werkzeug

### Database
- SQLite3

---

## Project Architecture

```text
React Frontend
       ↓
Axios API Requests
       ↓
Flask REST APIs
       ↓
Resume Parsing & ATS Analysis
       ↓
SQLite Database
       ↓
History & Comparison Tracking
```

---

## Project Screenshots

### Login Page
![Login](screenshots/01_login_page.png)

### Register Page
![Register](screenshots/02_register_page.png)

### Dashboard
![Dashboard](screenshots/03_dashboard_upload_page.png)

### Resume Preview
![Preview](screenshots/04_resume_preview_page.png)

### Skills Match Analysis
![Skills Match](screenshots/05_skills_match_analysis.png)

### ATS Score and Missing Skills
![ATS Score](screenshots/06_ats_score_missing_skills.png)

### Recommended Roles
![Recommended Roles](screenshots/07_job_recommendations.png)

### Resume Improvement Tracker
![Resume Tracker](screenshots/08_resume_improvement_tracker.png)

### Upload History
![Upload History](screenshots/09_upload_history.png)

### Career Roadmap
![Career Roadmap](screenshots/10_career_roadmap.png)

---

## Database Tables

### users
- id
- name
- email
- password

### upload_history
- id
- email
- filename
- role
- ats_score
- uploaded_at

### resume_comparisons
- id
- email
- filename
- ats_score
- skills
- uploaded_at

---

# Installation and Setup

## Clone Repository

```bash
git clone <repository-url>
cd AI-Resume-Analyzer
```

---

## Backend Setup

```bash
cd server

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python init_db.py

python app.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Usage

1. Register an account.
2. Login using your credentials.
3. Upload a resume (PDF/DOC/DOCX).
4. Select a target role.
5. View ATS score and missing skills.
6. Analyze skills match using the donut chart.
7. View recommended job roles.
8. Generate a career roadmap.
9. Compare resumes and track improvements.
10. Download the generated report.

---

## Learning Outcomes

- Full Stack Development
- REST API Design
- JWT Authentication
- Database Management
- File Handling
- Data Visualization
- React State Management
- Resume Parsing and ATS Analysis
- Resume Comparison Systems

---

## Future Enhancements

- AI Resume Suggestions
- Job Description Matching
- Email Notifications
- Cloud Database Integration
- Resume Version Control
- AI Career Assistant Chatbot

---

## Author

**Mohammed Salman**

Built using React, Flask, SQLite, and Tailwind CSS.