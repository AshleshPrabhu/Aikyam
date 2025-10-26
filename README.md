# 🏺 Aikyam - Connecting Artisans to the World

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-38B2AC.svg)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748.svg)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000.svg)](https://expressjs.com/)

Aikyam is a revolutionary platform that bridges the gap between traditional artisans and modern consumers, bringing authentic handmade crafts from Indian villages directly to your doorstep.

## 🏗️ Architecture

```
aikyam/
├── backend/                 # Express.js API Server
│   ├── src/
│   │   ├── controllers/     # Business logic controllers
│   │   ├── routes/         # API route definitions
│   │   ├── utils/          # Database utilities
│   │   └── generated/      # Prisma generated client
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   └── package.json
└── frontend/               # React SPA
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── contexts/      # React contexts
    │   └── services/      # API service functions
    ├── public/            # Static assets
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **npm** or **yarn** package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy and configure environment variables
   cp .env.example .env
   # Edit .env with your database URL and JWT secret
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx dotenv -e .env -- npx prisma generate

   # Run database migrations
   npx dotenv -e .env -- npx prisma migrate dev

   # (Optional) Seed database with sample data
   npx dotenv -e .env -- npx prisma db seed
   ```

5. **Start the server**
   ```bash
   npm run build
   npm start
   ```

   The API server will be running at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📊 Database Schema

### Core Models

- **Region**: Geographical regions (e.g., Mysore, Jaipur, Kutch)
- **Village**: Villages within regions
- **Vendor**: Artisans and craftsmen
- **User**: Platform users (buyers and sellers)
- **Assignment**: Field assignments for artisans

### Relationships

```
Region (1) ──── (N) Village
Village (1) ──── (N) Vendor
Village (1) ──── (N) Assignment
User (1) ──── (N) Assignment
```

## 🔧 API Endpoints

### Regions
- `GET /api/regions` - List all regions
- `POST /api/regions` - Create new region
- `GET /api/regions/:id` - Get region details

### Villages
- `GET /api/villages` - List all villages
- `POST /api/villages` - Create new village
- `GET /api/villages/:id` - Get village details

### Vendors
- `GET /api/vendors` - List all vendors
- `POST /api/vendors` - Create new vendor
- `GET /api/vendors/:id` - Get vendor details

### Users & Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Assignments
- `GET /api/assignments` - List all assignments
- `POST /api/assignments` - Create new assignment
- `GET /api/assignments/:id` - Get assignment details

## 🎨 Design System

### Colors
- **Primary**: Warm terracotta (#D2691E)
- **Brown**: Rich brown (#8B4513)
- **Cream**: Soft cream (#F5F5DC)
- **Accent**: Golden yellow (#FFD700)

### Typography
- **Headlines**: Playfair Display
- **Body**: Inter
- **Accent**: Handwritten-style fonts for artisan feel

### Components
- Responsive design with mobile-first approach
- Accessible UI components using Headless UI
- Consistent spacing and typography scales

## 🌍 Supported Languages

- English
- हिंदी (Hindi)
- ಕನ್ನಡ (Kannada)
- తెలుగు (Telugu)

## 🤝 Contributing

We welcome contributions from artisans, developers, and designers!

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

##  Team

<table>
  <tr>
    <td align="center">
      <img src="frontend/src/assets/ashlesh_linkedin.jpeg" width="100px;" alt="Ashlesh"/>
      <br />
      <sub><b>Ashlesh Prabhu</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/ashlesh-prabhu-bb457b312/">💼 LinkedIn</a>
    </td>
    <td align="center">
      <img src="frontend/src/assets/vidith_linkedin.jpeg" width="100px;" alt="Vidith"/>
      <br />
      <sub><b>Vidith</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/vidith-venkatesha-murthy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">💼 LinkedIn</a>
    </td>
    <td align="center">
      <img src="frontend/src/assets/vvb_linkedin.jpeg" width="100px;" alt="Vamshi"/>
      <br />
      <sub><b>Vamshikrishna</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/vamshikrishna-v-bidari-154080329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">💼 LinkedIn</a>
    </td>
  </tr>
</table>

---


**Aikyam** - Where Tradition Meets Technology 🏺✨