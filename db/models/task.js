const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user'); 

class Task extends Model { }
Task.init({
    date_ini: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    descrip: {
        type: DataTypes.STRING,
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
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: false,
});


User.hasMany(Task, { foreignKey: 'UserId' }); 
Task.belongsTo(User, { foreignKey: 'UserId' }); 

module.exports = Task;
