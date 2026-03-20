const db = require("../db/connect");

class Diary {
  constructor({ post_id, title, content, category, created_at }) {
    this.id = post_id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.created_at = created_at;
  }

  // create a new diary entry
  static async create({ title, content, category, created_at }) {
    const result = await db.query(
      `INSERT INTO entries (title, content, category, created_at)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, category, created_at],
    );
    return new Diary(result.rows[0]);
  }

  // get all the entries (sorted by recent)
  static async getAll() {
    const result = await db.query(
      `SELECT * FROM entries
       ORDER BY created_at DESC`,
    );
    if (result.rows.length === 0) {
      throw new Error("No diary entries found.");
    }
    return result.rows.map((e) => new Diary(e));
  }

  // get a single entry by id
  static async getById(id) {
    const result = await db.query(`SELECT * FROM entries WHERE post_id = $1;`, [
      id,
    ]);
    if (result.rows.length != 1) {
      throw new Error("Unable to locate entry.");
    }
    return new Diary(result.rows[0]);
  }

  // delete an entry
  async destroy() {
    const result = await db.query(
      `DELETE FROM entries WHERE post_id = $1 RETURNING *;`,
      [this.id],
    );
    return new Diary(result.rows[0]);
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
