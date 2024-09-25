const session = require('express-session');

const displayIndex = (req, res) => {
    res.render('index', { user: req.session.user || null }); 
};


module.exports = {
    displayIndex
}