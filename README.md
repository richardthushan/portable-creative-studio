# Portable Creative Studio

Premium landing page foundation for Portable Creative Studio, with a React/Vite frontend and Laravel REST API foundation.

## Frontend

Requirements: Node.js 20+ and npm.

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

## Backend

Requirements: PHP 8.2+, Composer, Laravel 11+, MySQL 8+.

The `backend` directory contains the public API controllers, models, migrations, seed data, validation and rate-limited contact endpoint. To turn it into a runnable Laravel application, create a Laravel 11 app in `backend` (or copy these files into an existing Laravel installation), then configure `.env` from `.env.example`:

```bash
cd backend
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The frontend calls `VITE_API_BASE_URL`. The visual landing page includes graceful local content while the public API is being connected. Public routes: `/api/home`, `/api/services`, `/api/portfolio`, `/api/settings/public`, `/api/pricing`, `/api/languages`, and `POST /api/contact`.

## Notes

The logo is kept as a replaceable asset at `frontend/public/brand-logo.png`. No fake testimonials or client names are seeded. Monetary values in the database use minor units (`200000` = LKR 2,000.00).
