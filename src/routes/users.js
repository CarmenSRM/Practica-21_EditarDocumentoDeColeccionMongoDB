const express = require ('express'); //Se inyectan las dependencias de express.
const router = express.Router(); //Se inyecta el router. 
const mongoose = require ('mongoose'); //Se inyectan las dependencias de mongoose. 
let User = require ('../models/users'); //Se importan los datos del users.js de /models.

//Se define la ruta en la que se verán reflejados los datos de la BD
router.get('/usuarios', async (req, res) => {
    const Users = await User.find({});
    res.render('usersSave', {Users});//Renderiza la vista
});

//ruta /addUser renderizada 
router.get('/addUser', (req, res)=> {
    res.render('addUser');
});

//ruta /addUser original 
router.post('/addUser', (req, res)=> {
    const newUser = User({//Se crea un nuevo documento en la coleccion (abajo los parametros).
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password
    });

    //.save - Guarda los datos resividos. 
    //.then -Muuestra el mensaje cuando la conexion es exitosa (lo contrario al catch).
    //.catch -Se capturan y muestran los errores que se presenten.

    newUser
        .save()
        .then((data)=> {res.redirect('/usuarios')})
        .catch((error)=> {res.json({message:error})});
});

//Ruta para modificar los registros. 
router.get('/findById/:id', (req, res)=> {
    User.findById(req.params.id)
    .then((myUser)=> {res.render('userUpdate', {myUser})})
    .catch((error)=> {res.json({message:error})});
    //.findById- Guarda los datos resividos. 
    //.then -muestra la vista del formulario con los datos cargados para modificar.
    //.catch -Se capturan y muestran los errores que se presenten.
});

//Ruta que manda la las modificaciones a la BD
router.post('/updateUser', (req, res)=> {
    User.findByIdAndUpdate(req.body.objId, {
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
    })
    .then((data)=> {res.redirect('/usuarios')})
    .catch((error)=> {res.json({message:error})});

    //.findByIdEndUpdate- Permite la actualizacion 
    //.then -renderiza la tabla de usuarios (refleja las modificaciones).
    //.catch -Se capturan y muestran los errores que se presenten.
});

module.exports = router; //Se exporta el router.   