const { Item, Bid } = require('../models');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const createItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  const image_url = req.file ? req.file.path : null;

  try {
    const item = await Item.create({ name, description, starting_price, end_time, image_url });
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const items = await Item.findAndCountAll({
      limit,
      offset
    });
    res.send(items);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id, {
      include: [Bid]
    });

    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }

    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, starting_price, end_time } = req.body;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access forbidden: insufficient rights' });
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.starting_price = starting_price || item.starting_price;
    item.end_time = end_time || item.end_time;
    await item.save();

    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access forbidden: insufficient rights' });
    }

    await item.destroy();
    res.send({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createItem, getItems, getItem, updateItem, deleteItem, upload };
