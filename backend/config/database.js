const sql = require('mssql');

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false, // Azure-д true болгох
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

let pool;

const connectDB = async () => {
  try {
    pool = await sql.connect(dbConfig);
    console.log('✅ MSSQL холбогдсон');
    
    // Users хүснэгт үүсгэх
    await createTables();
    
    return pool;
  } catch (error) {
    console.error('❌ MSSQL холбогдоход алдаа:', error.message);
    throw error;
  }
};

const createTables = async () => {
  try {
    const createUsersTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
      CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(30) UNIQUE NOT NULL,
        email NVARCHAR(100) UNIQUE NOT NULL,
        password NVARCHAR(255) NOT NULL,
        role NVARCHAR(20) DEFAULT 'user',
        isActive BIT DEFAULT 1,
        lastLogin DATETIME NULL,
        createdAt DATETIME DEFAULT GETDATE(),
        updatedAt DATETIME DEFAULT GETDATE()
      )
    `;
    
    await pool.request().query(createUsersTable);
    console.log('✅ Users хүснэгт үүсгэгдлээ');
    
  } catch (error) {
    console.error('❌ Хүснэгт үүсгэхэд алдаа:', error.message);
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error('Database холбогдоогүй байна');
  }
  return pool;
};

module.exports = {
  connectDB,
  getPool,
  sql
}; 