const displayProm = (req,res) => {
    res.render('prom',{ user: req.session.user || null })
}

module.exports = {
    displayProm
}