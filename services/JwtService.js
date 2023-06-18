const jwt = require('jsonwebtoken')

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRETE : 'secret'

const JwtService = () => {
    const issue = payload => jwt.sign(payload, secret, { expiresIn : 10800 });
    const verify = ( token, callback ) => jwt.verify(token, secret, {}, callback);

    return {
        issue,
        verify
    }
}

module.exports = JwtService;