const displayProm = (req,res) => {
    res.render('promo',{ user: req.session.user || null })
}

module.exports = {
    displayProm
}