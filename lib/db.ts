
import mysql from 'mysql2/promise';

// Buat pool koneksi. Pool lebih efisien daripada membuat koneksi baru setiap saat.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306, 
  waitForConnections: true,
  connectionLimit: 10, // Sesuaikan dengan kebutuhan aplikasi Anda
  queueLimit: 0,
});

// Fungsi untuk menguji koneksi
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}

export default pool;
