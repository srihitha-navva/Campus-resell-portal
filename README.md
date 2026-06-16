# Campus Resell Portal

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application that enables students to buy and sell used products within their campus community. The platform provides a secure marketplace where students can list items, browse available products, manage carts, and perform transactions efficiently.

---

## Features

### Student Features

* User Registration and Login with JWT Authentication
* Secure Password Hashing using bcrypt
* View and Update Profile
* Add Products for Sale
* Edit and Delete Own Products
* Mark Products as Sold
* Browse Available Products
* View Product Details
* Add Products to Cart
* Remove Products from Cart
* Clear Cart
* Change Password

### Admin Features

* Admin Login
* Dashboard Statistics
* View All Users
* Delete Users
* View All Products
* Delete Products
* Monitor Marketplace Activity

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Zustand
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Multer
* Cloudinary

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas
* Image Storage: Cloudinary

---

## Project Structure

```
Campus-resell-portal
│
├── backend
│   ├── APIs
│   ├── config
│   ├── middlewares
│   ├── models
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## Backend APIs

### Authentication (Common API)

* Register User
* Login
* Logout
* Check Authentication
* Change Password
* View Profile
* Update Profile

### Product API

* Add Product
* Get All Products
* Get Single Product
* Get My Products
* Update Product
* Delete Product
* Mark Product as Sold

### Cart API

* Add Product to Cart
* View Cart
* Remove Product from Cart
* Clear Cart

### Admin API

* Dashboard Statistics
* Get All Users
* Get Single User
* Delete User
* Get All Products
* Get Single Product
* Delete Product

---

## Authentication

* JWT Token Based Authentication
* HTTP Only Cookies
* Role Based Authorization
* Protected Routes
* Password Encryption using bcrypt

---

## Database Models

### User

* Name
* Student ID
* Mobile Number
* Email
* Password
* Profile Picture
* Role (Student/Admin)

### Product

* Title
* Description
* Category
* Price
* Condition
* Image
* Seller
* Status

### Cart

* User
* Product

---

## Product Categories

* Electronics
* Books
* Furniture
* Cycles
* Sports
* Clothing
* Accessories
* Others

---

## Product Status

* AVAILABLE
* SOLD


---

## Screens

* Home
* Login
* Register
* Products
* Product Details
* Add Product
* Update Product
* My Products
* Cart
* Profile
* Admin Dashboard
* User Management
* Product Management

---

## Security Features

* JWT Authentication
* Protected APIs
* Role-Based Access Control
* Password Hashing
* Secure HTTP-only Cookies
* Input Validation
* Mongoose Schema Validation

---

## Future Enhancements

* Wishlist
* Search and Filters
* Product Reviews
* Chat Between Buyer and Seller
* Notifications
* Order History
* Payment Gateway Integration
* Product Reporting
* Email Verification
* Forgot Password
