const express = require ('express'); //Se inyectan las dependencias de express.
const mongoose = require ('mongoose'); //Se inyectan las dependencias de mongoose.
const usersRoutes = require ('./routes/users'); //Se inyecta el router de personas.
//Se inyecta la variable de ambiente para MONGODB_URI. 
require ('dotenv').config(); //Se utiliza para crear llaves que permitan compartir información (la información se encuentra en el archivo .env)

mongoose.Promise = global.Promise;
const app = express(); //Se ejecuta express. 
const port = process.env.PORT || 3000; //Se efecifica el puerto para que escuche el servidor (el estatico 3000 o resivir algun otro).

app.set ('view engine', 'ejs');  //Se le indica que su template engine sera ejs 
app.set('views', './src/views');// Especifica la ruta de renderización de vistas
// Se especifica un directorio virtual ('/assets') contenido estatico mapeado a la carpeta fisica ('/public)' 
app.use('/assets', express.static(__dirname + '/../public'));

app.use (express.urlencoded({extended:false}));
app.use (usersRoutes); //Se hace uso del router de personas.

//. connect -Se conecta (haciendo uso de una llave -se mensiona arriba-)
//.then -Muuestra el mensaje cuando la conexion es exitosa (lo contrario al catch).
//.catch -Se capturan y muestran los errores que se presenten.
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Conectado a MongoDB')).catch((error) => console.log(error));

app.listen(port, ()=> console.log(`Escuchando en el puerto ${port}`)); //El pueto se pone a la escucha.  