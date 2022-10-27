const pool = require('./db');

const ROLES = {
    SUPPORT: 'support',
    GENERIC: 'generic'
}

const authUserSupportCreation = (req, res, next) => {
    const userId = req.body.userId;
    if(!userId) return res.status(403).send('Sign in before make a Request!')
    pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
        if(error || !results.rows.length) return res.status(403).send('User does not exist in Database')
        if(results.rows[0].team !== ROLES.SUPPORT) return res.status(401).send('User not authorized for this operation')
        next()
    })
}

module.exports = authUserSupportCreation