const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_NODE );

        console.log('Base de datos conectada');
        
    } catch (error) {
        console.error('Error al iniciar la base de datos')
        console.log(error);
    }
}


module.exports = {
    dbConnection
}