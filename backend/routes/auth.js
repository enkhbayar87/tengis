const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, generateToken } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Хэрэглэгч бүртгэх
// @access  Public
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Хэрэглэгчийн нэр 3-30 тэмдэгт байх ёстой')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Хэрэглэгчийн нэр зөвхөн үсэг, тоо, _ ашиглаж болно'),
  body('email')
    .isEmail()
    .withMessage('Зөв и-мэйл хаяг оруулна уу'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
  body('firstname')
    .notEmpty()
    .withMessage('Нэр оруулна уу'),
  body('lastname')
    .notEmpty()
    .withMessage('Овог оруулна уу'),
  body('gender')
    .notEmpty()
    .withMessage('Хүйс оруулна уу'),
  body('birthday')
    .notEmpty()
    .withMessage('Төрсөн огноо оруулна уу'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Утасны дугаар оруулна уу'),
  body('country')
    .notEmpty()
    .withMessage('Улс оруулна уу'),
  body('prefecture')
    .notEmpty()
    .withMessage('Мужийн нэр оруулна уу'),
  body('city')
    .notEmpty()
    .withMessage('Хотын нэр оруулна уу'),
  body('district')
    .notEmpty()
    .withMessage('Дүүрэгийн нэр оруулна уу'),
  body('postcode')
    .notEmpty()
    .withMessage('Шуудангийн дугаар оруулна уу'),
], async (req, res) => {
  try {
    // Validation алдаа шалгах
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Оролтын алдаа',
        errors: errors.array()
      });
    }

    const {
      username, 
      email, 
      password,
      firstname,
      lastname,
      gender,
      birthday,
      phoneNumber,
      country,
      prefecture,
      city,
      district,
      postcode
    } = req.body;

    // Хэрэглэгч одоо байгаа эсэхийг шалгах
    const existingUserByUsername = await User.findByUsername(username);
    const existingUserByEmail = await User.findByEmail(email);

    if (existingUserByUsername || existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'Хэрэглэгчийн нэр эсвэл и-мэйл хаяг одоо байна'
      });
    }

    // Шинэ хэрэглэгч үүсгэх
    const user = await User.create({
      username,
      email,
      password,
      firstname,
      lastname,
      gender,
      birthday,
      phoneNumber,
      country,
      prefecture,
      city,
      district,
      postcode
    });

    // Token үүсгэх
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Хэрэглэгч амжилттай бүртгэгдлээ',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname,
          gender: user.gender,
          birthday: user.birthday,
          country: user.country,
          prefecture: user.prefecture,
          city: user.city,
          district: user.district,
          postcode: user.postcode
        },
        token
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Хэрэглэгч нэвтрэх
// @access  Public
router.post('/login', [
  body('username')
    .notEmpty()
    .withMessage('Хэрэглэгчийн нэр оруулна уу'),
  body('password')
    .notEmpty()
    .withMessage('Нууц үг оруулна уу')
], async (req, res) => {
  try {
    // Validation алдаа шалгах
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Оролтын алдаа',
        errors: errors.array()
      });
    }

    const { username, password } = req.body;

    // Хэрэглэгчийг олох (password-ийг оруулах)
    const user = await User.findByUsernameWithPassword(username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна'
      });
    }

    // Хэрэглэгч идэвхтэй эсэхийг шалгах
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Хэрэглэгчийн эрх идэвхгүй байна'
      });
    }

    // Password шалгах
    const isPasswordValid = await User.comparePassword(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна'
      });
    }

    // Сүүлд нэвтэрсэн огноог шинэчлэх
    await User.updateLastLogin(user.id);

    // Token үүсгэх
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Амжилттай нэвтэрлээ',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Одоогийн хэрэглэгчийн мэдээлэл авах
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Гарах (client талд token-ийг устгах)
// @access  Private
router.post('/logout', protect, async (req, res) => {
  try {
    // Client талд token-ийг устгах хэрэгтэй
    res.json({
      success: true,
      message: 'Амжилттай гарлаа'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Серверийн алдаа гарлаа'
    });
  }
});

module.exports = router; 