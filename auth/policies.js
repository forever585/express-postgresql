const jwtService = require('../services/JwtService')

const AuthPolicy = (req, res, next) => {
    let token;

    if(req.header('Authorization')) {
        const parts = req.header('Authorization').split(' ');

        if(parts.length === 2) {
            const scheme = parts[0]
            const credentials = parts[1]

            if(/^Bearer$/.test(scheme)) 
                token = credentials
            else return( 
                res.status(401).json({message: 'You have to use "Authorization : Bearer [token]" format'}))
        }
        else return( 
            res.status(401).json({message: 'You have to use "Authorization : Bearer [token]" format'}))
    } else if(req.body.token){
        token = req.body.token;
        delete req.query.token;
    } else return(
        res.status(401).json({message: 'No Authorization was found'}))
    
    return jwtService().verify(token, (error, ntoken) => {
        if (error) return res.status(401).json({error})
        req.token = ntoken;
        return next()
    })
}

module.exports = AuthPolicy