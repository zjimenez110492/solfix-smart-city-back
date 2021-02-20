const express = require('express');
const app=express(); //Devuelve un servidor y lo guardo en app
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const config = require('./configs/config');
app.set('llave', config.llave);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usuarios=[{nombre:'jhonatan', password:'123'},{nombre:'zjimenez@u', password:'123'}]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
  });
  const rutasProtegidas = express.Router(); 
        rutasProtegidas.use((req, res, next) => {
            console.log("COMPROBANDO TOKEN:  ",req.headers);
            const token = req.headers['authorization'];
        
            if (token) {
            jwt.verify(token, app.get('llave'), (err, decoded) => {      
                if (err) {
                return res.json({ mensaje: 'Token inválida' });    
                } else {
                req.decoded = decoded;    
                next();
                }
            });
            } else {
            res.send({ 
                mensaje: 'Token no proveída.' 
            });
            }
        });

app.get('/centro', rutasProtegidas,(req,res)=>{
    console.log("CENTRO...");
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
app.post('/usuario', function (req, res, next) 
{
    let band=false;
    let token="";
	for(let u of usuarios)
    {
        console.log("entrada:   ",req.body.usuario,"   LOCAL:  ",u.nombre);
        if(req.body.usuario==u.nombre)
        {           
            band=true;
            const payload = {check:  true};
            token = jwt.sign(payload, app.get('llave'), {expiresIn: 1440});
              
        }        
    }
	console.log(req.body.usuario); 
    if(band)
	    res.send({ status: 'SUCCESS',res:band, token:token });
    else	    
        res.send({ status: 'ERROR',res:band });

	

});
app.get('/about',(req,res)=>{
    res.send('About me');
});
app.listen(3000,()=>{
    console.log("Server on Port 3000");
});