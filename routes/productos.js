const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos, 
        obtenerProducto,
        crearProducto,
        actualizarProducto,
        borrarProducto
         } = require('../controllers/productos');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT, 
        validarCampos, 
        esAdminRole } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - publico
router.get('/',obtenerProductos);

// Obtener un Producto por ID - publico
router.get('/:id',[
    check('id','No es un ID  de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    ],obtenerProducto
);

// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','NO es un ID de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
    ] , 
    crearProducto
);

// Actualizar - privado- cualquiera con token válido
router.put('/:id',[
    validarJWT,
    //check('categoria','NO es un ID de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
    ],actualizarProducto
    );

// Borrar un producto -ADMIN
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID  de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto);

module.exports = router;









