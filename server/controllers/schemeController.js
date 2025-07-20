import Scheme from '../models/Scheme.js';

async function getSchemes(req, res) {
  try {
    const { q, category, state } = req.query;
    let filter = {};
    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }
    if (state) {
      filter.state = state;
    }
    const schemes = await Scheme.find(filter, '-fullDescription');
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

async function getSchemeById(req, res) {
  try {
    const scheme = await Scheme.findOne({ id: req.params.id });
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

async function createScheme(req, res) {
  try {
    if (Array.isArray(req.body)) {
      const schemes = await Scheme.insertMany(req.body, { ordered: false });
      res.status(201).json(schemes);
    } else {
      const scheme = new Scheme(req.body);
      await scheme.save();
      res.status(201).json(scheme);
    }
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Scheme with this id already exists' });
    } else if (err.name === 'BulkWriteError') {
      res.status(207).json({ error: 'Some schemes could not be inserted due to duplicates or validation errors', details: err.writeErrors });
    } else {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
}

export default {
  getSchemes,
  getSchemeById,
  createScheme
}; 