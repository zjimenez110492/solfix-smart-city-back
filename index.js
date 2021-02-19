const express = require('express');
const app=express(); //Devuelve un servidor y lo guardo en app
const usuarios=[{nombre:'jhonatan', password:'123'},{nombre:'zjimenez@u', password:'123'}]
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/centro',(req,res)=>{
    res.json({
        longitud:-76.5225,
        latitud: 3.43722,
        descripcion:""
    });
});
app.get('/coordenadas',(req,res)=>{
    res.json([{
        longitud:-76.5225,
        latitud: 3.43722,
        descripcion:"Cali 1"
    },
    {
        longitud:-76.52,
        latitud: 3.43722,
        descripcion:"Cali 2"
    },
    {
        longitud:-76.5225,
        latitud: 3.437,
        descripcion:"Cali 3"
    }]);
});
app.post('/usuario', function (req, res, next) {
    let band=false;
	for(let u of usuarios){
        console.log("entrada:   ",req.body.usuario,"   LOCAL:  ",u.nombre);
        if(req.body.usuario==u.nombre){
            console.log("Login de:  ",req.body.usuario," es igual a ",u.nombre);
            band=true;
        }
    }
	console.log(req.body.usuario); 
    if(band)
	    res.send({ status: 'SUCCESS',res:band });
    else	    
        res.send({ status: 'ERROR',res:band });

	

});
app.get('/about',(req,res)=>{
    res.send('About me');
});
app.listen(3000,()=>{
    console.log("Server on Port 3000");
});