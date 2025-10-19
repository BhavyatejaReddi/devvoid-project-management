# Project Management System - DevVoid Assignment

## Overview

This is a **Project & Task Management System** built as part of the **DevVoid Software Engineer Assignment**.  
The application allows users to create projects, manage tasks, and organize them by status (To Do, In Progress, Done).  

**Tech Stack:**  
- **Frontend:** React.js with Bootstrap  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Additional Features:** AI integration (Gemini API - optional for summarization and Q&A)  

---
## Features
### Project Management
- Create, read, update, and delete projects  
- Each project includes:
  - Name  
  - Description  
  - Created date  
- View list of all projects  
- Navigate to a project to see its task board  

### Task Management
- Create, read, update, and delete tasks  
- Tasks include:
  - Title  
  - Description  
  - Status (To Do, In Progress, Done)  
- Tasks are displayed clearly in separate status columns  

### User Interface
- Clean, responsive UI using Bootstrap  
- Tasks are visually grouped by status for better project management  
- Optional: Drag & drop functionality can be added for moving tasks between columns  

---

## Project Structure
devvoid-project/
│
├── backend/ # Express.js backend
│ ├── models/ # Mongoose models for Project and Task
│ ├── routes/ # API routes for projects and tasks
│ └── server.js # Entry point for backend server
│
├── frontend/ # React.js frontend
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── Projects.js
│ │ ├── Tasks.js
│ │ └── AddTask.js
│ └── package.json
│
├── .gitignore
└── README.md

1. Navigate to backend folder:
```bash
  cd backend
2.Install dependencies:
   npm install
3.Start backend server:
   npm start
Runs on: http://localhost:5000
Frontend
Navigate to frontend folder:
cd frontend
Install dependencies:
npm install
Start frontend server:
npm start
Runs on: http://localhost:3000 (or next available port)
How to Use
Open the app in your browser.
Create new projects or edit existing ones.
Click a project to view its tasks.
Add, edit, or delete tasks within the project.
Tasks are displayed under To Do, In Progress, and Done columns.
(Optional) Drag & drop tasks between columns if implemented.
Notes
MongoDB must be running locally or connected via cloud (e.g., MongoDB Atlas).
Environment variables (like MongoDB URI) should be added in .env files.
Drag & drop functionality is optional and can be added using libraries like react-beautiful-dnd.
GitHub Submission
All source code is hosted in this repository
Includes both frontend and backend
README provides installation and usage instructions for easy evaluation
Author
B.SINDHUJA – DevVoid Software Engineer Assignment
******************************************************************************************************************************************************************

