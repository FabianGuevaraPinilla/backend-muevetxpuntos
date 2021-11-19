exports.getImagenPremio = (req, res, next)=>{
    let nombre = req.params.name;
    try{
        res.sendFile( path.join(__dirname,`../assets/images/premios/${nombre}`))
    }catch(error){
        res.sendFile( path.join(__dirname,`../assets/images/premios/cross.jpg`))
    }
}
exports.getImagenEvento = (req, res, next)=>{
    let nombre = req.params.name;
    try{
        res.sendFile(`static/images/eventos/${nombre}`)
    }catch(error){
        res.sendFile( path.join(__dirname,`../assets/images/premios/cross.jpg`))
        // res.json({
        //     msg: "error consultando la imagen",
        //     exito: false
        // })
    }
}