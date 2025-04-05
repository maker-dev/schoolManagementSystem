# 🏫 School Management System  

A modern **School Management System** built with **React.js** (frontend), **Node.js + Express** (backend), and **JWT** for authentication.  

## ✨ Features  

### **Frontend (React.js)**  
- **User Authentication** (Login, Logout, JWT)  
- **Dashboard** with analytics (using Chart.js)  
- **Student Management** (Add, Edit, Delete, View)  
- **Teacher Management** (Add, Edit, Delete, View)  
- **Class & Subject Management**  
- **Attendance Tracking**  
- **Exam & Grade Management**  
- **Responsive UI** with Font Awesome icons  
- **Toast Notifications** (react-toastify)  
- **Confirmation Dialogs** (react-confirm-alert)  

### **Backend (Node.js + Express)**  
- **RESTful API** for all operations  
- **JWT Authentication** (Secure routes)  
- **Database Integration** (MongoDB)  
- **Role-Based Access Control** (Admin, Teacher, Student)  
- **Error Handling & Validation**

## 🛠️ Technologies Used  

### **Frontend**  
- **React.js** (v18)  
- **React Router DOM** (v6)  
- **Axios** (HTTP requests)  
- **Chart.js + react-chartjs-2** (Data visualization)  
- **Font Awesome** (Icons)  
- **React Toastify** (Notifications)  
- **React Confirm Alert** (Dialogs)  
- **JS-Cookie** (Token management)  

### **Backend**  
- **Node.js**  
- **Express.js**  
- **JWT (JSON Web Tokens)**  
- **Bcrypt** (Password hashing)  
- **Mongoose (MongoDB) / Sequelize (MySQL)**  

## 🚀 Installation  

### **1. Clone the repository**  
```bash
git clone https://github.com/maker-dev/schoolManagementSystem.git
cd schoolManagementSystem
```

### **2. Set up the Backend (Node.js)**  
```bash
cd server

npm install

# Create a .env file and configure the environment variables
cp .env.example .env //

npm start 
```

### **3. Set up the Frontend (React.js)**  
```bash
cd client

npm install


# Create a .env file and configure the environment variables
cp .env.example .env //

npm start
```

## 🔐 Authentication Flow  
1. **Login** → Generates JWT  
2. **JWT stored in HTTP-only cookies** (secure)  
3. **Protected routes** check for valid JWT  
4. **Logout** clears the token  

## 📜 License  
MIT License
