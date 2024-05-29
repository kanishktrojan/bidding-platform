const { Notification } = require('../models');

const getNotifications = async (req, res) => {
  const user_id = req.user.id;

  try {
    const notifications = await Notification.findAll({ where: { user_id } });
    res.send(notifications);
  } catch (error) {
    res.status(400).send(error);
  }
};

const markAsRead = async (req, res) => {
  const user_id = req.user.id;

  try {
    await Notification.update({ is_read: true }, { where: { user_id, is_read: false } });
    res.send({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getNotifications, markAsRead };
