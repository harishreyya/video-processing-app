# 🚀 Video Processing & Streaming Platform

A full-stack video processing application that allows users to upload videos, process them for sensitivity analysis, and stream them efficiently with real-time updates and role-based access control.

---

## 🎬 Demo

- Live App: [https://video-processing-app-kappa.vercel.app](https://video-processing-app-kappa.vercel.app)
- Demo Video: [https://drive.google.com/file/d/1fmgmhqy1VQo1a4mnFdMQiAA3woVu9hhu/view?usp=sharing](https://drive.google.com/file/d/1fmgmhqy1VQo1a4mnFdMQiAA3woVu9hhu/view?usp=sharing)

---

## 🧠 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (RBAC)
  - Admin → Full access
  - Editor → Upload & manage videos
  - Viewer → Read-only access

---

### 🎥 Video Upload System
- Upload videos with progress tracking
- File validation (type & size)
- Secure cloud storage using Cloudinary

---

### ⚙️ Video Processing Pipeline
- Video compression using FFmpeg
- Sensitivity analysis (safe / flagged)
- Background processing workflow
- Automatic cleanup of temporary files

---

### ⚡ Real-Time Updates
- Live processing updates using Socket.io
- Real-time progress tracking

---

### ▶️ Video Streaming
- HTTP Range Requests for efficient streaming
- Supports play, pause, and seek
- Optimized for bandwidth usage

---

### 📚 Video Library
- View all uploaded videos
- Filter by status (processing / completed)
- Sensitivity status indicators

---

### 👥 Admin Dashboard
- View all users
- Filter users by roles
- Monitor all uploaded videos

---

### ✍️ Editor Dashboard
- View personal video collection
- Track upload & processing status

---

### 🎨 UI/UX
- Modern SaaS-style layout
- Sidebar navigation + top navbar
- Responsive design
- Interactive video previews

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Context API
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- Multer (file upload)
- FFmpeg (video processing)

### Cloud & Deployment
- Cloudinary (video storage)
- MongoDB Atlas (database)
- Vercel (frontend)
- Render (backend)

---

