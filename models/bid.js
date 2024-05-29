module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Items',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      timestamps: false
    });
  
    Bid.associate = (models) => {
      Bid.belongsTo(models.User, { foreignKey: 'user_id' });
      Bid.belongsTo(models.Item, { foreignKey: 'item_id' });
    };
  
    return Bid;
  };
  