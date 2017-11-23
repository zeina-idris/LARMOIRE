const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const multer = require('multer')
const bcrypt = require('./bcrypt.js')
const knox = require('knox');
const sendToS3 = require('./toS3').toS3;
const spicedPg = require('spiced-pg')
const path = require('path')
const uidSafe = require('uid-safe')
const db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/fashionUsers');


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


app.use(bodyParser.json())

app.use(compression());

app.use('/public', express.static(__dirname + '/public'));


if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
}


//ROUTES

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


app.get('/welcome', (req, res) => {
    console.log('inside /welcome', req.session);
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})


app.get('/products', (req, res) => {
    const q = `SELECT * FROM products ORDER BY created_at DESC`
    db.query(q)
    .then((result) => {
        res.json({
            products: result.rows
        })
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/product/:id', (req, res) => {
    console.log(req.body);
    const q = `SELECT image, userId, brand, price, id FROM products WHERE id = $1`
    const params = [req.params.id]
    db.query(q, params)
    .then((result) => {
        res.json({
            product: result.rows[0]
        })
    })
    .catch((err) => {
        console.log(err);
    })
})

app.post('/uploadSingleProduct', uploader.single('file'), (req, res) => {
    console.log('inside upload route');
    if (req.file) {
        sendToS3(req.file)
        .then(() => {
            console.log(req.file.filename);
             const q = `INSERT INTO products (image, brand, price) VALUES ($1, $2, $3, $4);`
             const params = [req.file.filename , req.body.brand, req.body.price]
             return db.query(q, params)
             .then(() => {
                 res.json({
                    success: true
                 });
             })
        }).catch((err) => {
            console.log(err);
            res.json({success: false})
        })
    } else {
        res.json({
            success: false
        });
    }
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    const q = `INSERT INTO messages (sender_id, recipient_id, content, product_id) VALUES ($1, $2, $3, $4)`
    const params = [req.session.user.id, req.body.recipient_id, req.body.content, req.body.product_id]
    db.query(q, params)
    .then((result) => {
        res.json({
            success: true
        })
    })
    .catch((err) =>{
        console.log(err);
        res.json({
            success: false
        })
    })
})



app.get('/logout', (req, res) =>{
    req.session = null;
    res.redirect('/welcome')
})

app.get('*', (req, res) => {
    console.log('inside the * route', req.session.user);
    if (!req.session.user) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
});


app.listen(8080, function() {
    console.log("I'm listening.")
});
