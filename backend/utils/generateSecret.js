const crypto = require('crypto');

/**
 * JWT Secret үүсгэх функц
 * @param {number} length - Secret-ийн урт (default: 64)
 * @returns {string} - Үүсгэгдсэн secret
 */
const generateJWTSecret = (length = 64) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Хүчтэй password үүсгэх функц
 * @param {number} length - Password-ийн урт (default: 32)
 * @returns {string} - Үүсгэгдсэн password
 */
const generateStrongPassword = (length = 32) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

/**
 * Config.env файлд JWT_SECRET нэмэх функц
 */
const updateConfigFile = () => {
  const fs = require('fs');
  const path = require('path');
  
  const configPath = path.join(__dirname, '../config.env');
  const newSecret = generateJWTSecret();
  
  try {
    let configContent = '';
    
    // Хэрэв config.env файл байвал унших
    if (fs.existsSync(configPath)) {
      configContent = fs.readFileSync(configPath, 'utf8');
    }
    
    // JWT_SECRET-ийг шинэчлэх эсвэл нэмэх
    if (configContent.includes('JWT_SECRET=')) {
      configContent = configContent.replace(
        /JWT_SECRET=.*/,
        `JWT_SECRET=${newSecret}`
      );
    } else {
      configContent += `\nJWT_SECRET=${newSecret}`;
    }
    
    // Файлд бичих
    fs.writeFileSync(configPath, configContent);
    
    console.log('✅ JWT_SECRET амжилттай шинэчлэгдлээ');
    console.log(`🔑 Шинэ secret: ${newSecret}`);
    
  } catch (error) {
    console.error('❌ Config файл шинэчлэхэд алдаа:', error.message);
  }
};

// Хэрэв энэ файлыг шууд ажиллуулбал
if (require.main === module) {
  console.log('🔐 JWT Secret үүсгэж байна...');
  updateConfigFile();
}

module.exports = {
  generateJWTSecret,
  generateStrongPassword,
  updateConfigFile
}; 