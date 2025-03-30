# **Bookerz - Train Seat Booking System** 🚆

Bookerz is a train seat booking system where users can reserve train seats with priority for same-row allocation.

## **🛠 Tech Stack**

-   **Frontend:** React.js (Vite)
-   **Backend:** Node.js, Express.js
-   **Database:** PostgreSQL (Sequelize ORM)

## **🔧 Environment Variables**

Create a `.env` file in the **server** directory and add:

```env
CLIENT_BASE_URL=frontend-host
NODE_ENV=development/production
PORT=5000
PGHOST=your-db-host
PGPORT=your-db-port
PGDATABASE=your-db-name
PGUSER=your-db-user
PGPASSWORD=your-db-password
JWT_SECRET=your-secret-key
```

For **frontend** create a `.env` file in the **client** directory:

```env
VITE_SERVER_URL=backend-host
```

## 🚀 Setup Instructions

### 1️⃣ Install Dependencies

```sh
# Navigate to the backend and install dependencies
cd server
npm install

# Navigate to the frontend and install dependencies
cd ../client
npm install
```

### 1️⃣ Run the Project

```sh
# Start the backend server
cd server
npm start

# Start the frontend development server
cd ../client
npm run dev
```

The app should now be running
