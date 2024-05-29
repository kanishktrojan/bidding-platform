module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      starting_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      current_price: {
        type: DataTypes.DECIMAL,
        defaultValue: DataTypes.NOW
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      timestamps: false
    });
  
    Item.associate = (models) => {
      Item.hasMany(models.Bid, { foreignKey: 'item_id' });
    };
  
    return Item;
  };
  