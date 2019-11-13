
const { cp } = require("./connection.js");
const pMySQL = require("./promise-mysql");


let createSongTableSQL = 'CREATE TABLE song (song_id int AUTO_INCREMENT, name varchar(255) NOT NULL, album_id int, PRIMARY KEY (song_id), CONSTRAINT albumForeignKey FOREIGN KEY (album_id) REFERENCES album (album_id));'

// Creating album table
pMySQL.query(cp, 'DROP TABLE IF EXISTS song; DROP TABLE IF EXISTS album; CREATE TABLE album (album_id int AUTO_INCREMENT, name varchar(255) NOT NULL, genre varchar(255), PRIMARY KEY (album_id));')

// Creating song table with album_id as foreign key
    .then(()=>pMySQL.query(cp, createSongTableSQL))
    
    // CREATING VIEW songs_on_albums
    .then(()=>pMySQL.query(cp, 'DROP VIEW IF EXISTS songs_on_albums; CREATE VIEW songs_on_albums AS SELECT song.name AS song_name, album.name AS album_name FROM song INNER JOIN album ON song.album_id=album.album_id WHERE song.album_id IS NOT NULL;'))
    .then(results=>{console.log(results);process.exit() })
    .catch(error=>{console.log(error); process.exit()});