'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var admin = require("firebase-admin");
var serviceAccount = require("./path/to/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://g-bag-881d3.firebaseio.com"
});



let respuesta = {
error: false,
codigo: 200,
mensaje: ''
};



app.get ('/dispositivos', function(req,res){
    console.log("Metodo get")
    var contenido
    var ruta;
    console.log(req.query.id)
    if (req.query.id!=null){
        ruta = '/dispositivos/'+req.query.id
    }
    else{
        ruta = '/dispositivos'
    }
    var db = admin.database();
    var ref = db.ref(ruta);
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
        contenido = snapshot.val();
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: contenido
           };
        res.send(respuesta);
    });

    console.log("termino la llamada")
    
});

app.get ('/mochilas', function(req,res){
    console.log("Metodo get")
    var contenido
    var ruta;
    console.log(req.query.usuario)
    if (req.query.usuario!=null){
        ruta = '/mochilas/'+req.query.usuario
        if (req.query.idDispositivo!=null){
            ruta = '/mochilas/'+req.query.usuario+'/'+req.query.idDispositivo
        }
    }
    else{
        ruta = '/mochilas'
    }
    var db = admin.database();
    var ref = db.ref(ruta);
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
        contenido = snapshot.val();
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: contenido
           };
        res.send(respuesta);
    });

    console.log("termino la llamada")
    
});

app.post('/dispositivos', function(req,res){
    console.log("metodo post")
    var db = admin.database();
    var ref = db.ref("dispositivos");

    ref.child(req.body.id).set({
        bateria: req.body.bateria,
        latitud: req.body.latitud,
        longitud: req.body.longitud
    });
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Dispositivo registrado exitosamente'
       };
       res.send(respuesta);
});

app.post('/mochilas', function(req,res){
    console.log("metodo post")
    var db = admin.database();
    var ref = db.ref("mochilas");

    var usersRef = ref.child(req.body.usuario);
    usersRef.child(req.body.id).set({
        dispositivo: req.body.dispositivo
    });
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Dispositivo registrado exitosamente'
       };
       res.send(respuesta);
});


app.listen(8181,function(){
    console.log('Server UP!');
})