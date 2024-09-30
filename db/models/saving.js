const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

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
  color: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
}, {
  sequelize,
  modelName: '',
  tableName: 'saving',
  timestamps: false,
});

module.exports = Saving;