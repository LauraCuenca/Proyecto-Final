const displaySaving = (req,res) => {
    res.render('saving',{ user: req.session.user || null })
}

module.exports = {
    displaySaving
}