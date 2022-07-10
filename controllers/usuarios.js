const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');


const usuariosGet = async(req = request, res = response) => {
    //const {q, nombre = 'no name',apikey, page = 1, limit} = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
      total,
      usuarios
    });
  }
const usuariosPut = (req, res) => {
    const {id} = req.params;
    const { _id,password, google, correo, ...resto } = req.body;

    //TODO Validar contra BD
    if(password) {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
    }

    /*const usuario =  Usuario.findByIdAndUpdate(id, resto, {new:true}, (err, usuarioDB) =>{
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
    });

    res.json({
        msg: 'put API - usuariosPut',
        id
    });*/
    Usuario.findOneAndUpdate(id, resto, { new: true }, (err, usuarioDB) => {
 
      if (err) {
          return res.status(400).json({
              ok: false,
              err
          });
      }


      res.json({
          ok: true,
          usuario: usuarioDB
      });

  })
  }

const usuariosPost = async(req, res) => {

    const {nombre, correo, password, rol} = req.body;
    //const body = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

     // Encriptar la contraseña
     const salt = bcryptjs.genSaltSync();
     usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en DB
    await usuario.save();

    res.json({
        //msg: 'post API - usuariosPost',
        usuario
    });
  }

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
  }

const usuariosDelete = async(req, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos
   // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


  res.json(usuario);

    /*res.json({
        msg: 'delete API - usuariosDelete'
    });*/
  }


  module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
  }


  