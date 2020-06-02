const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.url === '/api/auth/signup' || req.url === '/api/auth/signin' || req.url.includes('/api-docs')) {
        next();
    } else {
        const [token_type, jwt_token] = req.headers['authorization'].split(' ');
        console.log("token_type: " + token_type);
        console.log("jwt_token: " + jwt_token);

        try {
            let user = jwt.verify(jwt_token, config.get('jwtSecret'));
            //console.log("user: " + JSON.stringify(user));
            req.user = user;
            next();
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ status: 'User unauthorized' }).end()
            }
            return res.status(400).json({ status: 'Invalid authorized token' }).end()
        }
    }
};