import { testCreateWithORM } from '../services/userService'

let testCreate = (req, res) => {
    testCreateWithORM()
    res.render('home')
}

module.exports = { testCreate }
