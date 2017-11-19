const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const multer = require('multer')
const sendToS3 = require('./toS3').toS3;
const spicedPg = require('spiced-pg')
const path = require('path')
const uidSafe = require('uid-safe')
const db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/fashionUsers');
const bcrypt = require('./bcrypt.js')


// const server = require('http').Server(app);
// const io = require('socket.io')(server);

//Configuration

if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}
app.use(cookieSession({
    name: 'session',
    secret: 'a really hard to guess secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json())

app.use(compression());

app.use('/public', express.static(__dirname + '/public'));


if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
}


//ROUTES
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    if (!req.body.first || !req.body.last || !req.body.email || !req.body.password) {
        res.json({success: false})
    } else {
        const email = [req.body.email]
        const q = `SELECT * FROM users WHERE users.email=$1`
        db.query(q, email).then((result) => {
            if (result.rows[0]) {
                res.json({success: false})
            } else {
                const {first, last, email} = req.body;
                const q = `INSERT INTO users (first, last, email, password) VALUES ($1,$2,$3,$4) RETURNING id;`

                bcrypt.hashPassword(req.body.password).then((hash) => {
                    db.query(q, [first, last, email, hash]).then((results) => {
                        req.session.user = {
                            first: first,
                            last: last,
                            id: results.rows[0].id
                        }
                        res.json({success: true})
                    })
                })
            }
        })
    }
})

app.post('/login', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false})
    } else {
        const email = [req.body.email]
        const q = `SELECT * FROM users WHERE email=$1`
        db.query(q, email).then((result) => {
            const data = result.rows[0];
            if (data) {
                bcrypt.checkPassword(req.body.password, data.password).then((doesMatch) => {
                    if (doesMatch) {
                        req.session.user = {
                            first: data.first,
                            last: data.last,
                            id: data.id
                        }
                        console.log('inside post login setting session', req.session);
                        res.json({success: true})
                    } else {
                        res.json({success: false})
                    }
                })
            } else {
                res.json({success: false})
            }
        })
    }
});




app.listen(8080, function() {
    console.log("I'm listening.")
});
