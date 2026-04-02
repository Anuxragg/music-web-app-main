# 🎵 Music App Backend

Backend built with Express, MongoDB, JWT authentication, and Cloudinary.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

Then fill in `.env` with:
- **MongoDB URI**: From your MongoDB Atlas account
- **JWT Secret**: Generate a random string for signing tokens
- **Cloudinary**: Your Cloudinary API credentials
- **Frontend URL**: Your frontend dev server URL (default: http://localhost:5173)

### 3. Run the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register
- **POST** `/api/auth/register`
- Body: `{ username, email, password, passwordConfirm }`
- Returns: `{ accessToken, userId, username, email }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Returns: `{ accessToken, userId, username, email }`

#### Refresh Token
- **POST** `/api/auth/refresh-token`
- Returns: `{ accessToken }`

#### Logout
- **POST** `/api/auth/logout` (protected route)
- Returns: `{ message: "Logged out successfully" }`

### Health Check
- **GET** `/api/health`
- Returns: `{ status: "Server is running" }`

## Features

✅ User Registration & Login
✅ JWT Access Tokens (15 min expiry)
✅ Refresh Tokens (7 day expiry)
✅ Password Hashing with bcryptjs
✅ Protected Routes
✅ CORS Enabled
✅ MongoDB Atlas Integration
✅ Ready for Cloudinary Upload Integration

## Next Steps

1. Get your MongoDB Atlas connection string
2. Get your Cloudinary credentials
3. Update `.env` with your credentials
4. Run `npm run dev` to start the server
5. Test auth endpoints with Postman or Insomnia
6. Connect frontend to these endpoints
