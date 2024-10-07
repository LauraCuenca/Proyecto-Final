const displayInvest = (req,res) => {
    res.render('invest',{ user: req.session.user || null })
}

module.exports = {
    displayInvest
}