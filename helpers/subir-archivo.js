const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensiones = ['png','jpg','jpeg','gif'];

const subirArchivo = ( files, extensionesValidas =  extensiones, carpeta = '') => {

    return new Promise((resolve, reject) => {
        
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1];
        
        //Validar la extensión
        if (!extensionesValidas.includes(extension)) {

            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
            // return res.status(400).json({
            //     msg: `La extensión ${extension} no es permitida, ${extensionesValidas}`
            // });
        }
        
        //res.json({extension});
        const nombreTemp = uuidv4() + '.' + extension;
    
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
        if (err) {
            reject(err);
        }

        resolve(nombreTemp);
        //resolve(uploadPath);
        });
    });

    
}
module.exports = {
    subirArchivo
}