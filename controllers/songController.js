const mysql = require('mysql');
const {cp} = require('../db/connection.js');
const pMySQL = require('../db/promise-mysql');

exports.getSongs = (req,res)=>{
// let songs = [
// {
// song_name:"Happy Birthday"
// },
// {
// song_name:"Old MacDonald"
// }
// ];
// res.send(songs);

// Using left join to display song_name and album_name
// REFERENCE: https://www.w3schools.com/sql/sql_join_left.asp
pMySQL.query(cp, `SELECT song.name AS song_name, album.name AS album_name FROM song LEFT JOIN album ON song.album_id=album.album_id`)
    .then(results=>{
        console.log(results);
        res.send(JSON.stringify(results)); 
        
    })
    .catch(error=>{console.log(error);});
}
exports.getAlbumSongs = (req,res)=>{
// res.send('get album songs!');

// Displaying the songs which are not having "null" as album_id
pMySQL.query(cp, `SELECT * FROM songs_on_albums;`)
    .then(results=>{
        console.log(results);
        res.send(JSON.stringify(results)); 
    })
    .catch(error=>{console.log(error);});
}
exports.postSongs = (req,res)=>{
    console.log(req.body.album_id);
    
    // Checking if album_id is 0
    if(req.body.album_id == 0) {
        
        // Inserting values into song table if album_id=0
        pMySQL.query(cp, `INSERT INTO song (name, album_id) VALUES('${req.body.name}', null);`)
    .then(results=>{
        console.log(results);
        // Printing the results
        res.send(JSON.stringify(results)); 
        
    })
    .catch(error=>{console.log(error);});
    } else {
        let id = req.body.album_id;
        // Inserting values into song table
        pMySQL.query(cp, `INSERT INTO song (name, album_id) VALUES('${req.body.name}', '${req.body.album_id}');`)
    .then(results=>{
        console.log(results);
        // Printing the results
        res.send(JSON.stringify(results)); 
        
    })
    .catch(error=>{console.log(error);});
    }
    
    
}