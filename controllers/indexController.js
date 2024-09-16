const session = require('express-session');

const displayIndex = (req,res) => {
    res.render('index',{ session: req.session })
}

module.exports = {
    displayIndex
}