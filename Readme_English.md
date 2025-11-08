# 🧠 Task Manager Client

A **React + Tailwind CSS** based web application for managing user tasks with JWT authentication and secure data handling.  
The goal is to create a modern and secure client application that communicates with an **ASP.NET Core Web API** backend.

---

## 🚀 Features

- 👤 **User Management**
  - Registration  
  - Login (with JWT token)  
  - Token-based authentication  

- ✅ **Task Management (CRUD)**
  - Retrieve tasks  
  - Create new task  
  - Update task  
  - Delete task  

- 🔍 **Filtering, searching, and sorting** tasks  
- ⚙️ **Unified error handling**  
- 📤 **Export tasks** to XLSX file  

---

## 🧰 Technologies Used

- **React**  
- **Tailwind CSS**  
- **Axios**  
- **JWT (JSON Web Token)**  

---

## 🗂️ Project Structure

```
task-manager-frontend/
│
├── src/components/
│ ├── ProtectedRoute.jsx -> Verifies routes that require authentication (task management pages)
│ └── PublicRoute.jsx -> Handles routes accessible without login (Login, Register)
│
├── src/contexts/
│ ├── UserContext.js -> Global state and token management
│
├── src/pages/
│ ├── Login.jsx -> Login page
│ ├── Register.jsx -> Registration page
│ ├── TaskEdit.jsx -> Edit existing task
│ ├── TaskForm.jsx -> Create new task
│ └── TaskList.jsx -> Main page displaying user tasks
│
├── src/services/
│ ├── api.js -> Sets token in headers after login and handles errors globally
│ └── authService.js -> API calls for user authentication and registration
│
├── src/App.js -> Defines application routes
│
├── src/index.js -> Wraps the App component with UserProvider
```
---

## 🧪 API Endpoints

🔹 **Users**
| HTTP Method | Endpoint              | Description                      |
| ------------ | -------------------- | -------------------------------- |
| `POST`       | `/api/Users/register` | Register a new user              |
| `POST`       | `/api/Users/login`    | Login and get JWT token          |

🔹 **Tasks** (Authentication required)
| HTTP Method | Endpoint          | Description                      |
| ------------ | ---------------- | -------------------------------- |
| `GET`        | `/api/Tasks`     | Get all tasks                    |
| `GET`        | `/api/Tasks/{id}`| Get task by ID                   |
| `POST`       | `/api/Tasks`     | Create new task                  |
| `PUT`        | `/api/Tasks/{id}`| Update existing task             |
| `DELETE`     | `/api/Tasks/{id}`| Delete task                      |

---

## 🔑 JWT Authentication

After a successful login, the server returns a JWT token which is sent by the client in the request headers for all protected routes:
```http
Authorization: Bearer <token>
```

### Example:
``` http
GET /api/Tasks HTTP/1.1
Host: localhost:7242
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
When the token expires, the client will require the user to log in again.

## 🌍 Backend integráció

The client communicates with an ASP.NET Core Web API backend:
👉[Task Manager Backend](https://github.com/Riptir3/TaskManager.Api). 
Requests are sent via Axios to endpoints like:  `https://localhost:7242/api/...`.

## ⚙️ Installation & Running

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Riptir3/task-manager-frontend.git
cd task-manager-frontend
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Run the application
```bash
npm start
```

## 👨‍💻 Contact

Developer: **Riptir3 (Bence)**  
GitHub: [github.com/Riptir3](https://github.com/Riptir3)
