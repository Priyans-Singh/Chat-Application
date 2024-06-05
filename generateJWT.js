import jwt from 'jsonwebtoken';

const generateJWT = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,//cookie can't be accessed by javascript
        sameSite: 'strict',//cookie can't be accessed by cross site request
        secure: process.env.NODE_ENV === 'production' ? true : false 
    });
}

export default generateJWT;