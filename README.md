# 🏨 StayNest

<p align="center">
  <strong>A Modern Hotel Booking & Management Platform</strong>
</p>

<p align="center">
  StayNest is a full-stack hotel booking and management system built with Next.js and Better Auth.
  It provides a seamless booking experience for travelers while giving administrators complete control over hotels, bookings, users, analytics, and platform settings.
</p>

---

## ✨ Features

### 👤 Authentication
- Secure Email & Password Authentication
- Google OAuth Login
- Better Auth Integration
- Protected Routes
- Session Management

### 🧳 User Features
- Browse available stays
- Search & filter hotels
- View detailed stay information
- Book hotels
- Manage bookings
- Save stays to wishlist
- Leave ratings & reviews
- User dashboard

### 🛠 Admin Features
- Dashboard Overview
- Manage Users
- Manage Stays
- Manage Bookings
- Review Management
- Platform Settings
- Revenue & Booking Analytics
- Transaction Monitoring

### 📊 Analytics
- Total Users
- Total Bookings
- Total Revenue
- Monthly Booking Growth
- Category Statistics

### 🎨 UI/UX
- Fully Responsive Design
- Smooth Framer Motion Animations
- Modern Dashboard
- Clean User Experience
- Mobile Friendly

---

# 🚀 Tech Stack

## Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB
- Better Auth

## Database
- MongoDB Atlas

## Authentication
- Better Auth
- Google OAuth

---

# 📁 Project Structure

```text
StayNest
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── api/
│   └── ...
│
├── components/
│   ├── Navbar
│   ├── Sidebar
│   ├── Cards
│   └── ...
│
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── ...
│
├── public/
├── styles/
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/samsunnaharsrity/staynest.git
```

```bash
cd staynest
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
BETTER_AUTH_SECRET=your_secret

BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

AUTH_DB_NAME=staynest

NEXT_PUBLIC_API_URL=http://localhost:8000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## Run Development Server

```bash
npm run dev
```

Application will be available at:

```
http://localhost:3000
```

---

# 📷 Screens

- Home Page
- Explore Stays
- Booking Page
- User Dashboard
- Admin Dashboard
- Analytics
- Reviews
- Transactions

---

# 🔐 Authentication

StayNest uses **Better Auth** with:

- Email & Password Authentication
- Google Sign In
- Session Authentication
- Role-based Authorization
- Admin Plugin

---

# 📈 Future Improvements

- Stripe Payment Gateway
- Email Notifications
- Booking Cancellation
- Hotel Availability Calendar
- Chat Support
- Multi-language Support
- Dark Mode
- PWA Support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Samsun Nahar**

Full Stack Developer

GitHub: https://github.com/samsunnaharsrity

LinkedIn: https://www.linkedin.com/in/samsunnahar

---

<p align="center">
Made with ❤️ using Next.js, MongoDB & Better Auth
</p>