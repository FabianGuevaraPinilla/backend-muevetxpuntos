const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, "__secret__", (error, decoded)=>{
            if (error) return res.status(403).send({msg: "token invalido no puede acceder"})
            console.log(decoded)
            req.usuario = decoded
            next()
        })
        
    } catch (error) {
        res.status(401)
        res.json({code: 4, msg:"No tienes permiso para acceder"})
    }
}

module.exports = auth