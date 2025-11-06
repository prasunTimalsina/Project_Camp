# <img src="https://cdn-icons-png.flaticon.com/128/2906/2906274.png" width="32" height="32" alt="Project Camp"> Project Camp

> A modern project management API built with Node.js and Express for seamless team collaboration and task tracking.

## <img src="https://cdn-icons-png.flaticon.com/128/9496/9496432.png" width="24" height="24" alt="Features"> Features

- <img src="https://cdn-icons-png.flaticon.com/128/1688/1688400.png" width="16" height="16" alt="Security"> **Authentication & Authorization** - Secure user registration, login, and role-based access control
- <img src="https://cdn-icons-png.flaticon.com/128/561/561127.png" width="16" height="16" alt="Email"> **Email Verification** - Complete email verification system with password reset functionality
- <img src="https://cdn-icons-png.flaticon.com/128/3281/3281289.png" width="16" height="16" alt="Project"> **Project Management** - Create, update, and manage projects with team collaboration
- <img src="https://cdn-icons-png.flaticon.com/128/1950/1950715.png" width="16" height="16" alt="Tasks"> **Task Tracking** - Assign tasks, track progress, and manage status updates
- <img src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png" width="16" height="16" alt="Notes"> **Notes System** - Add and manage project-specific notes and documentation
- <img src="https://cdn-icons-png.flaticon.com/128/1534/1534938.png" width="16" height="16" alt="Team"> **Team Management** - Add/remove team members with role-based permissions
- <img src="https://cdn-icons-png.flaticon.com/128/2991/2991149.png" width="16" height="16" alt="Attachments"> **File Attachments** - Upload and manage task attachments
- <img src="https://cdn-icons-png.flaticon.com/128/2920/2920277.png" width="16" height="16" alt="API"> **RESTful API** - Clean and intuitive API endpoints for frontend integration

## <img src="https://cdn-icons-png.flaticon.com/128/3281/3281289.png" width="24" height="24" alt="Tech Stack"> Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)

### Dependencies

- **Express.js** - Fast, unopinionated web framework
- **MongoDB + Mongoose** - NoSQL database with elegant object modeling
- **JWT** - Secure authentication with JSON Web Tokens
- **bcrypt** - Password hashing and security
- **Nodemailer** - Email sending functionality
- **Multer** - File upload handling
- **Express Validator** - Input validation and sanitization

## <img src="https://cdn-icons-png.flaticon.com/128/1055/1055645.png" width="24" height="24" alt="Quick Start"> Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/prasunTimalsina/Project_Camp.git
   cd Project_Camp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d

   # Email Configuration
   MAILTRAP_SMTP_HOST=your_smtp_host
   MAILTRAP_SMTP_PORT=your_smtp_port
   MAILTRAP_SMTP_USER=your_smtp_user
   MAILTRAP_SMTP_PASS=your_smtp_password
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:8000`

## <img src="https://cdn-icons-png.flaticon.com/128/2920/2920277.png" width="24" height="24" alt="API"> API Endpoints

### Authentication

- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `GET /api/v1/users/verify-email/:token` - Email verification
- `POST /api/v1/users/forgot-password` - Password reset request
- `PUT /api/v1/users/reset-password/:token` - Reset password

### Projects

- `GET /api/v1/projects` - Get user projects
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/:id` - Get project details
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project

### Tasks

- `GET /api/v1/projects/:projectId/tasks` - Get project tasks
- `POST /api/v1/projects/:projectId/tasks` - Create new task
- `PUT /api/v1/projects/:projectId/tasks/:id` - Update task
- `DELETE /api/v1/projects/:projectId/tasks/:id` - Delete task

### Notes

- `GET /api/v1/projects/:projectId/notes` - Get project notes
- `POST /api/v1/projects/:projectId/notes` - Create new note
- `PUT /api/v1/projects/:projectId/notes/:id` - Update note
- `DELETE /api/v1/projects/:projectId/notes/:id` - Delete note

## <img src="https://cdn-icons-png.flaticon.com/128/1946/1946429.png" width="24" height="24" alt="Author"> Author

**Prasun Timalsina**

- GitHub: [@prasunTimalsina](https://github.com/prasunTimalsina)

---
