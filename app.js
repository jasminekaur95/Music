let express = require('express');
let app = express();
app.use(express.json());

app.use(express.static('public'));
app.post('/', (req, res) => {
    res.render('index.html');
})

const router = require('./routes/index.js');
app.use('/api', router);

app.set('port', process.env.PORT || 8080); 
// create a setting called 'port' , with value either equal to 8080, or whatever the PORT environment variable is on the server.

let server = app.listen(app.settings.port, () => {
console.log('Server ready on ', app.settings.port);
});