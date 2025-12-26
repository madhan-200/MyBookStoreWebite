# API Contracts & Backend Implementation Plan

## Overview
Transform the mock data into a dynamic system with MongoDB backend and admin CMS panel.

## Current Mock Data (Frontend)
- `/app/frontend/src/data/mock.js` contains:
  - `mockProducts` (18 products)
  - `mockReviews` (6 reviews)
  - `mockGalleryImages` (9 gallery items)

## Database Models

### 1. Product Model
```python
{
    "_id": ObjectId,
    "name": str,
    "description": str,
    "price": float,
    "category": str,  # school, guides, reading, stationery
    "availability": str,  # "In Stock", "Limited Stock", "Out of Stock"
    "created_at": datetime,
    "updated_at": datetime
}
```

### 2. Review Model
```python
{
    "_id": ObjectId,
    "name": str,
    "rating": int,  # 1-5
    "comment": str,
    "date": str,
    "approved": bool,  # Admin approval
    "created_at": datetime
}
```

### 3. Gallery Model
```python
{
    "_id": ObjectId,
    "title": str,
    "description": str,
    "image_url": str,  # Optional for now
    "display_order": int,
    "created_at": datetime
}
```

### 4. Admin User Model
```python
{
    "_id": ObjectId,
    "username": str,  # unique
    "email": str,  # unique
    "password_hash": str,
    "role": str,  # "admin", "super_admin"
    "created_at": datetime
}
```

## API Endpoints

### Public APIs (No Auth Required)

#### Products
- `GET /api/products` - Get all products (with optional category filter)
- `GET /api/products/{id}` - Get single product

#### Reviews
- `GET /api/reviews` - Get all approved reviews
- `POST /api/reviews` - Submit a new review (requires approval)

#### Gallery
- `GET /api/gallery` - Get all gallery items

### Admin APIs (JWT Auth Required)

#### Admin Auth
- `POST /api/admin/login` - Login (returns JWT token)
- `POST /api/admin/register` - Register new admin (super_admin only)
- `GET /api/admin/me` - Get current admin info

#### Products Management
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

#### Reviews Management
- `GET /api/admin/reviews` - Get all reviews (including unapproved)
- `PUT /api/admin/reviews/{id}/approve` - Approve review
- `DELETE /api/admin/reviews/{id}` - Delete review

#### Gallery Management
- `POST /api/admin/gallery` - Create new gallery item
- `PUT /api/admin/gallery/{id}` - Update gallery item
- `DELETE /api/admin/gallery/{id}` - Delete gallery item

## Frontend Integration Plan

### Remove Mock Data
1. Remove imports from `mock.js` in all pages
2. Replace with API calls using axios

### Admin Panel Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Products management
- `/admin/reviews` - Reviews management
- `/admin/gallery` - Gallery management

### Protected Routes
- Use React Context for admin authentication
- Store JWT token in localStorage
- Redirect to login if not authenticated

## Security Measures
1. Password hashing with bcrypt
2. JWT token authentication
3. Input validation with Pydantic
4. CORS configuration
5. Rate limiting (optional)

## Migration Strategy
1. ✅ Create backend models and APIs
2. ✅ Seed database with mock data
3. ✅ Create admin authentication
4. ✅ Build admin panel frontend
5. ✅ Update public pages to use APIs
6. ✅ Test all functionality

## Default Admin Credentials (for initial setup)
- Username: admin
- Password: admin123 (should be changed after first login)
