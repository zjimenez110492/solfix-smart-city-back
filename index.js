const express = require('express');
const app=express(); //Devuelve un servidor y lo guardo en app
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const config = require('./configs/config');
app.set('llave', config.llave);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usuarios=[{nombre:'jhonatan@a', password:'123'},{nombre:'zjimenez@u', password:'123'}]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
  });
  const rutasProtegidas = express.Router(); 
        rutasProtegidas.use((req, res, next) => {
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
    res.json({
        longitud:-76.5225,
        latitud: 3.43722,
        descripcion:""
    });
});
app.get('/coordenadas',rutasProtegidas,(req,res)=>{
    res.json([{
        latitud:-76.5425,
        longitud: 3.43722,
        descripcion:"Carrera 25 - Calle 2A"
    },
    {
        latitud:-76.52,
        longitud: 3.49,
        descripcion:"Calle 58N- aVENIDA 4B"
    },
    {
        latitud:-76.5025,
        longitud: 3.437,
        descripcion:"Carrera 25 - Calle 42"
    },
    {
        latitud:-76.53,
        longitud: 3.38,
        descripcion:"Carrera 86- Calle 15A"
    }]);
});
app.post('/usuario', function (req, res, next) 
{
    let band=false;
    let token="";
	for(let u of usuarios)
    {
        if(req.body.usuario==u.nombre)
        {           
            band=true;
            const payload = {check:  true};
            token = jwt.sign(payload, app.get('llave'), {expiresIn: 1440});
              
        }        
    }
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