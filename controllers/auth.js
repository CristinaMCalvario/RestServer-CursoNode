const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');

const { generarJWT } = require("../helpers/generar-jwt.js");
//const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {
        
        //Verificar si existe le email
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                mgs: 'Usuario / Password no son correctos - Correo'
            });
        }

        //SI el isuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                mgs: 'Usuario / Password no son correctos - estado: false'
            });
        }


        //Verficar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}