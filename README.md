# BookCourier Client

BookCourier is a library/book ordering web application where users can browse books, place orders, manage their profile, and view invoices. Admin users can manage books, users, and orders from the dashboard.

## Live Links

- Client Live Site: https://bookcourier-client-neon.vercel.app
- Server Live API: https://bookcourier-server-new.vercel.app

## Admin Credentials

- Admin Email: ami@tumi.com
- Admin Password: your-admin-password

## Features

- User authentication with Firebase
- Role-based dashboard for user, librarian, and admin
- Browse latest books
- Search and sort books
- Book details page
- Order books
- View my orders
- Cancel pending orders
- Payment status update
- Admin can manage all users
- Admin can manage all books
- Admin/librarian can add books
- Responsive dashboard layout

## Technologies Used

- React
- React Router
- Firebase Authentication
- Tailwind CSS
- DaisyUI
- React Hot Toast
- Vite
- Vercel

## Environment Variables

Create a `.env.local` file in the client root:

```env
VITE_API_URL=https://bookcourier-server-new.vercel.app
```