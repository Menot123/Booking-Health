
let homePage = (req, res) => {
    res.render('home')
}

let adminPage = (req, res) => {
    res.render('admin')
}

module.exports = { homePage, adminPage }