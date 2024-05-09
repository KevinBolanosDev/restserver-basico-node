const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( "mongodb://127.0.0.1:27017/dbNode" );

        console.log('Base de datos conectada');
        
    } catch (error) {
        console.error('Error al iniciar la base de datos')
        console.log(error);
    }
}


module.exports = {
    dbConnection
}