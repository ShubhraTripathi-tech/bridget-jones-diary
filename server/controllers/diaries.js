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

async function show(req, res) {
  try {
    const entry = await Diary.getById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function update(req, res) {
  try {
    const updated = await Diary.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


module.exports = {
  create,
  index,
  show,
  update,
};
