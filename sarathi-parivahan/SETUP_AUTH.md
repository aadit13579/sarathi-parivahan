# Signup/Login System Setup Guide

## ✅ What's been created:

### 1. **API Routes** (Backend)
   - **POST `/api/auth/signup`** - Create new user account
     - Validates username, email, password
     - Hashes password using bcryptjs
     - Stores user in MongoDB
   
   - **POST `/api/auth/login`** - Authenticate user
     - Validates credentials
     - Returns user info on success

### 2. **Authentication Page** (`/auth`)
   - Beautiful, responsive signup/login page
   - Toggle between signup and login modes
   - Real-time form validation
   - Error and success messages
   - Auto-redirect on successful registration/login

### 3. **Updated Homepage** (`/`)
   - Added signup/login quick links
   - Friendly call-to-action cards
   - Better user journey

### 4. **Updated Navigation**
   - "Login" button in header now links to `/auth` page

### 5. **Dependencies Added**
   - `bcryptjs` - Password hashing
   - `mongodb` - Direct MongoDB client

---

## 🚀 How to Use:

### Step 1: Ensure .env file exists
Make sure your `.env` file in the sarathi-parivahan folder contains:
```
MONGO_URI=your_mongodb_connection_string
```

### Step 2: Run the development server
```bash
npm run dev
```

### Step 3: Access the application
- **Homepage**: `http://localhost:3000`
- **Auth Page**: `http://localhost:3000/auth`

---

## 📋 Database Structure

Your User collection now stores:
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String (bcrypt hashed),
  applications: Array,
  createdAt: Date
}
```

---

## 🔒 API Usage Examples

### Signup Request
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "confirmPassword": "securepass123"
}
```

### Login Request
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123"
}
```

---

## 🎨 Design

The signup/login page matches your existing design with:
- Same color scheme (#f2b630, #a47f30)
- Rounded corners and shadows
- Responsive layout
- Hover effects and transitions
- Clear error/success messaging

---

## 📁 File Structure Created

```
app/
├── api/
│   └── auth/
│       ├── signup/
│       │   └── route.ts
│       └── login/
│           └── route.ts
├── auth/
│   └── page.tsx
├── components/
│   └── Header.tsx (updated)
└── page.tsx (updated)
```

---

## ⚠️ Next Steps (Optional Enhancements)

1. **Session Management**: Add cookies/JWT for persistent login
2. **Email Verification**: Add verification email for signup
3. **Password Reset**: Implement forgot password flow
4. **User Profile**: Create user dashboard
5. **Database Optimization**: Add indexes for username/email

---

## 🐛 Common Issues & Solutions

**Issue**: API returns "Internal server error"
- Check MONGO_URI in .env file
- Ensure MongoDB cluster is accessible

**Issue**: Password hashing fails
- Ensure bcryptjs is properly installed
- Run `npm install` again if needed

**Issue**: Page won't load
- Start dev server: `npm run dev`
- Check for TypeScript errors
- Clear .next folder and rebuild
