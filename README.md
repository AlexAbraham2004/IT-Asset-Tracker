# IT Asset Tracker

A full-stack web application for managing IT equipment inventory. Assets such as laptops, monitors, and keyboards can be checked out to team members with a checkout date and due date. When returned, the asset is marked as available again. Each asset is tracked by name, type, serial number, and current status.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Deployment:** Azure (coming soon)

## Project Structure

    IT-Asset-Tracker/
    ├── backend/
    │   ├── src/
    │   │   ├── config/
    │   │   │   └── db.js
    │   │   ├── controllers/
    │   │   │   └── assetsController.js
    │   │   ├── services/
    │   │   │   └── assetsService.js
    │   │   ├── models/
    │   │   │   └── assetModel.js
    │   │   └── routes/
    │   │       └── assetsRoutes.js
    │   ├── migrations/
    │   ├── .env.example
    │   └── index.js
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   │   └── assets/
    │   │   │       ├── AssetForm.jsx
    │   │   │       ├── AssetTable.jsx
    │   │   │       └── CheckoutModal.jsx
    │   │   ├── pages/
    │   │   ├── api/
    │   │   └── App.jsx
    │   └── vite.config.js
    └── README.md

## Getting Started

### Prerequisites
- Node.js v22.12 or higher
- PostgreSQL 17

### Backend
```bash
cd backend
npm install
cp .env.example .env
# fill in your database credentials in .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Status

Currently in active development. Backend API and database are nearing completion. Frontend UI in progress.