const db = require("../db/connect");

class Diary {
  // create a new diary entry
  static async create({ title, content, category, created_at }) {
    const result = await db.query(
      `INSERT INTO entries (title, content, category, created_at)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, category, created_at],
    );
    return result.rows[0];
  }

  // get all the entries (sorted by recent)
  static async getAll() {
    const result = await db.query(
      `SELECT * FROM entries
       ORDER BY created_at DESC`,
    );
    return result.rows;
  }

  // get a single entry by id
  static async getById(id) {
    const result = await db.query(`SELECT * FROM entries WHERE post_id = $1`, [
      id,
    ]);
    return result.rows[0];
  }

  // for update
static async update(id, data) {
  const res = await db.query(
    `UPDATE entries
     SET title=$1, content=$2, category=$3
     WHERE post_id=$4
     RETURNING *`,
    [data.title, data.content, data.category, id]
  );
  if (res.rows.length !== 1) throw new Error('Update failed');
  return res.rows[0];
}


}



module.exports = Diary;
