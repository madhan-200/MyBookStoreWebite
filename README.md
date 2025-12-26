# 📚 PrimeBooks & Stationery

A comprehensive e-commerce platform for a Bookstore and Stationery shop located in Vadalur. This project features a modern, responsive React frontend, a robust FastAPI backend, and secure cloud database integration.

## 🚀 Overview
PrimeBooks & Stationery is designed to provide a premium digital shopping experience for students and book lovers in Vadalur. It includes a user-friendly product catalog, store gallery, customer reviews, and a secure administration panel.

## ✨ Key Features
- **Modern Responsive Design**: Optimized for both desktop and mobile users.
- **Dynamic Product Catalog**: Browse School Books, Guides, Competitive Exam materials, and more.
- **Admin Dashboard**: Secure panel to manage products, gallery items, and customer reviews.
- **Security Hardened**: Token-based authentication (JWT) and BCrypt password encryption.
- **Cloud Persistence**: Integrated with MongoDB Atlas for reliable data storage.
- **Interactive Map & Store Info**: Easily find and contact the store.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: FastAPI (Python), Motor (Async MongoDB), Pydantic.
- **Database**: MongoDB Atlas.
- **Infrastructure**: Git/GitHub for version control.

## 📥 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB Atlas account

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
# Configure your .env file with MONGO_URL and JWT_SECRET_KEY
python -m uvicorn server:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔒 Security Note
This project uses environment variables (`.env`) for sensitive credentials. Ensure your cloud database URI and JWT secrets are kept private and never committed to version control.

## 📝 License
This project is for demonstration and store-specific usage.

---
*Developed for PrimeBooks & Stationery - Vadalur*
