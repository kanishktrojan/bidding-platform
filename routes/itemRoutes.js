const express = require('express');
const { createItem, getItems, getItem, updateItem, deleteItem, upload } = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', authMiddleware, upload.single('image'), createItem);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'user']), updateItem);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'user']), deleteItem);

module.exports = router;
