const mysql = require('mysql');
const {cp} = require('../db/connection.js');
const pMySQL = require('../db/promise-mysql');

exports.getAlbums = (req,res)=>{
// res.send('get albums!');
// Displays all albums
pMySQL.query(cp, `SELECT * FROM album;`)
    .then(results=>{
        console.log(results);
        res.send(JSON.stringify(results)); 
        
    })
    .catch(error=>{console.log(error);});
}
exports.postAlbums = (req,res)=>{
    console.log(req.body);
    // Inserting values into album table
    pMySQL.query(cp, `INSERT INTO album (name, genre) VALUES('${req.body.name}', '${req.body.genre}');`)
    .then(results=>{
        console.log(results);
        res.send(JSON.stringify(results)); 
        
    })
    .catch(error=>{console.log(error);});
}

