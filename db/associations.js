const User = require ('./models/user.js');
const Task = require ('./models/task.js');


User.hasMany(Task)
Task.belongsTo(User)