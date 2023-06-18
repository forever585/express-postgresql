const { User } = require('../models')
const JwtService = require('../services/JwtService')
const BcryptService = require('../services/BcryptService')

const AuthController = () => {
    const register = async (req, res) => {
        const {
            username,
            email,
            password,
            password2
        } = req.body
        if( password === password2 ){
            try {
                const lastUser = await User.findOne({
                    order: [['id', 'DESC']]
                })
                const newId = parseInt(lastUser.dataValues.id) + 1
                const user = await User.create({
                    id: newId,
                    username,
                    email,
                    password
                })
                const token = JwtService().issue({ id: user.id })

                return res.status(200).json({ token, user })
            } catch (err){
                console.log(err)
                return res.status(500).json({ message: 'Internal server error occured!' })
            }
        }
        return res.status(400).json({ message: 'Bad Request: Password don\'t match!' })
    }

    const login = async (req, res) => {
        const { email, password } = req.body;

        if ( email && password ){
            try{
                const user = await User.findOne({
                    where: {
                        email
                    }
                })

                if( !user )
                    return res.status(400).json({ message: 'Bad Request: User not found!'})
                
                if(BcryptService().comparePassword(password, user.password)){
                    const token = JwtService().issue({ id: user.id});
                    return res.status(200).json({token, user})
                }

                return res.status(401).json({message: 'UnAuthorized'})
            } catch (err){
                console.log(err)
                return res.status(500).json({ message: 'Internal server error occured!'})
            }
        }

        return res.status(400).json({ message: 'Bad Request: Email and password don\'t match!'})
    }

    const validate = ( req, res ) => {
        const { token } = req.body

        JwtService().verify(token, err => {
            if ( err ){
                return res.status(401).json({ isvalid: false, error: 'Invalid Token!'});
            }

            return res.status(200).json({ isvalid: true })
        })
    }

    return {
        register,
        login,
        validate
    }
}

module.exports = AuthController