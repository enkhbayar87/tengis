const bcrypt = require('bcryptjs');
const { getPool, sql } = require('../config/database');

class User {
  static async findByUsername(username) {
    const pool = getPool();
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username');
    
    return result.recordset[0];
  }

  static async findByEmail(email) {
    const pool = getPool();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM users WHERE email = @email');
    
    return result.recordset[0];
  }

  static async findById(id) {
    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT id, username, email, role, isActive, lastLogin, createdAt, updatedAt FROM users WHERE id = @id');
    
    return result.recordset[0];
  }

  static async create(userData) {
    const pool = getPool();
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const result = await pool.request()
      .input('username', sql.NVarChar, userData.username)
      .input('email', sql.NVarChar, userData.email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('role', sql.NVarChar, userData.role || 'user')
      .query(`
        INSERT INTO users (username, email, password, role)
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.email, INSERTED.role, INSERTED.createdAt
        VALUES (@username, @email, @password, @role)
      `);
    
    return result.recordset[0];
  }

  static async updateLastLogin(id) {
    const pool = getPool();
    await pool.request()
      .input('id', sql.Int, id)
      .input('lastLogin', sql.DateTime, new Date())
      .query('UPDATE users SET lastLogin = @lastLogin, updatedAt = GETDATE() WHERE id = @id');
  }

  static async comparePassword(hashedPassword, candidatePassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async findByUsernameWithPassword(username) {
    const pool = getPool();
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username');
    
    return result.recordset[0];
  }
}

module.exports = User; 