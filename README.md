# 🏨 BharatYatri Stay

**Budget Hotel Aggregator for Pilgrims & Travelers in Holy Cities of India**

Find affordable and verified hotels, dharamshalas, and guest houses in Prayagraj, Varanasi, and other sacred cities. Starting from just ₹300/night.

---

## 🚀 Tech Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| **Frontend** | Next.js 16 + Tailwind CSS | Vercel |
| **Backend** | Node.js + Express.js | Render |
| **Database** | MongoDB | MongoDB Atlas |

## 📁 Project Structure

```
bharatyatri-stay/
├── frontend/          # Next.js app
│   └── src/
│       ├── app/       # Pages (App Router)
│       ├── components/# Reusable UI components
│       └── lib/       # API helpers
├── backend/           # Express.js API
│   └── src/
│       ├── models/    # MongoDB schemas
│       ├── routes/    # API routes
│       ├── middleware/ # JWT auth
│       └── seed.js    # Sample data seeder
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)

### 1. Backend Setup

```bash
cd backend
npm install

# Edit .env with your MongoDB Atlas URI
# MONGODB_URI=mongodb+srv://...

npm run dev     # Start backend on :5000
npm run seed    # Seed sample hotels + admin user
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev     # Start frontend on :3000
```

### 3. Default Admin Login
- **Username:** `admin`
- **Password:** `bharatyatri@123`

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero + Search + Featured Stays |
| Search | `/search` | Hotel listing with filters |
| Hotel Details | `/hotel/[id]` | Full property details |
| Checkout | `/checkout/[id]` | Booking form |
| Booking Success | `/booking-success` | Confirmation page |
| About Us | `/about` | Company info |
| Contact | `/contact` | Contact form |
| Terms | `/terms` | T&C |
| Privacy | `/privacy` | Privacy & Refund policy |
| Admin Login | `/admin` | Admin authentication |
| Dashboard | `/admin/dashboard` | Booking management |
| Manage Hotels | `/admin/hotels` | Add/Edit/Delete hotels |

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/hotels` | No | List hotels (filters: city, type, price) |
| GET | `/api/hotels/:id` | No | Hotel details |
| POST | `/api/hotels` | Admin | Create hotel |
| PUT | `/api/hotels/:id` | Admin | Update hotel |
| DELETE | `/api/hotels/:id` | Admin | Delete hotel |
| POST | `/api/bookings` | No | Create booking |
| GET | `/api/bookings` | Admin | List all bookings |
| PUT | `/api/bookings/:id` | Admin | Update booking status |
| POST | `/api/admin/login` | No | Admin login (JWT) |

## 🚀 Deployment

### Frontend → Vercel
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add env: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`

### Backend → Render
1. Connect GitHub repo to Render
2. Set root directory to `backend`
3. Add env variables: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`

---

Made with ❤️ for Indian Travelers
