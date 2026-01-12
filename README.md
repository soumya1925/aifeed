# 🎯 Mini Mark - Influencer Marketing Platform

Live Backend Deployment: [https://aifeed-1.onrender.com](https://aifeed-1.onrender.com)


## 🚀 Quick Start

### Health Check
```http
GET https://aifeed-1.onrender.com/
Response: Mini Mark API running ✅
```

### 🛠 Tech Stack

#### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi schema validation
- **Security:** Helmet.js + CORS + Morgan logging
- **Password Hashing:** bcryptjs


### 📁 Repository Structure
```
├── mini-mark-backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── server.js              # Server entry point
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── feed.controller.js
│   │   │   ├── campaign.controller.js
│   │   │   ├── reel.controller.js
│   │   │   └── analytics.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js # JWT & role-based auth
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Campaign.js
│   │   │   └── CreatorReel.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── feed.routes.js
│   │   │   ├── campaign.routes.js
│   │   │   ├── reel.routes.js
│   │   │   └── analytics.routes.js
│   │   ├── validations/
│   │   │   └── auth.validation.js # Joi schemas
│   ├── seedData.js                # Database seeding
│   ├── package.json
│   └── .env (ignored)             # Environment variables
│
└── mini-mark-frontend/            # Expo app (Work in Progress)

```
## 👥 User Roles & Permissions

| Role | Capabilities |
|------|--------------|
| **consumer** | View feed (limited fields - views & earnings hidden) |
| **creator** | View full feed data with all fields visible |
| **brand** | Full access (deploy campaigns, update budgets, view analytics) |


## 📝 Signup
- http
- POST /auth/signup
- Request Body:
```
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "consumer"
}
```
-Response:
```
json
{
  "message": "User created successfully"
}
```

## 🔑 Login
- http
- POST /auth/login
- Request Body:
```
json
{
  "email": "john@example.com",
  "password": "password123"
}
```

-Response:
```
json
{
  "token": "JWT_TOKEN_HERE"
}
Note: All routes except /auth/* are JWT protected. Use the following header for protected routes:
```

## 📺 Feed API
- Authorization: Bearer <JWT_TOKEN>
- Get Feed (Role-based Response)
- http
- GET /feed
- Consumer Response (views & earnings hidden):
```
json
[
  {
    "_id": "reelId",
    "mediaUrl": "https://video-url.mp4"
    // views & earnings are hidden for consumers
  }
]
```
- Creator/Brand Response (full data):
```
json
[
  {
    "_id": "reelId",
    "mediaUrl": "https://video-url.mp4",
    "views": 1200,
    "earnings": 320
  }
]
```
## 🎯 Campaign Routes (Brand Only)
- Deploy Campaign
- http
- POST /campaigns/:id/deploy
Response:
```
json
{
  "message": "Campaign deployed successfully",
  "remainingBudget": 4500
}
```
## 🎥 Reel Routes
- Increment Views & Earnings (Brand Only)
- http
- POST /reels/:id/view
- Response:
```
json
{
  "message": "View recorded",
  "views": 1300,
  "earnings": 350
}
```
## 📊 Analytics Routes
- Get Creators with Reels
- http 
- GET /analytics/creators
- Returns:

- Total views across all reels

- Total earnings across all reels

- Reel count per creator

- Get Brands with Campaigns
- http
- GET /analytics/brands
- Returns:

- Campaign count per brand

- Number of active campaigns

- Total budget across all campaigns

## 🧪 Testing with Postman
- Signup Endpoint: Create a new user account

- Login Endpoint: Get JWT token for authentication

- Add Authorization Header: Authorization: Bearer <token>

Test Protected Routes:
```

/feed - View role-based feed

/campaigns/:id/deploy - Deploy campaign (brand only)

/reels/:id/view - Record view and earnings (brand only)

/analytics/creators - View creator analytics

/analytics/brands - View brand analytics
```

##  🌱 Seed Data
Run the following command locally to populate the database with sample data:

- bash
- node seedData.js
- What gets seeded:

- 20 users (mix of consumers, creators, and brands)

- Creator reels with associated media

- Brand campaigns with random budgets

- Random views and earnings data

##  🛡 Security Features
- Password Security: bcryptjs for password hashing

- Authentication: JWT tokens for session management

- Authorization: Role-based access control (RBAC)

- Input Validation: Joi schema validation for all endpoints

- HTTP Security: Helmet.js for security headers

- CORS: Cross-Origin Resource Sharing configuration

- Logging: Morgan for HTTP request logging
