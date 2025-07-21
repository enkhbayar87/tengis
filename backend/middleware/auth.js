const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT token шалгах middleware
const protect = async (req, res, next) => {
  try {
    let token;

    // Authorization header-ээс token авах
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Token байхгүй бол алдаа буцаах
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token байхгүй байна. Нэвтрэх шаардлагатай.'
      });
    }

    // Token-ийг verify хийх
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User-ийг олох (password-ийг оруулахгүй)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token хүчингүй байна'
      });
    }

    // User-ийг request object-д нэмэх
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Token хүчингүй байна'
    });
  }
};

// Admin эрх шалгах middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Admin эрх шаардлагатай'
    });
  }
};

// JWT token үүсгэх function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // 30 хоног
  });
};

module.exports = {
  protect,
  admin,
  generateToken
}; 