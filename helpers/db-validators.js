const Role = require('../models/role.js');
const Usuario = require('../models/usuario.js');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
            throw new Error(`El rol ${rol} no está resgistrado en la DB`)
    }
}

const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
      throw new Error(`El correo ${correo}, ya esta registrado`);
    }

}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El ID no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
