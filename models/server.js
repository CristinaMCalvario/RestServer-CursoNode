const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config.js');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();

        //
        this.middlewares();

        this.routes();

    }

    async conectarDB(){
        await dbConnection();
        //dbConnection
    }

    //Middlewares
    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    //Rutas de mi aplicacion
    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        
    }

    listen (){ 
        this.app.listen(this.port, ()=>{
        console.log('Servidor corriendo en puerto', this.port);
        });
    }


}




module.exports = Server;
