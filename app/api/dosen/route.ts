
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT 
        d.nama, 
        d.NUPTK, 
        d.kontak, 
        i.url,
        p.nama_prodi,
        GROUP_CONCAT(DISTINCT s.nama_skill ORDER BY s.nama_skill SEPARATOR ', ') AS daftar_skill,
        GROUP_CONCAT(DISTINCT j.nama_jabatan ORDER BY j.nama_jabatan SEPARATOR ', ') AS daftar_jabatan
      FROM dosens d
      JOIN dosen_skills ds ON d.id = ds.dosen_id
      JOIN skills s ON ds.skill_id = s.id
      JOIN dosen_prodis dp ON d.id = dp.dosen_id
      JOIN prodi p ON dp.prodi_id = p.id
      JOIN dosen_jabatans dj ON d.id = dj.dosen_id
      JOIN jabatans j ON dj.jabatan_id = j.id
      JOIN dosen_images di ON d.id = di.dosen_id
      JOIN image_url i ON di.image_id = i.id
      GROUP BY d.id, d.nama, d.NUPTK, d.kontak, i.url, p.nama_prodi;
    `;
    const [rows] = await connection.execute(query);
    connection.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    // Pastikan error adalah instance dari Error untuk mengakses properti message
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch data', details: errorMessage }, { status: 500 });
  }
}
