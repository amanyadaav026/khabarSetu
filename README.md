# KhabarSetu 📰

KhabarSetu is a full-stack news portal that allows users to discover, search, save, and interact with news articles through a modern and responsive interface.

The platform is built with React on the frontend and Node.js, Express, and MongoDB on the backend, with authentication, article management, comments, search, category filtering, saved articles, and dashboard functionality.

## About The Project

KhabarSetu is designed as a modern digital news platform where users can explore news across different categories and interact with articles.

The project focuses on providing a clean user experience while implementing real-world full-stack concepts such as authentication, protected routes, REST APIs, database management, image uploads, article views, comments, and user dashboards.

## Key Features

- 🔐 User authentication with JWT
- 🔑 Google authentication
- 📰 Create, edit, delete, and manage news articles
- 🔎 Search articles by title, summary, and category
- 🏷️ Category-based news filtering
- 🔖 Save and unsave articles
- 👁️ Article view counter
- 💬 Article comments and comment management
- 📊 User dashboard with article and view statistics
- 👤 User profile management
- 🖼️ Profile and article image uploads using Cloudinary
- 🛡️ Protected routes and role-based access
- 📱 Responsive design for desktop and mobile devices
- ⚡ Modern React-based user interface

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios
- Lucide React
- shadcn/ui

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Services & Tools

- Cloudinary — Image uploads
- Firebase — Google Authentication
- Git & GitHub — Version control

## Project Structure

```text
khabarSetu/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md