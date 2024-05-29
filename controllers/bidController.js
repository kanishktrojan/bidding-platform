const { Bid, Item } = require('../models');
const { Op } = require('sequelize');

const createBid = async (req, res) => {
  const { itemId } = req.params;
  const { bid_amount } = req.body;
  const user_id = req.user.id;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }

    if (new Date(item.end_time) < new Date()) {
      return res.status(400).send({ error: 'Auction has ended' });
    }

    if (bid_amount <= item.current_price) {
      return res.status(400).send({ error: 'Bid amount must be higher than the current price' });
    }

    const bid = await Bid.create({ item_id: itemId, user_id, bid_amount });
    item.current_price = bid_amount;
    await item.save();

    // Emit bid event via Socket.io
    req.io.emit('bid', { itemId, bid_amount });

    res.status(201).send(bid);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getBids = async (req, res) => {
  const { itemId } = req.params;

  try {
    const bids = await Bid.findAll({
      where: { item_id: itemId },
      order: [['created_at', 'DESC']]
    });
    res.send(bids);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createBid, getBids };
