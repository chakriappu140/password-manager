# 🔐 PassVault

### Full-Stack Secure Password Manager

PassVault is a secure, centralized application designed to store and manage sensitive credentials. Built with the MERN stack, it prioritizes data integrity and security using industry-standard encryption algorithms to ensure that **no password is ever stored in plain text.**

### 🚀 **Live Demo:** [https://password-manager-theta-mauve.vercel.app](https://password-manager-theta-mauve.vercel.app)

---

## ✨ Key Features

* **🛡️ End-to-End Security:** A dual-layer security model protects both user access and stored data.
* **🔐 AES-256 Encryption:** All stored passwords are encrypted using the **AES-256-CBC** algorithm before they ever touch the database.
* **⚡ Real-Time Strength Checker:** A custom algorithm analyzes password complexity (length, numbers, symbols) instantly as you type.
* **🎲 Strong Password Generator:** Built-in tool to generate complex, random 12-character passwords.
* **📋 Smart Clipboard:** Copy passwords with a single click. The clipboard is **automatically cleared after 30 seconds** to prevent security leaks.
* **🌗 Modern UI:** A clean, responsive interface built with **React** and **Tailwind CSS**, featuring smooth animations via **Framer Motion**.

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js (Vite):** For a fast, dynamic user interface.
* **Tailwind CSS:** For modern, responsive styling.
* **Framer Motion:** For smooth page transitions and UI animations.
* **Axios:** For secure API communication (using Interceptors for JWT handling).
* **React Icons:** For UI iconography.

### **Backend**
* **Node.js & Express:** Robust RESTful API architecture.
* **MongoDB & Mongoose:** NoSQL database for storing users and encrypted password documents.
* **JSON Web Tokens (JWT):** Stateless, secure user authentication.

### **Security Core**
* **Node.js Crypto Module:** Used for the implementation of the AES-256-CBC algorithm.
* **Bcrypt.js:** For hashing user master passwords.

---

## 🔒 Security Architecture

This is the core of PassVault. The application uses a "Trust No One" approach to data storage.

### 1. Authentication (User Identity)
* **Bcrypt Hashing:** When a user registers, their master password is salted and hashed using `bcrypt`. The plain-text master password is **never** stored.
* **JWT:** Upon login, a JSON Web Token is issued. This token is required in the `Authorization` header for all protected API routes.

### 2. Data Encryption (The Vault)
When a user saves a password (e.g., for "google.com"), the backend performs the following before saving to MongoDB:
1.  **IV Generation:** A unique, random **16-byte Initialization Vector (IV)** is generated for *every single entry*.
2.  **Encryption:** The password is encrypted using **AES-256-CBC** with a 32-byte server-side secret key and the unique IV.
3.  **Storage:** The system stores the result as `iv:encrypted_string`.
4.  **Decryption:** When retrieving data, the system splits the string, extracts the specific IV, and uses the secret key to decrypt the password on the fly.

**Result:** Even if two users have the exact same password (e.g., "123456"), they will look completely different in the database due to the unique IVs.

---

## 💻 Local Installation

Follow these steps to run PassVault locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/passvault.git](https://github.com/yourusername/passvault.git)
cd passvault
```

### 2. Backend Setup
```bash
cd backend
npm install
```
