const express = require('express');
const cors = require('cors');
const Twit = require('twit');


const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



var T = new Twit({
    consumer_key: 'afx3ITTheyILMd8cJl7ZEYtnN',
    consumer_secret: 'uKGcF3yBjxjSNZ3ITndaB7xjrl276LwReLFoa6gwGnGNvCKRlw',
    access_token: '1678423091272118272-UGAR2bB9XNc0O3C0HGmidw21XaFPrt',
    access_token_secret: 'hTzJdmpuSCGq02uYvs50bYEeJ8H4lUe1ZLLMqF5a54Jb0',
});


T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function (err, data, response) {
    console.log(data)
})


// T.post('POST /2/tweets', { status: 'hello world!' }, function (err, data, response) {
//     console.log(data)
// })



app.listen(8080, () => {
    console.log(`Server running at http://localhost:8080`);
});