const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user'); 

class Saving extends Model { }
Saving.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto_obj: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  monto_ah: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  UserId: { 
    type: DataTypes.INTEGER,
    references: {
        model: User, 
        key: 'id', 
    }
}
}, {
  sequelize,
  modelName: 'Saving',
  tableName: 'saving',
  timestamps: false,
});

User.hasMany(Saving, { foreignKey: 'UserId' }); 
Saving.belongsTo(User, { foreignKey: 'UserId' }); 

module.exports = Saving;