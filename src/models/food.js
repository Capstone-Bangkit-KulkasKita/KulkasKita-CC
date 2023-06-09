const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.belongsTo(models.User, { foreignKey: 'idUser', targetKey: 'user_id' });
      Food.hasMany(models.History, { foreignKey: 'idFood', sourceKey: 'food_id' });
    }
  }

  Food.init(
    {
      food_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      tableName: 'foods',
    }
  );

  return Food;
};
