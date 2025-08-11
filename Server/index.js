import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Database/ConnectDB.js';
import cookieParser from 'cookie-parser';

// Routes
import userRoutes from './Router/UserRoute.js';
import itemRoutes from './Router/ItemRoute.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Connect to Database
connectDB();

// Allowed CORS origins for frontend
const allowedOrigins = [
  'http://localhost:5173' // for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/user', userRoutes);
app.use('/items', itemRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
