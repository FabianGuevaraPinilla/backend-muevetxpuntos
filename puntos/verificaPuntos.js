const verificaPuntos = (req, res, next) => {
    try {
        next()
    } catch (error) {
        res.status(401)
        res.json({code: 4, msg:"No tienes permiso para acceder"})
    }
}

module.exports = acumulaPuntos