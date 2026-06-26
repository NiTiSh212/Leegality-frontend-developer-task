Shopline

A simple e-commerce product listing and detail app built using the DummyJSON Products API.

Features
Product listing page with filters (category, brand, price)
Product detail page with full information
Pagination (client-side)
URL-based state (filters + page preserved)
Back navigation with previous filters intact
Tech Stack
React 18 (Hooks)
React Router v6
Vite
Plain CSS
DummyJSON API

Project Structure
src/api.js → API calls (DummyJSON wrapper)
src/components/ → Reusable UI components
ProductCard
FilterPanel
Pagination
src/pages/
ListingPage.jsx → Product listing + filters + pagination
DetailPage.jsx → Product details page
