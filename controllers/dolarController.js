const displayDolar = (req,res) => {
    res.render('dolarToday',{ user: req.session.user || null })
}

module.exports = {
    displayDolar
}