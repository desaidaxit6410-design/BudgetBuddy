# 💸 MySpend – MERN Expense Tracker  

MySpend is a **full‑stack MERN application** for tracking income and expenses, visualizing financial data, and managing personal finances with ease.  

It features **secure authentication, interactive dashboards, charts, Excel export, and a modern responsive UI** – everything you need to stay on top of your finances.  

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
  

## 🛠 Tech Stack  

- **Frontend:** React, Vite, Tailwind CSS, React Router, Recharts, Axios, Emoji Picker  
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer, XLSX  
- **Authentication:** JSON Web Tokens (JWT)  
- **File Uploads:** Multer (profile images)  
- **Excel Export:** XLSX  

## ⚡ Getting Started  

### 🔑 Prerequisites  
- Node.js & npm  
- MongoDB database  

---

1. **Clone the repository:**
```
 git clone https://github.com/shivam15102005/MySpend-Expense-Tracker.git
```
### 🖥 Backend Setup  

1. **Install dependencies:**
```
cd backend
npm install

```
2. **Start the backend server:**
```
npm run dev
```
3. **Configure environment variables:**
```
Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.  

```
The backend runs on [http://localhost:8000](http://localhost:8000) by default.  

---

### 🌐 Frontend Setup  

 **Install dependencies:**

1. **Navigate To Frontend Folder And Run**
```   
cd frontend/MySpend
npm install
npm run dev
```

Frontend runs at 👉 [**http://localhost:5173**](http://localhost:5173)]

**Login Page**
![Login Page](https://github.com/shivam15102005/MySpend-Expense-Tracker/blob/f71d16b1eefc8b764b33496db6f740e1d7eaca92/Screenshot%202025-08-24%20190518.png)
**Footer**
![Alt img](https://github.com/shivam15102005/MySpend-Expense-Tracker/blob/2512a5f6c052a6297ce36015bafb720e7ac6e4cf/Screenshot%202025-08-24%20190537.png)

## 📂 Project Structure  
```
backend/
│── config/
│── controller/
│── middlewares/
│── models/
│── routes/
│── uploads/
│── .env.example
└── server.js

 frontend/
└── MySpend/
│── src/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ ├── pages/
│ └── utils/
│
├── index.html
└── package.json
```


## 🎯 Usage  

1. **Sign Up / Login** – Create an account or log into existing account  
2. **Dashboard** – See financial summary, charts, and latest transactions  
3. **Add Income/Expense** – Add entries with optional emoji category  
4. **Delete Transactions** – Hover over cards to delete instantly  
5. **Export Data** – Download income/expense data as Excel  
6. **Profile Image** – Upload a profile picture during sign‑up  

---

## 🌍 Environment Variables  
```
Create a `.env` file in the backend folder:  
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
CLIENT_URL=http://localhost:5173

