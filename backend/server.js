const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Environment variables
dotenv.config({ path: './config.env' });

// JWT_SECRET шалгах болон үүсгэх
const { generateJWTSecret } = require('./utils/generateSecret');

// JWT_SECRET байхгүй бол үүсгэх
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-super-secret-jwt-key-change-this-in-production') {
  const newSecret = generateJWTSecret();
  process.env.JWT_SECRET = newSecret;
  console.log('🔐 Шинэ JWT_SECRET үүсгэгдлээ');
}

// Import database connection
const { connectDB } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB()
  .then(() => {
    console.log('✅ MSSQL холбогдсон');
  })
  .catch((err) => {
    console.error('❌ MSSQL холбогдоход алдаа:', err.message);
  });

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server ажиллаж байна',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Серверийн алдаа гарлаа' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Хуудас олдсонгүй' 
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} порт дээр ажиллаж байна`);
  console.log(`📱 API: http://localhost:${PORT}/api`);
}); 