const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
        // grab token from cookie which is a big object
        console.log('request.cookies');
        const {token} = req.cookies
        // if no token, stop
        if (!token) {
            res.status(403).send('You need to authenticate')
        }
        // if token is present, decode and get id
        try {
            const decode = jwt.verify(token, JWTSECRET)
            console.log(decode);
            // Append 
            req.user = decode
        } catch (error) {
            console.log(error);
            res.status(401).send('Invalid token')
            
        }
        // query DB for the user

        return next()
}

module.exports = auth