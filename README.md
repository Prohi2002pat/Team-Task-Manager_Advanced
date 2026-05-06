# Team Task Manager 

----------------------------------------
LIVE APPLICATION:
https://team-task-manager-advanced.vercel.app/login

BACKEND API:
https://team-task-manageradvanced-production.up.railway.app/api

GITHUB REPOSITORY:
https://github.com/Prohi2002pat/Team-Task-Manager_Advanced
----------------------------------------

##DESCRIPTION
This is a robust, full-stack Task Management system built with the MERN stack (MongoDB, Express, React, Node.js). Recently refactored to meet enterprise standards, this application features a scalable Service-Layer backend architecture, strict Zod data validation, and seamless relational data management between Projects and Tasks.

----------------------------------------

## FEATURES

User & Role Management:
- Secure JWT Authentication with Bcrypt password hashing.
- Role-based access control (Admin vs. Member views and permissions).
- Axios Interceptors for automatic token attachment and secure auto-logout.

Project & Task Tracking:
- Projects: Admins can create overarching Projects to group tasks together.
- Tasks: Admins can create tasks, assign them to specific users, link them to projects, and set Due Dates.
- Member Portal: Members can view only their assigned tasks and mark them as "Completed".
- Dynamic Dashboard: Real-time statistics tracking Total, Completed, Pending, and dynamically calculated Overdue tasks.

Enterprise Architecture:
- Strict Input Validation using Zod.
- Service-Layer Architecture: Clean separation of business logic (Services) from HTTP routing (Controllers).
- Centralized Global Error Handling.

----------------------------------------

## TECH STACK

Frontend:
- React.js
- React Router DOM (Protected Routes)
- Axios (with Request/Response Interceptors)
- CSS

Backend:
- Node.js & Express.js
- MongoDB (Atlas) & Mongoose (Relational DB Design)
- Zod (Schema Validation)
- JSON Web Tokens (JWT) & BcryptJS

Deployment:
- Frontend: Vercel
- Backend: Railway

----------------------------------------

## HOW TO RUN LOCALLY

1. Clone the repository:
bash
git clone https://github.com/Prohi2002pat/Team-Task-Manager_Advanced.git
cd Team-Task-Manager_Advanced

2. Backend Setup:
Create a .env file in the backend folder with your MONGO_URI, JWT_SECRET, and PORT.

bash
cd backend
npm install
npm start

3. Frontend Setup:

bash
cd frontend
npm install
npm start

----------------------------------------

## 🔑 TEST CREDENTIALS

Admin Account (Full Access):
- Email: rohit@test.com
- Password: 123456
- ID: 69f719e56c21f8929a4fc97f

Member Account 1 (Restricted Access):
- Email: member@test.com
- Password: 123456
- ID: 69f7343bc3fd8dcded114a6e

Member Account 2 (Restricted Access):
- Email: secondmember@test.com
- Password: 123456
- ID: 69f8b22bc855afc5310ff6ef

----------------------------------------

## 📌 NOTES
- Internet connection is required for API and Database calls.
- The backend is hosted on a free Railway tier, which may take ~30 seconds to wake up upon initial login.
