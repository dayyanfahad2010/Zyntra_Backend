# 🚀 Zyntra Backend

Backend API for **Zyntra**, a full-stack MERN E-Commerce application.
Built with **Node.js**, **Express.js**, **MongoDB**, and **Socket.IO** to provide secure authentication, product management, order processing, real-time notifications, and admin features.

---

## ✨ Features

* 🔐 JWT Authentication
* 👤 User Registration & Login
* 🔑 Forgot & Reset Password (OTP via Email)
* 🛍️ Product Management
* 📂 Category Management
* ❤️ Wishlist
* 🛒 Shopping Cart
* 📦 Order Management
* 👨‍💼 Admin Dashboard APIs
* 🔔 Real-time Notifications (Socket.IO)
* ☁️ Cloudinary Image Upload
* 🍪 Cookie-based Authentication
* ✅ Input Validation & Error Handling
* 🌐 RESTful API Architecture

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT
* Bcrypt
* Nodemailer
* Cloudinary
* Multer
* Cookie Parser

---

## 📂 Project Structure

```
backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── responseHandler
│   ├── routes
│   ├── socket
│   └── utils
│
├── server.js
├── package.json
└── .env
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=7500

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL=your_email
EMAIL_PASSWORD=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

---

## 📥 Installation

Clone the repository

```bash
git clone https://github.com/dayyanfahad2010/Zyntra_Backend.git
```

Move into the project

```bash
cd Zyntra_Backend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run start:dev
```

Production

```bash
npm start
```

---

## 🔗 API Modules

* Authentication
* Products
* Categories
* Cart
* Wishlist
* Orders
* Notifications
* Admin

---

## 🔔 Real-Time Notifications

The backend uses **Socket.IO** to deliver live notifications.

Events:

* `join`
* `new_notification`

---

## 🚀 Deployment

Backend deployed on **Render**.

---

## 📌 Frontend Repository

https://github.com/dayyanfahad2010/Zyntra_Frontend

---

## 👨‍💻 Author

**Dayyan Fahad**

GitHub: https://github.com/dayyanfahad2010
