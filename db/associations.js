const User = require ('./models/user.js');
const Task = require ('./models/task.js');
const Saving = require ('./models/saving.js');


User.hasMany(Task)
User.hasMany(Saving)
Task.belongsTo(User)
Saving.belongsTo(User)