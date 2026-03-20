const Diary = require("../model/Diary");

async function index(req, res) {
  try {
    const entries = await Diary.getAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const { title, content, category } = req.body;
    const created_at = new Date();
    const newEntry = await Diary.create({
      title,
      content,
      category,
      created_at,
    });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  create,
  index,
};
