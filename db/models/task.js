const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Task extends Model { }
Task.init({
  date_ini: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_end: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descrip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: '',
  tableName: 'tasks',
  timestamps: false,
});

module.exports = Task;