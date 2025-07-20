import Scheme from '../models/Scheme.js';

// GET /api/schemes?q=search
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

// GET /api/schemes/:id
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

// POST /api/schemes
async function createScheme(req, res) {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Scheme with this id already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default {
  getSchemes,
  getSchemeById,
  createScheme
}; 