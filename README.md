# 💸 MySpend – MERN Expense Tracker  

MySpend is a **full‑stack MERN application** for tracking income and expenses, visualizing financial data, and managing personal finances with ease.  

It features **secure authentication, interactive dashboards, charts, Excel export, and a modern responsive UI** – everything you need to stay on top of your finances.  

---

## 🚀 Features  

- 🔐 **User Authentication** – Secure signup/login using **JWT** with session persistence  
- 📊 **Dashboard Overview** – Total balance, income, expenses, and charts at a glance  
- 💰 **Income Management** – Add, view, delete incomes & export as **Excel**  
- 💸 **Expense Management** – Add, view, delete expenses with categories & export as **Excel**  
- 📈 **Interactive Charts** – Visual insights (Bar, Pie, and Line charts) with **Recharts**  
- 📝 **Recent Transactions** – Quick access to your latest records  
- 📁 **Reports** – Export all income and expense data to Excel for offline analysis  
- 📱 **Responsive UI** – Works seamlessly across desktop, tablet, and mobile  
- 🧭 **Intuitive Navigation** – Sidebar menu for Dashboard, Income, Expenses, and Logout  
- ⚡ **Quick Delete** – Hover to delete transactions instantly  
- 🖼 **Profile Image Upload** – Upload an avatar during sign‑up

1. Clone the repository:
```sh
 git clone https://github.com/shivam15102005/MySpend-Expense-Tracker.git

---
## 🛠 Tech Stack  

**Frontend:** React, Vite, Tailwind CSS, React Router, Recharts, Axios, Emoji Picker  
**Backend:** Node.js, Express, MongoDB, Mongoose, Multer, XLSX  
**Authentication:** JSON Web Tokens (JWT)  
**File Uploads:** Multer (profile images)  
**Excel Export:** XLSX  

---

## 📂 Project Structure  
 backend/
 config/
 controller/
 middlewares/
 models/
 routes/
 uploads/
 .env.example
 server.js

 frontend/
 expense-tracker/
 src/
 components/
 context/
 hooks/
 pages/
 utils/
 index.html
 package.json


---

## ⚡ Getting Started  

### 🔑 Prerequisites  
- Node.js & npm  
- MongoDB (local or cloud e.g. Atlas)  

---

### 🖥 Backend Setup  

navigate to backend folder
cd backend

install dependencies
npm install

copy environment variables
cp .env.example .env # then edit with your MongoDB URI & JWT secret

start backend server
npm run dev


Backend runs at 👉 [**http://localhost:8000**](http://localhost:8000)  

---

### 🌐 Frontend Setup  
navigate to frontend folder
cd frontend/expense-tracker

install dependencies
npm install

start React app
npm run dev


Frontend runs at 👉 [**http://localhost:5173**](http://localhost:5173)  

---

## 🎯 Usage  

1. **Sign Up / Login** – Create an account or log into existing account  
2. **Dashboard** – See financial summary, charts, and latest transactions  
3. **Add Income/Expense** – Add entries with optional emoji category  
4. **Delete Transactions** – Hover over cards to delete instantly  
5. **Export Data** – Download income/expense data as Excel  
6. **Profile Image** – Upload a profile picture during sign‑up  

---

## 🌍 Environment Variables  

Create a `.env` file in the backend folder:  
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
CLIENT_URL=http://localhost:5173

